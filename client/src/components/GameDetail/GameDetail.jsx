import React from "react";
import { useEffect } from "react";
import { useParams, useHistory  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, videogameDetail, DeleteGame } from "../../redux/actions";
import './gameDetail.css'


export default function GameDetail(){

    const dispatch = useDispatch()
    const params = useParams()
    const myGame = useSelector((state) => state.detail)
    const {id} = useParams()
    const history = useHistory()

    useEffect(()=> {        
        dispatch(videogameDetail(params.id));
        return () => { 
             dispatch(cleanDetail())

        }
    }, [params.id] )

    function handleDelete(id){
        function confirm(){
            let resConfirm = window.confirm("are you sure by want to delete this game?")
            if(resConfirm === true){
                dispatch(DeleteGame(id))
            }
        }
        confirm()
        history.push('/home')
        
    }


    return(

        <div>
    

        {
            myGame.length? myGame.map(gam =>{
                return(
                    <div className="contenido" key={gam.id}>
                        <img src={gam.image} alt="imagen de videojuego" width="200px" height= "200px"/>,
                        <h1 className="titleDetail">{gam.name}</h1>
                        <p className= "pdescription">Descripcion: {gam.description}</p>
                        <p className="platf">plataformas: {gam.platforms.map(plat => plat + ", ")}</p>
                        <p className=" pgeneros">generos: {gam.genres.map(gam => gam + ", ")}</p>
                        <p className="preleased">Año de lanzamiemto: {gam.released}</p>
                        <p className="prating">Rating: {gam.rating}</p>
                        { gam.createdInDb && (
                    
                        <button onClick={()=>handleDelete(id)}>DELETE</button>)
                        }

                    </div>
                )
            }): "cargando..."
        }



        </div>
    )
    
}