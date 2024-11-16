import React, { useState, useEffect, useContext } from 'react';
import { toast, Toaster } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../main.jsx';
import { fetchUserData } from '../utils/apiUtils.jsx';
import Banner from '../assets/banner.jpg';

const ProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userAPI, setUserAPI] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [isActing, setIsActing] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = sessionStorage.getItem("user");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {
      fullName: '',
      email: '',
      address: '',
      phone: '',
      loyaltyPoint: '',
      birthday: '',
    };
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetchUserData(user.id)
        .then((userData) => setUserInfo(userData))
        .catch((error) => console.error("Failed to load user data:", error));
    }
  }, [user]);


  const handleEdit = async () => {
    if (isActing) return;
    setIsActing(true);
    try {
      const response = await axios.put(
        `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/UserAccount/${user.id}`,
        userInfo
      );

      const updatedUserInfo = response.data;
      setUserInfo(updatedUserInfo);
      setUser({ ...updatedUserInfo, isLoggedIn: true });

      sessionStorage.setItem("user", JSON.stringify(updatedUserInfo));

      toast.success("User edited successfully");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to edit user");
      console.error("Failed to edit user:", error);
    } finally {
      setIsActing(false);
    }
  };


  const handleSave = () => {
    handleEdit();
  };

  const toggleEditModal = (user = null) => {
    if (user) {
      setOriginalUserInfo(userInfo);
      setUserInfo(user);
    }
    setSelectedUser(user);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setUser(null);
    navigate('/');
  };
  const handleCancel = () => {
    setUserInfo(originalUserInfo);
    setIsEditModalOpen(false);
  };



  return (
    <div className="flex flex-col items-center bg-white pb-12">
      <div className='w-full h-1/2 flex relative justify-center pb-10'>
        <img src={Banner} alt="banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 text-white flex items-center justify-center text-4xl font-montserrat w-full uppercase text-center">
          <p>Welcome, {userInfo.fullName}</p>
        </div>
      </div>


      <div className="flex justify-end w-full max-w-4xl mb-4">
        <button
          className="text-sm font-semilight text-blue-600"
          onClick={() => toggleEditModal(userInfo)}
        >
          EDIT
        </button>
      </div>

      {/* User Info Section */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl mb-4">
        <div>
          <label className="block text-xs mb-1 uppercase tracking-wider font-medium">NAME</label>
          <div className="w-full text-lg font-light">
            {userInfo.fullName ? userInfo.fullName : "Information needs to be updated"}
          </div>
        </div>
        <div>
          <label className="block  text-xs mb-1 uppercase tracking-wider font-medium">EMAIL</label>
          <div className="w-full text-lg font-light">
            {userInfo.email ? userInfo.email : "Information needs to be updated"}
          </div>
        </div>
        <div>
          <label className="block  text-xs mb-1 uppercase tracking-wider font-medium">LOYALTY POINT</label>
          <div className="w-full text-lg font-light">
            {userInfo.loyaltyPoint ? userInfo.loyaltyPoint : 0}
          </div>
        </div>
        <div>
          <label className="block  text-xs mb-1 uppercase tracking-wider font-medium">PHONE</label>
          <div className="w-full text-lg font-light">
            {userInfo.phone ? userInfo.phone : "Information needs to be updated"}
          </div>
        </div>
        <div>
          <label className="block  text-xs mb-1 uppercase tracking-wider font-medium">DATE OF BIRTH</label>
          <div className="w-full text-lg font-light">
            {userInfo.birthday ? userInfo.birthday : "Information needs to be updated"}
          </div>
        </div>
        <div>
          <label className="block  text-xs mb-1 uppercase tracking-wider font-medium">ADDRESS</label>
          <div className="w-full text-lg font-light">
            {userInfo.address ? userInfo.address : "Information needs to be updated"}
          </div>
        </div>

      </div>

      {/* Upcoming Appointment Section */}
      <div className="w-full max-w-4xl pt-4 pb-4">
        <h3 className="text-gray-600 font-semibold mb-2 tracking-wide uppercase">Upcoming Appointment</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">TODAY</p>
            <p className="text-sm text-gray-500">10:00 - 11:00</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Hoang Thach</p>
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
      </div>



      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex justify-center">EDIT INFORMATION</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className=" block mb-1">Name</label>
                <input
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div>
                <label className=" block mb-1">Email</label>
                <input
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className=" block mb-1">Address</label>
                <input
                  value={userInfo.address}
                  onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div>
                <label className=" block mb-1">Phone</label>
                <input
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <div>
                <label className=" block mb-1">Date of birth</label>
                <input
                  value={userInfo.birthday}
                  onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
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
      {/* Logout Button */}
      <div className="flex justify-end w-full max-w-4xl pt-4 mb-4">
        <button
          className="px-5 py-1 font-montserrat font-bold italic bg-transparent border-2 border-black text-black 
          hover:bg-black hover:text-white border-solid hover:scale-95 transform transition-all duration-300 ease-in-out"
          onClick={logout}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}
export default ProfilePage;