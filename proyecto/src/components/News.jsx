import React from "react";

const News = () => {
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 space-y-6">
      <div className="flex bg-[#2e2e2e] rounded-lg overflow-hidden h-[152px]">
        <div className="w-[320px] bg-gray-400"></div>
        <div className="p-4 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Noticia 1</h2>
          <p className="mt-2 text-[#9b9b9b]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Ver más...
          </p>
        </div>
      </div>

      <div className="flex bg-[#2e2e2e] rounded-lg overflow-hidden h-[152px]">
        <div className="w-[320px] bg-gray-400"></div>
        <div className="p-4 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Noticia 2</h2>
          <p className="mt-2 text-[#9b9b9b]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Ver más...
          </p>
        </div>
      </div>

      <div className="flex bg-[#2e2e2e] rounded-lg overflow-hidden h-[152px]">
        <div className="w-[320px] bg-gray-400"></div>
        <div className="p-4 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Noticia 3</h2>
          <p className="mt-2 text-[#9b9b9b]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Ver más...
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
