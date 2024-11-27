import React from "react";

const AdvancedSearchModal = ({
    isOpen,
    tempFilters,
    setTempFilters,
    onApply,
    onCancel,
}) => {
    if (!isOpen) return null; // Don't render if modal is closed

    return (
        <div className="border p-6 bg-white shadow-lg mb-8 w-full md:w-2/5 mx-left">
            <h2 className="text-lg font-semibold mb-6">Advanced Search</h2>
            <div className="space-y-6">
                {/* Rating Section */}
                <div>
                    <label className="block text-sm font-medium mb-1">Minimum Rating</label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            className="w-24 border border-black py-2 px-2 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-black"
                            min="0"
                            max="5"
                            value={tempFilters.rating}
                            onChange={(e) =>
                                setTempFilters({ ...tempFilters, rating: Number(e.target.value) })
                            }
                        />
                    </div>
                </div>

                {/* Reviews Section */}
                <div>
                    <label className="block text-sm font-medium mb-1">Minimum Reviews</label>
                    <input
                        type="number"
                        className="w-24 border border-black py-2 px-2 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-black"
                        min="0"
                        value={tempFilters.minReviews}
                        onChange={(e) =>
                            setTempFilters({ ...tempFilters, minReviews: Number(e.target.value) })
                        }
                    />
                </div>

                {/* Experience Section */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Minimum Experience (years)
                    </label>
                    <input
                        type="number"
                        className="w-24 border border-black py-2 px-2 placeholder-gray-500 text-gray-700 focus:outline-none focus:border-black"
                        min="0"
                        value={tempFilters.minExperience}
                        onChange={(e) =>
                            setTempFilters({
                                ...tempFilters,
                                minExperience: Number(e.target.value),
                            })
                        }
                    />
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
