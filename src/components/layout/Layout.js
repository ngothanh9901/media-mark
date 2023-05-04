import { Outlet, Link } from "react-router-dom";
import "./Layout.css"
import {createContext, useContext } from "react";
import { UserContext } from '../../context/Context';

const Layout = () => {

  const [name,setName]= useContext(UserContext);


    return (
      <div className="layout">
        <nav>
          <ul>
            <li>{name}</li>
            <li>
              <Link to="/shop" style={{ textDecoration: 'none' }}>Shop</Link>
            </li>
            <li>
              <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            </li>
            <li>
              <Link to="/cart" style={{ textDecoration: 'none' }}>Cart</Link>
            </li>
            <li>
              <Link to="/register" style={{ textDecoration: 'none' }} >Register</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </div>
    )
  };
  
  export default Layout;