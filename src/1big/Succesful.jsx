import React from 'react'
import { Link } from 'react-router-dom'
import PurpleButton from '../1small/PurpleButton'

export default function Succesful() {
    return (
        <div>
            <h1 style={{marginTop: "2vw"}}>🤩</h1>
            <h1>Gratulálunk!</h1>
            <h3>Sikeresen válaszoltál a kérdésre!</h3>
            <Link to='/questions'><PurpleButton text="Vissza a kérdésekhez!" /></Link>
        </div>
    )
}
