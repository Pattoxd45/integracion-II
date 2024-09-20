const express = require('express');
const scrapeNews = require('./scrapeNews'); // Importa desde la carpeta actual
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const newsItems = await scrapeNews(); // Ejecuta la función scrapeNews
    res.json(newsItems);
  } catch (error) {
    console.error('Error fetching the news:', error);
    res.status(500).send('Error fetching the news');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
