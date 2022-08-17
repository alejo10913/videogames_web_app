import React from "react";
import { Link } from "react-router-dom";
import { addFavorites } from "../../redux/actions";
import { useDispatch, useSelector} from "react-redux";
import '../CardGame/cardGame.css'



export default function CardGame({name, genres, image, id, rating}){

let favoritos = useSelector((state) => state.favorites)  

const dispatch = useDispatch()



// function handleFavorites(e){   
    
    // dispatch(addFavorites(e.target.value))
    // alert("agregado a favoritos") 
//     if(Object.values(favoritos).includes(e.target.value)) {
//         alert("agregado a favoritos") 
      
//     } else {
//         if(e.target.value.length > 10){
//             dispatch(addFavorites(e.target.value))
//         }
//         else {
//             dispatch(addFavorites(Number(e.target.value)))
//         }
//         }  
// }         
      
    return(
        <div className="cardcontainer">
            <p className="nombre" ><b>{name}</b></p>
            <div className="imagenes">
            <img src={image} alt="imagen de videojuego" width="200px" height="200px"/>
            </div>
            <p><b>{genres.map(gen => gen + ", ")}</b> <br />
            Rating:{rating}</p>
            <div className="botones">
            <Link to = {`./home/home/${id}`}>
            <button className="botonDetalle">Detalle</button>
            </Link>
            {/* <button className="botonfav" value={id} onClick={(e) => handleFavorites(e)} >Favoritos</button> */}
            <button className="botonfav" value={id} onClick={() =>dispatch(addFavorites(id), alert("agreagdo a favoritos")) }>Favoritos</button>
            </div>
            
        </div>
    )
}