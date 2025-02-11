import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Home from './page/Home';
import Menu from './page/Menu';
import About from './page/About';
import Contact from './page/Contact';
import Login from './page/Login';
import Newproduct from './page/Newproduct';
import Signup from './page/Signup';
import { store } from './redux/index';
import { Provider } from 'react-redux';
import ProductDisplay from './page/ProductDisplay';
import { Cart } from './page/Cart';
import {Reservation} from './page/Reservation';
import { Products } from './page/Products';
import { Orders } from './page/Orders';
import { EditProduct } from './page/EditProduct';
import { OrderPage } from './page/OrderPage';
import { OrderConfirmationPage } from './page/OrderConfirmationPage';
import { ViewOrder } from './page/ViewOrder';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path="reservation" element={<Reservation/>}/>
      <Route path="menu" element={<Menu/>}/>     
      <Route path="productdisplay/:filterby" element={<ProductDisplay/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="newproduct" element={<Newproduct/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="products" element={<Products/>}/>
      <Route path="editproduct/:filterby" element={<EditProduct/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="order" element={<OrderPage />} />
      <Route path ="orderconfirmation" element={<OrderConfirmationPage/>}/>
      <Route path ="vieworder/:filterby" element = {<ViewOrder/>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
