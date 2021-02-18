import React,{useState, useEffect}from 'react'
import { getAllCards } from "../context/ApiCalls"
import { Table } from 'react-bootstrap';

export default function AllCard() {
    const [cards, setCards] = useState([])
    useEffect(() => {
        getAllCards()
            .then(res => setCards(res.data));
    }, [])

    return (
        <div>
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
                            <td>edit</td>
                            <td>x</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}