import React, { useState, useRef } from 'react'

function StylistAssignment() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        stylistName: '',
        email: '',
        phone: '',
        address: '',
        age: '',
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {}

        // valid userName
        if (!formData.userName.trim()) {
            validationErrors.userName = 'User name is required';
        } else if (formData.userName.length < 3) {
            validationErrors.userName = 'User name must be at least 3 characters';
        }
        // valid password
        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters';
        }
        // valid stylistName
        if (!formData.stylistName.trim()) {
            validationErrors.stylistName = 'Stylist name is required';
        } else if (formData.stylistName.length < 3) {
            validationErrors.stylistName = 'Stylist name must be at least 3 characters';
        }
        // valid email
        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required'
        } else if (/\S+@\S\.\S+/.test(formData.email)) {
            validationErrors.email = 'Invalid email address'
        }
        // valid phone
        if (!formData.phone.trim()) {
            validationErrors.phone = 'Phone number is required'
        } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.phone)) {
            validationErrors.phone = 'Invalid phone number'
        } else if (formData.phone.length < 10 || formData.phone.length > 10) {
            validationErrors.phone = 'Phone number must be at least 10 and at most 10 characters'
        }
        // valid address
        if (!formData.address.trim()) {
            validationErrors.address = 'Address is required'
        }
        // valid age
        if (!formData.age.trim()) {
            validationErrors.age = 'Age is required'
        } else if (!/^[0-9]+$/.test(formData.age)) {
            validationErrors.age = 'Invalid age'
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            alert('Form submitted successfully');
            console.log(formData);
        }
    };

    const handleReset = () => {
        setFormData({
            userName: '',
            password: '',
            stylistName: '',
            email: '',
            phone: '',
            address: '',
            age: '',
        });
        setErrors({});
    };

    return (
        <div>
            <div className='mt-10 font-bold text-lg md:text-xl text-center uppercase tracking-wider'>Stylist Assignment</div>
            <div className='flex justify-center items-center'>
                <form action="" className='bg-white shadow-lg border border-solid mt-10 mb-10 lg:mx-10 text-sm lg:text-lg w-[80%] md:w-[50%] lg:w-[35%] mx-auto'>
                    <div className='py-9'>
                        <div className='mb-4 mx-10'>
                            <label className='py-2'>User Name</label> <br />
                            <input type="text"
                                name='userName'
                                placeholder='Enter user name'
                                value={formData.userName}
                                className='w-full border border-solid hover:border-black p-2'
                                onChange={handleChange}
                            />
                            {errors.userName && <span className='text-red-500 text-sm italic'>{errors.userName}</span>}
                        </div>
                        <div className='mb-4 mx-10'>
                            <label className='py-2'>Passworwd</label> <br />
                            <input type="password"
                                name='password'
                                placeholder='Enter password' value={formData.password}
                                className='w-full border border-solid hover:border-black p-2'
                                onChange={handleChange}
                            />
                            {errors.password && <span className='text-red-500 text-sm italic'>{errors.password}</span>}
                        </div>
                        <div className='mb-4 mx-10'>
                            <label className='py-2'>Stylist Name</label> <br />
                            <input type="text"
                                name='stylistName'
                                placeholder='Enter stylist name'
                                value={formData.stylistName}
                                className='w-full border border-solid hover:border-black p-2'
                                onChange={handleChange}
                            />
                            {errors.stylistName && <span className='text-red-500 text-sm italic'>{errors.stylistName}</span>}
                        </div>
                        <div className='mb-4 mx-10'>
                            <label className='py-2'>Email</label> <br />
                            <input type="email"
                                name='email'
                                placeholder='Enter email'
                                value={formData.email}
                                className='w-full border border-solid hover:border-black p-2'
                                onChange={handleChange} />
                            {errors.email && <span className='text-red-500 text-sm italic'>{errors.email}</span>}
                        </div>
                        <div className='mb-4 mx-10'>
                            <label className='py-2'>Phone</label> <br />
                            <input type="text"
                                name='phone'
                                placeholder='Enter phone number'
                                value={formData.phone}
                                className='w-full border border-solid hover:border-black p-2'
                                onChange={handleChange} />
                            {errors.phone && <span className='text-red-500 text-sm italic'>{errors.phone}</span>}
                        </div>
                        <div className='mb-4 mx-10'>
                            <label className='py-2'>Address</label> <br />
                            <input type="text"
                                name='address'
                                placeholder='Enter address'
                                value={formData.address}
                                className='w-full border border-solid hover:border-black p-2'
                                onChange={handleChange} />
                            {errors.address && <span className='text-red-500 text-sm italic'>{errors.address}</span>}
                        </div>
                        <div className='mb-4 mx-10'>
                            <label className='py-2'>Age</label> <br />
                            <input type="number"
                                name='age'
                                placeholder='Enter age'
                                value={formData.age}
                                className='w-full border border-solid hover:border-black p-2'
                                onChange={handleChange} />
                            {errors.age && <span className='text-red-500 text-sm italic'>{errors.age}</span>}
                        </div>
                        <div className='flex flex-col md:flex-row lg:flex-row justify-center items-center  mt-10 px-4 mb-7 gap-7'>
                            <button onClick={handleSubmit} className='bg-black text-white trasform hover:scale-110  hover:bg-white hover:text-black border transion-all ease-in-out duration-500 py-2 px-4 w-[100px]'>Submit</button>
                            <button onClick={handleReset} className='bg-white text-black  trasform hover:scale-110 hover:bg-black hover:text-white border transion-all ease-in-out duration-500 py-2 px-4 w-[100px]'>Clear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StylistAssignment
