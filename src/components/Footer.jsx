import React from 'react';
import textLogo from '../assets/white-text-logo.png';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-black text-white py-16">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-6xl mx-auto">
                {/* Social Icons */}
                <div className="flex flex-col items-start justify-start mb-8 md:mb-0">
                    <div className="flex space-x-8 text-sm">
                        <a href="#salons" className="hover:text-gray-400">SALONS</a>
                        <a href="#company" className="hover:text-gray-400">COMPANY</a>
                        <a href="#contact" className="hover:text-gray-400">CONTACT</a>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <FaFacebookF className="text-white cursor-pointer hover:text-gray-400" />
                        <FaInstagram className="text-white cursor-pointer hover:text-gray-400" />
                        <FaYoutube className="text-white cursor-pointer hover:text-gray-400" />
                        <FaTwitter className="text-white cursor-pointer hover:text-gray-400" />
                    </div>
                    <div className="flex items-center justify-start space-x-4 mt-8 text-xs">
                        <p className="text-gray-400">&copy; 2024 Coiffure Ho Chi Minh</p>
                        <a href="#terms" className="text-gray-400 hover:text-gray-500">Terms & Privacy</a>
                    </div>
                </div>

                {/*  Logo */}
                <div className="flex flex-col items-center text-center my-8 md:my-0 space-y-4">
                    <img src={textLogo} alt="Text Logo" className="w-48 h-auto" />
                </div>

                {/* Email Input */}
                <div className="flex flex-col items-end justify-end space-y-4 text-center md:text-right">
                    <div className="flex items-center border-b border-white mb-4">
                        <input
                            type="email"
                            placeholder="Enter email for news"
                            className="bg-black text-white placeholder-white outline-none py-2 px-2"
                        />
                        <button className="text-white ml-2">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Footer;
