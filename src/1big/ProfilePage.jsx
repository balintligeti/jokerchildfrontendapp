import React from 'react'
import {deleteAllGameHistoryByUserId} from "../context/ApiCalls"
import PurpleButton from "../1small/PurpleButton"



export default function ProfilePage() {

    const resetProfile = () =>{
        //TODO:reset xp
        deleteAllGameHistoryByUserId(0)
        .then((data)=>console.log(data.data))
    }

    return(<div>
            <div>
                <h1> Profil </h1>
                <PurpleButton  onClick={resetProfile} text="Profil nullázása" />     
            </div>

        </div>)
}