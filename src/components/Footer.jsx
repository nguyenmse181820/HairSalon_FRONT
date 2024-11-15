import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import textLogo from '../assets/white-text-logo.png';

const Footer = () => {
    return (
        <div className="bg-white text-black py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                {/* Left Section: Newsletter and Social Media */}
                <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center space-x-2 mb-4">
                        <input
                            type="email"
                            placeholder="Enter email for news"
                            className="border-b border-black focus:outline-none"
                        />
                        <button className="text-black text-xl">→</button>
                    </div>
                    <div className="flex space-x-4 text-2xl">
                        <FaFacebookF />
                        <FaInstagram />
                        <FaYoutube />
                        <FaTwitter />
                    </div>
                </div>

                {/* Middle Section: Logo */}
                <div className="my-8 lg:my-0">
                    <img
                        src={textLogo}
                        alt="Coiffure Logo"
                        className="w-40 h-auto object-contain mx-auto"
                    />
                </div>

                {/* Right Section: Links */}
                <div className="flex flex-col items-center lg:items-end space-y-4">
                    <div className="flex space-x-8 text-xl font-semibold">
                        <a href="#">SALONS</a>
                        <a href="#">COMPANY</a>
                        <a href="#">CONTACT</a>
                    </div>
                    <p className="text-sm">2024 Coiffure Ho Chi Minh</p>
                    <a href="#" className="text-sm">Terms & Privacy</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
