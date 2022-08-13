import React from "react";
import { useSelector } from "react-redux";
import { removeFavorites } from "../../redux/actions";


export default function Favorite(){
 
    const fav = useSelector((state) => state.favorites )

return (
    <div>
        <h1>  TUS JUEGOS FAVORITOS </h1>
            
            {
                 fav.length? fav.map(gam =>{
                    return(
                        <div>
                            <img src={gam.image} alt="imagen de videojuego" width="200px" height= "200px"/>,
                            <h1>{gam.name}</h1>
                            <p>Rating: {gam.rating}</p>
                            <button onClick={(e) => removeFavorites(gam.id)}> X </button>
    
                        </div>
                    )
                }): "cargando..."


            }
    </div>
)
}