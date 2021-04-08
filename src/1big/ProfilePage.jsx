import React from 'react'
import {deleteAllGameHistoryByUserId,getUsernameFromToken} from "../context/ApiCalls"
import PurpleButton from "../1small/PurpleButton"



export default function ProfilePage() {

    const resetProfile = () =>{
        //TODO:reset xp
        getUsernameFromToken(localStorage.getItem("token"))
        .then((response)=>
            deleteAllGameHistoryByUserId(response.data)
                .then((data)=>console.log(data.data)))
    }

    return(<div>
            <div>
                <h1> Profil </h1>
                <PurpleButton  onClick={resetProfile} text="Profil nullázása" />     
            </div>

        </div>)
}