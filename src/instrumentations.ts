import { NodeSDK, logs } from '@opentelemetry/sdk-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';

const sdk = new NodeSDK({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'otel-node-ts-example',
        [ATTR_SERVICE_VERSION]: '0.1.0',
    }),
    logRecordProcessors: [
        new logs.BatchLogRecordProcessor(new OTLPLogExporter({
            url: 'otel-collector:4317',
        })),
    ],
    instrumentations: [
        new WinstonInstrumentation(),
    ],
});
sdk.start();
process.on('SIGTERM', () => {
    sdk.shutdown().finally(() => process.exit(0));
});