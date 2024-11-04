import React from 'react';

const ContactPage = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-white mt-0">
            <form className="w-full max-w-md bg-white">

                {/* Title */}
                <h3 className="text-xl font-bold mt-0 mb-8 text-center">
                    ASK STYLIST A QUESTION
                </h3>

                {/* Name Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 m-0" htmlFor="name">
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 m-0" htmlFor="email">
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
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 m-0" htmlFor="message">
                        MESSAGE*
                    </label>
                    <textarea
                        className="w-full border border-gray-400 p-2 h-32"
                        id="message"
                        placeholder="Message*"
                        required
                    />
                </div>

                {/* Info Text */}
                <div className="flex items-center justify-center mb-6">
                    <input
                        type="checkbox"
                        id="confirmInfo"
                        className="mr-2"
                        required
                    />
                    <label htmlFor="confirmInfo" className="text-xs text-gray-500">
                        COIFFURE WILL RECEIVE AN EMAIL WITH YOUR MESSAGE
                    </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center py-10">
                    <button
                        className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-all"
                        type="submit"
                    >
                        SEND
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;
