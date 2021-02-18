import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import './popup.css'
import { useHistory } from 'react-router-dom';
import {validateAnswer} from "../context/ApiCalls"


export default function PopupButton(props) {
    let counter = 0;
    const history=useHistory();

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
        props.selectedW.map(item => {
            selectedItems.push(item.content)
        })
        if(JSON.stringify(selectedItems.sort()) === JSON.stringify(props.goodW.sort())) {
            //TODO: put history

            validateAnswer(0,props.exerciseId,true) //TODO 0 is only a hardcoded value need to swich if login is implemented
            history.push("/Questions")
        }
        else{
            validateAnswer(0,props.exerciseId,false)//TODO 0 is only a hardcoded value need to swich if login is implemented
        }
    }

    return (
        <Popup
            content={setContent()}
            on='click'
            positionFixed
            className='popup'
            trigger={<Button  style={{ color: 'white', background: '#7749f8', fontFamily: 'sans-serif', fontWeight: "bolder", borderRadius: "10px" }} onClick={validate}>{props.text}</Button>}
        />

    )
}

