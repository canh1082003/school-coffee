import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../views/product/MainLayout'
import Home from '../views/home/Home.tsx'
import Auth from '../views/auth/Auth.tsx'
import ListUser from '../views/home/ListUser.tsx'
import ListProduct from '../views/home/ListProduct.tsx'
import Inforproduct from '../views/components/inforproduct/Inforproduct.tsx'
import ConfirmEmail from '../views/auth/pages/ConfirmEmail.tsx'
import Product from '../views/home/Product.tsx'
import Posts from '../views/home/Posts.tsx'
import ProfileUser from '../views/components/header/profileUser.tsx'
import Cart from '../views/components/cart/cart.tsx'
import History from '../views/home/History.tsx'
import Success from '../views/home/Success.tsx'
import OrderPending from '../views/components/order/orderPending.tsx'
import OrderSucces from '../views/components/order/orderSucces.tsx'
import OrderFailed from '../views/components/order/orderFailed.tsx'



export default function ManageRoute() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/sanpham' element={<Product />}></Route >
        <Route path='/baiviet' element={<Posts />}></Route >
        <Route path='/' element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path='/home/user' element={<Home />}></Route>
        <Route path='/home/shipper' element={<Home />}></Route>
        <Route path='/home/admin' element={<Home />}></Route>
        <Route path='/List-User' element={<ListUser />}></Route>
        <Route path='/List-Product' element={<ListProduct />}></Route>
        <Route path='/shipperPending' element={<OrderPending />}></Route>
        <Route path='/shipperPaid' element={<OrderSucces />}></Route>
        <Route path='/shipperFailed' element={<OrderFailed />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/InfoProduct/:id' element={<Inforproduct />}></Route>
        <Route path='Profile' element={<ProfileUser />}></Route>
        <Route path='/Success/:orderId' element={<Success />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path="/confirmEmail/:email" element={<ConfirmEmail />}></Route>
      </Route>
    </Routes>
  )
}
