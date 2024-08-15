import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function userestuarantmenu() {
    const [menudata, setMenudata] = useState([])
    const [resinfo, setResinfo] = useState([])
    const [discountinfo, setDiscountinfo] = useState([])
    const [toppicksdata, setToppicksdata] = useState(null)
    const [value, setValue] = useState(0)
    // const{cordi:{lat,lng}}=useContext(Coordinates)
    const { lat, lng } = useSelector((state) => state.coordinates);

    const { id } = useParams();
    let mainid = id.split("-").at(-1);

    async function fetchmenu() {


        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainid}&catalog_qa=undefined&submitAction=ENTER`));
        // const response = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${mainid}&catalog_qa=undefined&submitAction=ENTER")
        const result = await response.json();
        const res = JSON.parse(result.contents);
        setResinfo(res?.data?.cards[2]?.card?.card?.info)
        setDiscountinfo(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
        let actualmenu = (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories)
        setMenudata(actualmenu)
        setToppicksdata((res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data.card.card.title == "Top Picks")[0])
    }

    useEffect(() => {
        fetchmenu();
    }, [lat, lng]);
    return[menudata,resinfo,discountinfo,toppicksdata,value]
}

export default userestuarantmenu
