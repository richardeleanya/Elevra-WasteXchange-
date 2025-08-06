terraform {
  backend "s3" {
    bucket = "autofundplus-tfstate-prod"
    key    = "terraform.tfstate"
    region = "eu-west-2"
    dynamodb_table = "autofundplus-tfstate-lock"
    encrypt = true
  }
}