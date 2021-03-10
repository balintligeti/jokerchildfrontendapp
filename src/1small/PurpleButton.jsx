import React from 'react'
import "./PurpleButton"
import {Button} from 'react-bootstrap';


export default function PurpleButton(props) {

    return (
        <div className="purpleButt">
            <Button variant="default"  id={props.id} onClick={props.onClick} style={{color: 'white', marginBottom: "2vw", background: '#7749f8', fontFamily:'sans-serif', fontSize:"xx-large", fontWeight:"bolder"}}>{props.text}</Button>
        </div>
    )
}
