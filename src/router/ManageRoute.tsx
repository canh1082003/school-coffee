import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../views/product/MainLayout'
import Home from '../views/home/Home.tsx'
import Auth from '../views/auth/Auth.tsx'
import ListUser from '../views/home/ListUser.tsx'
import ListProduct from '../views/home/ListProduct.tsx'



export default function ManageRoute() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path='/home/user' element={<Home />}></Route>
        <Route path='/home/admin' element={<Home />}></Route>
        <Route path='/List-User' element={<ListUser />}></Route>
        <Route path='/List-Product' element={<ListProduct />}></Route>
      </Route>
    </Routes>
  )
}
