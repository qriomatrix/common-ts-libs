variable "account_mapping" {
  type = map(any)
}

variable "accounts" {
  type = map(
    object({
      account_id        = string
      is_core           = bool
      is_enabled        = bool
      is_prod           = bool
      primary_region    = string
      replica_region    = string
      tag_env           = string
      tag_owner         = string
      tag_support_group = string
    })
  )
}
