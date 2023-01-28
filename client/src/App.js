import './App.css';
import { Route, Routes, Link, Redirect, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/navbar';
import SearchBar from './components/searchBar';
import Main from './components/main';
import Footer from './components/footer';
import { setLoginStatus, setUser } from './slice/loginSlice';




function App() {

  // fetching redux status

  let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)

  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  console.log(isActive);



  useEffect(() => {
    async function fetchLogin() {
      let result = await login().then((result) => {
        return result
      })

      dispatch(setLoginStatus(result.loggedIn))
      dispatch(setUser(result.user));
    };
    fetchLogin()
  }, [loginStatus, dispatch, isActive])

  async function login() {
    const url = 'http://localhost:5000/isLoggedIn';
    let result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include'
    })

    result = result.json();
    return result;
  }




  return (
    <div className="App">
      <Navbar isActive={isActive} setIsActive={setIsActive} />
      {isActive &&
        <>
          <SearchBar className='search-compon' />
          <Main className='content' />
        </>
      }
      <Footer />
    </div>


  );
}

export default App;
