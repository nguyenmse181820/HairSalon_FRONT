import React, { useState } from 'react';

export default function FeedbackPage() {
    const [rating, setRating] = useState(0);
    const [stylistName, setStylistName] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');
    const [contactPermission, setContactPermission] = useState(false);

    return (
        <div className="flex flex-col items-center justify-start pt-6 pb-16 bg-white-4">
            <div className="w-full max-w-md bg-white mt-[-8]">
                <h1 className="text-center text-2xl font-bold mb-4">LOGO</h1>
                <h2 className="text-center text-xl font-semibold mb-6">TELL US WHAT YOU THINK!</h2>

                <div className="flex items-center justify-start mb-4">
                    <span className="mr-2 text-gray-600 font-light">RATE OUR SERVICE</span>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-2xl ${star <= rating ? 'text-black' : 'text-gray-300'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="NAME OF STYLIST*"
                        value={stylistName}
                        onChange={(e) => setStylistName(e.target.value)}
                        className="w-1/2 p-2 border border-gray-300 text-sm"
                    />
                    <input
                        type="text"
                        placeholder="YOUR CHOSEN SERVICE*"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-1/2 p-2 border border-gray-300 text-sm"
                    />
                </div>

                <textarea
                    placeholder="MESSAGE*"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 h-32 mb-4 text-sm resize-none"
                />

                <div className="flex items-center justify-center mb-4">
                    <input
                        type="checkbox"
                        checked={contactPermission}
                        onChange={() => setContactPermission(!contactPermission)}
                        className="mr-2"
                    />
                    <span className="text-sm text-gray-600">I MAY BE CONTACTED ABOUT THIS FEEDBACK</span>
                </div>

                <div className="flex justify-center">
                    <button className="w-1/2 bg-black text-white py-2 text-center font-semibold">
                        SEND
                    </button>
                </div>

            </div>
        </div>
    );
}
