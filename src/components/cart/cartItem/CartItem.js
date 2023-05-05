import { useState } from 'react';
import './CartItem.css'


async function callAPI(accessToken,productCartId,quantity){
    const url = "http://localhost:8080/api/order/cart";
    return await fetch(url, {
      method: 'PUT',
      headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "productCartId": productCartId,
        "quantity": quantity
      })
    })
  //   .then(data => data.json())
}

async function callAPIDelete(accessToken,id){
    const url = "http://localhost:8080/api/order/cart/"+id;
    return await fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
      },
    })
}



function CartItem(props){
    let {productCartId,imageLink, name, shortDes} = props.product;

    let [quantity,setQuantity] = useState(props.product.quantity)
    const setIsLoad = props.setIsLoad;
    let isLoad = props.isLoad;

    const handleOnClickReduce = async (e) => {
        e.preventDefault();
        const accessToken = window.sessionStorage.getItem('accesstoken');
        await callAPI(accessToken,productCartId,quantity-1);

        isLoad? setIsLoad(false):setIsLoad(true);

        setQuantity(quantity - 1);
        
    }

    const handleOnClickIncrease = async (e) => {
        e.preventDefault();
        const accessToken = window.sessionStorage.getItem('accesstoken');
        await callAPI(accessToken,productCartId,quantity+1);

        isLoad? setIsLoad(false):setIsLoad(true);

        setQuantity(quantity+ 1);
       
    }

    const handleOnClickDelete = async (e) => {
        e.preventDefault();
        const accessToken = window.sessionStorage.getItem('accesstoken');
        await callAPIDelete(accessToken,productCartId);

        isLoad? setIsLoad(false):setIsLoad(true);
    }

    

    return(
        <div  className="product-cart">
            <div className="img-area">
                <img src={imageLink} alt=""/>
            </div>

            <div className="product-info">

                <div className="name-info">
                    <p>{name}</p>
                </div>
                
                <p>{shortDes}</p>
            </div>


            <form className="qty">
                <button onClick={handleOnClickReduce}>-</button>
                <input type="text" value={quantity} name="name" />
                <button onClick={handleOnClickIncrease}>+</button>
            </form>

            {/* <button className='btn-delete' onClick={handleOnClickDelete}>x</button> */}

            <button className='btn-delete' onClick={handleOnClickDelete}>x</button>
           
           
           
        </div>
    );
}
export default CartItem;