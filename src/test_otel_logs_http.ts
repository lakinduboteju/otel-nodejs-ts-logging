// Reference: https://www.npmjs.com/package/@opentelemetry/exporter-logs-otlp-http
import {
    logs,
} from '@opentelemetry/sdk-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';

// exporter options. see all options in OTLPExporterNodeConfigBase
const collectorOptions = {
    url: 'http://otel-collector:4318', // url is optional and can be omitted - default is http://localhost:4318/v1/logs
    concurrencyLimit: 1, // an optional limit on pending requests
};
const logExporter = new OTLPLogExporter(collectorOptions);
const loggerProvider = new logs.LoggerProvider();

loggerProvider.addLogRecordProcessor(new logs.BatchLogRecordProcessor(logExporter));

const logger = loggerProvider.getLogger('default', '1.0.0');
// Emit a log
logger.emit({
    severityText: 'info',
    body: 'this is a log body',
    attributes: { 'log.type': 'custom' },
});