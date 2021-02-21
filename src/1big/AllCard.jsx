import React,{useState, useEffect}from 'react'
import { getAllCards, deleteCard } from "../context/ApiCalls"
import { Table } from 'react-bootstrap';
import PurpleButton from '../1small/PurpleButton';
import PinkInfo from '../1medium/PinkInfo';
import { useHistory } from 'react-router-dom'

export default function AllCard() {
    
    const [cards, setCards] = useState([])

    const history=useHistory();

    useEffect(() => {
        getAllCards()
            .then(res => setCards(res.data));
    }, [])

    const deleteOneCard = (id) => {
        deleteCard(id);
       // window.location.reload();
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
                            <td onClick={event=>(deleteOneCard(card.id))}>x</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{marginTop: "20px", alignContent:"left"}}>
                <a href="/addcard"><PurpleButton text="Kártya hozzáadása" /></a>
            </div>
        </div>
    )
    
}