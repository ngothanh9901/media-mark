import "./Shop.css"
import Product from "../product/Product";
import { useEffect, useState } from "react";
import Paging from "../../util/Paging";


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

      <div className = "products">
        {list.map((p) => <Product id= {p.id} key ={p.id} product= {p}/>)}
      </div>

      <Paging  pageNo = {pageNo} totalPages = {totalPages} setPageNo = {setPageNo}></Paging>
      
    
    </div>
  );
  

}
