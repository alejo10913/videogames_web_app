import React from "react";
import { Link } from "react-router-dom";
import { addFavorites } from "../../redux/actions";



export default function CardGame({name, genres, image, id, rating}){



    return(
        <div>
            
            <h2>{name}</h2>
            <img src={image} alt="imagen de videojuego" width="200px" height="200px"/>
            <p><b>{genres.map(gen => gen + ", ")}</b></p>
            <p>Rating: <b>{rating}</b></p>
            <Link to = {`./home/home/${id}`}>
            <button>Ver detalle</button>
            </Link>
            <button onClick={(e) => (e)}>Favoritos</button>
        </div>
    )
}