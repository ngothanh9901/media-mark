import { useState } from "react";
import "./CartItem.css";
import { DeleteOutlined } from "@ant-design/icons/lib/icons";

async function callAPI(accessToken, productCartId, quantity) {
  const url = "http://localhost:8080/api/order/cart";
  return await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productCartId: productCartId,
      quantity: quantity,
    }),
  });
  //   .then(data => data.json())
}

async function callAPIDelete(accessToken, id) {
  const url = "http://localhost:8080/api/order/cart/" + id;
  return await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
}
async function callAPIPay(accessToken, id) {
  const url = "http://localhost:8080/api/order/cart/" + id;
  return await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
}
function CartItem(props) {
  let { productCartId, imageLink, name, price } = props.product;

  let [quantity, setQuantity] = useState(props.product.quantity);
  const setIsLoad = props.setIsLoad;
  let isLoad = props.isLoad;

  const handleOnClickReduce = async (e) => {
    e.preventDefault();
    const accessToken = window.sessionStorage.getItem("accesstoken");
    if (quantity > 0) {
      await callAPI(accessToken, productCartId, quantity - 1);

      isLoad ? setIsLoad(false) : setIsLoad(true);

      setQuantity(quantity - 1);
    }
  };

  const handleOnClickIncrease = async (e) => {
    e.preventDefault();
    const accessToken = window.sessionStorage.getItem("accesstoken");
    await callAPI(accessToken, productCartId, quantity + 1);

    isLoad ? setIsLoad(false) : setIsLoad(true);

    setQuantity(quantity + 1);
  };

  const handleOnClickDelete = async (e) => {
    e.preventDefault();
    const accessToken = window.sessionStorage.getItem("accesstoken");
    await callAPIDelete(accessToken, productCartId);

    isLoad ? setIsLoad(false) : setIsLoad(true);
  };

  const handleOnClickPay = async (e) => {
    e.preventDefault();
    const accessToken = window.sessionStorage.getItem("accesstoken");
    await callAPIDelete(accessToken, productCartId);

    isLoad ? setIsLoad(false) : setIsLoad(true);
  };

  return (
    <div>
      <div className="product-cart">
        <div className="img-area">
          <img src={imageLink} alt="" />
        </div>
        <div className="name-info">
            <p>{name}</p>
          <div>
            <p>Price :{price}$</p>
          </div>
          </div>


        <div className="product-info">
         
        </div>

        <div className="qty">
          <button onClick={handleOnClickReduce} className="btnNum">
            -
          </button>
          <span>{quantity}</span>
          {/* <input type="text" value={quantity} name="name" className='num' /> */}
          <button onClick={handleOnClickIncrease} className="btnNum2">
            +
          </button>

          <button className="btn-delete" onClick={handleOnClickDelete}>
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
export default CartItem;
