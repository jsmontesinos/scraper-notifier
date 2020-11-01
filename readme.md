# Scrapper notifier

This is a simple project that allows to monitor for changes in a web page and send a message if page has changed withing a css selector.

Done with [Puppeteer](https://github.com/puppeteer/puppeteer) for the scrapping which allow dynamic web rendering.

## Parameters

To run this you will need to add a .env file having this environment variables defined:

- TELEGRAM_BOT_TOKEN: The token of your [Telegram bot](https://core.telegram.org/bots).
- TELEGRAM_CHAT_ID: The chat id where you want to send messages. Send a message to your bot and go to https://api.telegram.org/bot[TELEGRAM_BOT_TOKEN]/getUpdates to get this.
- SCRAPE_URL: The url to monitor
- SCRAPE_SELECTOR: The selector (page fragment) to monitor

## Build and launch

You can just use `npm ci && npm start` if you want to run it locally. Otherwise a docker file has been included.

To build the image run:

```
docker build . -t scrapper-notifier
```

To run the image once builded:

```
docker run scrapper-notifier
```