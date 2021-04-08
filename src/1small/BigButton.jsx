import { delay } from 'q';
import React from 'react'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export default function BigButton(props) {


    const waitAfterPress = async () => {
        await delay(300);
        props.press()
    }
    return (
        <div>
               <AwesomeButton onPress={waitAfterPress} size="large"  type="secondary">
      {props.text}
    </AwesomeButton>
        </div>
    )
}
