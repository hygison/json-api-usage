variable "project_id" {
  description = "GCP project ID that hosts the infrastructure."
  type        = string
}

variable "region" {
  description = "Region for regional resources."
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "Zone for zonal resources like the VM."
  type        = string
  default     = "us-central1-a"
}

variable "name_prefix" {
  description = "Prefix that will be prepended to most resource names."
  type        = string
  default     = "json-api"
}

variable "network_cidr" {
  description = "CIDR range for the custom VPC."
  type        = string
  default     = "10.10.0.0/16"
}

variable "subnet_cidr" {
  description = "CIDR range for the primary subnet used by the VM and Cloud SQL private IP."
  type        = string
  default     = "10.10.0.0/24"
}

variable "app_port" {
  description = "Port exposed by the NestJS container."
  type        = number
  default     = 3000
}

variable "container_image" {
  description = "OCI image (e.g. Artifact Registry or Docker Hub) that contains the API."
  type        = string
}

variable "vm_machine_type" {
  description = "Compute Engine machine type for the API VM."
  type        = string
  default     = "e2-small"
}

variable "vm_disk_size_gb" {
  description = "Boot disk size for the API VM."
  type        = number
  default     = 30
}

variable "vm_image" {
  description = "Source image for the API VM boot disk."
  type        = string
  default     = "projects/debian-cloud/global/images/family/debian-12"
}

variable "vm_tags" {
  description = "Additional network tags applied to the API VM."
  type        = list(string)
  default     = []
}

variable "service_account_id" {
  description = "Account ID (name) for the VM service account."
  type        = string
  default     = "json-api-vm"
}

variable "service_account_display_name" {
  description = "Display name for the VM service account."
  type        = string
  default     = "Json API VM"
}

variable "sql_database_version" {
  description = "PostgreSQL version for Cloud SQL."
  type        = string
  default     = "POSTGRES_15"
}

variable "sql_tier" {
  description = "Cloud SQL machine tier."
  type        = string
  default     = "db-custom-1-3072"
}

variable "sql_disk_size_gb" {
  description = "Allocated SSD storage for Cloud SQL."
  type        = number
  default     = 20
}

variable "sql_disk_type" {
  description = "Disk type for Cloud SQL (PD_SSD or PD_HDD)."
  type        = string
  default     = "PD_SSD"
}

variable "sql_availability_type" {
  description = "Availability type for Cloud SQL (ZONAL or REGIONAL)."
  type        = string
  default     = "ZONAL"
}

variable "sql_backup_start_time" {
  description = "Start time (HH:MM, UTC) for automated Cloud SQL backups."
  type        = string
  default     = "02:00"
}

variable "sql_database_name" {
  description = "Default application database name."
  type        = string
  default     = "json_api"
}

variable "sql_user" {
  description = "Application database user."
  type        = string
  default     = "json_api"
}

variable "sql_user_password" {
  description = "Password for the application database user."
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret, reused for the container deployment."
  type        = string
  sensitive   = true
}

variable "jwt_access_token_ttl" {
  description = "JWT expiration (seconds)."
  type        = number
  default     = 86400
}

variable "extra_app_env" {
  description = "Additional environment variables injected into the container."
  type        = map(string)
  default     = {}
}
