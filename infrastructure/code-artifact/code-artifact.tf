resource "aws_codeartifact_domain" "qriomatrix-libs" {
  count = local.enabled ? 1 : 0
  domain = "qriomatrix-libs"
}

resource "aws_codeartifact_repository" "common-ts-libs" {
  count = local.enabled ? 1 : 0
  repository = "common-ts-libs"
  domain     = aws_codeartifact_domain.qriomatrix-libs[0].domain
  external_connections {
    external_connection_name = "public:npmjs"
  }
  description = "Common TypeScript libraries used by QrioMatrix projects"
}

