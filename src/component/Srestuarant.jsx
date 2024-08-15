import React from 'react'

function Srestuarant(
    { data:
        { card:
            { card:
                { info:
                    { id,
                        name,
                        aggregatedDiscountInfoV3 = {},
                        promoted = false,
                        avgRating,
                        costForTwoMessage,
                        avgRatingString,
                        cuisines,
                        sla: { slaString },
                        cloudinaryImageId
                    },
                }
            }
        }
    }
) {
    return (
        <div className='m-2  bg-white  p-3 mt-4  flex gap-2 md:max-w-fit  '>

            <div className=' w-[30%] md:w[40%] mt-3  '>
                <img className='w-[100px] h-[100px] rounded-xl aspect-square    ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`} alt="" />
                {/* <div className='bg-white w-[71px] h-[32px] absolute top-16 left-2      font-semibold border text-green-600 rounded-xl px-1 py-2 drop-shadow-sm max-w-fit '>
                {aggregatedDiscountInfoV3.header}
                
                 {aggregatedDiscountInfoV3.header}
                 </div> */}

            </div>
            <div className='w-[70%] mt-9 mb-5   '>
                <p className='   font-semibold text-md text-slate-700  '>{name}</p>
                <div className='flex  '>
                    <i className="fi fi-ss-star text-[#7e808c]   "></i>
                    <p className=' text-sm opacity-80 font-semibold   '> {avgRating} . {slaString} . {costForTwoMessage} </p>

                </div>
                <p className='line-clamp-1 text-slate-400 text-md  '>{cuisines.join(",")}</p>
            </div>

        </div>
    )
}

export default Srestuarant

export function withhoc(Wrappedcom){
    return (prop) =>  {
        // console.log(prop)
        return (
        <div className='relative '>
        <p className='absolute top-11 left-3 bg-[#4d4c57] text-white rounded-sm text-sm px-1  '>ad</p>
        <Wrappedcom {...prop}/>

        </div>)
    }

}
