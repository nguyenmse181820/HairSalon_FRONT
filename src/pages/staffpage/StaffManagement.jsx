import React, { useState } from 'react'
import '../../css/ScheduleManagement.css'

function StaffManagement() {
  const [AppointmentList, setAppointmentList] = useState([
    {
      Id: 1,
      customerName: 'John Ngo',
      stylistName: 'Stylist 1',
      serviceType: 'Type 1',
      date: '2024-01-09',
    },
    {
      Id: 2,
      customerName: 'John Doe',
      stylistName: 'Stylist 1',
      serviceType: 'Type 2',
      date: '2024-01-09',
    },
  ]);

  const [formData, setFormData] = useState({
    customerName: '',
    stylistName: '',
    serviceType: '',
    date: '',
  });

  const [EditModal, setEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

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

  if (EditModal || createModal || DeleteModal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  //handle change
  const handleChange = (event) => {
    setSelectedItem({
      ...selectedItem,
      [event.target.name]: event.target.value,
    });
  };

  //validation 
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {}

    // valid customerName
    if (!formData.customerName.trim()) {
      validationErrors.customerName = 'Customer name is required';
    } else if (formData.customerName.length < 3) {
      validationErrors.customerName = 'Customer name must be at least 3 characters';
    }
    // valid stylistName
    if (!formData.stylistName.trim()) {
      validationErrors.stylistName = 'Stylist name is required';
    } else if (formData.stylistName.length < 3) {
      validationErrors.stylistName = 'Stylist name must be at least 3 characters';
    }
    // valid serviceType
    if (!formData.serviceType.trim()) {
      validationErrors.serviceType = 'Service type is required';
    }
    // valid date
    if (!formData.date.trim()) {
      validationErrors.date = 'Date is required';
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted successfully');
      console.log(formData);
    }
  };


  return (
    <div>
      <div className='mx-auto text-center font-bold text-xl mt-10 uppercase'>Appointment List</div>
      <div className='flex sm:justify-start justify-center'>
        <button onClick={toggleCreateModal} className='flex justify-center mt-10 sm:ml-6 md:ml-6 lg:ml-10 ml-0 border w-max px-4 py-2 hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Create new appointment</button>
      </div>
      <div className='shadow-lg flex flex-col mt-10 mb-10 mx-6 lg:mx-10 text-sm sm:text-lg'>
        <table className='table-auto border border-solid border-l-0 border-r-0'>
          <thead className=''>
            <tr>
              <th>Id</th>
              <th>Customer Name</th>
              <th>Stylist Name</th>
              <th className='hidden sm:table-cell'>Service Type</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>

          </thead>
          <tbody className='text-center'>
            {AppointmentList.map((item) => {
              return (
                <tr key={item.Id} className=''>
                  <td className='py-4'>{item.Id}</td>
                  <td className='py-4'>{item.customerName}</td>
                  <td className='py-4'>{item.stylistName}</td>
                  <td className='hidden sm:table-cell py-4'>{item.serviceType}</td>
                  <td className='py-4'>{item.date}</td>
                  <td className='flex justify-center items-center gap-4 py-4 sm:flex-row flex-col'>
                    <button onClick={() => toggleEditModal(item)} className='border hover:bg-gray-700 hover:bg-opacity-20 py-1 px-2 w-[70%] sm:w-[100px] transition-all ease-in-out duration-500'>Edit</button>
                    <button onClick={() => toggleDeleteModal(item)} className='border bg-red-500 text-white hover:bg-red-600 py-1 px-2 w-[70%] sm:w-[100px] transition-all ease-in-out duration-500'>Delete</button>
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
          <div className='modal-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-16 py-16 w-[80%] md:w-[50%] lg:w-[35%]'>
            <div>
              <div className='text-center font-bold text-xl uppercase tracking-wider my-10 '>Edit Form</div>
              <form action="">
                <div className='mb-4 mx-10'>
                  <label htmlFor="">Customer Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.customerName}
                    name='customerName'
                    onChange={handleChange}
                  />
                  {errors.customerName && <span className='text-red-500 italic text-sm'>{errors.customerName}</span>}
                </div>
                <div className='mb-4 mx-10'>
                  <label htmlFor="">Stylist Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.stylistName}
                    name='stylistName'
                    onChange={handleChange}
                  />
                  {errors.stylistName && <span className='text-red-500 italic text-sm'>{errors.stylistName}</span>}
                </div>
                <div className='mb-4 mx-10'>
                  <label htmlFor="">Service Type</label> <br />
                  <select
                    name='serviceType'
                    id="" onChange={handleChange}
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.serviceType}
                  >
                    <option value={selectedItem.serviceType}>Type 1</option>
                    <option value={selectedItem.serviceType}>Type 2</option>
                    <option value={selectedItem.serviceType}>Type 3</option>
                    <option value={selectedItem.serviceType}>Type 4</option>
                    <option value={selectedItem.serviceType}>Type 5</option>
                  </select>
                  {errors.serviceType && <span className='text-red-500 italic text-sm'>{errors.serviceType}</span>}
                </div>
                <div className='mb-4 mx-10'>
                  <label htmlFor="">Date</label> <br />
                  <input type="date"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.date}
                    name='date'
                    onChange={handleChange}
                  />
                  {errors.date && <span className='text-red-500 italic text-sm'>{errors.date}</span>}
                </div>
                <div className='flex justify-center items-center gap-4 mt-10'>
                  <button onClick={handleSubmit} className='bg-white text-black border px-4 py-2 w-[100px] hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Save</button>
                  <button onClick={toggleEditModal} className='bg-black text-white border px-4 py-2 w-[100px] hover:bg-white hover:text-black transition-all ease-in-out duration-500' >Cancel</button>
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
          <div className='modal-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-16 py-16 w-[80%] md:w-[50%] lg:w-[35%]'>
            <div>
              <p className='text-center text-lg'>Are you sure you want to delete this appointment?</p>
              <div className='flex justify-center items-center gap-4 mt-10'>
                <button className='bg-white text-black border px-4 py-2 w-[100px] hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Yes</button>
                <button onClick={toggleDeleteModal} className='bg-black text-white border px-4 py-2 w-[100px] hover:bg-white hover:text-black transition-all ease-in-out duration-500' >No</button>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {createModal && (
        <div className='modal '>
          <div className='bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0' ></div>
          <div className='modal-content fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-16 py-12 mt-10 md:mt-16 lg:mt-[100px] w-[80%] md:w-[50%] lg:w-[35%]'>
            <div>
              <form action="">
                <div className='text-lg text-center font-bold uppercase tracking-wider mb-10'>Create New Appointment</div>
                <div className='mb-4'>
                  <label htmlFor="">Customer Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.customerName}
                    name='customerName'
                    onChange={handleChange}
                  />
                  {errors.customerName && <span className='text-red-500 italic text-sm'>{errors.customerName}</span>}
                </div>
                <div className='mb-4'>
                  <label htmlFor="">Stylist Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.stylistName}
                    name='stylistName'
                    onChange={handleChange}
                  />
                  {errors.stylistName && <span className='text-red-500 italic text-sm'>{errors.stylistName}</span>}
                </div>
                <div className='mb-4'>
                  <label htmlFor="">Service Type</label> <br />
                  <select name='serviceType' id="" onChange={handleChange} className='w-full border border-gray-400 p-2 hover:border-black'>
                    <option value={formData.serviceType}>Type 1</option>
                    <option value={formData.serviceType}>Type 2</option>
                    <option value={formData.serviceType}>Type 3</option>
                    <option value={formData.serviceType}>Type 4</option>
                    <option value={formData.serviceType}>Type 5</option>
                  </select>

                  {errors.serviceType && <span className='text-red-500 italic text-sm'>{errors.serviceType}</span>}
                </div>
                <div className=''>
                  <label htmlFor="">Date</label> <br />
                  <input type="date"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.date}
                    name='date'
                    onChange={handleChange}
                  />
                  {errors.date && <span className='text-red-500 italic text-sm'>{errors.date}</span>}
                </div>
                <div className='flex justify-center items-center gap-4 mt-20'>
                  <button onClick={handleSubmit} className='bg-white text-black border px-4 py-2 w-[100px] hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Save</button>
                  <button onClick={toggleCreateModal} className='bg-black text-white border px-4 py-2 w-[100px] hover:bg-white hover:text-black transition-all ease-in-out duration-500' >Cancel</button>
                </div>
              </form>
            </div>

          </div>

        </div>
      )
      }
    </div>
  )
}

export default StaffManagement
