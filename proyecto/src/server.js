const express = require('express');
const scrapeNews = require('./scrapeNews');
const scrapeEvents = require('./scrapeEvents');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

// Ruta para obtener noticias
app.get('/api/news', async (req, res) => {
  try {
    const newsItems = await scrapeNews();
    res.json(newsItems);
  } catch (error) {
    console.error('Error fetching the news:', error.message);
    res.status(500).send('Error fetching the news');
  }
});

// Ruta para obtener eventos
app.get('/api/events', async (req, res) => {
  try {
    const events = await scrapeEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching the events:', error.message);
    res.status(500).send('Error fetching the events');
  }
});

// Cualquier otra ruta redirige al archivo index.html para manejar rutas en el frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve('../build/index.html'));
});

// Modificación para escuchar en todas las interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://186.64.122.218:${port}`);
});
