import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (service = null) => {
    setSelectedService(
      service || {
        title: "",
        description: "",
        price: "",
        time: "",
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://667c07dd3c30891b865b026d.mockapi.io/ass2/services');
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };
    fetchServices();
  }, []);

  const handleSave = async () => {
    try {
      if (selectedService.id) {
        const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/services/${selectedService.id}`;
        const response = await axios.put(url, selectedService);
        const returnedData = response.data;

        if (returnedData.id === selectedService.id) {
          setServices((prev) =>
            prev.map((service) => (service.id === returnedData.id ? returnedData : service))
          );
          closeModal();
        } else {
          alert("Failed to update service. Please try again.");
          closeModal();
        }
      } else {
        const newId = Math.max(...services.map((service) => parseInt(service.id, 10))) + 1;
        const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/services`;
        const response = await axios.post(url, {
          ...selectedService,
          id: newId
        });
        setServices((prev) => [...prev, response.data]);
      }

      closeModal();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this service?");
      if (!confirmDelete) return;

      const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/services/${serviceId}`;
      await axios.delete(url);
      //cannot check for it deleted or not because it should fetch the data again to check the id in that array
      setServices((prev) => prev.filter((service) => service.id !== serviceId));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedService((prev) => ({ ...prev, [name]: value }));
  };

  const filteredServices = services.filter((service) =>
    (service.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (service.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 space-y-4 md:space-y-0">
        <h1 className="text-xl md:text-2xl font-semibold">Service Management</h1>
        <div className="flex items-center w-full md:w-auto space-x-2">
          <input
            type="text"
            placeholder="Search for service"
            className="p-2 w-full md:w-80 border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => openModal()}
            className="w-full py-2 uppercase bg-transparent border-2 border-black text-black hover:bg-black hover:text-white border-solid transform transition-all duration-300 ease-in-out"
          >
            Create new service
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Time</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr key={service.id} className="text-center">
                <td className="px-4 py-2 border-b">{service.title}</td>
                <td className="px-4 py-2 border-b">{service.description}</td>
                <td className="px-4 py-2 border-b">{service.price}</td>
                <td className="px-4 py-2 border-b">{service.time}</td>
                <td className="px-4 py-2 border-b">
                  <button onClick={() => openModal(service)} className="text-blue-500">Update</button>
                  <button onClick={() => handleDelete(service.id)} className="ml-2 text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {isModalOpen && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full lg:w-1/3 p-6">
            <div className="bg-black text-white text-center py-2 mb-4">
              <h2 className="text-lg font-semibold">
                {selectedService.id ? 'UPDATE SERVICE' : 'CREATE SERVICE'}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="w-full">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border p-2 rounded"
                  value={selectedService.title || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  className="w-full border p-2 rounded"
                  value={selectedService.description || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="text"
                  name="price"
                  className="w-full border p-2 rounded"
                  value={selectedService.price || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Time</label>
                <input
                  type="text"
                  name="time"
                  className="w-full border p-2 rounded"
                  value={selectedService.time || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={handleSave} className="bg-black text-white px-4 py-2">
                  {selectedService.id ? 'Save' : 'Create'}
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

export default ManageService;
