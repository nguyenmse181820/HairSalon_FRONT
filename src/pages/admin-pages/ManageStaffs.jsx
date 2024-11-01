import React, { useState } from 'react'

const ManageStaffs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="flex-1 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Staff Management</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for staff"
            className="p-2 w-80"
          />
          <button className="ml-2 p-2 rounded-full bg-gray-300">
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
          <button onClick={openModal} className="ml-4 bg-black text-white px-4 py-2">
            Create new staff
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Full Name</th>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Department</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Salary</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="px-4 py-2 border-b">1</td>
              <td className="px-4 py-2 border-b">Moc Nguyen</td>
              <td className="px-4 py-2 border-b">manager</td>
              <td className="px-4 py-2 border-b">Management</td>
              <td className="px-4 py-2 border-b">nguyen@gmail.com</td>
              <td className="px-4 py-2 border-b">0909090909</td>
              <td className="px-4 py-2 border-b">$1000</td>
              <td className="px-4 py-2 border-b">
                <input type="checkbox" className="toggle-checkbox" />
              </td>
              <td className="px-4 py-2 border-b">
                <button onClick={openModal} className="text-blue-500">Update</button>
                <button className="ml-2 text-red-500">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg">
            <div className="bg-black text-white text-center py-2 mb-4">
              <h2 className="text-lg font-semibold">UPDATE STAFF</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm font-medium">Full Name</label>
                  <input type="text" className="w-full border p-2 rounded" value="Moc Nguyen" />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-sm font-medium">Email address</label>
                  <input type="email" className="w-full border p-2 rounded" value="nguyen@gmail.com" />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm font-medium">Department</label>
                  <input type="text" className="w-full border p-2 rounded" value="Management" />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-sm font-medium">Phone</label>
                  <input type="text" className="w-full border p-2 rounded" value="0909090909" />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm font-medium">Salary</label>
                  <input type="text" className="w-full border p-2 rounded" value="$1000" />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-sm font-medium">Salary processing on</label>
                  <input type="date" className="w-full border p-2 rounded" value="2024-02-02" />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={closeModal} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
                <button className="bg-black text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageStaffs
