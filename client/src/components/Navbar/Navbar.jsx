import React from "react";
import { Link } from "react-router-dom";

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


        </div>
    )
}