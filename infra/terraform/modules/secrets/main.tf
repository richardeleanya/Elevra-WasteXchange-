resource "aws_secretsmanager_secret" "hmrc" {
  name = "autofundplus/hmrc_api_key"
  tags = var.tags
}
resource "aws_secretsmanager_secret" "dwp" {
  name = "autofundplus/dwp_api_key"
  tags = var.tags
}
resource "aws_secretsmanager_secret" "truelayer" {
  name = "autofundplus/truelayer"
  tags = var.tags
}
resource "aws_secretsmanager_secret" "experian" {
  name = "autofundplus/experian_api_key"
  tags = var.tags
}
output "hmrc_secret_arn" { value = aws_secretsmanager_secret.hmrc.arn }
output "dwp_secret_arn" { value = aws_secretsmanager_secret.dwp.arn }
output "truelayer_secret_arn" { value = aws_secretsmanager_secret.truelayer.arn }
output "experian_secret_arn" { value = aws_secretsmanager_secret.experian.arn }