import React from "react";
import { useNavigate } from "react-router-dom";
import Image1AboutUs from "../assets/AboutUs/pic1_aboutUs.jpg";
import Image2AboutUs from "../assets/AboutUs/pic2_aboutUs.jpg";
import Image3AboutUs from "../assets/AboutUs/pic3_aboutUs.jpg";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBookingClick = (service) => {
    navigate("/booking/service", { state: { service } });
  };

  return (
    <div className="mt-10 mx-8 px-40">
      {/* Section Title */}
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl font-bold font-serif">OUR JOURNEY AT COIFFURE</h1>
      </div>

      {/* First Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <img className="lg:w-4/12 w-full h-auto mb-2 lg:mb-0" src={Image1AboutUs} alt="Salon Interior" />
        <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
          <h2 className="text-2xl font-bold mb-2">Our Story</h2>
          <p className="text-base mb-4 leading-tight">
            Founded in 2010, Coiffure began as a dream of creating a warm and welcoming space where clients could feel their best. Our team of stylists is committed to ongoing training and stays up-to-date on the latest trends, techniques, and products, ensuring each client leaves our salon looking and feeling amazing.
          </p>
        </div>
      </div>

      <hr className="border-black border-300 my-8 w-full mx-auto" />

      {/* Second Section */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center mb-12">
        <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
          <h2 className="text-2xl font-bold mb-2">Haircuts & Styling</h2>
          <p className="text-base mb-4 leading-tight">
            Our stylists are experts in crafting looks that fit each client’s unique style and personality. From timeless cuts to modern trends, we work with you to bring your vision to life. Relax in our comfortable setting and enjoy a transformative styling experience.
          </p>
          <button
            onClick={() => handleBookingClick("Haircuts & Styling")}
            className="bg-black text-white w-1/3 border-black border uppercase py-3 transform duration-300 
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black"
          >
            BOOK A CUT
          </button>
        </div>
        <img className="lg:w-4/12 w-full h-auto mb-2 lg:mb-0" src={Image2AboutUs} alt="Styling in Progress" />
      </div>

      <hr className="border-black border-300 my-8 w-full mx-auto" />

      {/* Third Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <img className="lg:w-4/12 w-full h-auto mb-2 lg:mb-0" src={Image3AboutUs} alt="Coloring Process" />
        <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
          <h2 className="text-2xl font-bold mb-2">Coloring & Highlights</h2>
          <p className="text-base mb-4 leading-tight">
            Looking to refresh your look or try something bold? Our color specialists use high-quality, nourishing products to create stunning color transformations. Get ready to turn heads with your new color!
          </p>
          <button
            onClick={() => handleBookingClick("Coloring & Highlights")}
            className="bg-black text-white w-1/3 border-black border uppercase py-3 transform duration-300 
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black"
          >
            BOOK COLOR
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
