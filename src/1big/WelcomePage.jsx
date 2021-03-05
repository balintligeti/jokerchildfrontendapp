import React, { useState, useEffect } from "react";
import "../game.css"
import PinkInfo from "../1medium/PinkInfo"
import PurpleButton from "../1small/PurpleButton"
import MiniCard from "../1small/MiniCard"
import { useHistory } from 'react-router-dom'


export default function WelcomePage() {
    const history=useHistory(); 
    const [opacity, setOpa] = useState(0)

    const setOpacity = () => {
            setInterval(() => {
                if (opacity >= 100) return;
                setOpa(opacity => opacity + 1);
              }, 10);
            
    }

    useEffect(() => {
        setOpacity();
    }, [])
    return (
        <div style={{opacity: opacity + "%"}}>
            <PinkInfo title="Joker Child" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            <div className="purplButt">
            <PurpleButton onClick={event => history.push("/login")} text="Belépés" />
            </div>
                <div onClick={event => history.push("/userreg")}><MiniCard text="Diák"  text2="regisztráció" align="left" /></div>
                <div onClick={event => history.push("/teacherreg")}><MiniCard text="Tanár" text2="regisztráció" align="right" /></div>
        </div>
    )
}
