const axios = require('axios');
// npm install cheerio
const cheerio = require('cheerio');

async function scrapeNews() {
    const { data } = await axios.get('https://magic.wizards.com/es/news');
    const $ = cheerio.load(data);

    const articles = [];

    $('article.css-415ug').each((index, element) => {
        const title = $(element).find('h3.css-9f4rq').text();
        const description = $(element).find('div.css-p4BJO p').text();
        const imageUrl = $(element).find('picture source').attr('srcset');
        const authorName = $(element).find('a.css-Z5ZSx').text().trim();
        const authorImageUrl = $(element).find('span.css-wBsxp img').attr('src');
        const link = $(element).find('a[data-navigation-type="client-side"]').attr('href');

        articles.push({
            title,
            description,
            imageUrl,
            author: {
                name: authorName,
                imageUrl: authorImageUrl,
            },
            link: `https://magic.wizards.com${link}`
        });
    });

    return articles;
}

module.exports = scrapeNews;
