
import Login from "./components/login/Login";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./components/shop/Shop";
import Cart from "./components/cart/Cart"
import Register from "./components/register/Register";
import Weather from "./components/weather/Weather";
import Payment from "./components/payment/payment"



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Shop />} />
        <Route path="shop" element={<Shop/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="register" element={<Register/>} />
        <Route path="weather" element={<Weather/>} />
        <Route path = "confirmation" element={<Payment/>}/>
       
      </Route>
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
