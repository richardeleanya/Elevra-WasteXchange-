# AutoFund+ Platform: Phase-1 Backend Architecture

## Service Overview

```mermaid
graph TD
    API-Gateway[(apps/api)]
    Eligibility[(eligibility-service)]
    Document[(document-service)]
    Notification[(notification-service)]
    Payment[(payment-service)]
    RedisQ[(Redis Queues)]
    DB[(Postgres)]
    S3[(S3 / Localstack)]
    Jaeger[(Jaeger)]
    Prometheus[(Prometheus)]
    Grafana[(Grafana)]
    Maildev[(Maildev)]

    API-Gateway --REST/gRPC--> Eligibility
    API-Gateway --REST--> Document
    API-Gateway --REST--> Notification
    API-Gateway --REST--> Payment
    API-Gateway --SQL--> DB
    API-Gateway --Bull Event--> RedisQ
    Eligibility --Bull--> RedisQ
    Payment --Bull--> RedisQ
    Notification --Bull--> RedisQ
    Document --S3--> S3
    API-Gateway --Jaeger--> Jaeger
    API-Gateway --Prom--> Prometheus
    Notification --SMTP--> Maildev
    Grafana --Prometheus--> Prometheus
```

## Event Flows

- **ApplicationSubmitted** published by API-Gateway to RedisQ, consumed by Payment and Notification.
- **ApplicationApproved** published by API-Gateway.
- **InvoiceCreated** published by Payment-Service, consumed by Notification.

## Health & Observability

- All services expose `/healthz`, `/metrics`
- Tracing: Jaeger via OpenTelemetry
- Metrics: Prometheus + Grafana

## Shared Libraries

- `libs/common` exports DTOs, config, logger, tracing, events.

## Infra

- `infra/terraform` placeholder for AWS cloud provisioning.