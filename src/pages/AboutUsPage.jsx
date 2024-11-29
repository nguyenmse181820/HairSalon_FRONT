import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image1AboutUs from "../assets/AboutUs/pic1_aboutUs.jpg";
import Image2AboutUs from "../assets/AboutUs/pic2_aboutUs.jpg";
import Image3AboutUs from "../assets/AboutUs/pic3_aboutUs.jpg";
import axios from "axios";
import Aos from "aos";
import StarRate from "./StarRate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../css/slider.css'

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBookingClick = (service) => {
    navigate("/booking/service", { state: { service } });
  };

  const [rating, setRating] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [review, setReview] = useState(0);


  useEffect(() => {
    axios
      .get("https://673a9c49339a4ce445188ccb.mockapi.io/project/rating-review")
      .then((response) => {
        setRating(response.data);
        if (response.data.length > 0) {
          let totalRating = 0;
          let totalReviews = 0;
          response.data.forEach((item) => {
            totalRating += item.star;
            totalReviews += 1;
          });
          setAvgRating(totalRating / response.data.length);
          setReview(totalReviews);

        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);


  // Initialize AOS
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration in ms
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation should happen only once
    });
  }, []);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4, responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  };

  return (
    <div className="mb-20">
      <div className="mt-10 mx-8 px-3 sm:px-10 lg:px-40">
        {/* Section Title */}
        <div className="flex justify-center mb-10" data-aos="fade-down">
          <h1 className="text-3xl font-bold font-serif">
            OUR JOURNEY AT COIFFURE
          </h1>
        </div>

        {/* First Section */}
        <div
          className="flex flex-col lg:flex-row justify-between items-center mb-12"
          data-aos="fade-right"
        >
          <img
            className="lg:w-4/12 w-full h-auto mb-2 lg:mb-0"
            src={Image1AboutUs}
            alt="Salon Interior"
          />
          <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
            <h2 className="text-2xl font-bold mb-2">Our Story</h2>
            <p className="text-base mb-4 leading-tight">
              Founded in 2010, Coiffure began as a dream of creating a warm and
              welcoming space where clients could feel their best. Our team of
              stylists is committed to ongoing training and stays up-to-date on
              the latest trends, techniques, and products, ensuring each client
              leaves our salon looking and feeling amazing.
            </p>
          </div>
        </div>

        <hr className="border-black border-300 my-8 w-full mx-auto" />

        {/* Second Section */}
        <div
          className="flex flex-col-reverse lg:flex-row justify-between items-center mb-12"
          data-aos="fade-left"
        >
          <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
            <h2 className="text-2xl font-bold mb-2">Haircuts & Styling</h2>
            <p className="text-base mb-4 leading-tight">
              Our stylists are experts in crafting looks that fit each client’s
              unique style and personality. From timeless cuts to modern trends,
              we work with you to bring your vision to life. Relax in our
              comfortable setting and enjoy a transformative styling experience.
            </p>
            <button
              onClick={() => handleBookingClick("Haircuts & Styling")}
              className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-all"
            >
              BOOK A CUT
            </button>
          </div>
          <img
            className="lg:w-4/12 w-full h-auto mb-2 lg:mb-0"
            src={Image2AboutUs}
            alt="Styling in Progress"
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
            alt="Coloring Process"
          />
          <div className="lg:w-6/12 w-full lg:text-left text-center px-2">
            <h2 className="text-2xl font-bold mb-2">Coloring & Highlights</h2>
            <p className="text-base mb-4 leading-tight">
              Looking to refresh your look or try something bold? Our color
              specialists use high-quality, nourishing products to create
              stunning color transformations. Get ready to turn heads with your
              new color!
            </p>
            <button
              onClick={() => handleBookingClick("Coloring & Highlights")}
              className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-all"
            >
              BOOK COLOR
            </button>
          </div>
        </div>

        <hr className="border-black border-300 my-8 w-full mx-auto" />
        {/* Fourth Section, Rating & Reviews */}
        <div className="" data-aos="fade-left">
          <h2 className="text-2xl font-bold lg:text-left text-center">Rating & Reviews</h2>
          <div className="flex xs:flex-row flex-col gap-2 mt-10 justify-center lg:justify-start">
            <p className="text-center">Coiffure-Hair Salon:</p>
            <div className="flex  justify-center items-center gap-2">
              <p className="text-sm ml-2">{avgRating} </p>
              <StarRate star={avgRating} />
            </div>
            <p className="text-sm text-gray-500 text-center italic">({review} reviews)</p>
          </div>
          <div className="w-full mb-10 slider-container">
            <Slider {...settings} className="">
              {rating.map((item) => {
                return (
                  <div key={item.id} className="border rounded-md my-10 p-4 shadow-sm hover:shadow-lg h-[250px] hover:scale-110 transition-all">
                    <div className="flex gap-2 mb-4 h-16">
                      <img className="w-10 h-10 rounded-full" src={item.avatar} alt="" />
                      <div className="">
                        <h3>{item.name}</h3>
                        <p className="text-xs text-gray-500 italic">{new Date(item.date).toDateString()}</p>
                      </div>
                    </div>
                    <StarRate star={item.star} />
                    <p className="hover:overflow-y-auto overflow-y-hidden h-[120px] my-2">{item.review}</p>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
        <hr className="border-black border-300 my-8 w-full mx-auto" />
        {/* Fifth Section, our location */}
        <div className="" data-aos="fade-right">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Our Location</h2>
          <div className="flex flex-col sm:flex-row gap-10 items-center ">
            <div className="w-full sm:w-2/3 h-[350px] sm:h-[450px]">
              <iframe className="w-full h-full" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=L%C3%B4%20E2a-7,%20%C4%90%C6%B0%E1%BB%9Dng%20D1%20Khu%20C%C3%B4ng%20ngh%E1%BB%87%20cao,%20P.%20Long%20Th%E1%BA%A1nh%20M%E1%BB%B9,%20TP.%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c,%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh+(Coiffure-Hair%20Salon%20)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>
            </div>
            <div className="w-2/3 sm:w-1/3 text-center sm:text-left">
              <h3 className="text-lg font-bold">Address</h3>
              <p className="text-sm text-gray-500 italic mb-2">Lo E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh</p>
              <h3 className="text-lg font-bold">Phone</h3>
              <p className="text-sm text-gray-500 italic mb-2">0123456789</p>
              <h3 className="text-lg font-bold">Email</h3>
              <p className="text-sm text-gray-500 italic mb-2">coiffure@example.com</p>
              <h3 className="text-lg font-bold">Opening Hours</h3>
              <p className="text-sm text-gray-500 italic mb-2">Monday to Friday: 9:00 AM to 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
