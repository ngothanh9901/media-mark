import { Outlet, Link } from "react-router-dom";
import "./Layout.css"
import {createContext, useContext } from "react";
import { UserContext } from '../../context/Context';
import {ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";

const Layout = () => {

  const [name,setName]= useContext(UserContext);

  const items = [
    {
      key: '1',
      label: (
        <div>Đăng xuất</div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          Thông tin đơn hàng
        </div>
      ),
    },
  ];


    return (
      <div className="layout">
        <nav>
          <ul className="nav">
            <li>
              <Link to="/shop" style={{ textDecoration: 'none' }}><span className="logo">My-Shop</span></Link>
            </li>

            <li>
            <div class="searchBar">
               <input type="text" placeholder="Search products..." />
               <button type="submit">Search</button>
            </div>
            </li>
            
            {/* <li>
              <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            </li> */}

            {/* <li>
              <Link to="/register" style={{ textDecoration: 'none' }} >Register</Link>
            </li> */}
            <li style={{display: "flex", marginRight: "100px" , marginLeft:"20px"}}>
              <div style={{display: "flex", justifyContent:"center",alignItems:"center"}}>
                <Link to="/cart" style={{ textDecoration: 'none' }}><ShoppingCartOutlined style={{fontSize:"24px" ,marginRight: "15px"}}/></Link>
              </div>
              { false ? <div className="user-infor">
              <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <div>
                    <Avatar src={""} icon={<UserOutlined/>} style={{}}/>
                     <span className="nameAccount">Nguyễn Tứ</span>
                   </div>
              </Dropdown>
               </div>
                : <> <Link to="/login"><Button >Login</Button> </Link>
                    <Link to="/register"><Button>Register</Button></Link></>
              }
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </div>
    )
  };
  
  export default Layout;