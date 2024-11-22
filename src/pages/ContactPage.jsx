import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch(
        "https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/submit-contact-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleBackToLanding = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-white"
      style={{ height: "82vh" }}
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white">
          {/* Title */}
          <h3 className="text-3xl font-bold mb-10 text-center font-serif">
            ASK US A QUESTION
          </h3>

          {/* Name Input */}
          <div className="mb-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 m-0"
              htmlFor="name"
            >
              NAME*
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              id="name"
              type="text"
              placeholder="Name*"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 m-0"
              htmlFor="email"
            >
              EMAIL*
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              id="email"
              type="email"
              placeholder="Email*"
              required
            />
          </div>

          {/* Message Input */}
          <div className="mb-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 m-0"
              htmlFor="message"
            >
              MESSAGE*
            </label>
            <textarea
              className="w-full border border-gray-400 p-2 h-32 "
              id="message"
              placeholder="Message*"
              required
            />
          </div>

          {/* Info Text */}
          <div className="flex items-center justify-center mb-6">
            <input type="checkbox" id="confirmInfo" className="mr-2" required />
            <label htmlFor="confirmInfo" className="text-xs text-gray-500">
              COIFFURE WILL RECEIVE AN EMAIL WITH YOUR MESSAGE
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              className="bg-black text-white w-full border-black border uppercase py-3 transform duration-300 
                            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black"
              type="submit"
            >
              SEND
            </button>
          </div>
        </form>
      ) : (
        <div
          className="flex flex-col justify-center items-center text-center p-8"
          style={{ height: "100%" }}
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-6xl mb-10"
          />
          <p className="text-2xl font-montserrat font-bold uppercase mb-10">
            Our stylist will respond soon. Thanks for your interest.
          </p>
          <button
            onClick={handleBackToLanding}
            className="px-5 py-3 font-montserrat font-bold italic bg-transparent border-2 border-black text-black hover:bg-black hover:text-white border-solid transform transition-all duration-300 ease-in-out"
          >
            BACK TO LANDING PAGE
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
