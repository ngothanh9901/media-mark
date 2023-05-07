import { useNavigate } from "react-router-dom";
import './payment.css'
async function callAPIConfirm(idOrder,paymentId,PayerId){
    const url = "http://localhost:8080/paypal/complete/payment/?idOrder="+idOrder+"&paymentId="+paymentId+"&PayerID="+PayerId;
    return await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
    }).then(data => data.json())
}


export default function Payment(){

    const navigate = useNavigate();


    const handleOnClickConfirm = async (e) => {
        e.preventDefault();
        const url = new URLSearchParams(window.location.search)
        const idOrder = url.get("idOrder");
        const paymentId = url.get("paymentId");
        const PayerID = url.get("PayerID");
        await callAPIConfirm(idOrder,paymentId,PayerID);
        navigate("/cart");
        
    }
    
    return(
        <div>
            <h1>Do you have payment confirmation?</h1>
            <button  onClick={handleOnClickConfirm} className="thanhtoan">Submit</button>
        </div>
    );
}