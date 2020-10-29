import pino from 'pino';

const logger = pino({name: 'default-logger', level: 'debug'});

logger.info('Test');

