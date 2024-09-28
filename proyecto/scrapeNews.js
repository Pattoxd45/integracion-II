const puppeteer = require('puppeteer');

async function scrapeNews() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://magic.wizards.com/es/news');

    const articles = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('article.css-415ug'));
        return items.map(item => ({
            title: item.querySelector('h3.css-9f4rq')?.innerText.trim(),
            description: item.querySelector('div.css-p4BJO p')?.innerText.trim(),
            imageUrl: item.querySelector('picture source')?.getAttribute('srcset'),
            author: item.querySelector('.css-Z5ZSx')?.innerText.trim(),
            authorImage: item.querySelector('.css-l31Oj img')?.getAttribute('src'),
            category: item.querySelector('.css-6ZZbL a')?.innerText.trim(),
        }));
    });

    await browser.close();
    return articles;
}

module.exports = scrapeNews;
