module "vpc" {
  source = "../../modules/vpc"
  cidr_block = var.vpc_cidr
  tags = var.tags
}

module "rds" {
  source = "../../modules/rds"
  vpc_id = module.vpc.vpc_id
  db_username = var.db_username
  db_password = var.db_password
  tags = var.tags
}

module "redis" {
  source = "../../modules/redis"
  vpc_id = module.vpc.vpc_id
  tags = var.tags
}

module "ecr" {
  source = "../../modules/ecr"
  services = var.services
  tags = var.tags
}

module "ecs_cluster" {
  source = "../../modules/ecs_cluster"
  vpc_id = module.vpc.vpc_id
  tags = var.tags
}

module "api_service" {
  source = "../../modules/ecs_service"
  name = "api"
  cluster_id = module.ecs_cluster.cluster_id
  alb_arn = module.ecs_cluster.alb_arn
  image = var.api_image
  env_secrets = var.api_secrets
  tags = var.tags
}

# Other services similarly...

module "observability" {
  source = "../../modules/observability_stack"
  vpc_id = module.vpc.vpc_id
  cluster_id = module.ecs_cluster.cluster_id
  tags = var.tags
}

module "s3_documents" {
  source = "../../modules/s3_bucket"
  bucket_name = var.s3_documents_bucket
  tags = var.tags
}

module "opensearch" {
  source = "../../modules/opensearch"
  vpc_id = module.vpc.vpc_id
  tags = var.tags
}