import React,{useState}from 'react'
import PinkInfo from "../1medium/PinkInfo"
import "./getId.css"
import {getCardByIdentificationId,createSession,getUsernameFromToken} from "../context/ApiCalls"
import { useHistory } from 'react-router-dom'
import BigButton from '../1small/BigButton'


export default function GetId() {

    const history=useHistory();

    const [identificationId,setIdentificationId]=useState("");

    const onValidIdentificationId = (cardData) =>{
        getUsernameFromToken(localStorage.getItem("token"))
        .then((response)=>{
            let session={
                "userId":response.data,
                "cardId":cardData.id
            }
            createSession(session).then(
                history.push("/Questions"),
                window.location.reload() //Need to reload the navbar
                );
        })
        
    }

    const submitCode = () => {
        getCardByIdentificationId(identificationId)
            .then(data=>data.data==="" ? window.alert("Rossz azonosító kód") : onValidIdentificationId(data.data));
    }

    return (
            <div>
                <PinkInfo text="Kérlek add meg a kártyán található kódot amivel játszani szeretnél." />
                <div className="input1">
                    <input type="text" name="name"  className="input1" onChange={event=>setIdentificationId(event.target.value)}/>
                </div>
                <div style={{marginBottom: "3vw"}}>
                <BigButton text="Kártya betöltése" press={submitCode} />
                </div>
                      
            </div>      
    )
}
