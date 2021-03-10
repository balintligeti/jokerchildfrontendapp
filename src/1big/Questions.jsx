import React,{useState, useEffect} from 'react'
import PurpleButton from "../1small/PurpleButton"
import "../1medium/pinkInfo.css"
import urhajos from "../pics/urhajos.png"
import MiniCard from "../1small/MiniCard"
import "./questions.css"
import {getSessionsCardByUserId,getExperienceByExerciseIdAndUserId,deleteSessionByUserId,
createGameHistory,getIsGameHistoryActiveByExerciseIdAndUserId} from "../context/ApiCalls"
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

        let gameHistory={
            "cardId": card.id,
            "exerciseId": card.exercises[questionId].id,
            "memberId": 0  //Todo set player's id  
        }

        getIsGameHistoryActiveByExerciseIdAndUserId(card.exercises[questionId].id,0)
            .then((data)=> data.data ?
                (
                    history.push(`/Answer/${questionId}`) 
                ) 
                : 
                (
                    createGameHistory(gameHistory)
                        .then(history.push(`/Answer/${questionId}`))
                ))
              
    }

    const getNewCard=()=>{
        deleteSessionByUserId(0) // 0 hard coded for basic user Todo change
            .then(history.push("/GetId"),
            window.location.reload() //Needs to reload navbar
            ); 
    }

    useEffect(()=>{
        let dict2=new Map();
        
        getSessionsCardByUserId(0) // fix value until login is not implemented
            .then((data)=>{
                setCard(data.data);
                data.data.exercises.forEach((exercise)=>{
                    getExperienceByExerciseIdAndUserId(exercise.id,0) // 0 will be the userId
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
            })
    },[])


    return (
        
        <div>
            {card===null || isRenderable===false ? 
            
            (<div><p>Kártya betöltése</p></div>) 
            :
            (
                <div>
                    <div className='test'>
                        <p className='h1' style={{marginBottom: "2vw", fontSize: "7vw"}}>{card.profession.name}</p>
                        <ol>
                            {
                            card.exercises.map((exercise,index)=>
                                <li key={index}>
                                <div className="grid-container">
                                    <p className="grid">{exercise.question}</p>
                                    <PurpleButton id={index} className="grid" onClick={event=>answerQuestion(event.target.id)} text="Megválaszolom"/>   
                                    <p className="grid">{dict.get(exercise.id)}/3</p>
                                </div>
                                {(index < 2) ? <hr style={{borderWidth: "2px", opacity: "70%",borderColor: "purple"}}></hr> : <p></p>}
                                </li>)
                            }
                            
                        </ol>
                    </div>
                    <div>
                        <img src={urhajos} alt="alt" className="responsiveGetId" style={{width:'100%',maxWidth:'300px',height:"auto", paddingRight:"1%"}}/>
                    </div>
                    <div style={{margin: "2vw"}}>
                        <PurpleButton onClick={getNewCard} text="Új kártyát kérek!" />
                    </div>
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
