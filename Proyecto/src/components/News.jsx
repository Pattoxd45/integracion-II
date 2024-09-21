import React from "react";

const News = () => {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6 my-6 text-white">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="flex bg-[#000] rounded-lg overflow-hidden h-[152px] shadow-xl">
          <div className="max-w-[320px] min-w-[180px] bg-[#E83411]"></div>
          <div className="p-4 flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Noticia {index + 1}</h2>
            <p className="mt-2 line-clamp-2 sm:line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
              quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
            </p>
            <p className="text-[#b8b8b8] cursor-pointer hover:opacity-70 mt-1">
              Ver más...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
