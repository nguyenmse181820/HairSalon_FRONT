import React from 'react'
import textLogo from '../assets/white-text-logo.png'

const Footer = () => {
    return (
        <div className='bg-black'>
            <div className="pt-16 pb-16">
                <p className='fw-semibold text-white text-center'><i>&copy; 2024 Coiffure Inc.</i></p>
            </div>
            <div className={`d-flex justify-content-center align-items-center pb-16`}>
                <img src={textLogo} alt="Text Logo" className="mx-auto d-block" style={{ width: '60vw', height: 'auto', objectFit: 'contain' }} />
            </div>
        </div>
    )
}

export default Footer
