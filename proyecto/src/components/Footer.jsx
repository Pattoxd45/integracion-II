import React from "react";

const Footer = () => {
  return (
    <div className="mx-auto py-6 text-white bg-[#000]">
      <div className="max-w-[1240px] px-4 mx-auto grid lg:grid-cols-3 gap-8">
        <div>
          {/* Reemplaza el texto por el logo usando la URL */}
          <img
            src="https://images.ctfassets.net/s5n2t79q9icq/3dB5uyWzUH95O1ZPBNNUX5/6cff7c65a809285755ea24b164b6ac65/magic-logo.png"
            alt="Magic: The Gathering Logo"
            className="w-[150px] h-auto"
          />
          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, error
            consequuntur temporibus impedit et accusantium?
          </p>
        </div>
        <div className="lg:col-span-2 flex justify-between">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i}>
              <h6 className="font-[14px]">Sección {i + 1}</h6>
              <ul>
                {Array.from({ length: 4 }, (_, j) => (
                  <li key={j} className="py-2 text-sm hover:text-[#9DB4C0]">
                    Elemento {j + 1}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
