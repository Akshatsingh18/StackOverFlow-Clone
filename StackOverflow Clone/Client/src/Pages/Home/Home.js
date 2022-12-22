import React from 'react'
import './Home.css'
import Leftsidebar from '../../components/Leftsidebar/Leftsidebar'
import Rightsidebar from '../../components/Rightsidebar/Rightsidebar'
import Homesidebar from '../../components/Homesidebar/Homesidebar'

const Home = () => {
  return (
    <div className='home-container-1'>
            <Leftsidebar />
            <div className='home-container-2'>
                <Homesidebar />
                <Rightsidebar />
            </div>
    </div>
  )
}

export default Home
