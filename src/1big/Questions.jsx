import React,{useState,useEffect} from 'react'
import PurpleButton from "../1small/PurpleButton"
import "../1medium/pinkInfo.css"
import urhajos from "../pics/urhajos.png"
import MiniCard from "../1small/MiniCard"
import "./questions.css"
import {getSessionsCardByUserId,getExperienceByExerciseIdAndUserId} from "../context/ApiCalls"
import { useHistory } from 'react-router-dom'


export default function Questions() {

    const history=useHistory(); 

    const [card,setCard]=useState(null);

    const [dict,setDict]=useState(null);
    const [isRenderable,setIsRenderable]=useState(false);
 
    const [gameHistory,setGameHistory]=useState(null);

    const [userId,setUserId]=useState(0); //TODO:getfrom userToken

    
    const answerQuestion = (questionId) =>{
        history.push(`/Answer/${questionId}`);
    }

    const getNewCard=()=>{
        history.push("/GetId");
    }

    useEffect(()=>{
        let dict2=new Map();
        
        getSessionsCardByUserId(0) // fix value until login is not implemented
            .then((data)=>{
                setCard(data.data);
                data.data.exercises.map((exercise)=>{
                    getExperienceByExerciseIdAndUserId(exercise.id,0) // 0 will be the userId
                    .then((data2)=>{                        
                        dict2.set(exercise.id,data2.data);

                        setDict(dict2);
                        dict2.size>2 ? setIsRenderable(true) : console.log("Not yet render"+dict2.size);

                    })
                })
            })
    },[])


    return (
        
        <div>
            {card==null || isRenderable==false ? 
            
            (<div><p>Kártya betöltése</p></div>) 
            :
            (
                <div>
                    <div className='test'>
                        <p className='h1'>{card.profession.name}</p>
                        <ol>
                            {
                                card.exercises.map((exercise,index)=><li>
                                    <div className="grid-container">
                                        <p>{exercise.question}</p>
                                        <PurpleButton id={index} onClick={event=>answerQuestion(event.target.id)} text="Megválaszolom" />     
                                        <p>{dict.get(exercise.id)}/3</p>
                                    </div>
                                    </li>)
                            }
                            
                        </ol>
                    </div>
                    <div className="pics">
                        <img src={urhajos} className="responsiveGetId" style={{minWidth:"250px", paddingRight:"1%"}}/>
                    </div>
                    <PurpleButton onClick={getNewCard} text="Új kártyát kérek!" />
                    <div>
                        <MiniCard text="Leírás" align="left" className="oneline" />
                        <MiniCard text="12/2 XP-t gyűjtöttél" align="right" className="oneline"/>
                    </div>
                </div>
            ) 
            
            }         
        </div>
    )
}
