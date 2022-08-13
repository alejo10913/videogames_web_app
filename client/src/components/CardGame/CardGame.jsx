import React from "react";
import { Link } from "react-router-dom";
import { addFavorites } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


export default function CardGame({name, genres, image, id, rating}){

const favoritos = useSelector((state) => state.favorites)    
const dispatch = useDispatch()


function handleFavorites(e){
if(!favoritos.includes(e.target.value)){
    if(e.target.value.length > 10){
        dispatch(addFavorites(e.target.value))
    }
    else {
        dispatch(addFavorites(Number(e.target.value)))
    
    }
}
else if(favoritos.includes(e.target.value)){
    
}
}

    return(
        <div>
            
            <h2>{name}</h2>
            <img src={image} alt="imagen de videojuego" width="200px" height="200px"/>
            <p><b>{genres.map(gen => gen + ", ")}</b></p>
            <p>Rating: <b>{rating}</b></p>
            <Link to = {`./home/home/${id}`}>
            <button>Ver detalle</button>
            </Link>
            <button value={id} onClick={(e) => handleFavorites(e)} style = {favoritos.includes(id)? {backgroundColor: "green" }: {backgroundColor: "red"}}>Favoritos</button>
        </div>
    )
}