//import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import './App.css';
import  Header  from './component/Header';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setDatareservation } from './redux/reservationSlice';


function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=> state.product)
  const reservationData = useSelector((state)=> state.reservation)

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData = await res.json()
      // console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  },[])

  // console.log(productData)

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/reservation`)
      const resData = await res.json()
      console.log(resData)
      dispatch(setDatareservation(resData))
    })()
  },[])

  // console.log(reservationData)
  
  return (
    <>
      <Toaster />
      <div>
        {/* 19.34 */}
        <Header/>
        <main className="pt-16 bg-orange-100 min-h-[calc(100vh)]">
          <Outlet/>
        </main>       
      </div>
    
    </>
    
  );
}

export default App;
