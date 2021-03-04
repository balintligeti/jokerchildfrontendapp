import React from 'react'
import "./miniCard.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function MiniCard(props) {

    const rightOrLeft = (props.align === 'left') ? 'miniCLeft' : 'miniCRight';
    if (props.isTrue) {
        return (<div className={rightOrLeft}>
            <Popup trigger={<p>Leírás</p>} position="top center" style={{borderRadius: '10px'}}>
                <div>{props.desc}</div>
            </Popup>
        </div>)
    } else {
        return (
            <div className={rightOrLeft}>
                <p>{props.text}</p>
                <p>{props.text2}</p>
            </div>
        )
    } 
    
}
