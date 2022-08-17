import React from "react";
import { useDispatch, useSelector,} from "react-redux";
import { Link } from "react-router-dom";
import './results.css'
import CardGame from "../CardGame/CardGame";
import { useEffect } from "react";
import { cleanresults } from "../../redux/actions";
 

export default function ResultsSearch(){
   const dispatch = useDispatch()

// useEffect (() => {
//         return()=>{
//         dispatch(cleanresults())
//     }
// },[])

    const resultados = useSelector((state => state.results))  
    return(
        
        
        <div>
            
            <h1 className="title"> Estos son los resultados de tu busqueda: </h1>
            <div className="contenedorsearch">
            {
                resultados.length? resultados.map(game =>{
                    return(
                        <div className="juegos" key= {game.id}>
                        <CardGame
                        name= {game.name}
                        image= {game.image}
                        genres= {game.genres}
                        id = {game.id}
                        rating = {game.rating}
    
                        />

                    </div>
                        // <div>
                        //     <div>
                        //     <p className="name"><b>{game.name}</b></p>
                        //     <img src={game.image} alt="imagen de videojuego" width="200px" height= "200px"/>
                        //     </div>

                        //     <Link to = {`./home/${game.id}`}>
                        //     <button className="detallesearch"> Detalle</button>
                        //     </Link>

                       // </div>

                    )

                }): <div  className="nobusqueda">
                    <h3 > No has realizado una busqueda aun</h3>
                </div>


            }
            </div>

        </div>
    )


}