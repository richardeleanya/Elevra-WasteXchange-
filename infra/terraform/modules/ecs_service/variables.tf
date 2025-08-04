variable "name" { type = string }
variable "cluster_id" { type = string }
variable "alb_arn" { type = string }
variable "image" { type = string }
variable "env_secrets" { type = map(string) }
variable "tags" { type = map(string) }
variable "task_exec_role_arn" { type = string }