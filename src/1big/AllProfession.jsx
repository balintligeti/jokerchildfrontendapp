import React,{useState, useEffect}from 'react'
import { getAllProfessions, deleteProfession } from "../context/ApiCalls"
import { Table } from 'react-bootstrap';
import PurpleButton from '../1small/PurpleButton';
import PinkInfo from '../1medium/PinkInfo';
import { useHistory } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BigButton from '../1small/BigButton'

export default function AllProfession() {
    
    const [professions, setProfessions] = useState([])

    const history=useHistory();

    useEffect(() => {
        getAllProfessions()
            .then(res => setProfessions(res.data));
    }, [])


    const deleteOneProfession = (id) => {
        confirmAlert({
            title: 'Megerősítés',
            message: 'Biztos vagy benne, hogy törölni szeretnéd a kártyát?',
            buttons: [
              {
                label: 'Igen',
                onClick: () => {
                    deleteProfession(id);
                    getAllProfessions();
                }
              },
              {
                label: 'nem',
              }
            ]
          });

    }

    const modifyProfession = (professionId) =>{
        history.push(`/modifyprofession/${professionId}`);
    }

    return (
        <div>
            <PinkInfo title="Szakmák listája" />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Szakma</th>
                        <th>Módosítás</th>
                        <th>Törlés</th>
                    </tr>
                </thead>
                <tbody>
                    {professions.map((profession,key) => (
                        <tr key={key}>
                            <td>{profession.name}</td>                           
                            <td><PurpleButton id={profession.id} onClick={event=>modifyProfession(event.target.id)} text="Szerkesztés"/></td>
                            <td><PurpleButton id={profession.id} onClick={event=>(deleteOneProfession(profession.id))} text="Törlés"/></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{marginTop: "20px", marginBottom: "20px"}}>
                <a href="/addprofession"><BigButton text="Szakma hozzáadása" /></a>
            </div>
        </div>
    )
    
}