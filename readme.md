# Scrapper notifier

This simple program monitorizes a web page for changes and send a message if page has changed within a css selector.

Done with [Puppeteer](https://github.com/puppeteer/puppeteer) as scrapping tool capable of handling dynamic web rendering.

## Environment

Some Environment variables are required. Create a .env file containing these environment variables:

- TELEGRAM_BOT_TOKEN: The token of your [Telegram bot](https://core.telegram.org/bots).
- TELEGRAM_CHAT_ID: The chat id where you want to send messages. Send a message from Telegram to your bot and go to https://api.telegram.org/bot[TELEGRAM_BOT_TOKEN]/getUpdates to get this.
- SCRAPE_URL: The url to monitor
- SCRAPE_SELECTOR: The selector (page fragment) to monitor

## Build and launch

You can just use `npm ci && npm start` if you want to run it locally. Otherwise a docker file has been included.

To build the image run:

```
docker build . -t scrapper-notifier
```

To run the image once built:

```
docker run scrapper-notifier
```
