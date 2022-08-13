import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorites } from "../../redux/actions";
import { Link } from "react-router-dom";


export default function Favorite(){
    const dispatch = useDispatch()
    const fav = useSelector((state) => state.favorites )
    console.log(fav)

    
    function handleDelete(e){
        dispatch(removeFavorites(e.target.value))
    }


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
                            <button value={gam.id} onClick={(e) => handleDelete(e)}> X </button>
                            <Link to = {`./home/${gam.id}`}>
                             <button>Ver detalle</button>
                             </Link>
                        </div>
                    )
                }): "cargando..."


            }
    </div>
)
}