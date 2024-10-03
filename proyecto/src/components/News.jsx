import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

const News = () => {
  const [articles, setArticles] = useState([]);

  // Fetch news articles when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/scrapeNews'); // Llama a la ruta del servidor que ejecuta scrapeNews.js
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching the news articles:", error);
      }
    };

    fetchNews();
  }, []);

  // Configuración del carrusel (manteniendo el formato existente)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <h2>Latest News</h2>
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index} className="news-item">
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
            <div className="news-image">
              <img src={article.imageUrl} alt={article.title} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default News;
