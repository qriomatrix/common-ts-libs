locals {
  enabled        = var.accounts[local.account_name].is_enabled
  account_name   = lookup(var.account_mapping, terraform.workspace, "development")
  primary_region = var.accounts[local.account_name].primary_region
  replica_region = var.accounts[local.account_name].replica_region
  environment         = var.accounts[local.account_name].tag_env
  owner               = var.accounts[local.account_name].tag_owner
  support_group       = var.accounts[local.account_name].tag_support_group
  mandatory_tags = {
    Environment = upper(local.environment)
    Owner       = upper(local.owner)
  }
  optional_tags = {
    SupportGroup = local.support_group
    SourceRepo   = "https://github.com/qriomatrix/qriomatrix-reusable-github-workflows"
  }
  default_tags = merge(local.mandatory_tags, local.optional_tags)
}
