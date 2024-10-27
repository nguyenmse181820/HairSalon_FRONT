import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../main";
import { Toaster, toast } from "sonner";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Nguyen Van A",
    birthdate: "02/02/2004",
    loyaltyPoints: 1000,
    phone: "0123456789",
    email: "thachstylist@gmail.com",
    address: "123 Becker Street",
  });

  // Function to handle opening/closing edit modal
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  // Function to handle saving updated user info
  const handleSave = () => {
    // Add functionality for saving data here
    toggleEditModal();
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-10">
      {/* Avatar Section */}
      <div className="w-24 h-24 bg-gray-300 mb-6 rounded-full flex justify-center items-center">
        <span>AVATAR</span>
      </div>

      {/* Personal Information */}
      <h2 className="text-2xl font-bold mb-8 uppercase">
        PERSONAL INFORMATION
      </h2>

      {/* Edit Button */}
      <div className="flex justify-end w-full max-w-2xl mb-4">
        <button
          className="text-sm font-semilight text-blue-600"
          onClick={toggleEditModal}
        >
          EDIT
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl mb-4">
        <div>
          <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">
            NAME
          </label>
          <input
            value={user.name}
            className="w-full border border-gray-300 p-2 text-lg font-light"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">
            DATE OF BIRTH
          </label>
          <input
            value={user.birthday}
            className="w-full border border-gray-300 p-2 text-lg font-light"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">
            LOYALTY POINT
          </label>
          <input
            value={userInfo.loyaltyPoints}
            className="w-full border border-gray-300 p-2 text-lg font-light"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">
            PHONE
          </label>
          <input
            value={userInfo.phone}
            className="w-full border border-gray-300 p-2 text-lg font-light"
            readOnly
          />
        </div>
      </div>

      {/* Upcoming Appointment */}
      <div className="w-full max-w-2xl mb-4">
        <h3 className="text-gray-600 font-semibold mb-2 tracking-wide uppercase">
          Upcoming Appointment
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">TODAY</p>
            <p className="text-sm text-gray-500">10:00 - 11:00</p>
          </div>
          <div className="text-right">
            <p className="font-bold justify-start">Hoang Thach</p>
            <p className="text-sm text-gray-500">thachstylist@gmail.com</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Bleach Hair</p>
            <p className="font-bold">Hair Styling</p>
          </div>
          <div className="flex items-center">
            <a
              href="#"
              className="text-sm font-semilight text-gray-500 flex items-center"
            >
              DETAIL
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex justify-end pt-10">
          <button
            className="px-5 py-1 font-montserrat font-bold italic bg-transparent border-2
                         border-black text-black hover:bg-black hover:text-white border-solid hover:scale-95 
                         transform transition-all duration-300 ease-in-out"
            onClick={logout}
          >
            LOG OUT
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">EDIT INFORMATION</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="text-gray-700">Name</label>
              <input
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="text-gray-700">Email</label>
              <input
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="text-gray-700">Phone</label>
              <input
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="text-gray-700">Address</label>
              <input
                value={userInfo.address}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, address: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={toggleEditModal}
                className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white font-semibold rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
