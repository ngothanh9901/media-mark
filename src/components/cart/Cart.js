// import { useEffect,useState } from "react";
// import CartItem from "./cartItem/CartItem";
// import './Cart.css'

// async function callAPIPayment(sum , idOrder){
//     const url = "http://localhost:8080/paypal/make/payment?sum="+sum+"&idOrder="+idOrder;
//     return await fetch(url, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//     }).then(data => data.json())
// }

// async function callAPI(accessToken){
//     ;
//       const url = "http://localhost:8080/api/order/cart";
//       return await fetch(url, {
//         method: 'GET',
//         headers: {
// 			'Authorization': 'Bearer ' + accessToken,
// 		},
//       })
//       .then(data => data.json())
//     }
// function Cart(){
//     const [list,setList] = useState([]);
//     let [sum,setSum] = useState();
//     const [isLoad,setIsLoad] = useState();

//     useEffect(()=>{
//         const accessToken = window.sessionStorage.getItem('accesstoken');
//         console.log('Da bi xoa roi ma');
//         console.log(accessToken);
//         callAPI(accessToken).then(data => {
//             setList(data.products);
//             setSum(data.sum);
//             console.log(data.products);
//        })
//       },[isLoad]);
//       const handleOnClickPayment = async (e) => {
//         e.preventDefault();
//         const data = await callAPIPayment(sum,idOrder);
//         console.log(data);
//         window.location.replace(data.redirect_url);
//         isLoad? setIsLoad(false):setIsLoad(true);
//     }

//     return (
//         <div className="App-cart">

//             <div className="cart">
//                 {list.map((p) => <CartItem id= {p.productCartId} key ={p.productCartId} product= {p} setIsLoad ={setIsLoad} isLoad={isLoad} />)}
//                 <p className="sum-price">Total money : {sum} VND</p>

//                 <button className='btn-pay' onClick={handleOnClickPayment}>Thanh toan</button>
//             </div>

//         </div>
//     )
// }
// export default Cart;

import { useEffect, useState } from "react";
import CartItem from "./cartItem/CartItem";
import "./Cart.css";

async function callAPIPayment(sum, idOrder) {
  const url =
    "http://localhost:8080/paypal/make/payment?sum=" +
    sum +
    "&idOrder=" +
    idOrder;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

async function callAPI(accessToken) {
  const url = "http://localhost:8080/api/order/cart";
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).then((data) => data.json());
}
function Cart() {
  const [list, setList] = useState([]);
  let [sum, setSum] = useState();
  const [isLoad, setIsLoad] = useState();
  const [idOrder, setIdOrder] = useState();

  useEffect(() => {
    const accessToken = window.sessionStorage.getItem("accesstoken");
    console.log("Da bi xoa roi maf");
    console.log(accessToken);
    callAPI(accessToken).then((data) => {
      setList(data.products);
      setSum(data.sum);
      setIdOrder(data.idOrder);
      console.log(data.products);
      console.log(data);
    });
  }, [isLoad]);

  const handleOnClickPayment = async (e) => {
    e.preventDefault();
    const data = await callAPIPayment(sum, idOrder);
    console.log(data);
    window.location.replace(data.redirect_url);
    isLoad ? setIsLoad(false) : setIsLoad(true);
  };

  return (
    <div className="App-cart">
      <div className="cart">
        {list != null ? (
          list.map((p) => (
            <CartItem
              id={p.productCartId}
              key={p.productCartId}
              product={p}
              setIsLoad={setIsLoad}
              isLoad={isLoad}
            />
          ))
        ) : (
          <p>Khong co san pham trong gio hang</p>
        )}
        <p className="sum-price">Tong tien thanh toan : {sum} VND</p>
        <button className="btn-pay" onClick={handleOnClickPayment}>
          Make a Payment
        </button>
      </div>
    </div>
  );
}
export default Cart;
