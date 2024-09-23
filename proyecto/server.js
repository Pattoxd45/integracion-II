const express = require('express');
const scrapeNews = require('./scrapeNews');
const scrapeEvents = require('./scrapeEvents');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
