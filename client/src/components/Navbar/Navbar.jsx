import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Search";


export default function NavBar(){
    return(
        <div>
            <h2> API GAMES </h2>


      
            <Link to = '/home'>
            <button> Home </button>
            </Link>
            
            <Link to = '/home/favoritos'>
            <button> Favoritos </button>
            </Link>

            <div>
            <Searchbar
            
            />

            <Link to = '/home/resultados'>
            <button >Tu busqueda </button>
            </Link>

            </div>
        </div>
    )
}