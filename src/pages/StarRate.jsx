import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import {AiOutlineStar} from 'react-icons/ai'

const StarRate = ({ star }) => {

    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let num = index + 0.5;
        return (
            <span key={index} className='text-yellow-400'>
                {
                    star >= index + 1 ? (
                        <FaStar />
                    ) : star >= num ? (
                        <FaStarHalf />
                    ) : (
                        <AiOutlineStar />
                    )
                }
            </span>
        );
    });

  return (
        <div className='flex'>
            {ratingStar}
        </div>
    )
}

export default StarRate
