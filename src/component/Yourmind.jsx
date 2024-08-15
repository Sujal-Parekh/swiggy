import React, { useEffect, useState } from 'react'

function Yourmind({data}) {
    // const [data, setData] = useState([]);
    const [value, setValue] = useState(0);
 
    function handleprev(){
     value<=0?"": setValue((prev)=>prev-53)
  
    }
  function handlenext(){
    value>=212?"":setValue((prev)=> prev + 53 )
  }
  return (
    <div>
      
        <div className='flex justify-between mt-2 '>
          <h1 className='font-bold text-2xl'>What's on your mind? </h1>
          <div  className='flex  gap-3'>
            <div onClick={handleprev} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center ` + (value<=0 ?"bg-gray-100":"bg-gray-200")}>
            <i className={`fi text-2xl mt-1 fi-rr-arrow-small-left `+ (value<=0 ?"text-gray-400":"text-gray-800")}></i>
            </div>
                 <div onClick={handlenext} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center ` + (value<=0 ?"bg-gray-100":"bg-gray-200")} >
                 <i  className={`fi text-2xl mt-1 fi-rr-arrow-small-right `+ (value>=196 ?"text-gray-400":"text-gray-800")}></i>
                 </div>
          </div>
        </div>
        <div
        style={{translate:`-${value}%`}}
         className={`flex   mt-2  mb-12 duration-300`}>
          {
            data.map((item) => (
              <img key={item.id} className='w-36 ml-6 cursor-pointer  ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" />
            ))
          }
        </div>
        <hr className='border'/>
      </div>
   
  )
}

export default Yourmind
