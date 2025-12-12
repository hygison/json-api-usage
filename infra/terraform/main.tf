resource "google_compute_network" "primary" {
  name                    = "${var.name_prefix}-vpc"
  auto_create_subnetworks = false
  routing_mode            = "REGIONAL"
}

resource "google_compute_subnetwork" "primary" {
  name          = "${var.name_prefix}-subnet"
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  network       = google_compute_network.primary.id
  private_ip_google_access = true
}

resource "google_compute_firewall" "internal" {
  name    = "${var.name_prefix}-allow-internal"
  network = google_compute_network.primary.id

  allow {
    protocol = "all"
  }

  source_ranges = [var.network_cidr]
}

resource "google_compute_firewall" "ssh" {
  name    = "${var.name_prefix}-allow-ssh"
  network = google_compute_network.primary.id

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = concat(["allow-ssh"], var.vm_tags)
}

resource "google_compute_firewall" "http" {
  name    = "${var.name_prefix}-allow-http"
  network = google_compute_network.primary.id

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = concat(["allow-http"], var.vm_tags)
}

resource "google_compute_firewall" "https" {
  name    = "${var.name_prefix}-allow-https"
  network = google_compute_network.primary.id

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = concat(["allow-http"], var.vm_tags)
}

resource "google_compute_global_address" "private_service_connect" {
  name          = "${var.name_prefix}-psc"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.primary.id
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.primary.id
  service                 = "services/servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_service_connect.name]
}

resource "google_sql_database_instance" "primary" {
  name                = "${var.name_prefix}-sql"
  database_version    = var.sql_database_version
  region              = var.region
  deletion_protection = true

  settings {
    tier              = var.sql_tier
    disk_size         = var.sql_disk_size_gb
    disk_type         = var.sql_disk_type
    availability_type = var.sql_availability_type

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.primary.id
    }

    backup_configuration {
      enabled    = true
      start_time = var.sql_backup_start_time
    }

    maintenance_window {
      day          = 7
      hour         = 2
      update_track = "stable"
    }
  }

  depends_on = [google_service_networking_connection.private_vpc_connection]
}

resource "google_sql_database" "app" {
  name     = var.sql_database_name
  instance = google_sql_database_instance.primary.name
}

resource "google_sql_user" "app" {
  instance = google_sql_database_instance.primary.name
  name     = var.sql_user
  password = var.sql_user_password
}

locals {
  base_app_env = {
    APP_PORT              = tostring(var.app_port)
                  = "production"
    DB_HOST               = google_sql_database_instance.primary.private_ip_address
    DB_PORT               = "5432"
    DB_USER               = var.sql_user
    DB_PASSWORD           = var.sql_user_password
    DB_NAME               = var.sql_database_name
    JWT_SECRET            = var.jwt_secret
    JWT_ACCESS_TOKEN_TTL  = tostring(var.jwt_access_token_ttl)
    JWT_PRIVATE_KEY_PATH  = "/usr/src/app/private_key.pem"
    JWT_PUBLIC_KEY_PATH   = "/usr/src/app/public_key.pem"
  }

  merged_app_env = merge(local.base_app_env, var.extra_app_env)
  app_env_file   = join("\n", [for key, value in local.merged_app_env : "${key}=${value}"])
}

resource "google_service_account" "vm" {
  account_id   = var.service_account_id
  display_name = var.service_account_display_name
}

resource "google_project_iam_member" "vm_log_writer" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.vm.email}"
}

resource "google_project_iam_member" "vm_metric_writer" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = "serviceAccount:${google_service_account.vm.email}"
}

resource "google_project_iam_member" "vm_artifact_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.vm.email}"
}

resource "google_compute_address" "api" {
  name   = "${var.name_prefix}-api-ip"
  region = var.region
}

resource "google_compute_instance" "api" {
  name         = "${var.name_prefix}-api"
  machine_type = var.vm_machine_type
  zone         = var.zone
  tags         = concat(["allow-ssh", "allow-http"], var.vm_tags)

  boot_disk {
    initialize_params {
      image = var.vm_image
      size  = var.vm_disk_size_gb
      type  = "pd-balanced"
    }
  }

  network_interface {
    subnetwork = google_compute_subnetwork.primary.id

    access_config {
      nat_ip = google_compute_address.api.address
    }
  }

  metadata_startup_script = templatefile("${path.module}/templates/startup.sh.tpl", {
    app_env        = local.app_env_file
    app_port       = var.app_port
    container_image = var.container_image
  })

  service_account {
    email  = google_service_account.vm.email
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }

  depends_on = [
    google_sql_database_instance.primary,
    google_project_iam_member.vm_artifact_reader,
    google_project_iam_member.vm_log_writer,
    google_project_iam_member.vm_metric_writer
  ]
}
