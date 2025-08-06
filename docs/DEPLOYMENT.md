# Deployment Guide – AutoFund+ Cloud Platform

## Prerequisites

- AWS CLI configured with admin access
- Terraform 1.7+
- S3 bucket and DynamoDB table for state

## 1. Bootstrap S3 Backend

```sh
aws s3api create-bucket --bucket autofundplus-tfstate-dev --region eu-west-2
aws dynamodb create-table --table-name autofundplus-tfstate-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --region eu-west-2
```

## 2. Deploy Infrastructure

```sh
cd infra/terraform/environments/dev
terraform init
terraform validate
terraform apply
```

## 3. Build and Push Docker Images

```sh
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin <ECR_REGISTRY>
for svc in api eligibility-service document-service notification-service payment-service web; do
  docker build -t <ECR_REGISTRY>/autofundplus-$svc:latest ../../../../apps/$svc
  docker push <ECR_REGISTRY>/autofundplus-$svc:latest
done
```

## 4. Run Deployment Workflow

Push to main, or manually run `.github/workflows/deploy.yml` in GitHub Actions.

## 5. Smoke Test

After deploy, Terraform automatically runs a curl against your ALB `/healthz` endpoint.

## 6. Observability

- CloudWatch dashboards auto-provisioned.
- Jaeger/Grafana/Prometheus stack deployed in ECS.

## 7. Secrets Management

- Store STRIPE_API_KEY, JWT_SECRET, DB creds in AWS Secrets Manager.
- ECS task definitions map secret ARNs to env vars.

---