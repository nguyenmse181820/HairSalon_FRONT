import React, { useState, useEffect } from 'react';
import Banner from "../assets/ServiceBlog/service-thumb.png";
import { fetchServicesData } from '../utils/apiUtils';
import BangCut from "../assets/ServiceBlog/bang-cut.jpg";
import BlondeMullet from "../assets/ServiceBlog/blonde-mullet.jpg";
import LayeredCut from "../assets/ServiceBlog/layered-cut.jpg";
import RedCopper from "../assets/ServiceBlog/red-copper.jpg";
import SassyBob from "../assets/ServiceBlog/sassy-bob.jpg";
import ShagCut from "../assets/ServiceBlog/shag-cut.jpg";
import ShortPixie from "../assets/ServiceBlog/short-pixie.jpg";

const BlogService = () => {
  const Section = ({ title, description, extra }) => {
    return (
      <div className="flex justify-center pt-20 pb-20">
        <div className="flex flex-col items-center w-full">
          <div className="relative w-1/3">
            <p className="text-center font-extrabold uppercase text-3xl pb-3 tracking-wide">
              {title}
            </p>
            <span className="absolute right-0 top-0 text-gray-600 text-sm">
              {extra}
            </span>
          </div>
          <p className="w-1/3 text-lg font-montserrat text-center leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  };
  const ServiceDetailCard = ({image, title}) => {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <img
          src={image}
          alt={title}
          className="w-full h-[30rem] object-cover shadow-lg"
        />
        <h3 className="mt-6 text-2xl font-bold uppercase text-center">
          {title}
        </h3>
      </div>
    )
  };

  return (
    <div className=''>
      <div className="flex relative">
        <img src={Banner} alt="Service" className="w-full" />
        <div className="flex absolute inset-0 justify-center items-center">
          <p className="text-white font-montserrat text-6xl">HAIR AT COIFFURE</p>
        </div>
      </div>

      <div className='w-full flex justify-center pt-20 pb-20'>
        <p className='w-3/5 text-center text-xl font-light leading-relaxed'>
          At COIFFURE we've always believed in pushing the boundaries of creativity and offering our clients the best in hairstyling and fashion. HAIR AT COIFFURE is a manifestation of our commitment to innovation and excellence. We're not just updating hairstyles; we're transforming hairstyling into an electrifying art form. Our clients should be prepared to expect the extraordinary.
        </p>
      </div>
      <hr />

      <Section
        title="HAIRCUTS"
        description="Our team of talented stylists interpret the latest trends for women, men and children, adapting them to suit your individual style."
        extra="from $60"
      />
      <hr />
      <Section
        title="Dry Styling"
        description="Our blow-dry menu offers 10 timeless looks from glossy and sleek through to volumised and tousled, perfect for any occasion or just because!"
        extra="from $40"
      />
      <hr />
      <Section
        title="Hair Colour"
        description="We live, love and perfect colour. Let one of our award-winning technicians offer you a consultation today."
        extra="from $75"
      />
      <hr />
      <Section
        title="Hair Treatments"
        description="No matter your hair type or texture we have a treatment that will improve its health, condition, and shine. Book in for one today."
        extra="from $37"
      />
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
          <ServiceDetailCard
            image={BangCut}
            title="The Bang Cut"
          />
          <ServiceDetailCard
            image={ShortPixie}
            title="The Short Pixie Cut"
          />
          <ServiceDetailCard
            image={SassyBob}
            title="The Sassy Bob Cut"
          />
          <ServiceDetailCard
            image={RedCopper}
            title="The Red-Copper Cut"
          />
          <ServiceDetailCard
            image={LayeredCut}
            title="The Layered Cut"
          />
          <ServiceDetailCard
            image={BlondeMullet}
            title="The Blonde Mullet Cut"
          />
      </div>
      <div className='flex justify-center pb-20'>
        <a href="/booking/service">
          <button
            className="px-16 py-3 font-montserrat font-bold italic bg-transparent border-2
                         border-black text-black hover:bg-black hover:text-white border-solid
                         transform transition-all duration-300 ease-in-out"
          >
            BOOK NOW
          </button></a>
      </div>
    </div>
  );
};



export default BlogService;
