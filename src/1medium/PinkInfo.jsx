import React from "react";
import "./pinkInfo.css"

export default function PinkInfo(props) {


    return (
        <div className='test'>
            <p style={{fontSize:"50px"}}>{props.title}</p>
            <p>{props.text}</p>
            <p>{props.ansOptions}</p>
        </div>
    )
}
