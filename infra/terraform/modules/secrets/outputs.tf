output "hmrc_secret_arn" { value = aws_secretsmanager_secret.hmrc.arn }
output "dwp_secret_arn" { value = aws_secretsmanager_secret.dwp.arn }
output "truelayer_secret_arn" { value = aws_secretsmanager_secret.truelayer.arn }
output "experian_secret_arn" { value = aws_secretsmanager_secret.experian.arn }