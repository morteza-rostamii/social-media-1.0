import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'

const MainLay = () => {
  return (
    <div
    className='
    flex flex-col
    h-full flex-1
    '
    >
      <Header/>
      <Outlet/>
    </div>
  )
}

export default MainLay