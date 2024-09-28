const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNews() {
    const { data } = await axios.get('https://magic.wizards.com/es/news');
    const $ = cheerio.load(data);

    const articles = [];

    $('article.css-415ug').each((index, element) => {
        const title = $(element).find('h3.css-9f4rq').text().trim();
        const description = $(element).find('div.css-p4BJO p').text().trim();
        const imageUrl = $(element).find('picture source').attr('srcset');
        const authorName = $(element).find('.css-Z5ZSx').text().trim();
        const authorImageUrl = $(element).find('.css-l31Oj img').attr('src');
        const category = $(element).find('.css-6ZZbL a').text().trim();

        articles.push({
            title,
            description,
            imageUrl: imageUrl ? `https:${imageUrl}` : null, // Añadir el prefijo https si existe
            author: authorName,
            authorImageUrl: authorImageUrl ? `https:${authorImageUrl}` : null, // Añadir el prefijo https si existe
            category,
        });
    });

    console.log(articles)
    return articles;
}

module.exports = scrapeNews;
