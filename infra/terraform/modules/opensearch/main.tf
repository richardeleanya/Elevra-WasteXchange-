resource "aws_opensearch_domain" "this" {
  domain_name           = "autofundplus-os"
  engine_version        = "OpenSearch_2.11"
  cluster_config {
    instance_type = "t3.small.search"
    instance_count = 1
  }
  tags = var.tags
}
output "opensearch_endpoint" { value = aws_opensearch_domain.this.endpoint }