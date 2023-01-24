import './App.css';
import { Route, Routes, Link, Redirect, Navigate } from "react-router-dom";
import SearchBar from "./components/searchBar";
import Main from './components/main';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo"><img src='https://cdn-icons-png.flaticon.com/512/201/201623.png' /></div>
        <h1 className="title">Travel.com</h1>
        <ul className='menu'>
          <li className="link"><Link to='/login'>Log-in</Link></li>
          <li className="link"><Link to='/register'>Register</Link></li>
        </ul>
      </nav>
      <SearchBar className='search-compon' />
      <Main className='content' />
    </div>

  );
}

export default App;
