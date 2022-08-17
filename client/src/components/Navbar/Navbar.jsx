import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Search";
import './navbar.css'


export default function NavBar(){

    return(
        <div>
            <div>
            <h2 className="titlep"> API GAMES </h2>
            </div>


            <div className="botones">


                <div className="searchbar">
                
                <Searchbar
                
                />

                <Link to = '/home/resultados'>
                <button  className="toresult">Tu busqueda </button>
                </Link>

                </div>

                <div className="botonhome">
                <Link to = '/home'>
                <button className="tohome"> Home </button>
                </Link>
                
                <Link to = '/home/favoritos'>
                <button className="tofav"> Favoritos </button>
                </Link>

{/* 
                <button className="allgames" onClick={e => {handleclick(e)}}> todos los videojuegos </button> */}
            
                 <button className="tocreate"><Link to='/home/game'> crea tu videojuego</Link></button>

                </div>

            </div>
        </div>
    )
}