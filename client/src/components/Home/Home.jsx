import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getGenres, getPlatforms, getVideoGames}  from '../../redux/actions';
import CardGame from "../CardGame/CardGame";
import Paginado from '../paginado/paginado';
import Filters from "../Filters/filters";
import './home.css'




export default function Home(){
    
    const dispatch = useDispatch()
    const allvideogames = useSelector((state) => state.allVideoGames)
    const allGenres = useSelector((state) => state.allGenres)

    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOffirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allvideogames.slice(indexOffirstGame, indexOfLastGame)
  
    useEffect(()=> {
        dispatch(getVideoGames())
        dispatch(getGenres())
        dispatch(getPlatforms())
    },[dispatch])


    return(
        <div>

            <Filters
                  setCurrentPage = {page => setCurrentPage(page)}
                  setOrden = {setOrden}
                  allVideoGames = {allvideogames}
                  allGenres= {allGenres}
            />


            <Paginado
            gamesPerPage={gamesPerPage}
            currentPage={currentPage}
            allvideogames = {allvideogames.length}
            setCurrentPage = {page => setCurrentPage(page)}
            
            />



        <div className="games">
        {
            currentGames? currentGames.map(game =>{
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
                )}): 'cargando'
        }
        
        </div>
        

        </div>
        
    )

}