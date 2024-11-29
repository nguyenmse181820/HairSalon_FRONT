import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";


const StylistDetailModal = ({ isOpen, stylist, onClose }) => {
    if (!isOpen || !stylist) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md p-6">
                <h2 className="text-center text-xl font-bold mb-8">INFORMATION</h2>
                <div className="space-y-4 ">
                    <div>
                        <span className="font-semibold">STYLIST NAME:</span>{" "}
                        <span className="ml-8 font-semilight">{stylist.name}</span>
                    </div>
                    <div>
                        <span className="font-semibold">EMAIL:</span>{" "}
                        <span className="ml-8 font-semilight">{stylist.email}</span>
                    </div>
                    <div>
                        <span className="font-semibold">PHONE:</span>{" "}
                        <span className="ml-8 font-semilight">{stylist.phone}</span>
                    </div>
                    <div>
                        <span className="font-semibold">BIRTHDAY:</span>{" "}
                        <span className="ml-8 font-semilight">{stylist.birthday}</span>
                    </div>
                    <div>
                        <span className="font-semibold">EXPERIENCE:</span>{" "}
                        <span className="ml-8 font-semilight">{stylist.experience} years</span>
                    </div>
                    <div>
                        <span className="font-semibold">REVIEWS:</span>{" "}
                        <span className="ml-8 font-semilight">
                            {Array.from({ length: 5 }, (_, index) => {
                                const starRating = stylist.rating - index;
                                if (starRating >= 1) {
                                    return (
                                        <FontAwesomeIcon
                                            key={index}
                                            icon={faStar}
                                            className="text-yellow-500"
                                        />
                                    );
                                } else if (starRating > 0) {
                                    return (
                                        <FontAwesomeIcon
                                            key={index}
                                            icon={faStarHalfAlt}
                                            className="text-yellow-500"
                                        />
                                    );
                                } else {
                                    return (
                                        <FontAwesomeIcon
                                            key={index}
                                            icon={["far", "star"]}
                                            className="text-gray-300"
                                        />
                                    );
                                }
                            })}{" "}
                            ({stylist.review} reviews)
                        </span>
                    </div>

                    <div>
                        <span className="font-semibold">SPECIALITY: </span>
                        {Array.isArray(stylist.specialty) ? (
                            <ul className="list-disc ml-4 ">
                                {stylist.specialty.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <span className="ml-8 font-semilight" >{stylist.specialty || "No specialties listed"}</span>
                        )}
                    </div>
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={onClose}
                        className="bg-red-700 text-white border border-red-700 uppercase py-2 px-4 transform duration-300 ease-in-out 
               hover:bg-transparent hover:text-red-700 hover:border-red-700 active:scale-95"
                    >
                        CANCEL
                    </button>

                    <button
                        className="bg-black text-white border border-black uppercase py-2 px-4  transform duration-300 ease-in-out 
                   hover:bg-transparent hover:text-black active:scale-95"
                    >
                        BOOK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StylistDetailModal;
