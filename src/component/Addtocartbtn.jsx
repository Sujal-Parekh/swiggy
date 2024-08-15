import React from 'react'
import { addtocart } from '../utils/cartslice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Addtocartbtn({info,resinfo,handleisdifres}) {
    const cartdata=useSelector((state)=>state.cartslice.cartitems)
   const getresinfofromlocal=useSelector((state)=>state.cartslice.resinfo)

   const dispatch=useDispatch()

    function handleaddtocart(){
        const isadded=cartdata.find((data)=>data.id === info.id)
        if(!isadded){
            if( getresinfofromlocal.name === resinfo.name || getresinfofromlocal.length === 0 ){
               dispatch(addtocart({info,resinfo}))
               toast.success(" food is added ")
            }
           
            else{
   handleisdifres()
            } 
        }
        else{
           toast.error("already added ",{})
        }
    }
  return (
    <div>
                    <button 
                    onClick={handleaddtocart}
                     className='bg-white absolute bottom-[-20px]  left-1/2 -translate-x-1/2 text-lg font-bold border text-green-600 rounded-xl px-10 py-2 drop-shadow-sm '>ADD</button>
      
    </div>
  )
}

export default Addtocartbtn
