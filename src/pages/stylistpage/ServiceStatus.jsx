import React from 'react'

function ServiceStatus() {
    const services = [
        {
            id: 1,
            stylistName: 'John Doe',
            serviceType: 'Haircut',       
            date: '2023-09-01',
            time: '30 min',
            status: 'Completed'
        },
        {
            id: 2,
            stylistName: 'Jane Smith',
            serviceType: 'Haircut',
            date: '2023-09-02',
            time: '60 min',
            status: 'Doing'
        }
    ]
    return (
        <div>
            <div className='mx-auto py-2 px-2 font-bold text-xl ml-10 text-center'>Service Status</div>
            <div className='shadow-lg flex flex-col mt-10 mb-10 mx-6 lg:mx-10 text-sm lg:text-lg'>
                <table className='table-auto border border-solid border-l-0 border-r-0'>
                    <thead className=''>
                        <tr>
                            <th>Stt</th>
                            <th>Stylist Name</th>
                            <th className='hidden sm:table-cell'>Service Type</th>              
                            <th>Date</th>
                            <th className='hidden sm:table-cell'>Time</th>
                            <th>Status</th>
                        </tr>

                    </thead>
                    <tbody className='text-center'>
                        {services.map((service) => {
                            return (
                                <tr key={service.id} className=''>
                                    <td>{service.id}</td>
                                    <td>{service.stylistName}</td>
                                    <td className='hidden sm:table-cell'>{service.serviceType}</td>
                                    <td>{service.date}</td>
                                    <td className='hidden sm:table-cell'>{service.time}</td>
                                    <td>{service.status}</td>
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

export default ServiceStatus
