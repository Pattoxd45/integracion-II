const express = require('express');
const scrapeNews = require('./scrapeNews');
const scrapeEvents = require('./scrapeEvents'); // Importa la función para eventos
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const newsItems = await scrapeNews();
    res.json(newsItems);
  } catch (error) {
    console.error('Error fetching the news:', error.message);
    res.status(500).send('Error fetching the news');
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await scrapeEvents(); // Ejecuta la función scrapeEvents
    res.json(events);
  } catch (error) {
    console.error('Error fetching the events:', error.message);
    res.status(500).send('Error fetching the events');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
