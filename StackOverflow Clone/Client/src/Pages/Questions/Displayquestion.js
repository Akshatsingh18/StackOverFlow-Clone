import React from 'react'
import '../Home/Home.css'
import Leftsidebar from '../../components/Leftsidebar/Leftsidebar'
import Questiondetail from './Questiondetail'
import Rightsidebar from '../../components/Rightsidebar/Rightsidebar'

const Displayquestion = () => {
  return (
    <div className='home-container-1'>
        <Leftsidebar />
        <div className='home-container-2'>
            <Questiondetail />
            <Rightsidebar />
        </div>
   </div>
  )
}

export default Displayquestion
