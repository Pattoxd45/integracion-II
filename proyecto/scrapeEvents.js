const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeEvents() {
    const { data } = await axios.get('https://magic.wizards.com/es/news'); // Cambia esta URL si es necesario
    const $ = cheerio.load(data);

    const events = [];

    $('article.css-415ug').each((index, element) => {
        const title = $(element).find('h3.css-9f4rq').text().trim();
        const description = $(element).find('div.css-p4BJO p').text().trim();
        const imageUrl = $(element).find('picture source').attr('srcset');
        const authorName = $(element).find('.css-Z5ZSx').text().trim();
        const authorImageUrl = $(element).find('.css-l31Oj img').attr('src');
        const category = $(element).find('.css-6ZZbL a').text().trim();
        const date = $(element).find('.date-selector').text().trim(); // Ajusta el selector según la estructura HTML
        const location = $(element).find('.location-selector').text().trim(); // Ajusta el selector según la estructura HTML

        events.push({
            title,
            description,
            imageUrl: imageUrl ? `https:${imageUrl}` : null, // Añadir el prefijo https si existe
            author: authorName,
            authorImageUrl: authorImageUrl ? `https:${authorImageUrl}` : null, // Añadir el prefijo https si existe
            category,
            date,
            location,
        });
    });

    console.log(events);
    return events;
}

module.exports = scrapeEvents;
