import React from "react";
import { Link } from "react-router-dom";
import './landing.css'


export default function LandingPAge(){
    return(
        <div className="landing">
            <h1 className="titlelanding">Toda la informacion de videojuegos en un solo lugar </h1>
            <h2 className="subtitlelanding">Bienvenidos</h2>
            <Link to= '/Home'>
                <button className="buttonlanding">ingresar</button>
            </Link>
        </div>
    )
}