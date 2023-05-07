import "./Product.css";
import BacktoTop from "./BacktoTop.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons/lib/icons";
import { useState } from "react";
// import anhtest from '../../../public/img/shopping-cart.png'
export default Product;

async function callAPI(accessToken, id) {
  const url = "http://localhost:8080/api/order";
  return await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });
}
function Product(props) {
  const { id, imageLink, name, price } = props.product;
  const navigate = useNavigate();
    const handleSubmit=()=>{}
  const handleOnClick = async (e) => {
    e.preventDefault();
    const accessToken = window.sessionStorage.getItem("accesstoken");
    await callAPI(accessToken, id);
    navigate("/cart");
  };
  const [popup, setPop] = useState(false);
  const handleOpen = () => {
    setPop(!popup);
  };
  const closePopup = () => {
    setPop(false);
  };
  return (
    <div class="conteno">
      <div className="single-product-container">
        <div className="img-area">
          <img src={imageLink} alt="" />
        </div>

        <div className="product-info">
          <div className="name-info">
            <p onClick={handleOpen}>{name}</p>
          </div>

          <div className="link-product">
            {/* <Link to="/login" class="ok">Detail</Link> */}
            <div class="ok">${price}</div>
            <Link to="/cart" onClick={handleOnClick} class="ok">
              <ShoppingCartOutlined
                style={{ fontSize: "24px", marginRight: "8px" }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div>
        {popup ? (
          <div className="popup">
            <h2 className="x-btn" onClick={closePopup}>
              X
            </h2>
            <div className="contain-detail">
              <div className="contain-img">
                <img
                  src="https://reactjs.org/logo-og.png"
                  alt="react logo"
                  style={{ width: "200px" }}
                />
                <div className="rating">
                <textarea  className="input-rate">Danh gia san pham cua toi.</textarea>
                    <div className="btn-submit" onClick={handleSubmit()}  >Submit</div>
                    
                </div>
              </div>
              <div className="detail-product">
                <h1 className="name-product"> Ryzen 500</h1>
                <div className="price-product"> 5000$</div>
                <div className="mota"> Mô tả sản phẩm ở đây , sản phẩm chúng là rất tốt và ngon </div>
              </div>
              <BacktoTop />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
