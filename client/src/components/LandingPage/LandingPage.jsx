import React from "react";
import { Link } from "react-router-dom";


export default function LandingPAge(){
    return(
        <div>
            <h1>Toda la informacion de videojuegos en un solo lugar </h1>
            <h2>Bienvenidos</h2>
            <Link to= '/Home'>
                <button>ingresar</button>
            </Link>
        </div>
    )
}