import { fail } from 'assert';
import pino from 'pino';
import { scrape } from './scrapper';
import * as crypto from 'crypto';
import { telegramNotifier } from './telegram-notifier';

const logger = pino({name: 'default-logger', level: 'debug'});

const notifier = telegramNotifier({ 
    botToken: process.env.TELEGRAM_BOT_TOKEN ?? fail('Telegram bot token is not defined'),
    chatId: process.env.TELEGRAM_CHAT_ID ?? fail('Telegram chat id is not defined')
});

const scrapeUrl = process.env.SCRAPE_URL ?? fail('Scrape url is not defined');
const scrapeSelector = process.env.SCRAPE_SELECTOR ?? fail('Scrape selector is not defined');

process.on('SIGINT', function() {
    logger.info('Exiting process');
    process.exit();
});

async function getHashFromScrape(): Promise<string> {
    const result = await scrape({
        url: scrapeUrl,
        selector: scrapeSelector
    });

    return crypto.createHash('sha256').update(result.content).digest('base64');
}

async function mainLoop(referenceHash: string): Promise<string> {
    const hash = await getHashFromScrape();

    logger.info('Scrapping done', [ scrapeUrl, scrapeSelector ]);

    if (hash !== referenceHash) {
        logger.info('Page has changed');
        notifier.notify(`The page ${scrapeUrl} has changed!. New hash is ${hash}`);
        process.exit(0);
    }
    
    return hash;
}

logger.info('Scrapping started', [ scrapeUrl, scrapeSelector ]);
(async () => {
    const repeatInterval = 60 * 1000;
    const referenceHash = await getHashFromScrape();
    const initialMessage = `Scrapping ${scrapeUrl}, within selector: ${scrapeSelector}. Current hash is ${referenceHash}`;
    logger.info(initialMessage);
    notifier.notify(initialMessage);
    setInterval( async () => await mainLoop(referenceHash), repeatInterval);
})();