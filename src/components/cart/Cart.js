import { useEffect,useState } from "react";
import CartItem from "./cartItem/CartItem";
import './Cart.css'
async function callAPI(accessToken){
    ;
      const url = "http://localhost:8080/api/order/cart";
      return await fetch(url, {
        method: 'GET',
        headers: {
			'Authorization': 'Bearer ' + accessToken,
		},
      })
      .then(data => data.json())
    }
function Cart(){
    const [list,setList] = useState([]);
    let [sum,setSum] = useState();
    const [isLoad,setIsLoad] = useState();
       
    
    useEffect(()=>{
        const accessToken = window.sessionStorage.getItem('accesstoken');
        console.log('Da bi xoa roi maf');
        console.log(accessToken);
        callAPI(accessToken).then(data => {
            setList(data.products);
            setSum(data.sum);
            console.log(data.products);
       })
      },[isLoad]);

    return (
        <div className="App-cart">
    
            <div className="cart">
                {list.map((p) => <CartItem id= {p.productCartId} key ={p.productCartId} product= {p} setIsLoad ={setIsLoad} isLoad={isLoad} />)}
                <p className="sum-price">Tong tien thanh toan : {sum} VND</p>
                 {/* <button className='btn-pay' onClick={handleOnClickPay}></button> */}
            </div>
        
        </div>
    )
}
export default Cart;