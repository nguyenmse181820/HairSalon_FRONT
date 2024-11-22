import React, { useState } from "react";

const BlogStylist = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [rating, setRating] = useState(0);
    const [minReviews, setMinReviews] = useState(0);
    const [minExperience, setMinExperience] = useState(0);

    // Trạng thái lưu giá trị khi người dùng nhấn nút Tìm kiếm
    const [filters, setFilters] = useState({
        searchTerm: "",
        rating: 0,
        minReviews: 0,
        minExperience: 0,
    });

    const stylistData = [
        {
            name: "HOANG THACH",
            specialty: "Women's Haircuts, Hair Coloring, and Bridal Styling",
            experience: "4 years",
            reviews: "12 reviews",
            rating: 5,
            image: "https://via.placeholder.com/150",
        },
        {
            name: "HOANG THACH",
            specialty: "Women's Haircuts, Hair Coloring, and Bridal Styling",
            experience: "4 years",
            reviews: "12 reviews",
            rating: 5,
            image: "https://via.placeholder.com/150",
        },
    ];

    // Lọc stylist theo các tiêu chí trong `filters`
    const filteredStylists = stylistData
        .filter((stylist) =>
            stylist.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
        .filter((stylist) => stylist.rating >= filters.rating)
        .filter((stylist) => parseInt(stylist.reviews) >= filters.minReviews)
        .filter((stylist) => parseInt(stylist.experience) >= filters.minExperience);

    // Hàm xử lý khi nhấn nút "Tìm kiếm"
    const handleSearch = () => {
        setFilters({
            searchTerm,
            rating,
            minReviews,
            minExperience,
        });
    };

    return (
        <div className="p-8">
            {/* Title */}
            <h1 className="text-center text-2xl font-serif mb-8">
                Explore Our Salon Stylist
            </h1>

            {/* Search Section */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
                {/* Search Input */}
                <input
                    type="text"
                    className="w-full md:w-1/3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none"
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Rating Filter */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Minimum Rating</label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>

                {/* Reviews Filter */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                        Minimum Reviews
                    </label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none"
                        min="0"
                        value={minReviews}
                        onChange={(e) => setMinReviews(Number(e.target.value))}
                    />
                </div>

                {/* Experience Filter */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                        Minimum Experience (years)
                    </label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none"
                        min="0"
                        value={minExperience}
                        onChange={(e) => setMinExperience(Number(e.target.value))}
                    />
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md"
                >
                    Tìm kiếm
                </button>
            </div>

            {/* Stylist Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStylists.length > 0 ? (
                    filteredStylists.map((stylist, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4 flex flex-col justify-between h-full"
                        >
                            {/* Top Section */}
                            <div className="flex items-center">
                                <img
                                    src={stylist.image}
                                    alt={stylist.name}
                                    className="w-24 h-32 object-cover rounded-md"
                                />
                                <div className="flex-grow px-4">
                                    <h2 className="text-lg font-semibold">{stylist.name}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {stylist.specialty}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {stylist.experience}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">
                                            {"★".repeat(stylist.rating)}
                                        </span>
                                        <span className="text-gray-500 text-sm ml-2">
                                            ({stylist.reviews})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section */}
                            <div className="flex justify-end mt-4">
                                <button className="bg-black text-white px-6 py-2 rounded-md">
                                    DETAIL
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-1 md:col-span-2">
                        No data information
                    </p>
                )}
            </div>
        </div>
    );
};

export default BlogStylist;
