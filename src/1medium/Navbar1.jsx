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

  if (window.location.pathname === "/getid" || window.location.pathname === "/" || window.location.pathname === "/Questions" || window.location.pathname === "/answer/:questionId" || window.location.pathname === "/statistics" || window.location.pathname === "/profil" || window.location.pathname === "/succesful") {
    return (
      <div >
        {isSessionActive == null ? (
          <div></div>
        ) 
        : 
        (
          <Navbar collapseOnSelect expand="sm"  style={{backgroundColor: "#7749f8", borderRadius: "20px", marginTop:"1vw", marginLeft:'10vw', marginRight: '10vw', fontFamily:"Courier New, courier, monospace", fontSize:'180%'}} variant="dark">
          <Nav className="m-auto">
            <Nav.Link href="/" style={{color: "white"}}>Kezdőlap</Nav.Link>
            {isSessionActive===true ? (
              <Nav.Link href="/questions" style={{color: "white"}}>Játék</Nav.Link>
            )
            :
            (
              <Nav.Link href="/getid" style={{color: "white"}}>Játék</Nav.Link>
            )}
            <Nav.Link href="/statistics" style={{color: "white"}}>Statisztikák</Nav.Link>
            <Nav.Link href="/profil" style={{color: "white"}}>Profil</Nav.Link>
          </Nav>
        </Navbar>
        )}
   
      </div>
    )
  } else {
    return (
      <Navbar collapseOnSelect expand="sm"  style={{backgroundColor: "#7749f8", borderRadius: "20px", marginTop:"1vw", marginLeft:'10vw', marginRight: '10vw', fontFamily:"Courier New, courier, monospace", fontSize:'180%'}} variant="dark">
      <Nav className="m-auto">
        <Nav.Link href="/profil" style={{color: "white"}}
        >Profil</Nav.Link>
        <Nav.Link href="/allcard" style={{color: "white"}}>kártyák</Nav.Link>
        <Nav.Link href="/allprofession" style={{color: "white"}}>Szakmák</Nav.Link>
        <Nav.Link href="/exit" style={{color: "white"}}>Kilépés</Nav.Link>
      </Nav>
    </Navbar>
    )
  }
}
