const axios = require('axios');
const cheerio = require('cheerio');

const fetchNews = async () => {
    try {
        const response = await axios.get('https://magic.wizards.com/es/news');
        const html = response.data;
        const $ = cheerio.load(html);

        const newsItems = [];

        $('article.css-415ug').each((index, element) => {
            const title = $(element).find('h3.css-9f4rq').text().trim();
            const link = $(element).find('a').attr('href');
            const summary = $(element).find('.css-p4BJO p').text().trim();

            if (title && link && summary) {
                newsItems.push({ title, link: `https://magic.wizards.com${link}`, summary });
                console.log('Found news item:', { title, link, summary });
            }
        });

        console.log(`Total news items scraped: ${newsItems.length}`);
        return newsItems;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

module.exports = fetchNews;
