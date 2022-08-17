import React from "react";
import { useDispatch } from "react-redux";
import { filterCreated, orderbygenre, orderByName, orderByRating, getVideoGames} from "../../redux/actions";
import '../Filters/filters.css'

export default function Filters({setCurrentPage, allGenres, setOrden}){
 const dispatch = useDispatch()

function handlefilterCreated(e){
    dispatch(filterCreated(e.target.value))
}

function handleGenres(e){
        dispatch(orderbygenre(e.target.value))
  }

function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    };


function handleSortrating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    };

function handleclick(e){
        e.preventDefault();
        dispatch(getVideoGames())
}

return(

     <div>

    
<button className="allgames" onClick={e => {handleclick(e)}}> Limpiar filtros </button>
{/* -------------------------------- api o DB----------------------- */}
            
    <select onChange={e => {handlefilterCreated(e)}} defaultValue = "">
        <option value="" disabled> Procedencia</option>
        <option value="Existente">Existente</option>
        <option value="Creado">Creado</option>
    </select>
{/* -------------------------------- generos----------------------- */}

    <select onChange={ (e) =>handleGenres(e)}  defaultValue ="">
        <option value="" disabled>Filtrar por generos</option>
        {allGenres?.map((gen)=>(
        <option key={gen.id} value={gen.name}>{gen.name}  </option>
     ))}
    </select>
{/* -------------------------------- orden alfabetico----------------------- */}

    <select onChange={(e) => {handleSort(e)}} defaultValue ="">
        <option  value="" disabled>orden alfabetico</option>
        <option value="ascendente"> A - Z</option>
        <option value="descendente"> Z - A</option>
    </select>

{/* -------------------------------- rating----------------------- */}
                        
<select onChange={(e) => handleSortrating(e)} defaultValue ="">
                <option value="" disabled >Rating</option>
                <option value="min">0 - 5</option>
                <option value="max">5 - 0</option>
            </select>  
        

                    
        </div>
    )
}