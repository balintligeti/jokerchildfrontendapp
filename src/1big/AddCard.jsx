import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import PurpleButton from "../1small/PurpleButton";
import { createCardWithExistingProfession,getAllProfessions } from '../context/ApiCalls';



export default function AddCard() {

    const [professions,setProfessions]=useState(null);

    const [cardId,setCardId]=useState();
    const [professionId,setProfessionId]=useState();

    const [question0,setQuestion0]=useState();
    const [question1,setQuestion1]=useState();
    const [question2,setQuestion2]=useState();

    const [rightAnswers0,setRightAnswers0]=useState();
    const [rightAnswers1,setRightAnswers1]=useState();
    const [rightAnswers2,setRightAnswers2]=useState();

    const [wrongAnswers0,setWrongAnswers0]=useState();
    const [wrongAnswers1,setWrongAnswers1]=useState();
    const [wrongAnswers2,setWrongAnswers2]=useState();

    const [assistance0,setAssistance0]=useState();
    const [assistance1,setAssistance1]=useState();
    const [assistance2,setAssistance2]=useState();

    useEffect(()=>{
        getAllProfessions()
            .then((data)=>{
                setProfessions(data.data);
                setProfessionId(data.data[0].id) //need for avoinding the undifined value if we choose the default option
            });
    },[])

    const createNewCard = () =>{
        let answer0=rightAnswers0+";"+wrongAnswers0;
        let answer1=rightAnswers1+";"+wrongAnswers1;
        let answer2=rightAnswers2+";"+wrongAnswers2;

        let card={
                "exercises": [
                  {
                    "answer": answer0,
                    "assistance": assistance0,
                    "question": question0
                  },
                  {
                    "answer": answer1,
                    "assistance": assistance1,
                    "question": question1
                  },
                  {
                    "answer": answer2,
                    "assistance": assistance2,
                    "question": question2
                  }
                ],
                "identificationId": cardId,
              }

            createCardWithExistingProfession(card,professionId)
                .then(window.location.reload());     
    }

    return (
        <div>
            {
                professions===null ? (
                    <h1>Oldal betöltése</h1>
                ) 
                : 
                (
                    <div>
                        <h1>Itt tudsz hozzáadni új kártyát a játékhoz!</h1>
            <div>
                <div>
                    <p>Kártya azonosító megadása:</p>
                    <input onChange={event=>setCardId(event.target.value)} type="text" name="id" />
                </div>
                <Form.Group>
                    <Form.Label>Szakma</Form.Label>
                    <Form.Control as="select" onChange={event=>setProfessionId(event.target.value)} defaultValue="Szakma">
                        {professions.map((profession)=>
                            <option value={profession.id}>{profession.name}</option>
                        )}

                    </Form.Control>
                </Form.Group>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                               Kérdés megadásához kattints ide!
                            </Accordion.Toggle>
                        </Card.Header>
                        
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                            <Form>
                                    <Form.Group>
                                        <Form.Label>Mi a kérdés?</Form.Label>
                                        <Form.Control onChange={event=>setQuestion0(event.target.value)} type="question" placeholder="Írd ide a kérdést!"/>
                                        
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Helyes válaszok:</Form.Label>
                                        <Form.Control onChange={event=>setRightAnswers0(event.target.value)} type="goodAnswers" placeholder="pl.: A nap süt, Meleg van, Nem esik a hó" />
                                        <Form.Text className="text-muted">
                                            A válasz kifejezéseket vesszővel kell elválasztani.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Label>Helytelen válaszok:</Form.Label>
                                            <Form.Control onChange={event=>setWrongAnswers0(event.target.value)} type="badAnswers" placeholder="pl.: A nap süt, Meleg van, Nem esik a hó" />
                                            <Form.Text className="text-muted">
                                            A válasz kifejezéseket vesszővel kell elválasztani.
                                            </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Label>Segítség:</Form.Label>
                                            <Form.Control onChange={event=>setAssistance0(event.target.value)} type="assistance" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO" />
                                            <Form.Text className="text-muted">
                                            Beágyazáshoz szükséges youtube link.
                                            </Form.Text>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Kérdés megadásához kattints ide!
                    </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Mi a kérdés?</Form.Label>
                                        <Form.Control onChange={event=>setQuestion1(event.target.value)} type="question" placeholder="Írd ide a kérdést!"/>
                                        
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Helyes válaszok:</Form.Label>
                                        <Form.Control onChange={event=>setRightAnswers1(event.target.value)} type="goodAnswers" placeholder="pl.: A nap süt, Meleg van, Nem esik a hó" />
                                        <Form.Text className="text-muted">
                                            A válasz kifejezéseket vesszővel kell elválasztani.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Label>Helytelen válaszok:</Form.Label>
                                            <Form.Control onChange={event=>setWrongAnswers1(event.target.value)} type="badAnswers" placeholder="pl.: A nap süt, Meleg van, Nem esik a hó" />
                                            <Form.Text className="text-muted">
                                            A válasz kifejezéseket vesszővel kell elválasztani.
                                            </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Label>Segítség:</Form.Label>
                                            <Form.Control onChange={event=>setAssistance1(event.target.value)} type="assistance" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO" />
                                            <Form.Text className="text-muted">
                                            Beágyazáshoz szükséges youtube link.
                                            </Form.Text>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Kérdés megadásához kattints ide!
                    </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Mi a kérdés?</Form.Label>
                                        <Form.Control onChange={event=>setQuestion2(event.target.value)} type="question" placeholder="Írd ide a kérdést!"/>
                                        
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Helyes válaszok:</Form.Label>
                                        <Form.Control onChange={event=>setRightAnswers2(event.target.value)} type="goodAnswers" placeholder="pl.: A nap süt, Meleg van, Nem esik a hó" />
                                        <Form.Text className="text-muted">
                                            A válasz kifejezéseket vesszővel kell elválasztani.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Label>Helytelen válaszok:</Form.Label>
                                            <Form.Control onChange={event=>setWrongAnswers2(event.target.value)} type="badAnswers" placeholder="pl.: A nap süt, Meleg van, Nem esik a hó" />
                                            <Form.Text className="text-muted">
                                            A válasz kifejezéseket vesszővel kell elválasztani.
                                            </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Label>Segítség:</Form.Label>
                                            <Form.Control onChange={event=>setAssistance2(event.target.value)} type="assistance" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO" />
                                            <Form.Text className="text-muted">
                                            Beágyazáshoz szükséges youtube link.
                                            </Form.Text>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <PurpleButton onClick={createNewCard} text="Kártya hozzáadása" />
            </div>
                    </div>
                )
            }
            
        </div>
    )
}
