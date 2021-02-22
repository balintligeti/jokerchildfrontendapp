import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import PurpleButton from "../1small/PurpleButton";
import { getCardById,getAllProfessions,updateCard } from '../context/ApiCalls';
import { useHistory } from 'react-router-dom';


export default function ModifyCard(props) {
    const cardId=props.match.params.cardId
    const history=useHistory();
    const [professions,setProfessions]=useState(null);

    const [professionId,setProfessionId]=useState();
    const [professionName,setProfessionName]=useState();

    const [identificationId,setIdentificationId]=useState();

    const [exerciseId0,setExerciseId0]=useState();
    const [exerciseId1,setExerciseId1]=useState();
    const [exerciseId2,setExerciseId2]=useState();

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
        getCardById(cardId)
            .then((data)=>{
                setIdentificationId(data.data.identificationId);

                setQuestion0(data.data.exercises[0].question);
                setQuestion1(data.data.exercises[1].question);
                setQuestion2(data.data.exercises[2].question);

                setExerciseId0(data.data.exercises[0].id);
                setExerciseId1(data.data.exercises[1].id);
                setExerciseId2(data.data.exercises[2].id);
                
                let allWords=data.data.exercises[0].answer.split(";");
                setRightAnswers0(allWords[0].split("."));
                setWrongAnswers0(allWords[1].split("."));

                allWords=data.data.exercises[1].answer.split(";");
                setRightAnswers1(allWords[0].split("."));
                setWrongAnswers1(allWords[1].split("."));

                allWords=data.data.exercises[2].answer.split(";");
                setRightAnswers2(allWords[0].split("."));
                setWrongAnswers2(allWords[1].split("."));

                setAssistance0(data.data.exercises[0].assistance);
                setAssistance1(data.data.exercises[1].assistance);
                setAssistance2(data.data.exercises[2].assistance);

                setProfessionId(data.data.profession.id);
                setProfessionName(data.data.profession.name);

                getAllProfessions()
                    .then((data1)=>{
                        let list=data1.data;
                        let newList = list.filter(element=>element.id!==data.data.profession.id);
                        setProfessions(newList);
            });

            })
    },[cardId])


    const modifyCard = () =>{

        let answer0=rightAnswers0+";"+wrongAnswers0;
        let answer1=rightAnswers1+";"+wrongAnswers1;
        let answer2=rightAnswers2+";"+wrongAnswers2;

        let card={
            "id":cardId,
            "exercises": [
              {
                "id": exerciseId0,
                "answer": answer0,
                "assistance": assistance0,
                "question": question0
              },
              {
                "id":exerciseId1,
                "answer": answer1,
                "assistance": assistance1,
                "question": question1
              },
              {
                "id":exerciseId2,
                "answer": answer2,
                "assistance": assistance2,
                "question": question2
              }
            ],
            "identificationId": identificationId,
          }
        updateCard(card,professionId)
        .then(history.push("/allcard"),
                window.location.reload())


    }

    return(
        <div>
            {professions==null ? (
                <div></div>
            ) 
            : 
            (
            <div>
            <h1>Itt tudsz hozzáadni új kártyát a játékhoz!</h1>
            <div>
                <div>
                    <p>Kártya azonosító megadása:</p>
                    <input onChange={event=>setIdentificationId(event.target.value)} defaultValue={identificationId} type="text" name="id" />
                </div>
                <Form.Group>
                    <Form.Label>Szakma</Form.Label>
                    <Form.Control as="select" onChange={event=>setProfessionId(event.target.value)}>
                        <option value={professionId}>{professionName}</option>
                        {professions.map((profession,index)=>
                            <option key={index} value={profession.id}>{profession.name}</option>
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
                                        <Form.Control onChange={event=>setQuestion0(event.target.value)} defaultValue={question0} type="question" placeholder="Írd ide a kérdést!"/>            
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Helyes válaszok:</Form.Label>
                                        <Form.Control onChange={event=>setRightAnswers0(event.target.value)} defaultValue={rightAnswers0} type="goodAnswers" placeholder="pl.: A nap süt. Meleg van. Nem esik a hó" />
                                        <Form.Text className="text-muted">
                                            A válasz kifejezéseket ponttal kell elválasztani.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Helytelen válaszok:</Form.Label>
                                            <Form.Control onChange={event=>setWrongAnswers0(event.target.value)} defaultValue={wrongAnswers0} type="badAnswers" placeholder="pl.: A nap süt. Meleg van. Nem esik a hó" />
                                            <Form.Text className="text-muted">
                                            A válasz kifejezéseket ponttal kell elválasztani.
                                            </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Segítség:</Form.Label>
                                            <Form.Control onChange={event=>setAssistance0(event.target.value)} defaultValue={assistance0} type="assistance" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO" />
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
                                    <Form.Group>
                                        <Form.Label>Mi a kérdés?</Form.Label>
                                        <Form.Control onChange={event=>setQuestion1(event.target.value)} defaultValue={question1} type="question" placeholder="Írd ide a kérdést!"/>
                                        
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Helyes válaszok:</Form.Label>
                                        <Form.Control onChange={event=>setRightAnswers1(event.target.value)} defaultValue={rightAnswers1} type="goodAnswers" placeholder="pl.: A nap süt. Meleg van. Nem esik a hó" />
                                        <Form.Text className="text-muted">
                                            A válasz kifejezéseket ponttal kell elválasztani.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Helytelen válaszok:</Form.Label>
                                            <Form.Control onChange={event=>setWrongAnswers1(event.target.value)} defaultValue={wrongAnswers1} type="badAnswers" placeholder="pl.: A nap süt. Meleg van. Nem esik a hó" />
                                            <Form.Text className="text-muted">
                                            A válasz kifejezéseket ponttal kell elválasztani.
                                            </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Segítség:</Form.Label>
                                            <Form.Control onChange={event=>setAssistance1(event.target.value)} defaultValue={assistance1} type="assistance" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO" />
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
                                    <Form.Group>
                                        <Form.Label>Mi a kérdés?</Form.Label>
                                        <Form.Control onChange={event=>setQuestion2(event.target.value)} defaultValue={question2} type="question" placeholder="Írd ide a kérdést!"/>
                                        
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Helyes válaszok:</Form.Label>
                                        <Form.Control onChange={event=>setRightAnswers2(event.target.value)} defaultValue={rightAnswers2} type="goodAnswers" placeholder="pl.: A nap süt. Meleg van. Nem esik a hó" />
                                        <Form.Text className="text-muted">
                                            A válasz kifejezéseket ponttal kell elválasztani.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Helytelen válaszok:</Form.Label>
                                            <Form.Control onChange={event=>setWrongAnswers2(event.target.value)} defaultValue={wrongAnswers2} type="badAnswers" placeholder="pl.: A nap süt. Meleg van. Nem esik a hó" />
                                            <Form.Text className="text-muted">
                                            A válasz kifejezéseket ponttal kell elválasztani.
                                            </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Segítség:</Form.Label>
                                            <Form.Control onChange={event=>setAssistance2(event.target.value)} defaultValue={assistance2} type="assistance" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO" />
                                            <Form.Text className="text-muted">
                                            Beágyazáshoz szükséges youtube link.
                                            </Form.Text>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <PurpleButton onClick={modifyCard} text="Kártya módosítása"/>
            </div>
        </div>
            )}
             

        </div>)
}