import React from "react";
import { Link, useParams  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetail, videogameDetail } from "../../redux/actions";



export default function GameDetail(){

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(()=> {        
        dispatch(videogameDetail(params.id));
        return () => { 
             dispatch(cleanDetail())

        }
    }, [params.id] )


    // useEffect(() => {
    
    //   return () => {
    //     dispatch(cleanDetail())
    //   }
    // }, [])
    
   
    



    const myGame = useSelector((state) => state.detail)

    return(

        <div>
        
    
        
        {
            myGame.length? myGame.map(gam =>{
                return(
                    <div>
                        <img src={gam.image} alt="imagen de videojuego" width="200px" height= "200px"/>,
                        <h1>{gam.name}</h1>
                        <p>Descripcion: {gam.description}</p>
                        <p>plataformas: {gam.platforms.map(plat => plat + ", ")}</p>
                        <p>generos: {gam.genres.map(gam => gam + ", ")}</p>
                        <p>Año de lanzamiemto: {gam.released}</p>
                        <p>Rating: {gam.rating}</p>

                    </div>
                )
            }): "cargando..."
        }



        </div>
    )
}