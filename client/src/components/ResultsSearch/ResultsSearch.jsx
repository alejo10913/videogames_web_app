import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cleanresults } from "../../redux/actions";
import { Link } from "react-router-dom";



export default function ResultsSearch(){

    // const dispatch = useDispatch()

    //  useEffect(() => {
    
    //   return () => {
    //     dispatch(cleanresults())
    //   }
    // }, [])
    

    const resultados = useSelector((state => state.results)) 
    console.log(resultados)   
    return(
        
        
        <div>
            
            
            
            <h1> Estos son los resultados de tu busqueda: </h1>
            
            {
                resultados.length? resultados.map(game =>{
                    return(
                        <div>
                            <div>
                            <h1>{game.name}</h1>
                            <img src={game.image} alt="imagen de videojuego" width="200px" height= "200px"/>
                            </div>

                            <Link to = {`./home/${game.id}`}>
                            <button> Detalle</button>
                            </Link>

                        </div>

                    )

                }): "no has realizado una busqueda aun"

            }

        </div>
    )


}