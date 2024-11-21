
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'sonner';

function StaffManagement() {
  const [AppointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    axios.get('https://673828ca4eb22e24fca7099b.mockapi.io/project/bookings').then((res) => {
      setAppointmentList(res.data);
    })
  }, [])

  const [formData, setFormData] = useState({
    customerName: '',
    stylistName: '',
    serviceType: '',
    date: '',
    time: '',
  });



  const [EditModal, setEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  // handle edit modal
  const toggleEditModal = (item) => {
    setSelectedItem(item);
    setEditModal(!EditModal);
  }

  // handle delete modal
  const toggleDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModal(!DeleteModal);
  }

  // handle create modal
  const toggleCreateModal = () => {
    setCreateModal(!createModal);
  }

  const toggleFilterModal = () => {
    setFilterModal(!filterModal);
  }

  if (EditModal || createModal || DeleteModal) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  //handle change
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });

  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  }

  //validation
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName) {
      newErrors.customerName = 'Customer Name is required';
    } else if (formData.customerName.length < 3) {
      newErrors.customerName = 'Customer Name must be at least 3 characters';
    }
    if (!formData.stylistName) {
      newErrors.stylistName = 'Stylist Name is required';
    } else if (formData.stylistName.length < 3) {
      newErrors.stylistName = 'Stylist Name must be at least 3 characters';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  // submit edit form
  const handleSubmitEdit = async () => {
    try {

      const url = `https://673828ca4eb22e24fca7099b.mockapi.io/project/bookings/${selectedItem.id}`;
      const response = await axios.put(url, selectedItem);
      const updatedItem = response.data;
      setAppointmentList(
        AppointmentList.map((item) => (item.id === selectedItem.id ? { ...item, ...updatedItem } : item))
      );

      toast.error('Successfully updated');
      setEditModal(false);

    } catch (error) {
      console.log('Error saving customer:', error);
    }
  };
  //submit create form 
  const handleSubmitCreate = async () => {
    try {
      if (validateForm() === true) {
        const newId = Math.max(...AppointmentList.map((item) => parseInt(item.id, 10))) + 1
        const url = `https://673828ca4eb22e24fca7099b.mockapi.io/project/bookings`;
        const response = await axios.post(url, {
          ...formData,
          id: newId.toString(),
        });
        const newItem = response.data;

        setAppointmentList((AppointmentList) => [...AppointmentList, newItem]);

        toast.error('Successfully created');
        window.location.reload();
      } else {
        toast.error('Please fill in all required fields.');
      }

    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  //handle delete 
  const handleDelete = async () => {
    try {
      const url = `https://673828ca4eb22e24fca7099b.mockapi.io/project/bookings/${selectedItem.id}`;
      const response = await axios.delete(url);
      setAppointmentList((prev) => prev.filter((item) => item.id !== selectedItem.id));
      toast.error('Successfully deleted');
      setDeleteModal(false);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  //filter
  const [selectedFilter, setSelectedFilter] = useState(null);
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    console.log(selectedFilter);
    setSelectedFilter({ ...selectedFilter, [name]: value });
    setFilterModal(false);
  }
  const filterDataBySelect = (data, selectedFilter) => {
    return data.filter(item => {
      for (const option in selectedFilter) {
        if (selectedFilter[option] && item[option] !== selectedFilter[option]) {
          return false;
        }
      }
      return true;
    });
  }

  return (
    <div>
      <div className='mt-10 font-bold text-lg md:text-xl text-center uppercase tracking-wider'>Appointment List</div>
      <div className='flex flex-col sm:flex-row gap-4 mt-10 sm:ml-6 lg:ml-10 ml-6'>
        {/* create button */}
        <div className='text-sm sm:text-base flex justify-center border w-max px-4 py-2 transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500'>
          <button onClick={toggleCreateModal} className='font-semibold'>Create new appointment</button>
        </div>
        {/* filter button  */}
        <div className='text-sm sm:text-base border text-center w-[100px] sm:w-[150px] py-2 flex items-center justify-center trasform hover:scale-110 duration-500 hover:shadow hover:bg-black hover:text-white' onClick={toggleFilterModal}>
          <FontAwesomeIcon className='cursor-pointer' icon={faFilter} />
          <button className='w-[60px] font-semibold '>Filter</button>
        </div>
      </div>
      {/* ** FILTER MODAL ** */}
      <div className={
        `inset-0 fixed z-50 transform 
        ${filterModal ? "trasnslate-x-0" : "-translate-x-full"}  
        transition-transform duration-700 ease-in-out`
      }
      >

        <div className='bg-white opacity-70 top-0 left-0 right-0 bottom-0 w-full h-full fixed' onClick={toggleFilterModal} ></div>
        <div className='shadow-lg bg-white top-0  bottom-0 fixed z-50 xs:w-[340px]'>
          <div className='ml-5'>
            <div className='my-10'>
              <div className='flex justify-between items-center mb-5'>
                <div className='text-3xl uppercase'>Filter</div>
                <button className='close-modal mr-10 text-2xl' onClick={toggleFilterModal}><FontAwesomeIcon icon={faXmark} /></button>
              </div>
              <div className='lg:w-full h-[1px] bg-black'></div>
            </div>
            <div className='flex flex-col'>
              <div className='flex gap-2 items-center justify-between mb-6'>
                <div>Date</div>
                <input type="date" className='border p-2 w-[155px] mr-10' />
              </div>
              <div className='flex gap-2 items-center justify-between mb-6'>
                <div>Stylist Name</div>
                <select className='border p-2 w-[155px] mr-10' name="stylistName" onChange={handleFilterChange}>
                  {AppointmentList.map((option, index) => (
                    <option key={index} value={option.stylistName} onChange={handleFilterChange}>
                      {option.stylistName}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex gap-2 items-center justify-between mb-6'>
                <div>Service Type</div>
                <select className='border p-2 w-[155px] mr-10' name="serviceType" id="" onChange={handleFilterChange}>
                  {AppointmentList.map((option, index) => (
                    <option key={index} value={option.serviceType} onChange={handleFilterChange}>
                      {option.serviceType}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex gap-2 items-center justify-between'>
                <div>Status</div>
                <select className='border p-2 w-[155px] mr-10' name="status" id="" onChange={handleFilterChange}>
                  {AppointmentList.map((option, index) => (
                    <option key={index} value={option.status} onChange={handleFilterChange}>
                      {option.status}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        </div>
      </div >

      {/* table */}
      <div className='mt-5 xs:p-6 p-0'>
        <table className='w-full'>
          <thead className=''>
            <tr className='sm:text-base text-sm'>
              <th className="py-3 px-2 font-semibold text-center uppercase">Id</th>
              <th className="py-3 px-2 font-semibold text-center uppercase">Customer Name</th>
              <th className="hidden sm:table-cell py-3 px-2 font-semibold text-center uppercase">Stylist Name</th>
              <th className='hidden sm:table-cell py-3 px-2 font-semibold text-center uppercase'>Service Type</th>
              <th className="py-3 px-2 font-semibold text-center uppercase">Date</th>
              <th className='hidden md:table-cell py-3 px-2 font-semibold text-center uppercase'>Time</th>
              <th className='hidden md:table-cell py-3 px-2 font-semibold text-center uppercase'>Status</th>
              <th className="py-3 px-2 font-semibold text-center uppercase">Actions</th>
            </tr>

          </thead>
          <tbody className='text-center'>
            <tr>
              <td colSpan="8">
                <hr className="w-full border-gray-300 my-2" />
              </td>
            </tr>
            {filterDataBySelect(AppointmentList, selectedFilter).map((item) => {
              return (
                <tr key={item.id} className='sm:text-base text-sm'>
                  <td className='py-3 px-2'>{item.id}</td>
                  <td className='py-3 px-2'>{item.customerName}</td>
                  <td className='hidden sm:table-cell py-3 px-2'>{item.stylistName}</td>
                  <td className='py-3 px-2 hidden sm:table-cell'>{item.serviceType}</td>
                  <td className='py-3 px-2'>{item.date}</td>
                  <td className='py-3 px-2 hidden md:table-cell'>{item.time}</td>
                  <td className='py-3 px-2 hidden md:table-cell'>{item.status}</td>
                  <td className='flex justify-center items-center gap-1 sm:gap-2 py-3 px-2 sm:flex-row flex-col'>
                    <button onClick={() => toggleEditModal(item)} className='border transform hover:scale-110 hover:bg-gray-700 hover:bg-opacity-20 py-1 px-2 w-[70px] lg:w-[100px] transition-all ease-in-out duration-500'>Edit</button>
                    <button onClick={() => toggleDeleteModal(item)} className='border transform hover:scale-110 bg-red-500 text-white hover:bg-red-600 py-1 px-2 w-[70px] lg:w-[100px] transition-all ease-in-out duration-500'>Delete</button>
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>

      </div>

      {EditModal && (
        <div className='modal'>
          <div className='bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0' onClick={toggleEditModal}></div>
          <div className='modal-content rounded border shadow-md z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
           bg-white pb-16  w-[80%] md:w-[60%] lg:w-[35%] flex justify-center'>
            <div className='w-[90%]'>
              <div className='text-center font-bold text-xl uppercase tracking-wider my-10 '>Edit Form</div>
              <form action="">
                <div className='mb-2 xs:mx-10 mx-0'>
                  <label htmlFor="">Customer Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.customerName}
                    name='customerName'
                    onChange={handleEditChange}
                  />
                  {errors.customerName && <span className='text-red-500 italic text-sm'>{errors.customerName}</span>}
                </div>
                <div className='mb-2 xs:mx-10 mx-0'>
                  <label htmlFor="">Stylist Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.stylistName}
                    name='stylistName'
                    onChange={handleEditChange}
                  />
                  {errors.stylistName && <span className='text-red-500 italic text-sm'>{errors.stylistName}</span>}
                </div>
                <div className='mb-2 xs:mx-10 mx-0'>
                  <label htmlFor="">Service Type</label> <br />
                  <select
                    name='serviceType'
                    id="" onChange={handleEditChange}
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.serviceType}
                  >
                    <option onChange={handleEditChange}
                      value="Hair cut">
                      Hair cut
                    </option>
                    <option
                      onChange={handleEditChange}
                      value="Hair color">
                      Hair color
                    </option>
                    <option
                      onChange={handleEditChange}
                      value="Haircut & Beard Trim">
                      Haircut & Beard Trim
                    </option>
                    <option
                      onChange={handleEditChange}
                      value="Blow Dry">
                      Blow Dry
                    </option>
                  </select>
                  {errors.serviceType && <span className='text-red-500 italic text-sm'>{errors.serviceType}</span>}
                </div>
                <div className='mb-2 xs:mx-10 mx-0'>
                  <label htmlFor="">Date</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.date}
                    name='date'
                    onChange={handleEditChange}
                  />
                  {errors.date && <span className='text-red-500 italic text-sm'>{errors.date}</span>}
                </div>
                <div className='mb-2 xs:mx-10 mx-0'>
                  <label htmlFor="">Time</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.time}
                    name='time'
                    onChange={handleEditChange}
                  />
                  {errors.time && <span className='text-red-500 italic text-sm'>{errors.time}</span>}
                </div>
                <div className='flex justify-center items-center gap-4 mt-10'>
                  <div onClick={handleSubmitEdit} className='cursor-pointer text-center bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Save</div>
                  <div onClick={toggleEditModal} className='cursor-pointer text-center bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500' >Cancel</div>
                </div>
              </form>
            </div>

          </div>

        </div>
      )
      }

      {DeleteModal && (
        <div className='modal'>
          <div className='bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0' onClick={toggleDeleteModal}></div>
          <div className='modal-content rounded border shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-16 py-16 w-[80%] md:w-[50%] lg:w-[35%]'>
            <div>
              <p className='text-center text-lg'>Are you sure you want to delete this appointment?</p>
              <div className='flex justify-center items-center gap-4 mt-10'>
                <button onClick={handleDelete} className='bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Yes</button>
                <button onClick={toggleDeleteModal} className='bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500' >No</button>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {createModal && (
        <div className='modal '>
          <div className='bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0' onClick={toggleCreateModal} ></div>
          <div className='modal-content rounded border shadow-md z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
           bg-white pb-16  w-[80%] md:w-[60%] lg:w-[35%] flex justify-center'>
            <div className='w-[80%]'>
              <form action="">
                <div className='text-lg text-center font-bold uppercase tracking-wider my-10'>Create New Appointment</div>
                <div className='mb-2'>
                  <label htmlFor="">Customer Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.customerName}
                    name='customerName'
                    onChange={handleCreateChange}
                    placeholder='Enter customer name'
                  />
                  {errors.customerName && <span className='text-red-500 italic text-sm'>{errors.customerName}</span>}
                </div>
                <div className='mb-2'>
                  <label htmlFor="">Stylist Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.stylistName}
                    name='stylistName'
                    onChange={handleCreateChange}
                    placeholder='Enter stylist name'

                  />
                  {errors.stylistName && <span className='text-red-500 italic text-sm'>{errors.stylistName}</span>}
                </div>
                <div className='mb-2'>
                  <label>Service Type</label> <br />
                  <select name='serviceType' id="" onChange={handleCreateChange} className='w-full border border-gray-400 p-2 hover:border-black'>
                    <option
                      onChange={handleCreateChange}
                      value="Hair cut">
                      Hair cut
                    </option>
                    <option
                      onChange={handleCreateChange}
                      value="Hair color">
                      Hair color
                    </option>
                    <option
                      onChange={handleCreateChange}
                      value="Haircut & Beard Trim">
                      Haircut & Beard Trim
                    </option>
                    <option
                      onChange={handleCreateChange}
                      value="Blow Dry">
                      Blow Dry
                    </option>
                  </select>

                </div>
                <div className='mb-2'>
                  <label htmlFor="">Date</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.date}
                    name='date'
                    onChange={handleCreateChange}
                    placeholder='Enter yyyy-MM-dd hh:mm:ss'
                  />
                  {errors.date && <span className='text-red-500 italic text-sm'>{errors.date}</span>}
                </div>
                <div className=''>
                  <label htmlFor="">Time</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.time}
                    name='time'
                    onChange={handleCreateChange}
                    placeholder='Enter time'
                  />
                  {errors.time && <span className='text-red-500 italic text-sm'>{errors.time}</span>}
                </div>
                <div className='flex justify-center items-center gap-4 mt-10'>
                  <div onClick={handleSubmitCreate} className='cursor-pointer text-center bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Save</div>
                  <div onClick={toggleCreateModal} className='cursor-pointer text-center bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500' >Cancel</div>
                </div>
              </form>
            </div>

          </div>

        </div>
      )
      }
      {/* pagination */}
      <div className='w-[75%] sm:w-[70%] lg:w-[50%] mx-auto my-10 cursor-pointer text-sm lg:text-lg'>
        <div className='flex gap-2 justify-between p-4'>
          <div className='w-24 text-center'>
            <p className='italic hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>← Prevous</p>
          </div>
          <div className='flex gap-1'>
            <p className='w-4 sm:w-12 text-center bg-black rounded text-white'>1</p>
            <p className='w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>2</p>
            <p className='w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>3</p>
            <p className='w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>...</p>
            <p className='w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>9</p>
          </div>
          <div className='w-24 text-center'>
            <p className='italic hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>Next →</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default StaffManagement
