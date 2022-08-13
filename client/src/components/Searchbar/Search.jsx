import React from "react";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { cleanresults, getNameGame } from "../../redux/actions";



export default function Searchbar(){
const dispatch = useDispatch()
const [name, setName] = useState('')
const errores = useSelector((state) => state.errors)
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
        dispatch(cleanresults())
    }
    history.push('/home/resultados')
}


    return(
        <div>
            

            <form onSubmit={(e) => handleSubmit(e)}>
            <input
            onChange={(e) => handleInputChange(e)} 
            type="text"
            placeholder="buscar"
            value = {name}            
            />

            <button onClick={(e) => handleSubmit(e)}> Buscar</button>
            </form>

        </div>
    )
}