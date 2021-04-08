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
            <PinkInfo title="Joker Child" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            <div className="purplButt">
            <BigButton text="Belépés" press={event => history.push("/login")} />
            </div>
                <div onClick={event => history.push("/userreg")}><MiniCard text="Diák"  text2="regisztráció" align="left" /></div>
                <div onClick={event => history.push("/teacherreg")}><MiniCard text="Tanár" text2="regisztráció" align="right" /></div>
        </div>
    )
}
