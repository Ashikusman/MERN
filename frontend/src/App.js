//import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import './App.css';
import  Header  from './component/Header';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setDatareservation } from './redux/reservationSlice';
import { setDataUser } from './redux/userSlice';
import { setDataOrder } from './redux/orderSlice';



function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=> state.product)
  const reservationData = useSelector((state)=> state.reservation)
  const userData = useSelector((state)=> state.user)
  const orderData = useSelector((state)=> state.order)

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
      //console.log(resData)
      dispatch(setDatareservation(resData))
    })()
  },[])

  // console.log(reservationData)

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`)
      const resData = await res.json()
      //console.log(resData)
      dispatch(setDataUser(resData))
    })()
  },[])

  // console.log(usersData)
  
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/order`)
      const resData = await res.json()
      //console.log(resData)
      dispatch(setDataOrder(resData))
    })()
  },[])

  // console.log(orderData);

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
