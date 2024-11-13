import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';


function Bookings() {
  const [modal, setModal] = useState(false);
  const bookings = [
    {
      stt: 1,
      customerName: 'John Doe',
      stylistName: 'Stylist 1',
      serviceType: 'Haircut',
      date: '10:00 AM, 2023-06-01',
      time: '30 mins',
      status: 'Completed',
    },
    {
      stt: 2,
      customerName: 'John Doe',
      stylistName: 'Stylist 1',
      serviceType: 'Haircut',
      date: '10:00 AM, 2023-06-01',
      time: '30 mins',
      status: 'Doing',
    }
  ];

  const toggleFilterModal = () => {
    setModal(!modal);
  }

  return (
    <div>
      <div className='sm:ml-10 mx-5 shadow-lg sm:w-1/4 w-3/4 '>
        <div className='p-4'>
          <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-1'>Summary</label>
          <div>Total Booking: 2</div>
          <div>Total Stylist available: 2</div>
        </div>
      </div>
      <div className='my-10 font-bold text-lg md:text-xl text-center uppercase tracking-wider'>Booking List</div>

      {/* **FILTER BUTTON** */}
      <div className='ml-6 lg:ml-10 text-sm sm:text-base border text-center w-[100px] sm:w-[150px] py-2 sm:py-4 flex items-center justify-center trasform hover:scale-110 duration-500 hover:shadow hover:bg-black hover:text-white' onClick={toggleFilterModal}>
        <FontAwesomeIcon className='cursor-pointer' icon={faFilter} />
        <button className='w-[60px] font-semibold '>Filter</button>
      </div>

      {/* ** FILTER MODAL ** */}
      <div className={
        `inset-0 fixed z-50 transform 
        ${modal ? "trasnslate-x-0" : "-translate-x-full"}  
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

      {/* **TABLE** */}
      <div className='mt-5 xs:p-6 p-0'>
        <table className='w-full border-collapse'>
          <thead className=''>
            <tr className='sm:text-base text-sm'>
              <th className="py-3 px-2 font-semibold text-center uppercase">Stt</th>
              <th className="py-3 px-2 font-semibold text-center uppercase">Customer Name</th>
              <th className="hidden sm:table-cell py-3 px-2 font-semibold text-center uppercase">Stylist Name</th>
              <th className='hidden sm:table-cell py-3 px-2 font-semibold text-center uppercase'>Service Type</th>
              <th className="py-3 px-2 font-semibold text-center uppercase">Date</th>
              <th className='hidden sm:table-cell py-3 px-2 font-semibold text-center uppercase'>Time</th>
              <th className="py-3 px-2 font-semibold text-center uppercase">Status</th>
            </tr>

          </thead>
          <tbody className='text-center'>
            <tr>
              <td colSpan="7">
                <hr className="w-full border-gray-300 my-2" />
              </td>
            </tr>
            {bookings.map((item) => {
              return (
                <tr key={item.stt} className='sm:text-base text-sm'>
                  <td className='py-3 px-2'>{item.stt}</td>
                  <td className='py-3 px-2'>{item.customerName}</td>
                  <td className='hidden sm:table-cell py-3 px-2'>{item.stylistName}</td>
                  <td className='hidden sm:table-cell py-3 px-2'>{item.serviceType}</td>
                  <td className='py-3 px-2'>{item.date}</td>
                  <td className='hidden sm:table-cell py-3 px-2'>{item.time}</td>
                  <td className='flex justify-center py-3 px-2'>
                    <div className=''>{item.status}</div>
                  </td>
                </tr>
              )
            })
            }

          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Bookings

