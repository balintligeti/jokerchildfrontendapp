import React, { useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import PurpleButton from "../1small/PurpleButton";
import { createProfession } from '../context/ApiCalls';



export default function AddProfession() {


    const [name,setName]=useState();
    const [picture,setPicture]=useState();
    const [description,setDescription]=useState("test");


    const createNewProfession= () =>{

        let test="Works";

        let profession={
            "name": name,
            "picture": "TODO",
            "description":description
          }

        createProfession(profession)
            .then((data)=>window.location.reload());     
    }



    return (
        <div>
            <h1>Itt tudsz hozzáadni új szakmát a játékhoz!</h1>
            <div>
                <Accordion>
                    <Card>
                        <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>A szakma neve:</Form.Label>
                                <Form.Control onChange={event=>setName(event.target.value)} type="professionName" placeholder="pl.: Pék"/>    
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Szakma leírása:</Form.Label>
                                <Form.Control onChange={event=>setDescription(event.target.value)} type="professionDescription" placeholder="pl.: Korán kel kenyeret süt." />
                            </Form.Group>        
                            </Form>
                        </Card.Body>
                    </Card> 
                </Accordion>
                <PurpleButton onClick={createNewProfession} text="Kártya hozzáadása" />
            </div>
        </div>
    )
}
