import React from "react";

const Footer = () => {
  return (
    <div className="mx-auto py-14 grid lg:grid-cols-3 gap-8 text-[#ddd] bg-[#1a1a1a]">
      <div className="max-w-[1240px] px-4 mx-auto">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#ddd]">Magic: The Gathering</h1>
          <p className="py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, error consequuntur temporibus impedit et accusantium?</p>
        </div>
        <div className="lg:col-span-3 flex justify-between">
          <div>
            <h6 className="font-medium text-[#ddd]">Solutions</h6>
            <ul>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-[#ddd]">Solutions</h6>
            <ul>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-[#ddd]">Solutions</h6>
            <ul>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
              <li className="py-2 text-sm">test</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;