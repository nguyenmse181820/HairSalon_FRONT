import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (customer = null) => {
    setSelectedCustomer(
      customer || { name: "", address: "", username: "", email: "", phone: "", status: "active" }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleSave = async () => {
    try {
      if (selectedCustomer.id) {
        const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/customers/${selectedCustomer.id}`;
        const response = await axios.put(url, selectedCustomer);
        const updatedCustomer = response.data;

        setCustomers((prev) =>
          prev.map((customer) => (customer.id === updatedCustomer.id ? updatedCustomer : customer))
        );
      } else {
        const newId = Math.max(...customers.map((customer) => parseInt(customer.id, 10))) + 1;
        const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/customers`;
        const response = await axios.post(url, {
          ...selectedCustomer,
          id: newId
        });
        setCustomers((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
      if (!confirmDelete) return;

      const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/customers/${customerId}`;
      await axios.delete(url);
      setCustomers((prev) => prev.filter((customer) => customer.id !== customerId));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex-1 p-5'>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Customer Management</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for customer"
            className="border p-2 w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => openModal()}
            className="ml-4 py-2 px-4 bg-black text-white rounded"
          >
            Create New Customer
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Full Name</th>
              <th className="px-4 py-2 border-b">Address</th>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="text-center">
                <td className="px-4 py-2 border-b">{customer.id}</td>
                <td className="px-4 py-2 border-b">{customer.name}</td>
                <td className="px-4 py-2 border-b">{customer.address}</td>
                <td className="px-4 py-2 border-b">{customer.username}</td>
                <td className="px-4 py-2 border-b">{customer.email}</td>
                <td className="px-4 py-2 border-b">{customer.phone}</td>
                <td className="px-4 py-2 border-b">
                  <input type="checkbox" checked={customer.status === "active"} readOnly />
                </td>
                <td className="px-4 py-2 border-b">
                  <button onClick={() => openModal(customer)} className="text-blue-500">Update</button>
                  <button onClick={() => handleDelete(customer.id)} className="ml-2 text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/3 p-6 shadow-lg">
            <div className="bg-black text-white text-center py-2 mb-4">
              <h2 className="text-lg font-semibold">
                {selectedCustomer.id ? "UPDATE CUSTOMER" : "CREATE CUSTOMER"}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border p-2"
                    value={selectedCustomer.name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border p-2"
                    value={selectedCustomer.email || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={handleSave} className="bg-black text-white px-4 py-2">Save</button>
                <button onClick={closeModal} className="bg-gray-300 text-black px-4 py-2">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCustomers;
