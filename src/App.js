import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./game.css"
import Navbar1 from "./1medium/Navbar1"
import WelcomePage from "./1big/WelcomePage"
import GetId from "./1big/GetId"
import Questions from "./1big/Questions"
import Answer from "./1big/Answer"
import Statistics from "./1big/Statistics"
import AddCard from "./1big/AddCard"
import ProfilePage from "./1big/ProfilePage";
import AddProfession from "./1big/AddProfession";
import AllCard from "./1big/AllCard"
import ModifyCard from "./1big/ModifyCard";
import AllProfession from "./1big/AllProfession";
import UpdateProfession from "./1big/UpdateProfession";
import Succesful from "./1big/Succesful";
import UserReg from "./1big/UserReg";
import TeacherReg from "./1big/TeacherReg";
import axios from "axios";


const App = () => {

    axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

    return (
        <Router>
            <Navbar1 />
            <div className='centralizeMainCard'>
              <div className="mainDiv">
                <Route exact path="/" component={WelcomePage}></Route>
                <Route exact path='/getid' component ={GetId}></Route>
                <Route exact path='/questions' component ={Questions}></Route>
                <Route exact path='/answer/:questionId' component ={Answer}></Route>
                <Route exact path='/statistics' component ={Statistics}></Route>
                <Route exact path='/profil' component={ProfilePage}></Route>
                <Route exact path='/succesful' component={Succesful}></Route>
                <Route exact path='/addprofession' component={AddProfession}></Route>
                <Route exact path='/modifyprofession/:professionId' component={UpdateProfession}></Route>
                <Route exact path='/addcard' component={AddCard}></Route>
                <Route exact path='/allcard' component={AllCard}></Route>
                <Route exact path='/modifycard/:cardId' component={ModifyCard}></Route>
                <Route exact path='/allprofession' component={AllProfession}></Route>
                <Route exact path='/userreg' component={UserReg}></Route>
                <Route exact path='/teacherreg' component={TeacherReg}></Route>
            </div>
          </div>
        </Router>
    )
};

export default App;

