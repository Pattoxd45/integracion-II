const express = require('express');
const scrapeNews = require('./scrapeNews');
const scrapeEvents = require('./scrapeEvents');
const cors = require('cors');

const app = express();
// Usar el puerto proporcionado por el entorno
const port = process.env.PORT || 22222; // Debería usar solo un puerto

app.use(cors());

// Ruta para obtener las noticias
app.get('/api/news', async (req, res) => {
  try {
    const newsItems = await scrapeNews();
    res.json(newsItems);
  } catch (error) {
    console.error('Error fetching the news:', error.message);
    res.status(500).send('Error fetching the news');
  }
});

// Ruta para obtener los eventos
app.get('/api/events', async (req, res) => {
  try {
    const events = await scrapeEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching the events:', error.message);
    res.status(500).send('Error fetching the events');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
