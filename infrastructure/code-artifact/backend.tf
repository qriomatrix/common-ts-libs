terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "qm-terraform-tfstate"
    key            = "terraform/code-artifact/terraform.tfstate"
    dynamodb_table = "qm-terraform-tfstate-lock"
    region         = "us-east-1"
    profile        = "qm-mgt"
  }
}