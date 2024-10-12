const express = require('express');
const https = require('https');
const fs = require('fs');
const scrapeNews = require('./scrapeNews');
const scrapeEvents = require('./scrapeEvents');
const cors = require('cors');
const path = require('path');

const privateKey = fs.readFileSync('/home/nataly/servidor/private.key', 'utf8');
const certificate = fs.readFileSync('/home/nataly/servidor/certificate.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();
const port = 3001;

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
    const events = await scrapeEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching the events:', error.message);
    res.status(500).send('Error fetching the events');
  }
});

// Crear el servidor HTTPS
https.createServer(credentials, app).listen(port, () => {
  console.log(`Server is running on https://magicarduct.online:${port}`);
});
