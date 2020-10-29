import { fail } from 'assert';
import pino from 'pino';
import { telegramNotifier } from './telegram-notifier';

const logger = pino({name: 'default-logger', level: 'debug'});

logger.info('Sending a message');

const notifier = telegramNotifier({ 
    botToken: process.env.TELEGRAM_BOT_TOKEN ?? fail('Telegram bot token is not defined'),
    chatId: process.env.TELEGRAM_CHAT_ID ?? fail('Telegram chat id is not defined')
});

notifier.notify('this is a test');


