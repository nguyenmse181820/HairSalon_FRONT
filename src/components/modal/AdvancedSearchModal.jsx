import React from "react";

const AdvancedSearchModal = ({
    isOpen,
    tempFilters,
    setTempFilters,
    onApply,
    onCancel,
}) => {
    if (!isOpen) return null;

    const handleCheckboxChange = (field, order) => {
        setTempFilters((prevFilters) => ({
            ...prevFilters,
            [`${field}Order`]: prevFilters[`${field}Order`] === order ? null : order,
        }));
    };

    return (
        <div className="border p-6 bg-white shadow-lg mb-8 w-full md:w-2/5 mx-left">
            <h2 className="text-lg font-semibold mb-6">Advanced Search</h2>
            <div className="space-y-6">

                {/* Rating Section */}
                <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            className="w-16 border border-black py-1 px-1 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-black"
                            min="0"
                            max="5"
                            value={tempFilters.rating}
                            onChange={(e) =>
                                setTempFilters({ ...tempFilters, rating: Number(e.target.value) })
                            }
                        />
                        <div className="flex items-center space-x-4">
                            <label className="text-sm flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-1"
                                    checked={tempFilters.ratingOrder === "asc"}
                                    onChange={() => handleCheckboxChange("rating", "asc")}
                                />
                                Tăng dần
                            </label>
                            <label className="text-sm flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-1"
                                    checked={tempFilters.ratingOrder === "desc"}
                                    onChange={() => handleCheckboxChange("rating", "desc")}
                                />
                                Giảm dần
                            </label>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div>
                    <label className="block text-sm font-medium mb-1">Reviews</label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            className="w-16 border border-black py-1 px-1 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-black"
                            min="0"
                            value={tempFilters.minReviews}
                            onChange={(e) =>
                                setTempFilters({ ...tempFilters, minReviews: Number(e.target.value) })
                            }
                        />
                        <div className="flex items-center space-x-4">
                            <label className="text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-1"
                                    checked={tempFilters.reviewsOrder === "asc"}
                                    onChange={() =>
                                        handleCheckboxChange("reviews", "asc")
                                    }
                                />
                                Tăng dần
                            </label>
                            <label className="text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-1"
                                    checked={tempFilters.reviewsOrder === "desc"}
                                    onChange={() =>
                                        handleCheckboxChange("reviews", "desc")
                                    }
                                />
                                Giảm dần

                            </label>
                        </div>
                    </div>
                </div>

                {/* Experience Section */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Experience Years
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            className="w-16 border border-black py-1 px-1 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-black"
                            min="0"
                            value={tempFilters.minExperience}
                            onChange={(e) =>
                                setTempFilters({
                                    ...tempFilters,
                                    minExperience: Number(e.target.value),
                                })
                            }
                        />
                        <div className="flex items-center space-x-4">
                            <label className="text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-1"
                                    checked={tempFilters.experienceOrder === "asc"}
                                    onChange={() =>
                                        handleCheckboxChange("experience", "asc")
                                    }
                                />
                                Tăng dần
                            </label>
                            <label className="text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-1"
                                    checked={tempFilters.experienceOrder === "desc"}
                                    onChange={() =>
                                        handleCheckboxChange("experience", "desc")
                                    }
                                />
                                Giảm dần
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
                <button
                    className="w-full md:w-auto bg-red-700 text-white border border-red-700 uppercase py-2 px-4 text-sm transform duration-300 ease-in-out 
                   hover:bg-transparent hover:text-red-500 hover:border-red-700"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="w-full md:w-auto bg-black text-white border-black border uppercase py-2 px-4 text-sm transform duration-300 ease-in-out 
                   hover:bg-transparent hover:text-black"
                    onClick={onApply}
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default AdvancedSearchModal;
