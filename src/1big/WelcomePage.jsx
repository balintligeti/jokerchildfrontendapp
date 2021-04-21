import React from "react";
import "../game.css"
import PinkInfo from "../1medium/PinkInfo"
import MiniCard from "../1small/MiniCard"
import { useHistory } from 'react-router-dom'
import BigButton from '../1small/BigButton'


export default function WelcomePage() {
    const history=useHistory(); 

    return (
        <div>
            <PinkInfo title="Joker Child" text="Üdvözlünk a Joker Child kártyajáték weboldalán! Ha már regisztráltál, jelentkezz be, hogy elkezdhess egy játékot. Amennyiben még nem regisztráltál, a bal alsó sarokban tudsz létrehozni saját fiókot." />
            <div className="purplButt" style={{marginBottom: "1vw"}}>
            <BigButton text="Belépés" press={event => history.push("/login")}/>
            </div>
                <div onClick={event => history.push("/userreg")}><MiniCard text="Diák"  text2="regisztráció" align="left" /></div>
                <div onClick={event => history.push("/teacherreg")}><MiniCard text="Tanár" text2="regisztráció" align="right" /></div>
        </div>
    )
}
