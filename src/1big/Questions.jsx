import React,{useState, useEffect} from 'react'
import PurpleButton from "../1small/PurpleButton"
import "../1medium/pinkInfo.css"
import urhajos from "../pics/urhajos.png"
import MiniCard from "../1small/MiniCard"
import "./questions.css"
import {getSessionsCardByUserId,getExperienceByExerciseIdAndUserId,deleteSessionByUserId,
createGameHistory,getIsGameHistoryActiveByExerciseIdAndUserId, getUsernameFromToken} from "../context/ApiCalls"
import { useHistory } from 'react-router-dom'
import 'reactjs-popup/dist/index.css';


export default function Questions() {

    const MAXIMUM_POINT_BY_QUESTION=3;

    const history=useHistory(); 

    const [card,setCard]=useState(null);

    const [dict,setDict]=useState(null);
    const [maximumPointsByCard,setMaximumPointsByCard]=useState(0);
    const [currentPointsByCard,setCurrentPointsByCard]=useState(0);

    const [isRenderable,setIsRenderable]=useState(false);

    
    const answerQuestion = (questionId) =>{

        getUsernameFromToken(localStorage.getItem("token"))
        .then((response)=>{
            let gameHistory={
                "cardId": card.id,
                "exerciseId": card.exercises[questionId].id,
                "memberId": response.data
            };
            getIsGameHistoryActiveByExerciseIdAndUserId(card.exercises[questionId].id,response.data)
                .then((data)=> data.data ?
                    (
                        history.push(`/Answer/${questionId}`) 
                    ) 
                    : 
                    (
                        createGameHistory(gameHistory)
                            .then(history.push(`/Answer/${questionId}`))
                    ))
        })          
    }

    const getNewCard=()=>{
        getUsernameFromToken(localStorage.getItem("token"))
        .then((response)=>
            deleteSessionByUserId(response.data)
                .then(history.push("/GetId")),
                ); 
    }

    useEffect(()=>{
        let dict2=new Map();
        
        getUsernameFromToken(localStorage.getItem("token")).then((response)=>
        getSessionsCardByUserId(response.data)
            .then((data)=>{
                setCard(data.data);
                data.data.exercises.forEach((exercise)=>{
                    getExperienceByExerciseIdAndUserId(exercise.id,response.data) 
                    .then((data2)=>{                        
                        dict2.set(exercise.id,data2.data);
                        setMaximumPointsByCard(maximumPointsByCard=>maximumPointsByCard+MAXIMUM_POINT_BY_QUESTION)
                        setCurrentPointsByCard(currentPointsByCard=>currentPointsByCard+data2.data)

                        setDict(dict2);
                        if(dict2.size>2 ){
                            setIsRenderable(true);
                        }                        
                        
                    })
                })
            }))
    },[])


    return (
        
        <div>
            {card===null || isRenderable===false ? 
            
            (<div><p>Kártya betöltése</p></div>) 
            :
            (
                <div>
                    <div className='test'>
                        <p className='h1'>{card.profession.name}</p>
                        <ol>
                            {
                            card.exercises.map((exercise,index)=>
                                <li key={index}>
                                <div className="grid-container">
                                    <p className="grid">{exercise.question}</p>
                                    <PurpleButton id={index} className="grid" onClick={event=>answerQuestion(event.target.id)} text="Megválaszolom" style={{}} />     
                                    <p className="grid">{dict.get(exercise.id)}/3</p>
                                </div>
                                </li>)
                            }
                            
                        </ol>
                    </div>
                    <div>
                        <img src={urhajos} alt="alt" className="responsiveGetId" style={{width:'100%',maxWidth:'300px',height:"auto", paddingRight:"1%"}}/>
                    </div>
                    <PurpleButton onClick={getNewCard} text="Új kártyát kérek!" />
                    <div>
                        <MiniCard text="Leírás" align="left" className="oneline" isTrue={true} desc={card.profession.description}/>
                        <MiniCard text={currentPointsByCard+"/"+maximumPointsByCard+"XP"}  align="right" className="oneline"/>
                        
                    </div>
                </div>
            ) 
            
            }         
        </div>
    )
}
