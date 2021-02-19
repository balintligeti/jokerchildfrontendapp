import React from "react";
import "../game.css"
import PinkInfo from "../1medium/PinkInfo"
import PurpleButton from "../1small/PurpleButton"
import MiniCard from "../1small/MiniCard"
import { useHistory } from 'react-router-dom'


export default function WelcomePage() {
    const history=useHistory(); 
    const getNewCard=()=>{
        history.push("/GetId");
    }
    return (
        <div>
            <PinkInfo title="Joker Child" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            <div className="purplButt">
            <PurpleButton onClick={getNewCard} text="Kód beírás" />
            </div>
                <MiniCard text="Diákként " text2="regisztrálok!" align="left" />
                <MiniCard text="Tanárként " text2="regisztrálok!" align="right" />
        </div>
    )
}
