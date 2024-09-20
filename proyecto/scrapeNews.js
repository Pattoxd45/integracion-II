const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNews() {
    const { data } = await axios.get('https://magic.wizards.com/es/news');
    const $ = cheerio.load(data);

    const articles = [];

    $('article.css-415ug').each((index, element) => {
        const title = $(element).find('h3.css-9f4rq').text();
        const description = $(element).find('div.css-p4BJO p').text();
        const imageUrl = $(element).find('picture source').attr('srcset'); // Obtener la URL de la imagen de <source>
        
        // Verificar si no existe la imagen en <source>, buscar en <img>
        const fallbackImageUrl = $(element).find('picture img').attr('src');
        const finalImageUrl = imageUrl || fallbackImageUrl; // Si no encuentra <source>, usar <img>

        articles.push({
            title,
            description,
            imageUrl: finalImageUrl, // Usar la URL final de la imagen
        });
    });

    return articles;
}

scrapeNews().then(articles => {
    console.log(articles);
}).catch(err => {
    console.error(err);
});
