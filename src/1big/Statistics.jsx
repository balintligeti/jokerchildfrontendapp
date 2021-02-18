import React,{useState,useEffect} from 'react'
import {getXpByMemberId,getPlayedExercisesCountByMemberId} from "../context/ApiCalls"


export default function Statistics() {

    const [playerXp,setPlayerXp]=useState(null);
    const [answeredQuestions,setAnsweredQuestions]=useState(null)
    const [isRenderable]=useState(true);

    useEffect(()=>{
        getXpByMemberId(0)// "0" is Viki atm, need to do a fix dummy user
            .then((data)=>setPlayerXp(data.data));
        
        getPlayedExercisesCountByMemberId(0) //0 is the memeber id of game histories
            .then((data)=>setAnsweredQuestions(data.data));   
                    

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