import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { cleanresults, getNameGame } from "../../redux/actions";
import './searchbar.css'


export default function Searchbar(){
const dispatch = useDispatch()
const [name, setName] = useState('')
const history = useHistory()

function handleInputChange(e){
    setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    if(!name){
        alert('ingrese un nombre')
    }
    else{
        dispatch(getNameGame(name))
        dispatch(cleanresults)
        setName("")
        history.push('/home/resultados')
    }
}


    return(
        <div className="search">
            

            <form onSubmit={(e) => handleSubmit(e)}>
            <input
            onChange={(e) => handleInputChange(e)} 
            type="text"
            placeholder="buscar"
            value = {name}            
            />

            <button className="tosearch" onClick={(e) => handleSubmit(e)}> Buscar</button>
            </form>

        </div>
    )
}