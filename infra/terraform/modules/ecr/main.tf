resource "aws_ecr_repository" "service_repos" {
  for_each = toset(var.services)
  name     = "autofundplus-${each.key}"
  tags     = var.tags
}
output "repo_urls" { value = { for k, v in aws_ecr_repository.service_repos : k => v.repository_url } }