import './Product.css';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

async function callAPI(accessToken,id){
      const url = "http://localhost:8080/api/order";
      return await fetch(url, {
        method: 'POST',
        headers: {
			'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
		},
        body: JSON.stringify({
            "productId": id
        })
      })
    //   .then(data => data.json())
}
function Product(props){
    const {id,imageLink,name, price,shortDes} = props.product;
    const navigate = useNavigate();

    const handleOnClick = async (e) => {
        e.preventDefault();
        const accessToken = window.sessionStorage.getItem('accesstoken');
        await callAPI(accessToken,id);
        navigate('/cart');
    }
    return(
        <div  className="single-product-container">
            <div className="img-area">
                <img src={imageLink} alt=""/>
            </div>

            <div className="product-info">
                <div classNajme="name-info">
                    <p>{name}</p>
                </div>
                
                <div className="price-info">
                    <p>{price}</p>
                </div>
                <p>{shortDes}</p>

                <div className="link-product">
                    <Link to="/login">Detail</Link>
                    <Link to="/cart" onClick={handleOnClick}>Add Cart</Link>
                </div>
            </div>
        </div>
    );
}
export default Product;