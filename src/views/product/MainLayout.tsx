import React from 'react'
import Header from '../components/header/header'

import { motion } from "framer-motion";

import { Outlet } from "react-router-dom";
import Footer from '../components/footer/footer';
export default function MainLayout() {
  return (
    <div >
      <motion.div>
        <Header />
        <Outlet />
        <Footer />
      </motion.div>
    </div>
  )
}
