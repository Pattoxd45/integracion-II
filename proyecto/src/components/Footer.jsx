import React from "react";

const Footer = () => {
  return (
    <div className="mx-auto py-14 text-white bg-[#253237]">
      <div className="max-w-[1240px] px-4 mx-auto grid lg:grid-cols-3 gap-8">
        <div>
          <h1 className="w-full text-3xl font-bold">Magic: The Gathering</h1>
          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, error
            consequuntur temporibus impedit et accusantium?
          </p>
        </div>
        <div className="lg:col-span-2 flex justify-between mt-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i}>
              <h6 className="font-medium">Sección {i + 1}</h6>
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
