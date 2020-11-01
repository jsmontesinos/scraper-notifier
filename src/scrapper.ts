import { launch as launchPuppeteer } from 'puppeteer';

type ScrapeParameters = { url: string, selector: string }
type ScrappingResult = {
    content: string;
}

export async function scrape({ url, selector }: ScrapeParameters): Promise<ScrappingResult> {
    const browser = await launchPuppeteer({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(selector);
    const content = await page.$$eval(selector, contents => contents[0].outerHTML);

    return {
        content: content.toString()
    };
}