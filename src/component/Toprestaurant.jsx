import React, { useState } from 'react'
import Restuarantcard from './Restuarantcard';

function Toprestaurant({ data = [],title }) {
  const [value, setValue] = useState(0);
  
  function handleprev() {
    value == 0 ? "" : setValue((prev) => prev - 42)
  }
  function handlenext() {
    setValue((prev) => prev + 42)
  }
  return (
    <div>
      <div className='flex justify-between mt-10'>
        <h1 className='font-bold text-2xl'>{title} </h1>
        <div className='flex  gap-3'>
          <div onClick={handleprev} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
            <i className={`fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" : "text-gray-800")}></i>
          </div>
          <div onClick={handlenext} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")} >
            <i className={`fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 196 ? "text-gray-400" : "text-gray-800")}></i>
          </div>
        </div>
      </div>
      <div className={`flex  mt-2 gap-5 w-full duration-300 `} style={{ translate: `-${value}%` }}>
        {data.map(({info , cta:{link}}) => (
          <div key={info.id} className='hover:scale-95 transition-transform duration-300 '>
            <Restuarantcard {...info} link={link} />
          </div>
        ))}
      </div>
      <hr className='border' />
    </div>
  )
}

export default Toprestaurant
