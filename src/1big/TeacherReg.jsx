import React,{useState} from "react";
import PinkInfo from '../1medium/PinkInfo'
import {  Form, Row, Col } from 'react-bootstrap';
import "react-datetime/css/react-datetime.css";
import PurpleButton from "../1small/PurpleButton";
import { register } from '../context/ApiCalls';


export default function TeacherReg() {


    const [name,setName]=useState();
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [passwordAgain,setPasswordAgain]=useState();
    const [email,setEmail]=useState();
    const [birthDate,setBirthDate]=useState();
    const [school,setSchool]=useState();
    const [group,setGroup]=useState();

    const submitForm = () => {
        let member={
            //"birthDate": birthDate,
            "email": email,
            "experience": 0,
            "id":7777777, //TODO need to remove
            "name": name,
            "password": password,
            "role": "TEACHER",
            "username": username
          }

          register(member).then((res)=>{
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("username",res.data.username);
        });  

    }


    return (
        <div>
            <PinkInfo title="Tanári regisztráció" text="Ha tanár vagy, itt tudsz regisztrálni." />
            <div style={{ marginLeft: "10%", marginRight: '10%'}}>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label onChange={event=>setName(event.target.value)} column sm="5">
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
                           <Form.Control onChange={event=>setEmail(event.target.value)} placeholder="Email cím" />
                        </Col>
                    </Form.Group>
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
