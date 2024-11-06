import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStaffs = () => {
  const [staffs, setStaffs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (staff = null) => {
    setSelectedStaff(
      staff || {
        id: "",
        name: "",
        username: "",
        position: "",
        email: "",
        phone: "",
        salary: "",
        status: "active",
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStaff(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (staffId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this staff?");
      if (!confirmDelete) return;

      const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/staffs/${staffId}`;
      const response = await axios.delete(url);
      const updatedStaffs = response.data;
      const isDeleted = !updatedStaffs.some((staff) => staff.id === staffId);

      if (isDeleted) {
        setStaffs(updatedStaffs);
      } else {
        alert("Failed to delete staff. Please try again.");
      }

      closeModal();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (selectedStaff.id) {
        // update staff
        const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/staffs/${selectedStaff.id}`;
        const response = await axios.put(url, selectedStaff);
        const returnedData = response.data;

        if (returnedData.id === selectedStaff.id) {
          setStaffs((prev) =>
            prev.map((staff) => (staff.id === returnedData.id ? returnedData : staff))
          );
          closeModal();
        } else {
          alert("Failed to update staff. Please try again.");
          closeModal();
        }
      } else {
        // create staff
        const newId = Math.max(...staffs.map(staff => parseInt(staff.id, 10))) + 1;
        const url = `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/staffs`;
        const response = await axios.post(url, {
          ...selectedStaff,
          id: newId,
        });
        const newStaff = response.data;

        setStaffs((prev) => [...prev, newStaff]);
      }

      closeModal();
    } catch (error) {
      console.error("Error saving staff:", error);
    }
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get('https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/staffs');
        setStaffs(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };
    fetchStaffs();
  }, []);

  const filteredStaffs = staffs.filter((staff) =>
    (staff.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (staff.username?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (staff.position?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 space-y-4 md:space-y-0">
        <h1 className="text-xl md:text-2xl font-semibold">Staff Management</h1>
        <div className="flex items-center w-full md:w-auto space-x-2">
          <input
            type="text"
            placeholder="Search for staff"
            className="p-2 w-full md:w-80 border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 rounded-full bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </button>
          <button
            onClick={() => openModal()}
            className="w-full py-2 uppercase bg-transparent border-2 border-black text-black hover:bg-black hover:text-white border-solid transform transition-all duration-300 ease-in-out"
          >
            Create new staff
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Full Name</th>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Position</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Salary</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffs.map((staff) => (
              <tr key={staff.id} className="text-center">
                <td className="px-4 py-2 border-b">{staff.id}</td>
                <td className="px-4 py-2 border-b">{staff.name}</td>
                <td className="px-4 py-2 border-b">{staff.username}</td>
                <td className="px-4 py-2 border-b">{staff.position}</td>
                <td className="px-4 py-2 border-b">{staff.email}</td>
                <td className="px-4 py-2 border-b">{staff.phone}</td>
                <td className="px-4 py-2 border-b">${staff.salary}</td>
                <td className="px-4 py-2 border-b">
                  <input type="checkbox" checked={staff.status === 'active'} readOnly />
                </td>
                <td className="px-4 py-2 border-b">
                  <button onClick={() => openModal(staff)} className="text-blue-500">Update</button>
                  <button onClick={() => handleDelete(staff.id)} className="ml-2 text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {isModalOpen && selectedStaff && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full lg:w-1/3 p-6">
            <div className="bg-black text-white text-center py-2 mb-4">
              <h2 className="text-lg font-semibold">
                {selectedStaff.id ? 'UPDATE STAFF' : 'CREATE STAFF'}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-1/2 lg:pr-2">
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border p-2 rounded"
                    value={selectedStaff.name || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-2 mt-4 lg:mt-0">
                  <label className="block text-sm font-medium">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border p-2 rounded"
                    value={selectedStaff.email || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full border p-2 rounded"
                  value={selectedStaff.username || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-1/2 lg:pr-2">
                  <label className="block text-sm font-medium">Position</label>
                  <select
                    name="position"
                    className="w-full border p-2 rounded"
                    value={selectedStaff.position || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Position</option>
                    <option value="Stylist">Stylist</option>
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                <div className="w-full lg:w-1/2 lg:pl-2 mt-4 lg:mt-0">
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="w-full border p-2 rounded"
                    value={selectedStaff.phone || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-1/2 lg:pr-2">
                  <label className="block text-sm font-medium">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    className="w-full border p-2 rounded"
                    value={selectedStaff.salary || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-2 mt-4 lg:mt-0">
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    className="w-full border p-2 rounded"
                    value={selectedStaff.status || ''}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={handleSave} className="bg-black text-white px-4 py-2">
                  {selectedStaff.id ? 'Save' : 'Create'}
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

export default ManageStaffs;
