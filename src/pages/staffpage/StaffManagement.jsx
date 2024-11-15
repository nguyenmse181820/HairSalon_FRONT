import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import '../../css/ScheduleManagement.css'
import { toast } from 'sonner';

function StaffManagement() {
  const [AppointmentList, setAppointmentList] = useState([
    {
      Id: 1,
      customerName: 'John Ngo',
      stylistName: 'Stylist 1',
      serviceType: 'Type 1',
      date: '2024-01-09',
      status: 'Doing'
    },
    {
      Id: 2,
      customerName: 'John Doe',
      stylistName: 'Stylist 1',
      serviceType: 'Type 2',
      date: '2024-01-09',
      status: 'Done'
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
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  //handle change
  const handleEditChange = (event) => {
    setSelectedItem({
      ...selectedItem,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

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

    // valid date
    if (!formData.date.trim()) {
      validationErrors.date = 'Date is required';
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      toast.error('Form submitted successfully');
      console.log(formData);
    }
  };


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
      {/* Filter modal */}
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
                <input className='border mr-10 p-2 w-[155px]' type="date" />
              </div>
              <div className='flex gap-2 items-center justify-between mb-6'>
                <div>Stylist Name</div>
                <select className='border p-2 w-[155px] mr-10' name="" id="">
                  <option value="">Stylist 1</option>
                  <option value="">Stylist 2</option>
                  <option value="">Stylist 3</option>
                  <option value="">Stylist 4</option>
                  <option value="">Stylist 5</option>
                </select>
              </div>
              <div className='flex gap-2 items-center justify-between mb-6'>
                <div>Service Type</div>
                <select className='border p-2 w-[155px] mr-10' name="" id="">
                  <option value="">Service 1</option>
                  <option value="">Service 2</option>
                  <option value="">Service 3</option>
                  <option value="">Service 4</option>
                  <option value="">Service 5</option>
                </select>
              </div>
              <div className='flex gap-2 items-center justify-between'>
                <div>Status</div>
                <select className='border p-2 w-[155px] mr-10' name="" id="">
                  <option value="">All</option>
                  <option value="">Doing</option>
                  <option value="">Completed 1</option>
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
              <th className='hidden sm:table-cell py-3 px-2 font-semibold text-center uppercase'>Status</th>
              <th className="py-3 px-2 font-semibold text-center uppercase">Actions</th>
            </tr>

          </thead>
          <tbody className='text-center'>
            <tr>
              <td colSpan="6">
                <hr className="w-full border-gray-300 my-2" />
              </td>
            </tr>
            {AppointmentList.map((item) => {
              return (
                <tr key={item.Id} className='sm:text-base text-sm'>
                  <td className='py-3 px-2'>{item.Id}</td>
                  <td className='py-3 px-2'>{item.customerName}</td>
                  <td className='hidden sm:table-cell py-3 px-2'>{item.stylistName}</td>
                  <td className='py-3 px-2 hidden sm:table-cell'>{item.serviceType}</td>
                  <td className='py-3 px-2'>{item.date}</td>
                  <td className='py-3 px-2 hidden sm:table-cell'>{item.status}</td>
                  <td className='flex justify-center items-center gap-1 sm:gap-2 py-3 px-2 sm:flex-row flex-col'>
                    <button onClick={() => toggleEditModal(item)} className='border transform hover:scale-110 hover:bg-gray-700 hover:bg-opacity-20 py-1 px-2 w-[80%]  lg:w-[100px] transition-all ease-in-out duration-500'>Edit</button>
                    <button onClick={() => toggleDeleteModal(item)} className='border transform hover:scale-110 bg-red-500 text-white hover:bg-red-600 py-1 px-2 w-[80%] lg:w-[100px] transition-all ease-in-out duration-500'>Delete</button>
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
          <div className='modal-content z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white pb-16  w-[80%] md:w-[60%] lg:w-[45%] flex justify-center'>
            <div className='w-[80%]'>
              <div className='text-center font-bold text-xl uppercase tracking-wider my-10 '>Edit Form</div>
              <form action="">
                <div className='mb-4 mx-10'>
                  <label htmlFor="">Customer Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.customerName}
                    name='customerName'
                    onChange={handleEditChange}
                  />
                  {errors.customerName && <span className='text-red-500 italic text-sm'>{errors.customerName}</span>}
                </div>
                <div className='mb-4 mx-10'>
                  <label htmlFor="">Stylist Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={selectedItem.stylistName}
                    name='stylistName'
                    onChange={handleEditChange}
                  />
                  {errors.stylistName && <span className='text-red-500 italic text-sm'>{errors.stylistName}</span>}
                </div>
                <div className='mb-4 mx-10'>
                  <label htmlFor="">Service Type</label> <br />
                  <select
                    name='serviceType'
                    id="" onChange={handleEditChange}
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
                    onChange={handleEditChange}
                  />
                  {errors.date && <span className='text-red-500 italic text-sm'>{errors.date}</span>}
                </div>
                <div className='flex justify-center items-center gap-4 mt-10'>
                  <button onClick={handleSubmit} className='bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Save</button>
                  <button onClick={toggleEditModal} className='bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500' >Cancel</button>
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
                <button className='bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Yes</button>
                <button onClick={toggleDeleteModal} className='bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500' >No</button>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {createModal && (
        <div className='modal '>
          <div className='bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0' ></div>
          <div className='modal-content fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-16 mt-10 md:mt-16 lg:mt-[100px] w-[80%] md:w-[60%] lg:w-[45%] flex justify-center'>
            <div className='w-[80%]'>
              <form action="">
                <div className='text-lg text-center font-bold uppercase tracking-wider mb-10'>Create New Appointment</div>
                <div className='mb-4'>
                  <label htmlFor="">Customer Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.customerName}
                    name='customerName'
                    onChange={handleCreateChange}
                  />
                  {errors.customerName && <span className='text-red-500 italic text-sm'>{errors.customerName}</span>}
                </div>
                <div className='mb-4'>
                  <label htmlFor="">Stylist Name</label> <br />
                  <input type="text"
                    className='w-full border border-gray-400 p-2 hover:border-black'
                    value={formData.stylistName}
                    name='stylistName'
                    onChange={handleCreateChange}
                  />
                  {errors.stylistName && <span className='text-red-500 italic text-sm'>{errors.stylistName}</span>}
                </div>
                <div className='mb-4'>
                  <label htmlFor="">Service Type</label> <br />
                  <select name='serviceType' id="" onChange={handleCreateChange} className='w-full border border-gray-400 p-2 hover:border-black'>
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
                    onChange={handleCreateChange}
                  />
                  {errors.date && <span className='text-red-500 italic text-sm'>{errors.date}</span>}
                </div>
                <div className='flex justify-center items-center gap-4 mt-20'>
                  <button onClick={handleSubmit} className='bg-white text-black border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-black hover:text-white transition-all ease-in-out duration-500'>Save</button>
                  <button onClick={toggleCreateModal} className='bg-black text-white border px-4 py-2 w-[100px] transform hover:scale-110 hover:bg-white hover:text-black transition-all ease-in-out duration-500' >Cancel</button>
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
