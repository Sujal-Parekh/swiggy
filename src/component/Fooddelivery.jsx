import React, { useState } from 'react'
import Restuarantcard from './Restuarantcard'
import { useDispatch } from 'react-redux'
import { setfiltervalue } from '../utils/filterslice'

function Fooddelivery({ data, title }) {
  const filterbtn = [
    "Ratings 4.0+",
  "Offers",
 "Rs.300-Rs-600",
    "Less than Rs.300"

]
 
  const[filbtn,setFilbtn]=useState(null)
  const dispatch=useDispatch()
  function handlebtn(btn){
    setFilbtn(filbtn===btn ? null : btn)
  }
  dispatch(setfiltervalue(filbtn))

  return (
    <div>

      <h1 className='font-bold text-2xl  mt-5 '> {title}  </h1>
      <div className='flex flex-wrap  my-5  gap-3  '>
        {
          filterbtn.map((data,i) => (
            <button key={i} onClick={()=>handlebtn(data)} className={"filter flex gap-1  "+(filbtn ===  data?" active ":"  ")} >
              <p>{data}</p>
              <i className="fi  mt-1   fi-sr-cross-small hidden "></i>
            </button>

          ))
        }



      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10  ">
        {/* <div className='grid  grid-cols-4 gap-10   ' > */}
        {/* <div className=' grid grid-cols-[repeat(4,minmax(0,1fr))]  gap-8   '> */}
        {data.map(({ info, cta: { link } }) => (
          <div className='hover:scale-95 transition-transform duration-300 ' key={info.id}>
            <Restuarantcard {...info} link={link} />

          </div>
        ))}
      </div>
    </div>
  )
}

export default Fooddelivery


