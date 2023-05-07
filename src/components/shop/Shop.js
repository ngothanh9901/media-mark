import "./Shop.css"
import Product from "../product/Product";
import { useEffect, useState } from "react";
import Paging from "../../util/Paging";
import { CaretRightOutlined ,CheckOutlined ,StepForwardOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";


async function callAPI(pageNumber){
;
  const url = "http://localhost:8080/api/product"+"?pageNumber="+pageNumber+"&pageSize=12";
  return await fetch(url, {
    method: 'GET',
  })
  .then(data => data.json())
}

export default  function Shop() {
  const [list,setList] = useState([]);
  const [totalPages,setTotalPages] = useState();
  const [pageNo, setPageNo] = useState(1);

  


  
  useEffect(()=>{
    callAPI(pageNo).then(data => {
      setTotalPages(data.totalPages);
      setList(data.content);
      console.log(data);
   })
  },[pageNo]);


  return (
    <div className="App">

      
      <div className="bo">
      <div className = "products">
        {list.map((p) => <Product id= {p.id} key ={p.id} product= {p}/>)}
      </div>
      <div className="divider"></div>
      <div className="category">
          <h2 >Category</h2>

          <div className="cateItem">
            <div>
              <div style={{display: "flex",marginBottom:"10px"}}><StepForwardOutlined />  Laptop</div>
              <div style={{display: "flex",marginBottom:"10px"}}><StepForwardOutlined />  Smartphone</div>
              <div style={{display: "flex",marginBottom:"10px"}}> <StepForwardOutlined />  Accessory</div>
              <div style={{display: "flex",marginBottom:"10px"}}><StepForwardOutlined /> Service</div>
            </div>
          </div>
          <h2>Price</h2>
          <div className="priceOption">
                <Button>Low</Button>
                <Button className="high">High</Button>
          </div>
          
          <h2>Rating</h2>
          <div className="ratingOption">
            <div style={{width: "150px"}}>
              <div style={{display: "flex",marginBottom:"10px"}}> <StepForwardOutlined />  Low-Rate</div>
              <div style={{display: "flex"}}> <StepForwardOutlined /> High-Rate</div>
            </div>
          </div>
          
            <h2>OurService</h2>
            <div className="ratingOption">
            <div style={{width: "150px"}}>
              <div style={{display: "flex",marginBottom:"10px"}}><StepForwardOutlined /> <div>
                <Link to="/weather" style={{ textDecoration: 'none' }}>Weather See</Link></div> </div>
              <div style={{display: "flex"}}> <StepForwardOutlined />  Note</div>
            </div>
          </div>

          
      </div>

      </div>
      
 

      <Paging  pageNo = {pageNo} totalPages = {totalPages} setPageNo = {setPageNo}></Paging>
      
      
    
    </div>
  );
  

}
