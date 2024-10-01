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

        articles.push({
            title,
            description,
            imageUrl,
        });
    });

    return articles;
}

module.exports = scrapeNews;