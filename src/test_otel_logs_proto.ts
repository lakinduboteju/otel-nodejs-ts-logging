// Reference: https://www.npmjs.com/package/@opentelemetry/exporter-logs-otlp-proto
import { logs } from "@opentelemetry/sdk-node";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-proto";
import { resourceFromAttributes } from '@opentelemetry/resources';

const collectorOptions = {
  url: 'otel-collector:4317', // url is optional and can be omitted - default is http://localhost:4318/v1/logs
  headers: {
  }, //an optional object containing custom headers to be sent with each request will only work with http
};

const logProvider = new logs.LoggerProvider({resource: resourceFromAttributes({'service.name': 'testApp'})});
const logExporter = new OTLPLogExporter(collectorOptions);
logProvider.addLogRecordProcessor(new logs.SimpleLogRecordProcessor(logExporter));

const logger = logProvider.getLogger('test_log_instrumentation');

logger.emit({ body: 'example-log' })