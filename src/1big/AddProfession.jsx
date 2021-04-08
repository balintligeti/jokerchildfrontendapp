import React, { useState } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import { createProfession } from '../context/ApiCalls';
import { useHistory } from 'react-router-dom'
import BigButton from '../1small/BigButton'



export default function AddProfession() {

    const history=useHistory();

    const [name,setName]=useState();
    const [description,setDescription]=useState("test");


    const createNewProfession= () =>{
        let profession={
            "name": name,
            "picture": "TODO",
            "description":description
          }

        createProfession(profession)
            .then(history.push("/allprofession"),window.location.reload());     
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
                <div style={{marginTop: "20px", marginBottom: "20px"}}>
                    <BigButton press={createNewProfession} text="Kártya hozzáadása" />
                </div>
            </div>
        </div>
    )
}
