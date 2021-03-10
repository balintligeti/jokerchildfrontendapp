import React, { useState, useEffect } from "react";
import PinkInfo from '../1medium/PinkInfo'
import {  Form, Row, Col } from 'react-bootstrap';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import PurpleButton from "../1small/PurpleButton";
import {getAllSchool, getClassesById} from "../context/ApiCalls"
export default function UserReg() {
    let inputProps = {
        placeholder: 'Születési dátum'
    };

    const [opacity, setOpa] = useState(0)
    const [schools, setSchools] = useState([])
    const [classes, setClasses] = useState([])
    
    const setOpacity = () => {
            setInterval(() => {
                if (opacity >= 100) return;
                setOpa(opacity => opacity + 1);
              }, 6);    
    }


    useEffect(() => {
        getAllSchool()
            .then((res) => {
                setSchools(res.data)
            })
    }, [])

    const selectClass = (schoolName) => {
        setOpacity()
            getClassesById(schoolName)
                .then((res) => {
                    setClasses(res.data)
                    console.log(classes)
                })
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
                           <Form.Control type="fullname" placeholder="Ide írd a neved"/>
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
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                            Iskola*:
                        </Form.Label>
                        <Col sm="5">
                    <Form.Control as="select" required onChange={event => {selectClass(event.target.value)}}>
                        <option selected="true" disabled="disabled">Válassz iskolát!</option>
                        {schools.map((school,index)=>
                            <option key={index} value={school.name}>{school.name}</option>
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
                    <Form.Control as="select" required>
                        {classes.map((team,index)=>
                            <option key={index} value={team.team}>{team.team}</option>
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
                    <PurpleButton text="Regisztrálok!" />
                </div>
            </div>
        </div>
    )
}
