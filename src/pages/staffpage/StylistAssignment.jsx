import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

function StylistAssignment() {
  const [stylist, setStylist] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://673a9c49339a4ce445188ccb.mockapi.io/project/stylistAssignment"
      )
      .then((res) => {
        setStylist(res.data);
      });
  });

  if (editModal || createModal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    stylistName: "",
    avatar: "",
    phone: "",
    address: "",
    age: "",
  });

  const toggleEditModal = (item) => {
    setSelectedItem(item);
    setEditModal(!editModal);
  };

  // handle delete modal
  const toggleDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModal(!deleteModal);
  };

  // handle create modal
  const toggleCreateModal = () => {
    setCreateModal(!createModal);
  };
  //handle change
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // valid password
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    // valid stylistName
    if (!formData.stylistName.trim()) {
      validationErrors.stylistName = "Stylist name is required";
    } else if (formData.stylistName.length < 3) {
      validationErrors.stylistName =
        "Stylist name must be at least 3 characters";
    }

    if (!formData.avatar.trim()) {
      validationErrors.avatar = "Avatar is required";
    } else if (
      !formData.avatar.startsWith("https://") &&
      !formData.avatar.startsWith("http://")
    ) {
      validationErrors.avatar = "Invalid avatar URL";
    }

    // valid email
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (/\S+@\S\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email address";
    }
    // valid phone
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.phone)
    ) {
      validationErrors.phone = "Invalid phone number";
    } else if (formData.phone.length < 10 || formData.phone.length > 10) {
      validationErrors.phone =
        "Phone number must be at least 10 and at most 10 characters";
    }
    // valid address
    if (!formData.address.trim()) {
      validationErrors.address = "Address is required";
    }
    // valid age
    if (!formData.age.trim()) {
      validationErrors.age = "Age is required";
    } else if (!/^[0-9]+$/.test(formData.age)) {
      validationErrors.age = "Invalid age";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      toast.error("Form submitted successfully");
      console.log(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
      stylistName: "",
      avatar: "",
      phone: "",
      address: "",
      age: "",
    });
    setErrors({});
  };

  return (
    <div>
      <div className="mt-10 font-bold text-lg md:text-xl text-center uppercase tracking-wider">
        Stylist Assignment
      </div>
      {/* create button */}
      <div className="sm:ml-6 lg:ml-10 ml-6 mt-10 text-sm sm:text-base flex justify-center border w-max px-4 py-2 transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500">
        <button onClick={toggleCreateModal} className="font-semibold">
          Create new Stylist
        </button>
      </div>
      {/* table */}
      <div className="mt-5 xs:p-6 p-0">
        <table className="w-full">
          <thead className="">
            <tr className="sm:text-base text-sm">
              <th className="py-3 px-2 font-semibold text-center uppercase">
                Id
              </th>
              <th className="hidden sm:table-cell py-3 px-2 font-semibold text-center uppercase">
                Email
              </th>
              <th className="py-3 px-2 font-semibold text-center uppercase">
                Stylist Name
              </th>
              <th className="py-3 px-2 font-semibold text-center uppercase">
                Avatar
              </th>
              <th className="hidden sm:table-cell py-3 px-2 font-semibold text-center uppercase">
                Phone
              </th>
              <th className="hidden md:table-cell py-3 px-2 font-semibold text-center uppercase">
                Address
              </th>
              <th className="hidden md:table-cell py-3 px-2 font-semibold text-center uppercase">
                Age
              </th>
              <th className="py-3 px-2 font-semibold text-center uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td colSpan="8">
                <hr className="w-full border-gray-300 my-2" />
              </td>
            </tr>
            {stylist.map((stylist) => {
              return (
                <tr key={stylist.id} className="sm:text-base text-sm">
                  <td className="py-3 px-2">{stylist.id}</td>
                  <td className="hidden sm:table-cell py-3 px-2">
                    {stylist.email}
                  </td>
                  <td className="py-3 px-2">{stylist.stylistName}</td>
                  <td className="py-3 px-2 flex justify-center">
                    <img
                      src={stylist.avatar}
                      alt=""
                      className="w-20 h-20 rounded-full"
                    />
                  </td>
                  <td className="hidden sm:table-cell py-3 px-2">
                    {stylist.phone}
                  </td>
                  <td className="hidden md:table-cell py-3 px-2">
                    {stylist.address}
                  </td>
                  <td className="hidden md:table-cell py-3 px-2">
                    {stylist.age}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex justify-center items-center gap-1 sm:gap-2 sm:flex-row flex-col">
                      <button
                        onClick={() => toggleEditModal(stylist)}
                        className="border transform hover:scale-110 hover:bg-gray-700 hover:bg-opacity-20 py-1 px-2 w-[80%] lg:w-[80px] transition-all ease-in-out duration-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleDeleteModal(stylist)}
                        className="border transform hover:scale-110 bg-red-500 text-white hover:bg-red-600 py-1 px-2 w-[80%] lg:w-[80px] transition-all ease-in-out duration-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editModal && (
        <div className="modal">
          <div
            className="bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0"
            onClick={toggleEditModal}
          ></div>
          <div
            className="modal-content rounded border shadow-md z-50 fixed h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     bg-white pb-16  w-[80%] md:w-[60%] lg:w-[35%] flex justify-center overflow-y-auto"
          >
            <div className="w-[80%]">
              <div className="text-center font-bold text-xl uppercase tracking-wider my-10 ">
                Edit Form
              </div>
              <form action="">
                <div className="mb-4 mx-10">
                  <label>Email</label> <br />
                  <input
                    type="text"
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    value={selectedItem.email}
                    name="email"
                    onChange={handleEditChange}
                  />
                  {errors.email && (
                    <span className="text-red-500 italic text-sm">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="mb-4 mx-10">
                  <label>Stylist Name</label> <br />
                  <input
                    type="text"
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    value={selectedItem.stylistName}
                    name="stylistName"
                    onChange={handleEditChange}
                  />
                  {errors.stylistName && (
                    <span className="text-red-500 italic text-sm">
                      {errors.stylistName}
                    </span>
                  )}
                </div>
                <div className="mb-4 mx-10">
                  <label>Avatar</label> <br />
                  <input
                    type="text"
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    value={selectedItem.avatar}
                    name="stylistName"
                    onChange={handleEditChange}
                  />
                  {errors.avatar && (
                    <span className="text-red-500 italic text-sm">
                      {errors.avatar}
                    </span>
                  )}
                </div>
                <div className="mb-4 mx-10">
                  <label>Phone</label> <br />
                  <input
                    type="number"
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    value={selectedItem.phone}
                    name="phone"
                    onChange={handleEditChange}
                  />
                  {errors.phone && (
                    <span className="text-red-500 italic text-sm">
                      {errors.phone}
                    </span>
                  )}
                </div>
                <div className="mb-4 mx-10">
                  <label htmlFor="">Address</label> <br />
                  <input
                    type="text"
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    value={selectedItem.address}
                    name="address"
                    onChange={handleEditChange}
                  />
                  {errors.address && (
                    <span className="text-red-500 italic text-sm">
                      {errors.address}
                    </span>
                  )}
                </div>
                <div className="mb-4 mx-10">
                  <label>Age</label> <br />
                  <input
                    type="number"
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    value={selectedItem.age}
                    name="age"
                    onChange={handleEditChange}
                  />
                  {errors.age && (
                    <span className="text-red-500 italic text-sm">
                      {errors.age}
                    </span>
                  )}
                </div>
                <div className="flex justify-center items-center gap-4 mt-6 py-10">
                  <button
                    onClick={handleSubmit}
                    className="bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={toggleEditModal}
                    className="bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="modal">
          <div
            className="bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0"
            onClick={toggleDeleteModal}
          ></div>
          <div className="modal-content rounded border shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-16 py-16 w-[80%] md:w-[50%] lg:w-[35%]">
            <div>
              <p className="text-center text-lg">
                Are you sure you want to delete this appointment?
              </p>
              <div className="flex justify-center items-center gap-4 mt-10">
                <button className="bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500">
                  Yes
                </button>
                <button
                  onClick={toggleDeleteModal}
                  className="bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {createModal && (
        <div className="modal ">
          <div
            className="bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0"
            onClick={toggleCreateModal}
          ></div>
          <div
            className="modal-content rounded border shadow-md h-[90%] fixed z-50 top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2
                     bg-white py-16 my-10 overflow-y-auto md:mt-16 lg:mt-[100px] w-[80%] md:w-[60%] lg:w-[35%] flex justify-center"
          >
            <div className="w-[80%]">
              <form action="">
                <div className="text-lg text-center font-bold uppercase tracking-wider my-10">
                  Create New Stylist
                </div>
                <div className="mb-4">
                  <label className="py-2">Email</label> <br />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm italic">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="">Password</label> <br />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm italic">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="">Stylist Name</label> <br />
                  <input
                    type="text"
                    name="stylistName"
                    placeholder="Enter stylist name"
                    value={formData.stylistName}
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    onChange={handleChange}
                  />
                  {errors.stylistName && (
                    <span className="text-red-500 text-sm italic">
                      {errors.stylistName}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="">Avatar</label> <br />
                  <input
                    type="text"
                    name="avatar"
                    placeholder="Enter avatar URL"
                    value={formData.avatar}
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    onChange={handleChange}
                  />
                  {errors.avatar && (
                    <span className="text-red-500 text-sm italic">
                      {errors.avatar}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="">Phone</label> <br />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm italic">
                      {errors.phone}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="">Address</label> <br />
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm italic">
                      {errors.address}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="">Age</label> <br />
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    className="w-full border border-gray-400 p-2 hover:border-black"
                    onChange={handleChange}
                  />
                  {errors.age && (
                    <span className="text-red-500 text-sm italic">
                      {errors.age}
                    </span>
                  )}
                </div>
                <div className="flex justify-center items-center gap-4 mt-10 py-10">
                  <button
                    onClick={handleSubmit}
                    className="bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* pagination */}
      <div className="w-[75%] sm:w-[70%] lg:w-[50%] mx-auto my-10 cursor-pointer text-sm lg:text-lg">
        <div className="flex gap-2 justify-between p-4">
          <div className="w-24 text-center">
            <p className="italic hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300">
              ← Prevous
            </p>
          </div>
          <div className="flex gap-1">
            <p className="w-4 sm:w-12 text-center bg-black rounded text-white">
              1
            </p>
            <p className="w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300">
              2
            </p>
            <p className="w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300">
              3
            </p>
            <p className="w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300">
              ...
            </p>
            <p className="w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300">
              9
            </p>
          </div>
          <div className="w-24 text-center">
            <p className="italic hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300">
              Next →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StylistAssignment;
