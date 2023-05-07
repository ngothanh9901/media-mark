import React from 'react';
import { useEffect,useState } from 'react';
function BacktoTop(){
    const [backToTopButton, setBackToTopButton]= useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setBackToTopButton(true);
            }else{
                setBackToTopButton(false);
            }
        })

    },[])
    const scrollUp = ()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    return <div className='backtop'>
         {backToTopButton && (
            <button style={{
                position:"fixed",
                button:"50px",
                right:"50px",
                height:"50px",
                width:"50px",
                fontSize:"50px",
            }} onClick={scrollUp}>^</button>
         )}
    </div>;

}



export default BacktoTop;
