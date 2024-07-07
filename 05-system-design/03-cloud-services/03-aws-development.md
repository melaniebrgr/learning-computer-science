# 03 Cloud services

## Development

- Cloud9 (cloud IDE)
- CodeCommit (repo)
- CodeBuild (build)
- CodeDeploy (deploy)
- CodePipeline (CI/CD)
- CodeStar (simple CI)
- CodeArtifact (private and public package management)
- CodeGuru (static analysis)
- DevOpsGuru (running app analysis)
- Device Farm

### Cloud9

A cloud-based IDE ontop of EC2. You don't pay for the IDE, but do pay for EC2 usage. The instance hibernates after 30 min of inactivity. Access to terminal.

### CodeDeploy

Deloy to different environments, (EC2, ECS or lambda), with different deployment strategies (gradual replacement or simultaneous) that are either custom or managed, manually or automatically with monitoring and rollback.

### CodePipeline / CodeStar

Manage CodeDeploy stages.
