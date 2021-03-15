import React,{useState, useEffect}from 'react'
import { getAllCards, deleteCard } from "../context/ApiCalls"
import { Table } from 'react-bootstrap';
import PurpleButton from '../1small/PurpleButton';
import PinkInfo from '../1medium/PinkInfo';
import { useHistory } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BigButton from '../1small/BigButton'

export default function AllCard() {
    
    const [cards, setCards] = useState([])

    const history=useHistory();

    const getCards = () => {
        getAllCards()
            .then(res => setCards(res.data));
    }
    useEffect(() => {
        getCards()
    }, [])



    const deleteOneCard = (id) => {
        confirmAlert({
            title: 'Megerősítés',
            message: 'Biztos vagy benne, hogy törölni szeretnéd a kártyát?',
            buttons: [
              {
                label: 'Igen',
                onClick: () => {
                    deleteCard(id);
                    getCards();
                }
              },
              {
                label: 'nem',
              }
            ]
          });

    }
    const modifyCard = (cardId) =>{
        history.push(`/modifycard/${cardId}`)
    }

    return (
        <div>
            <PinkInfo title="Kártyák listája" />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Azonosító</th>
                        <th>Szakma</th>
                        <th>Módosítás</th>
                        <th>Törlés</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card,key) => (
                        <tr key={key}>
                            <td>{card.identificationId}</td>
                            <td>{card.profession.name}</td>                           
                            <td><PurpleButton id={card.id} onClick={event=>modifyCard(event.target.id)} text="Szerkesztés"/></td>
                            <td><PurpleButton id={card.id} onClick={event=>(deleteOneCard(card.id))} text="Törlés"/></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{marginTop: "20px", marginBottom: "20px"}}>
                <a href="/addcard"><BigButton  press={{}} text="Kártya hozzáadása" /></a>
            </div>
        </div>
    )
    
}