import './Paging.css';
function Paging(props){
    let pageNo = props.pageNo;
    let totalPages = props.totalPages;
    let setPageNo = props.setPageNo;

    const res = [];

    const handleInput = (e) => {
        console.log(e.target.value);
        setPageNo(e.target.value);
        
    };

    for(let i = 1; i<=totalPages; i++){
        if(pageNo != i)
            res.push(
                <button  key ={i} type="button" onClick={handleInput} value={i} active>{i}</button>
            );
        else{
            res.push(
                <button className = 'active' type="button" onClick={handleInput} value={i} active>{i}</button>
            );
        }
    }

    return(
        <div  className="paging">
            {res}
        </div>
    );
}
export default Paging;