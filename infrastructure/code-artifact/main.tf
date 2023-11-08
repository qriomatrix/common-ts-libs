provider "aws" {
  region = local.primary_region
  profile = terraform.workspace
  default_tags {
    tags = local.default_tags
  }
}

provider "aws" {
  alias   = "replica"
  region  = local.replica_region
  profile = terraform.workspace
  default_tags {
    tags = local.default_tags
  }
}