resource "aws_elasticache_cluster" "this" {
  cluster_id           = "autofundplus-redis"
  engine               = "redis"
  node_type            = "cache.t4g.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  tags                 = var.tags
}
output "endpoint" {
  value = aws_elasticache_cluster.this.cache_nodes[0].address
}