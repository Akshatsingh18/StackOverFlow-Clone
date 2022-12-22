import React, { useEffect } from 'react'
import { Link} from 'react-router-dom';
import decode from 'jwt-decode'
import { useSelector , useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../Avatar/avatar'
import './navbar.css'
import { setCurrentUser } from '../../actions/CurrentUser';


const Navbar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
     
    var User = useSelector((state)=>(state.CurrentUserReducer));

    useEffect(() => {
      const token = User?.token 
      if(token){
          const decodedToken = decode(token)
          if(decodedToken.exp * 1000 < new Date().getTime()){
              HandleLogout()
          }
      }
      dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
  },[User?.token, dispatch])

  const HandleLogout = () => {
    dispatch({type : "LOGOUT"})
    navigate('/')
    dispatch(setCurrentUser(null));
  }



  return (
    <nav className='navbarH'>
        <div className='navbar'>
        <Link to='/'className='nav-item nav-logo' >
                    <img src={logo} alt='logo' />
        </Link>
        <Link to='/' className='nav-item nav-btn' >About</Link>
        <Link to='/' className='nav-item nav-btn' >Products</Link>
        <Link to='/' className='nav-item nav-btn' >For Teams</Link>
        <form>
            <input type="text" placeholder='Search...' ></input>
            <img src={search} alt='search' width={19} className='search' />
        </form> 
         {
            User === null ? 
            <Link to = '/auth'className='nav-item nav-links' >Log-in</Link> :
            <>
                <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                <button className='nav-item nav-links' onClick={HandleLogout}>Log out</button>
            </>
         }
        </div>
    </nav>
  )
}

export default Navbar
