// Reference: https://www.npmjs.com/package/@opentelemetry/exporter-logs-otlp-grpc
import {
    logs,
} from '@opentelemetry/sdk-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';

const collectorOptions = {
    // url is optional and can be omitted - default is http://localhost:4317
    // Unix domain sockets are also supported: 'unix:///path/to/socket.sock'
    url: 'otel-collector:4317',
};

const loggerExporter = new OTLPLogExporter(collectorOptions);
const loggerProvider = new logs.LoggerProvider();

loggerProvider.addLogRecordProcessor(
    new logs.BatchLogRecordProcessor(loggerExporter)
);

['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => loggerProvider.shutdown().catch(console.error));
});

// logging
const logger = loggerProvider.getLogger('example-logger');
logger.emit({ body: 'example-log' })
