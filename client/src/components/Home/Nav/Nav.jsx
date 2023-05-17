import React from "react";
import Login from "../../Login/Login";
import DarkMode from "../../DarkMode/DarkMode";
import "./nav.scss"
const Nav=()=>{
    return(
        <div className="container">
            <div className="titulo">
            <h1>Tolosa</h1>
            </div>
            <div className="nav-funciones">
                <Login/>
                <DarkMode/>
            </div>
        </div>
    )
}
export default Nav