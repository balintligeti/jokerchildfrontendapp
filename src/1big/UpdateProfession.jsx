import React, { useEffect, useState } from 'react';
import { getProfessionById,updateProfession } from '../context/ApiCalls';
import { useHistory } from 'react-router-dom';
import PurpleButton from '../1small/PurpleButton';



export default function UpdateProfession(props){
    const professionId=props.match.params.professionId;
    const history=useHistory();

    const [professionName,setProfessionName]=useState();
    const [professionDescription,setProfessionDescription]=useState();

    useEffect(()=>{
        getProfessionById(professionId)
            .then(res=>{
                setProfessionName(res.data.name);
                setProfessionDescription(res.data.description);
            })
    },[professionId])

    const modifyProfession = () =>{
        let profession={
            "id":professionId,
            "name": professionName,
            "picture": "TODO",
            "description":professionDescription
          }

        updateProfession(profession)
          .then(history.push("/allprofession"),window.location.reload());   
    }

    return( 
        <div>
            <h1>Itt tudsz hozzáadni új szakmát a játékhoz!</h1>
            <div>
                <div>
                    <p>Szakma megadása:</p>
                    <input onChange={event=>setProfessionName(event.target.value)} defaultValue={professionName} type="text" name="name" />
                    <p>Szakma leírásának megadása:</p>
                    <input onChange={event=>setProfessionDescription(event.target.value)} defaultValue={professionDescription} type="text" name="description" />
                </div>
                <PurpleButton onClick={modifyProfession} text="Szakma módosítása" />
            </div>
        </div>
        )
}
