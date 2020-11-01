import fetch from 'node-fetch';
import { Notifier } from './notifier';

type TelegramNotifierParameters = { botToken: string, chatId: string };

export function telegramNotifier({ botToken, chatId }: TelegramNotifierParameters): Notifier {
    return { 
        async notify(message: string): Promise<void> {
            const telegramSendUri = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
            fetch(telegramSendUri);
        }
    };
}