import React from 'react'
import {Route , Routes} from 'react-router-dom';
import Auth from '../src/Pages/Auth/auth'
import Home from '../src/Pages/Home/Home'
import Questions from '../src/Pages/Questions/Questions';
import Askquestion from './Pages/AskQuestion/askquestion';
import Displayquestion from './Pages/Questions/Displayquestion';
import Tags from './Pages/Tags/Tags';
import Users from './Pages/User/Users';
import UserProfile from './Pages/UserProfile/UserProfile'


const AllRoutes = () => {
  return (
    <Routes>
       <Route path ='/' element={<Home/>} />
       <Route path ='/auth' element={<Auth/>} />
       <Route path ='/questions' element={<Questions/>} />
       <Route path ='/askquestion' element={<Askquestion/>} />
       <Route path ='/questions/:id' element={<Displayquestion/>} />
       <Route path ='/Tags' element={<Tags/>} />
       <Route path ='/Users' element={<Users/>} />
       <Route path ='/Users/:id' element={<UserProfile/>}/>
    </Routes>
  )
}

export default AllRoutes
