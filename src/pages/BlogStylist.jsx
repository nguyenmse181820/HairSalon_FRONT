import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import AdvancedSearchModal from "../components/modal/AdvancedSearchModal";
import StylistDetailModal from "../components/modal/StylistDetailModal";

const BlogStylist = () => {
    const [stylistData, setStylistData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const defaultFilters = {
        searchTerm: "",
        rating: 0,
        minReviews: 0,
        minExperience: 0,
    };
    const [filters, setFilters] = useState(defaultFilters);
    const [tempFilters, setTempFilters] = useState(defaultFilters);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);


    const [selectedStylist, setSelectedStylist] = useState(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);

    useEffect(() => {
        const fetchStylists = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://674522dab4e2e04abea4d264.mockapi.io/stylist/StylistData"
                );

                const data = await response.json();
                setStylistData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStylists();
    }, []);

    const filteredStylists = stylistData
        .filter((stylist) =>
            stylist?.name?.toLowerCase().includes(filters.searchTerm.toLowerCase() || "")
        )
        .filter((stylist) => parseFloat(stylist?.rating || 0) >= (filters.rating || 0))
        .filter((stylist) => parseInt(stylist?.reviews || "0", 10) >= (filters.minReviews || 0))
        .filter((stylist) => parseInt(stylist?.experience || "0", 10) >= (filters.minExperience || 0))
        .sort((a, b) => {
            // sort rating
            if (filters.ratingOrder === "asc") {
                return a.rating - b.rating;
            } else if (filters.ratingOrder === "desc") {
                return b.rating - a.rating;
            }

            // sort reviews
            if (filters.reviewsOrder === "asc") {
                return a.review - b.review;
            } else if (filters.reviewsOrder === "desc") {
                return b.review - a.review;
            }

            // sort experience
            if (filters.experienceOrder === "asc") {
                return a.experience - b.experience;
            } else if (filters.experienceOrder === "desc") {
                return b.experience - a.experience;
            }

            return 0;
        });


    const handleSearch = () => {
        setFilters({
            ...tempFilters,
            searchTerm,
        });
        setAdvancedSearchOpen(false);
    };

    const handleReset = () => {
        setSearchTerm("");
        setFilters(defaultFilters);
        setTempFilters(defaultFilters);
    };

    const handleDetailClick = (stylist) => {
        setSelectedStylist(stylist);
        setDetailModalOpen(true);
    };

    return (
        <div className="p-8">
            <h1 className="text-center text-4xl font-serif mb-14">
                Explore Our Salon Stylist
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8">
                <input
                    type="text"
                    className="flex-grow md:flex-grow-0 w-full md:w-1/3 max-w-full h-10 text-base border border-gray-300 py-0 px-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black" // Increased to text-base
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex space-x-2">
                    <button
                        className="h-10 bg-black text-white text-sm md:text-base border-black border uppercase py-0 px-3 transform duration-300 ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black" // Increased text-sm to text-base
                        onClick={() => setAdvancedSearchOpen(true)}
                    >
                        Advanced Search
                    </button>
                    <button
                        className="h-10 bg-red-700 text-white text-sm md:text-base border-red-700 border uppercase py-0 px-3 transform duration-300 ease-in-out hover:bg-transparent hover:text-red-700 hover:border hover:border-red-700" // Increased text-sm to text-base
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <AdvancedSearchModal
                isOpen={isAdvancedSearchOpen}
                tempFilters={tempFilters}
                setTempFilters={setTempFilters}
                onApply={handleSearch}
                onCancel={() => setAdvancedSearchOpen(false)}
            />

            {/* Stylist Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loading ? (
                    <p className="text-center text-lg text-gray-500 col-span-1 md:col-span-2">
                        Loading data...
                    </p>
                ) : error ? (
                    <p className="text-center text-lg text-red-500 col-span-1 md:col-span-2">
                        {error}
                    </p>
                ) : filteredStylists.length > 0 ? (
                    filteredStylists.map((stylist, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 p-4 flex flex-col justify-between h-full">
                            <div className="flex items-center">
                                <img
                                    src={stylist.image || "/path/to/fallback-image.jpg"}
                                    alt={stylist.name || "Stylist"}
                                    className="w-24 h-32 object-cover "
                                />
                                <div className="flex-grow px-4">
                                    <h2 className="text-2xl font-semibold">{stylist.name}</h2>
                                    <p className="text-base text-black-500 font-light mt-1">{stylist.specialty}</p>
                                    <p className="text-base text-black-500 font-light  mt-1">{stylist.experience} years</p>
                                    <div className="flex items-center mt-1">
                                        {Array.from({ length: 5 }, (_, index) => {
                                            const starRating = stylist.rating - index;
                                            if (starRating >= 1) {
                                                return (
                                                    <FontAwesomeIcon
                                                        key={index}
                                                        icon={faStar}
                                                        className="text-yellow-400"
                                                    />
                                                );
                                            } else if (starRating > 0) {
                                                return (
                                                    <FontAwesomeIcon
                                                        key={index}
                                                        icon={faStarHalfAlt}
                                                        className="text-yellow-400"
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
                                        })}
                                        <span className="text-base text-black-500 font-light ml-2">
                                            ({stylist.review} reviews)
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-black text-white text-base border-black border uppercase py-1 px-2 transform duration-300 ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black" // Increased text-sm to text-base
                                    onClick={() => handleDetailClick(stylist)}
                                >
                                    DETAIL
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-500 col-span-1 md:col-span-2"> {/* Increased text size */}
                        No data information
                    </p>
                )}
            </div>

            <StylistDetailModal
                isOpen={isDetailModalOpen}
                stylist={selectedStylist}
                onClose={() => setDetailModalOpen(false)}
            />
        </div>
    );

};

export default BlogStylist;
