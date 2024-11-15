import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStylist = () => {
  const [stylists, setStylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (stylist = null) => {
    setSelectedStylist(
      stylist || {
        id: "",
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

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await axios.get('https://667c07dd3c30891b865b026d.mockapi.io/ass2/stylists');
        setStylists(response.data);
      } catch (error) {
        console.error("Error fetching stylist data:", error);
      }
    };
    fetchStylists();
  }, []);

  const handleSave = async () => {
    try {
      if (selectedStylist.id) {
        const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/stylists/${selectedStylist.id}`;
        const response = await axios.put(url, selectedStylist);
        const updatedStylist = response.data;

        setStylists((prev) =>
          prev.map((stylist) => (stylist.id === updatedStylist.id ? updatedStylist : stylist))
        );
      } else {
        const newId = Math.max(...stylists.map((stylist) => parseInt(stylist.id, 10))) + 1;
        const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/stylists`;
        const response = await axios.post(url, {
          ...selectedStylist,
          id: newId.toString(),
        });
        setStylists((prev) => [...prev, response.data]);
      }

      closeModal();
    } catch (error) {
      console.error("Error saving stylist:", error);
    }
  };

  const handleDelete = async (stylistId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this stylist?");
      if (!confirmDelete) return;

      const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/stylists/${stylistId}`;
      await axios.delete(url);
      setStylists((prev) => prev.filter((stylist) => stylist.id !== stylistId));
    } catch (error) {
      console.error("Error deleting stylist:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStylist((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStylists = stylists.filter((stylist) =>
    stylist.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Time</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStylists.map((stylist) => (
              <tr key={stylist.id} className="text-center">
                <td className="px-4 py-2 border-b">{stylist.id}</td>
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
                {selectedStylist.id ? 'Update Stylist' : 'Create Stylist'}
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
