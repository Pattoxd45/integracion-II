const cheerio = require('cheerio');
const axios = require('axios');

const scrapeNews = async () => {
  const { data } = await axios.get('URL_DE_TU_PAGINA'); // Reemplaza esto con la URL de la página que deseas scrapear
  const $ = cheerio.load(data);

  const newsItems = [];

  $('article.css-415ug').each((index, element) => {
    const title = $(element).find('h3.css-9f4rq').text();
    const summary = $(element).find('.css-p4BJO p').text();
    const link = $(element).find('a.css-kId4u').attr('href');
    const imageUrl = $(element).find('source').attr('srcset');

    newsItems.push({
      title,
      summary,
      imageUrl: `https:${imageUrl}`, // Asegúrate de agregar "https:" si falta
      link,
    });
  });

  return newsItems;
};

module.exports = scrapeNews;
