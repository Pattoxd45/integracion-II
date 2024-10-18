const express = require('express');
const scrapeNews = require('./src/scrapeNews');
const scrapeEvents = require('./src/scrapeEvents');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3003 ;

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

// Ruta para obtener noticias
app.get('/api/noticias', async (req, res) => {
  try {
    const newsItems = await scrapeNoticias(); // Usamos scrapeNoticias aquí
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Establecer el tipo de contenido
    res.json(newsItems);
  } catch (error) {
    console.error('Error fetching news from Noticias:', error.message);
    res.status(500).send('Error fetching the news');
  }
});

// Cualquier otra ruta redirige al archivo index.html para manejar rutas en el frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve('../build/index.html'));
});

