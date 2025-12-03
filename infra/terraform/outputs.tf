output "vm_name" {
  description = "Name of the Compute Engine VM hosting the API."
  value       = google_compute_instance.api.name
}

output "vm_external_ip" {
  description = "Static IPv4 address assigned to the API VM."
  value       = google_compute_address.api.address
}

output "sql_instance_connection_name" {
  description = "Cloud SQL connection string (for proxy or debugging)."
  value       = google_sql_database_instance.primary.connection_name
}

output "sql_private_ip" {
  description = "Private service-connected IP for PostgreSQL."
  value       = google_sql_database_instance.primary.private_ip_address
}
