import React from 'react'

function Bookings() {
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
  ]

  return (
    <div>
      <div className='mx-auto text-center font-bold text-xl mt-10'>Booking List</div>
      <div className='shadow-lg flex flex-col mt-10 mb-10 mx-6 lg:mx-10 text-sm lg:text-lg'>
        <table className='table-auto border border-solid border-l-0 border-r-0'>
          <thead className=''>
            <tr>
              <th>Stt</th>
              <th>Customer Name</th>
              <th>Stylist Name</th>
              <th className='hidden sm:table-cell'>Service Type</th>
              <th>Date</th>
              <th className='hidden sm:table-cell'>Time</th>
              <th>Status</th>
            </tr>

          </thead>
          <tbody className='text-center  '>
            {bookings.map((item) => {
              return (
                <tr key={item.stt} className=''>
                  <td className='py-4'>{item.stt}</td>
                  <td className='py-4'>{item.customerName}</td>
                  <td className='py-4'>{item.stylistName}</td>
                  <td className='hidden sm:table-cell py-4'>{item.serviceType}</td>
                  <td className='py-4'>{item.date}</td>
                  <td className='hidden sm:table-cell py-4'>{item.time}</td>
                  <td className='flex justify-center py-4'>
                    <div className=''>{item.status}</div>
                  </td>
                </tr>
              )
            })
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Bookings

