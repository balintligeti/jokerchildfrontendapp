import React, { useState,useEffect } from "react";
import {getIsSessionActiveByUserId} from "../context/ApiCalls"
import { Navbar, Nav } from 'react-bootstrap';
import './pinkInfo.css'
export default function Navbar1() {

  const [isSessionActive,setIsSessionActive]=useState(null);

  useEffect(()=>{
      getIsSessionActiveByUserId(0) // fix value until login is not implemented
          .then((data)=>{
              setIsSessionActive(data.data);
          })
  })

  return (
    <div >
      {isSessionActive == null ? (
        <div></div>
      ) 
      : 
      (
        <Navbar collapseOnSelect expand="lg"  style={{backgroundColor: "#7749f8", borderRadius: "20px", marginTop:"1vw", marginLeft:'1vw', marginRight: '1vw', fontFamily:"Courier New, courier, monospace", fontSize:'1vw'}} variant="dark">
        <Nav className="m-auto">
          <Nav.Link href="/">Kezdőlap</Nav.Link>
          {isSessionActive===true ? (
            <Nav.Link href="/questions">Játék</Nav.Link>
          )
          :
          (
            <Nav.Link href="/getid">Játék</Nav.Link>
          )}
          <Nav.Link href="/statistics">Statisztikák</Nav.Link>
          <Nav.Link href="/profil">Profil</Nav.Link>
        </Nav>
      </Navbar>
      )}
 
    </div>
  )
}
