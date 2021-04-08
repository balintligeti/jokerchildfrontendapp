import React from "react";
import PinkInfo from '../1medium/PinkInfo'
import {  Form, Row, Col } from 'react-bootstrap';
import BigButton from '../1small/BigButton'
import { useHistory } from 'react-router-dom'
import "../game.css"

export default function Login() {
    const history=useHistory(); 


    return (
        <div>
            <PinkInfo title="Belépés" text="Diákok és tanárok részére." />
            <div style={{ marginLeft: "10%", marginRight: '10%'}}>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Becenév:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control  placeholder="Írd be a beceneved" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Jelszó:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control  placeholder="Add meg a jelszavad" />
                        </Col>
                    </Form.Group>
                </Form>

                <div style={{marginBottom: "2vw"}} className="purplButt">
                <BigButton text="Belépés" press={event => history.push("/login")} />
                </div>
            </div>
        </div>
    )
}
