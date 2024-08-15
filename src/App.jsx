import Head from "./component/Head"
import Body from "./component/Body"
import Cart from "./component/Cart"
import { Route, Routes } from "react-router-dom"
import Resmenu from "./component/Resmenu"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SignIn from "./component/SignIn"
import Search from "./component/Search"
function App() {
  
  

  //using with redux
 const visible=useSelector((state)=>state.toogle.searchtoggle)
 const loginvisible = useSelector((state) => state.toogle.logintoggle)

 
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visible]);

  useEffect(() => {
    
    if (loginvisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loginvisible]);

  return (
        <div className={visible || loginvisible ? " max-h-screen overflow-hidden " : "  "}>
          <Routes>
            <Route path="/" element={<Head />}>
              <Route path="/" element={<Body />} />
              <Route path="/menu/:id" element={<Resmenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<h1> this page are coming soon </h1>} />
              
            </Route>
          

          </Routes>
        </div>
  )
}

export default App
