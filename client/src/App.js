import './App.css';
import { Route, Routes, Link, Redirect, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from "./components/searchBar";
import Main from './components/main';
import Login from './components/login';
import Register from './components/register';

let linkStyle = { textDecoration: "none", color: "white" };

function App() {

  // fetching redux status
  let user = useSelector(state => state.loginStatus.user)
  let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
  console.log(loginStatus)

  const [isActive, setIsActive] = useState(false);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState({});

  useEffect(() => {
    if (loginStatus) {
      setIsLoggedIn(loginStatus)
      setAvatar(user)
    }
  }, [loginStatus, isLoggedIn, isActive, avatar])


  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo"><Link to={'/'} onClick={() => setIsActive(false)}><img src='https://cdn-icons-png.flaticon.com/512/201/201623.png' /></Link></div>
        <h1 className="title">Travel.com</h1>
        {
          /*!isLoggedIn && */ (<ul className='menu'>
            <li className="link"><Link style={linkStyle} to='/login' onClick={() => setIsActive(true)}>Log-in</Link></li>
            <li className="link"><Link style={linkStyle} to='/register' onClick={() => setIsActive(true)}>Register</Link></li>
          </ul>)
        }
        { /*
          isLoggedIn && (
            <div className="avatar">
              <h6> Hi avatar.user_name!</h6>
            </div>
          ) */
        }

      </nav>
      {
        <Routes>
          <Route path='/login' element={<Login setIsActive={setIsActive} />}></Route>
          <Route path='/register' element={<Register isActive={isActive} setIsActive={setIsActive} />}></Route>
        </Routes>
      }
      {!isActive && (
        <>
          <SearchBar className='search-compon' />
          <Main className='content' />
        </>
      )}

      <footer>
        <p className='lower'>Copyright Travel.com 2022 ©</p>
        <p className='lower'>Our partners</p>
        <div className='sponsors'>
          <img className='bottom' src='https://logos-world.net/wp-content/uploads/2021/02/British-Airways-Logo.png' />
          <img className='bottom' src='https://logos-world.net/wp-content/uploads/2020/03/Ryanair-Logo.png' />
        </div>
      </footer>
    </div>


  );
}

export default App;
