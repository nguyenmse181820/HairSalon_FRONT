import React, { useState } from 'react';
import { stylists } from '../../constant/index.jsx'; 

const ManageStylist = () => {
  const [stylistList, setStylistList] = useState(stylists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (stylist = null) => {
    setSelectedStylist(
      stylist || {
        id: stylistList.length + 1,
        name: "",
        price: "",
        time: "",
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStylist(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStylist((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (selectedStylist.id) {
      // Update existing stylist
      setStylistList((prev) =>
        prev.map((stylist) => (stylist.id === selectedStylist.id ? selectedStylist : stylist))
      );
    } else {
      // Add new stylist
      setStylistList((prev) => [...prev, { ...selectedStylist, id: stylistList.length + 1 }]);
    }
    closeModal();
  };

  const handleDelete = (stylistId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this stylist?");
    if (!confirmDelete) return;

    setStylistList(stylistList.filter((stylist) => stylist.id !== stylistId));
  };

  const filteredStylists = stylistList.filter((stylist) =>
    (stylist.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 space-y-4 md:space-y-0">
        <h1 className="text-xl md:text-2xl font-semibold">Stylist Management</h1>
        <div className="flex items-center w-full md:w-auto space-x-2">
          <input
            type="text"
            placeholder="Search for stylist"
            className="p-2 w-full md:w-80 border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => openModal()}
            className="w-full py-2 uppercase bg-transparent border-2 border-black text-black hover:bg-black hover:text-white border-solid transform transition-all duration-300 ease-in-out"
          >
            Create new stylist
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Time</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStylists.map((stylist) => (
              <tr key={stylist.id} className="text-center">
                <td className="px-4 py-2 border-b">{stylist.name}</td>
                <td className="px-4 py-2 border-b">{stylist.price}</td>
                <td className="px-4 py-2 border-b">{stylist.time}</td>
                <td className="px-4 py-2 border-b">
                  <button onClick={() => openModal(stylist)} className="text-blue-500">Update</button>
                  <button onClick={() => handleDelete(stylist.id)} className="ml-2 text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedStylist && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full lg:w-1/3 p-6">
            <div className="bg-black text-white text-center py-2 mb-4">
              <h2 className="text-lg font-semibold">
                {selectedStylist.id ? 'UPDATE STYLIST' : 'CREATE STYLIST'}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="w-full">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border p-2 rounded"
                  value={selectedStylist.name || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="text"
                  name="price"
                  className="w-full border p-2 rounded"
                  value={selectedStylist.price || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Time</label>
                <input
                  type="text"
                  name="time"
                  className="w-full border p-2 rounded"
                  value={selectedStylist.time || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={handleSave} className="bg-black text-white px-4 py-2">
                  {selectedStylist.id ? 'Save' : 'Create'}
                </button>
                <button onClick={closeModal} className="bg-gray-300 text-black px-4 py-2">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStylist;
