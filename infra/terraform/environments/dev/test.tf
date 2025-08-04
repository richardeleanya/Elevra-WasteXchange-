resource "null_resource" "smoke_test" {
  provisioner "local-exec" {
    command = "curl --fail ${module.api_service.alb_dns}/healthz || exit 1"
  }
}