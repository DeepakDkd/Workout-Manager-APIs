import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./Context/AuthContext";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
function App() {
  const { user,dispatch} = useAuth();
  const [loader, setloader] = React.useState(true);
  const {pathname}  = useLocation()
  


  const fetchUser = async() => {

  
    const data = await fetch(`https://workout-manager-apis.onrender.com/api/user/getuser`, {
      method: "GET",  
      headers: {
        "Content-Type": "application/json",
       "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
       
      },
    })
    const user = await data.json()

     if (user.success){
      dispatch({type:'LOGIN',payload:user.User})
      setloader(false)
     }
     else{
      dispatch({type:'LOGOUT'})
      setloader(false)
     }  
  } 

 
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      if (!user) {
      fetchUser().then(() => setloader(false))
    }}

    if (!localStorage.getItem('auth_token')) {setloader(false)}
  },[pathname])



  return (
    <>
      <Header />
      {/* <Toaster position="top-center" /> */}
      {!loader ? <Outlet /> : "loading..."}
      <Footer />
    </>
  );
}

export default App;
