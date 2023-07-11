import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";



export function useFetch(url){

    const [data, setData] = useState(null);
    
    const navigate = useNavigate();

    useEffect(()=> {
        
        fetch(url)
            .then((res)=> res.json())
            .then((data)=> {
                setData(data)
                if (localStorage.getItem("token")==null){
                    navigate('/');
                }
            })
            .catch((error)=>{
                navigate('/');
            })
    }, []);


    return { data };
}


