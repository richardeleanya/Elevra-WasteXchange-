import { Module, Global, OnModuleInit } from '@nestjs/common';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

@Global()
@Module({})
export class TracingModule implements OnModuleInit {
  async onModuleInit() {
    const sdk = new NodeSDK({
      traceExporter: new JaegerExporter({
        endpoint: process.env.JAEGER_ENDPOINT || 'http://jaeger:14268/api/traces',
      }),
    });
    await sdk.start();
  }
}