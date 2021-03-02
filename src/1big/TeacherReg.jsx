import React from "react";
import PinkInfo from '../1medium/PinkInfo'
import {  Form, Row, Col } from 'react-bootstrap';
import "react-datetime/css/react-datetime.css";
import PurpleButton from "../1small/PurpleButton";

export default function TeacherReg() {

    return (
        <div>
            <PinkInfo title="Tanári regisztráció" text="Ha tanár vagy, itt tudsz regisztrálni." />
            <div style={{ marginLeft: "10%", marginRight: '10%'}}>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Teljes név*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control type="fullname" placeholder="Ide írd a neved" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Becenév*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control  placeholder="Írd be a beceneved" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Jelszó*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control  placeholder="Találj ki egy jelszót" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Jelszó újra*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control placeholder="Jelszó újra" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Email címed*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control  placeholder="Email cím" />
                        </Col>
                    </Form.Group>
                </Form>
                <div style={{marginBottom: "2vw"}}>
                    <PurpleButton text="Regisztrálok!" />
                </div>
            </div>
        </div>
    )
}
