variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-2"
}

variable "aws_profile" {
  description = "AWS CLI profile"
  type        = string
  default     = "default"
}

variable "tags" {
  type = map(string)
  default = {
    Project = "AutoFundPlus"
    Environment = "dev"
  }
}

variable "vpc_cidr" {
  type = string
  default = "10.10.0.0/16"
}

variable "db_username" {
  type = string
  default = "autofund"
}
variable "db_password" {
  type = string
  default = "dummy" # not secret
}
variable "services" {
  type = list(string)
  default = ["api", "web", "eligibility-service", "document-service", "notification-service", "payment-service", "integration-service"]
}
variable "api_image" {
  type = string
  default = "REPLACE_ME"
}

variable "api_secrets" {
  type = map(string)
  default = {}
}

variable "s3_documents_bucket" {
  type = string
  default = "autofundplus-docs-dev"
}