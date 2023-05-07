import React, { useEffect, useState } from 'react'
import './Weather.css'
import axios from 'axios';

function Weather(){
    const [data , setdata] = useState({
        celcius:10,
        name:'London',
        humidity:10,
        speed:2,
        image:''
    })
    const [name,setName]=useState('');
    const [error,setError]=useState('');
    useEffect(()=>{
      const apiUrl ='http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=12b57cca40bf9739819a15bb729f3095';  
    
        axios.get(apiUrl)
        .then(res =>{
            setdata({...data,celcius:res.data.main.temp, name:res.data.name , humidity:res.data.main.humidity
            , speed:res.data.wind.speed})
        })
        .catch(err => console.log(err))
    },[])
    const handleClick=()=>{
        if(name !== ""){
            const apiUrl =`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=12b57cca40bf9739819a15bb729f3095`;
    
        axios.get(apiUrl)
        .then(res =>{
            let imagePath='';
            if(res.data.weather[0].main == "Clouds"){
                imagePath="/Images/cloud.png"
            }else if(res.data.weather[0].main == "Clear"){
                imagePath="/Images/cloud.png"
            }else if(res.data.weather[0].main == "Rain"){
                imagePath="/Images/cloud.png"
            }else if(res.data.weather[0].main == "Drizzle"){
                imagePath="/Images/cloud.png"
            }else if(res.data.weather[0].main == "Mist"){
                imagePath="/Images/cloud.png"
            }else{
                imagePath="/Images/cloud.png"
            }

            setdata({...data,celcius:res.data.main.temp, name:res.data.name , humidity:res.data.main.humidity
            , speed:res.data.wind.speed, image:imagePath})
        })
        .catch(err => 
            {
                if(err.response.status == 401){
                    setError("")
                }else{
                    setError("Invalid Address")
                }
                console.log(err)})

        }
    }
    return(
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter city' onChange={e => setName(e.target.value)}></input>
                    <button onClick={handleClick}><img src='https://cdn.onlinewebfonts.com/svg/img_588.png'/></button>
                </div>
                <div className='error'>
                    <p>{error}</p>
                </div>

                <div className='win_infor'>
                    <img src="{data.image}" alt=''/>
                    <h1>{Math.round(data.celcius-273)} C</h1>
                    <h2>{data.name}</h2>
                    <div className='detail'>
                        <div className='col'>
                            <img src='https://th.bing.com/th/id/R.6cd775c78fc597efade6ae053a61a9f5?rik=nSfgMHG73GTFkw&pid=ImgRaw&r=0' alt=''/>
                            <div className='huminity'>
                                <p>{data.humidity}%</p>
                                <p>Huminity</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src='https://th.bing.com/th/id/R.6da8a3fc95b6b543b9d8bf4deffa302b?rik=LZogNSnLyFMrJA&pid=ImgRaw&r=0' alt=''/>
                            <div className='wind'>
                                <p>{data.speed}km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;