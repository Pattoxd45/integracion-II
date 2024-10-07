import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://186.64.122.218:3001/api/events") 
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-[1200px] mx-auto my-6 text-white">
      <Slider {...settings}>
        {events.map((event, index) => (
          <div 
            key={index} 
            className="relative w-[calc(33.33%-1rem)] bg-black overflow-hidden h-[200px] shadow-xl flex flex-col items-center justify-center mx-2 border border-black"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orange-500 to-transparent pointer-events-none"></div>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="mt-1">{event.date}</p>
              <p className="mt-1">{event.location}</p>
              <a 
                href={event.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-2 px-4 py-2 bg-orange-500 text-black rounded"
              >
                Más información
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Events;
