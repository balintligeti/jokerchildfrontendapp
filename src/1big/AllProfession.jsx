import React,{useState, useEffect}from 'react'
import { getAllProfessions, deleteProfession } from "../context/ApiCalls"
import { Table } from 'react-bootstrap';
import PurpleButton from '../1small/PurpleButton';
import PinkInfo from '../1medium/PinkInfo';
import { useHistory } from 'react-router-dom'

export default function AllProfession() {
    
    const [professions, setProfessions] = useState([])

    const history=useHistory();

    useEffect(() => {
        getAllProfessions()
            .then(res => setProfessions(res.data));
    }, [])

    const deleteOneProfession = (id) => {
        deleteProfession(id);
        window.location.reload();
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
                            <td onClick={event=>(deleteOneProfession(profession.id))}>x</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{marginTop: "20px", alignContent:"left"}}>
                <a href="/addprofession"><PurpleButton text="Szakma hozzáadása" /></a>
            </div>
        </div>
    )
    
}