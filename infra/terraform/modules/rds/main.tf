resource "aws_db_instance" "this" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t4g.micro"
  name                 = "autofund"
  username             = var.db_username
  password             = var.db_password
  vpc_security_group_ids = []
  publicly_accessible  = false
  skip_final_snapshot  = true
  tags                 = var.tags
}

output "endpoint" {
  value = aws_db_instance.this.endpoint
}