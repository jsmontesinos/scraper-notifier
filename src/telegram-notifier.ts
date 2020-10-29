import fetch from 'node-fetch';
import { Notifier } from './notifier';

export function telegramNotifier({botToken, chatId}: { botToken: string, chatId: string }): Notifier {
    return { 
        async notify(message: string): Promise<void> {
            const telegramSendUri = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
            fetch(telegramSendUri);
        }
    };
}