import { useState } from 'react'
import Header from "./Components/Header"
import Footer from './Components/Footer'
function App() {
  const [arr, setArr] = useState(null)
  // const data = fetch("http://localhost:8089/api/workouts/")
    // .then((response) => response.json())
    // .then((response) => setArr(response))
  // console.log(arr)
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
