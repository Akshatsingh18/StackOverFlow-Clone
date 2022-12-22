import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar/navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './routes';
import { FetchAllQuestion } from './actions/question';
import { fetchAllUsers } from './actions/users';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( FetchAllQuestion())
    dispatch( fetchAllUsers())
  }, [dispatch])



  return (
    <div className="App">
      <Router>
         <Navbar />
         <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
