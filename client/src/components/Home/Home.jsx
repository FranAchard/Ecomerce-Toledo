import React from "react";
import Nav from "./Nav/Nav";
import Carrousel from "./Carrousel/Carrousel";
import Aside from "../Aside/Aside";
import Detail from "../Detail/Detail";
const Home =()=>{
    return (
        <div>
        <Nav/>
        <Carrousel/>
        <Aside/>
        <Detail/>    
        </div>
    )
}
export default Home