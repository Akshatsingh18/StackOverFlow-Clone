import React from 'react'
import Leftsidebar from '../../components/Leftsidebar/Leftsidebar'
import Userlist from './Userlist'
import './User.css'

const Users = () => {
  return (
    <div className='home-container-1'>
        <Leftsidebar />
        <div className='home-container-2'>
            <h1 style={{fontWeight: "400"}} >Users</h1>
            <Userlist />
        </div>
      
    </div>
  )
}

export default Users
