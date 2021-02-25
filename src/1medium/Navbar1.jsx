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

  if (window.location.pathname == "/getid" || window.location.pathname == "/" || window.location.pathname == "/Questions" || window.location.pathname == "/answer/:questionId" || window.location.pathname == "/statistics" || window.location.pathname == "/profil" || window.location.pathname == "/succesful") {
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
  } else {
    return (
      <Navbar collapseOnSelect expand="lg"  style={{backgroundColor: "#7749f8", borderRadius: "20px", marginTop:"1vw", marginLeft:'1vw', marginRight: '1vw', fontFamily:"Courier New, courier, monospace", fontSize:'1vw'}} variant="dark">
      <Nav className="m-auto">
        <Nav.Link href="/profil">Profil</Nav.Link>
        <Nav.Link href="/allcard">kártyák</Nav.Link>
        <Nav.Link href="/allprofession">Szakmák</Nav.Link>
        <Nav.Link href="/exit">Kilépés</Nav.Link>
      </Nav>
    </Navbar>
    )
  }
}
