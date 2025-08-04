resource "aws_ecs_cluster" "this" {
  name = "autofundplus-ecs"
  tags = var.tags
}

resource "aws_lb" "alb" {
  name               = "autofundplus-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = []
  tags               = var.tags
}

output "cluster_id" { value = aws_ecs_cluster.this.id }
output "alb_arn" { value = aws_lb.alb.arn }