import React,{useState,useEffect} from 'react'
import {getXpByMemberId,getPlayedExercisesCountByMemberId,getUsernameFromToken} from "../context/ApiCalls"


export default function Statistics() {

    const [playerXp,setPlayerXp]=useState(null);
    const [answeredQuestions,setAnsweredQuestions]=useState(null);
    const [isRenderable]=useState(true);

    const [memberId,setMemberId]=useState(null);

    useEffect(()=>{
        getUsernameFromToken(localStorage.getItem("token"))
            .then((response)=>{
                getXpByMemberId(response.data)
                .then((res1)=>setPlayerXp(res1.data));
            
            getPlayedExercisesCountByMemberId(response.data)
                .then((res2)=>setAnsweredQuestions(res2.data));  

            })                

    },[])
    
    return(
        <div>
            {!isRenderable ? 
            (<div><h1>Statisztikák betöltése</h1></div>)
            :
            (
                <div>
                    <h1>Stats</h1>
                    <p>Tapasztalati pont: {playerXp}</p>
                    <p>Megválaszolt kérdések száma: {answeredQuestions}</p>
                </div>
            ) 
            }
        </div>
        
    )   
}