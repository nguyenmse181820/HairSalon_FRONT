
import React, { useEffect } from "react";
import Image1AboutUs from "../assets/AboutUs/pic1_aboutUs.jpg";
import Image2AboutUs from "../assets/AboutUs/pic2_aboutUs.jpg";
import Image3AboutUs from "../assets/AboutUs/pic3_aboutUs.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a 1s animation duration
  }, []);

  return (
    <div className="mt-10 mx-8 px-40">
      {/* Section Title */}
      <div className="flex justify-center mb-10" data-aos="fade-up">
        <h1 className="text-3xl font-bold font-serif">OUR STORY</h1>
      </div>

      {/* First Section */}
      <div
        className="flex flex-col lg:flex-row justify-between items-center mb-12"
        data-aos="fade-right"
      >
        <img
          className="lg:w-4/12 w-full h-auto mb-2 lg:mb-0"
          src={Image1AboutUs}
          alt="Salon Image 1"
        />
        <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
          <h2 className="text-2xl font-bold mb-2">Hair Styling</h2>
          <p className="text-base mb-4 leading-tight">
            Whether you're looking for a fresh new look or a classic cut, our
            expert stylists are here to bring your vision to life. From
            precision cuts to glamorous blowouts, we craft styles that
            complement your unique features. Our salon uses the finest products
            to ensure your hair looks and feels healthy, shiny, and beautiful.
            Treat yourself to a luxurious styling experience that's all about
            you.
          </p>
          <button className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-all">
            BOOK
          </button>
        </div>
      </div>

      <hr className="border-black border-300 my-8 w-full mx-auto" />

      {/* Second Section */}
      <div
        className="flex flex-col-reverse lg:flex-row justify-between items-center mb-12"
        data-aos="fade-left"
      >
        <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
          <h2 className="text-2xl font-bold mb-2">Hair Styling</h2>
          <p className="text-base mb-4 leading-tight">
            Whether you're looking for a fresh new look or a classic cut, our
            expert stylists are here to bring your vision to life. From
            precision cuts to glamorous blowouts, we craft styles that
            complement your unique features. Our salon uses the finest products
            to ensure your hair looks and feels healthy, shiny, and beautiful.
            Treat yourself to a luxurious styling experience that's all about
            you.
          </p>
          <button className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-all">
            BOOK
          </button>
        </div>

        <img
          className="lg:w-4/12 w-full h-auto mb-2 lg:mb-0"
          src={Image2AboutUs}
          alt="Salon Image 2"
        />
      </div>

      <hr className="border-black border-300 my-8 w-full mx-auto" />

      {/* Third Section */}
      <div
        className="flex flex-col lg:flex-row justify-between items-center mb-12"
        data-aos="fade-right"
      >
        <img
          className="lg:w-4/12 w-full h-auto mb-2 lg:mb-0"
          src={Image3AboutUs}
          alt="Salon Image 3"
        />
        <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
          <h2 className="text-2xl font-bold mb-2">Hair Styling</h2>
          <p className="text-base mb-4 leading-tight">
            Whether you're looking for a fresh new look or a classic cut, our
            expert stylists are here to bring your vision to life. From
            precision cuts to glamorous blowouts, we craft styles that
            complement your unique features. Our salon uses the finest products
            to ensure your hair looks and feels healthy, shiny, and beautiful.
            Treat yourself to a luxurious styling experience that's all about
            you.
          </p>
          <button className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-all">
            BOOK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
