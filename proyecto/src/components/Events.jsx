import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const EventsCarousel = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/events")
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
    slidesToShow: 3, // Mostrar 3 eventos a la vez
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
            className="w-[calc(33.33%-1rem)] bg-[#000] rounded-lg overflow-hidden h-[200px] shadow-xl flex flex-col items-center justify-center mx-2 border border-black"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="mt-1">{event.date}</p>
              <p className="mt-1">{event.location}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventsCarousel;
