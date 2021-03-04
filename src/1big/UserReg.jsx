import React, { useState } from "react";
import PinkInfo from '../1medium/PinkInfo'
import {  Form, Row, Col } from 'react-bootstrap';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import PurpleButton from "../1small/PurpleButton";

export default function UserReg() {
    let inputProps = {
        placeholder: 'Születési dátum'
    };

    const [opacity, setOpa] = useState(0)

    const setOpacity = () => {
            setInterval(() => {
                if (opacity >= 100) return;
                setOpa(opacity => opacity + 1);
              }, 10);
            
    }

    const [name,setName]=useState();
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [passwordAgain,setPasswordAgain]=useState();
    const [email,setEmail]=useState();
    const [birthDate,setBirthDate]=useState();
    const [school,setSchool]=useState();
    const [group,setGroup]=useState();

    const submitForm = () => {
        console.log(name);    
    }


    return (
        <div>
            <PinkInfo title="Diák regisztráció" text="Ha diák vagy, itt tudsz regisztrálni." />
            <div style={{ marginLeft: "10%", marginRight: '10%'}}>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Teljes név*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control onChange={event=>setName(event.target.value)} type="fullname" placeholder="Ide írd a neved" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Születési dátum*:
                        </Form.Label>
                        <Col sm="5">
                            <Datetime inputProps={ inputProps } dateFormat="YYYY-MM-DD" closeOnSelect timeFormat={false}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Becenév*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control onChange={event=>setUsername(event.target.value)} placeholder="Írd be a beceneved" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Jelszó*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control onChange={event=>setPassword(event.target.value)}  placeholder="Találj ki egy jelszót" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Jelszó újra*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control onChange={event=>setPasswordAgain(event.target.value)} placeholder="Jelszó újra" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Email címed*:
                        </Form.Label>
                        <Col sm="5">
                           <Form.Control onChange={event=>setEmail(event.target.value)}  placeholder="Email cím" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Iskola*:
                        </Form.Label>
                        <Col sm="5">
                    <Form.Control as="select" onChange={event=>setSchool(event.target.value)} required onChange={event => setOpacity()}>
                        {[1,2,3].map((profession,index)=>
                            <option key={index} value={profession.id} >{profession}</option>
                        )}
                    </Form.Control>
                        </Col>
                    </Form.Group>
                    <div style={{opacity: (opacity + "%")}}>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Osztály*:
                        </Form.Label>
                        <Col sm="5">
                    <Form.Control onChange={event=>setGroup(event.target.value)} as="select" required>
                        {[1,2,3].map((profession,index)=>
                            <option key={index} value={profession.id}>{profession}</option>
                        )}
                    </Form.Control>
                        </Col>
                    </Form.Group>
                    </div>
                </Form>
                <div>
                    <p>A csillaggal jelölt mezők kitöltése kötelező.</p>
                </div>
                <div style={{marginBottom: "2vw"}}>
                    <PurpleButton onClick={submitForm} text="Regisztrálok!" />
                </div>
            </div>
        </div>
    )
}
