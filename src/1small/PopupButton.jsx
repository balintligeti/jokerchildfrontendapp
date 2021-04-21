import React,{useState} from 'react'
import { Button, Popup } from 'semantic-ui-react'
import './popup.css'
import { useHistory } from 'react-router-dom';
import {validateAnswer,getUsernameFromToken} from "../context/ApiCalls"
import './purpleButton.css'
import BigButton from '../1small/BigButton'

export default function PopupButton(props) {
    let counter = 0;
    const history=useHistory();

    const [memberId,setMemberId]=useState(null);


    const goodAnswers = () => {
        props.selectedW.map(item => {
            if (props.goodW.includes(item.content)) {
                counter++;
            };
        return counter;
        })
    }


    const setContent = () => {
        if (props.goodW.length === props.selectedW.length) {
            goodAnswers();
            return (
                <>
                    <p>{props.goodW.length} / {counter} válaszod helyes.</p>
                </>
            )
        } else if (props.goodW.length < props.selectedW.length || props.goodW.length > props.selectedW.length) {
            return (
                <>
                    <p>{props.goodW.length} választ kell megadnod!</p>
                </>
            )
        }
    }

    const validate = () => {

            const selectedItems = [];
            props.selectedW.forEach(item => {
                selectedItems.push(item.content)
            })
            if(JSON.stringify(selectedItems.sort()) === JSON.stringify(props.goodW.sort())) {

                validateAnswer(0,props.exerciseId,true); 
                history.push("/succesful");

            }
            else{
                validateAnswer(0,props.exerciseId,false);
            }

    }

    return (
        <Popup
            content={setContent()}
            on='click'
            positionFixed
            className='popup'
            trigger={<button style={{background: "white", color: "black", borderColor: "white", border: "0"}} onClick={validate}><BigButton press={event => validate} text="Kész!"/></button>}
        />

    )
}

