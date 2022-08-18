import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorites } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import './favoritos.css'


export default function Favorite(){
    const dispatch = useDispatch()
    
    let fav = useSelector((state) => state.favorites )
    fav = [...new Set(fav)]

//     useEffect(()=> {
//     },)
//    console.log(fav)
    
function handleDelete(e){
    
        if(e.target.value.length > 10){
            dispatch(removeFavorites(e.target.value))
        }
        else {
        dispatch(removeFavorites(Number(e.target.value)))
        }
}



return (
    <div>
        <h1 className="titlefav">  TUS JUEGOS FAVORITOS </h1>
          <div className="contenedor">
            {   
                 fav.length? fav.map(gam =>{
                    return(
                        <div className="contendorfav" key={gam.id}>
                            
                            <p className="namefav"><b>{gam.name}</b></p>
                            <img src={gam.image} alt="imagen de videojuego" width="200px" height= "200px"/>
                            <p className="pgen">{gam.genres.map(gen => gen + ", ") }</p>
                            <div className="botonesfav">
                            <button  className="delete" value={gam.id} onClick={(e) => handleDelete(e)}> Eliminar </button>
                            <Link to = {`./home/${gam.id}`}>
                             <button className="detalle">Ver detalle</button>
                             </Link>
                             </div>
                           

                        </div>
                    )
                 }):
                    <div className="buscando">
                         <h2 className="buscandofav">Estamos buscando tus juegos favoritos, si aún no tienes debes escoger algunos...</h2>
                    </div>
                
                
            }
        </div>            
    </div>
)
}