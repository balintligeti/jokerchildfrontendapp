import React from 'react'
import "./purpleButton.css"
import {Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";


export default function PurpleButton(props) {

    return (
        <div>
            <Button className="custom-btn" size="lg"  id={props.id} onClick={props.onClick} >{props.text}</Button>
        </div>
    )
}
