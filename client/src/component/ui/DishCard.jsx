import React, { useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function DishCard({ dish, handleDelete }) {
  const container = useRef();

  // Using useEffect for animation
  useGSAP(() => {
    gsap.from(container.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease:"power1.out"
    });
  }, {scope:container});

  return (
    <div ref={container} className='dishCard shadow flex justify-between w-full gap-3 p-4 bg-[#FADFCB] rounded-xl md:gap-5 transition-all ease-in-out duration-200'>
      <div className='flex flex-col w-4/6'>
        <p className='font-semibold text-orange-900'>{(dish.dish_name).toString().toUpperCase()}</p>
        <p className='text-gray-500'>No of order : {dish.total_order || 0}</p>
      </div>

      <div className='flex flex-col-reverse items-center w-2/6 p-2 gap-2'>
        <div className='flex justify-end gap-5 w-full'>
          <button onClick={() => { handleDelete(dish["_id"]) }}>
            <MdDelete className='text-red-400 text-xl' />
          </button>
        </div>
        
        <div className='flex gap-5 w-full justify-center'>
          {
            dish.priceCol && dish.priceCol.length > 0
              ? dish.priceCol.map((d) => (
                  <div className='flex flex-col items-center w-full' key={d['_id']}>
                    <p className='text-md md:text-md'>{d.name}</p>
                    <p className='font-semibold'>{d.price || "NA"}</p>
                  </div>
                ))
              : <p>No Price is available</p>
          }
        </div>
      </div>
    </div>
  );
}

export default DishCard;
