import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ServiceStatus() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/appointment').then((res) => {
            setServices(res.data)
        })
            .catch((err) => {
                console.log(err)
            })
    })
    return (
        <div>
            <div className='mt-10 font-bold text-lg md:text-xl text-center uppercase tracking-wider'>Service Status</div>
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
                                    <td className='py-4'>{service.id}</td>
                                    <td className='py-4'>{service.customerName}</td>
                                    <td className='hidden sm:table-cell py-4'>{service.serviceType}</td>
                                    <td className='py-4'>{service.date}</td>
                                    <td className='hidden sm:table-cell py-4'>{service.time}</td>
                                    <td className='py-4'>{service.status}</td>
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
