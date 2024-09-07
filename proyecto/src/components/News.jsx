import React from "react";

const News = () => {
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 space-y-6 bg-[#E0FBFC]">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="flex bg-[#C2DFE3] rounded-lg overflow-hidden h-[152px] shadow-md">
          <div className="w-[320px] bg-[#9DB4C0]"></div>
          <div className="p-4 text-[#253237] flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Noticia {index + 1}</h2>
            <p className="mt-2 text-[#5C6B73]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
              quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Ver más...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
