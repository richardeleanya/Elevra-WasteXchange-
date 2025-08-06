# This module would provision Prometheus, Grafana, Jaeger on ECS-Fargate with ALB/service discovery.
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "autofundplus-observability"
  dashboard_body = jsonencode({})
}
output "dashboard_id" { value = aws_cloudwatch_dashboard.main.id }