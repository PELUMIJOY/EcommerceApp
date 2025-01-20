import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Navbar from './navbar'

const DashboardShell = ({}) => {
  return (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
  )
}

export default DashboardShell