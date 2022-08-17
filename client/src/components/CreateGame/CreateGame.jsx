import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getGenres, creategame, getPlatforms } from "../../redux/actions";
import './createGame.css'

function validate(input){
    const arrayVacio = (arr) => !Array.isArray(arr) || arr.length === 0
    let errors= {};
    
    if(!input.name){
        errors.name = "se requiere nombre"
    }
    else if (!/^[A-Za-z0-9\s]+$/g.test(input.name)) {
        errors.name= "Ingrese más de una letra , solo letras y números"
    } 
    
    //------------------------------- rating
    else if(!input.rating){
        errors.rating = "el rating es requerido"
    }else if(input.rating > 5){
        errors.rating = "el rating no puede ser mayor a 5"
    }else if(input.rating < 0){
        errors.rating = "el rating no puede ser menor a 0"
    } else if (!/^[0-9\s]+$/g.test(input.rating)){
        errors.rating = "el rating tiene que ser un numero"
    }
    //---------------------------------imagen
   
    else if (!input.image){
        errors.image = "la imagen es requerida"
    }
    //-------------------------------plataformas

    else if(arrayVacio(input.platforms)){
        errors.platforms = "las plataformas son requeridas"
    }
       //---------------------------------generos
       else if(arrayVacio(input.genres)){
           errors.genres = "los generos son requeridos"
       }
   
    //---------------------------------------descripcion 


    else if (!input.description){
        errors.description = "se requiere una descripcion"
    }
    //-------------------------------lanzamiento
    else if (!input.released){
        errors.released = "fecha de lanzamiento es requerida"
    }
    
    return errors
}


export default function GameCreate(){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const allgenres= useSelector((state) => state.allGenres)
    const allPlataformas = useSelector((state) => state.allPlatforms)
    const [errors, setErrors] = useState([""]);
    
    
    useEffect(()=> {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        released:"",
        rating: "",
        image: "",
        platforms: [],
        genres: [],
    });  
    
    console.log(input.platforms)
    console.log(input.genres)
    console.log(input.genres.length)
    console.log(input.platforms.length)
    console.log(errors)
    
    function handlechange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(
            validate({
                ...input,
                [e.target.name] : e.target.value
            })
        )
    }

    function handleSelect(e){
        if(input.genres.includes(e.target.value)){
            alert("este genero ya esta incluido")
        } else if (!input.genres.includes(e.target.value)){
            setInput({
                ...input,
                genres:   [...input.genres,  e.target.value]
            })
        }
        setErrors(
            validate({
                ...input,
                genres:   [...input.genres,  e.target.value]
            })
        )
    }


   function handleSelectPlat(e){
    if(input.platforms.includes(e.target.value)){
        alert("esta plataforma ya esta incluida")
    }else if (!input.platforms.includes(e.target.value)){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }
    setErrors(
        validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    )
   }
   
   function handleSubmit(e) {
       e.preventDefault();
       dispatch(creategame(input));
       alert("Videojuego creado correctamente")
   
       setInput({
           name: "",
           description: "",
           released:"",
           rating: "",
           image: "",
           platforms: [],
           genres: [],
       })
       history.push('/home')
   }

   
            
    function handleDelete(){
        setInput({
            ...input,
            genres: []})
            
            setErrors(
                validate({
                    ...input,
                    genres: undefined
                })
            )
    }

    
    function handleDeletep(){
        setInput({
            ...input,
            platforms: []
        })
        setErrors(
            validate({
                ...input,
                platforms: undefined
            })
        )
    }
 



    
    return(

        <div>
            <h4 className="titlecreated"> Ingresa la informacion requerida </h4>

            <form onSubmit={handleSubmit}>
                
            <div >
                <div >
                    {errors.name && <p className="errorname">{errors.name}</p>}
                    <label className="namefor"> Nombre: </label>
                    <input type= "text" value={input.name} name="name" onChange={handlechange} ></input>
                </div>

                <div>
                    {errors.rating && <p className="errorrating">{errors.rating}</p>}
                    <label className="rating"> Rating:</label>
                    <input type= "text" value={input.rating} name="rating" onChange={handlechange} placeholder = "valores de 1 a 5" ></input>
                </div>

                <div>
                    {errors.image && <p className="errorimagen">{errors.image}</p>}
                    <label className="imagen"> Imagen: </label>
                    <input type= "text" value={input.image} name="image"  onChange={handlechange}></input>
                </div>

    </div>
                 {errors.platforms && <p className="errorplat">{errors.platforms}</p>}
                {errors.genres && <p className="errorplat">{errors.genres}</p>}
                <select onChange={(e) => handleSelectPlat(e)} defaultValue="">
                    <option value=""  disabled> Selecciona una plataforma </option>
                    {allPlataformas?.map((plat) => (
                    <option value={plat.name}>{plat.name}</option>
                    ))}
                </select>

                <select onChange={(e) => handleSelect(e)} defaultValue="">
                    <option value="" disabled> Selecciona un genero</option>
                    {allgenres?.map((gen) => (
                    <option value= {gen.name}>{gen.name}</option>
                    ))}
                </select>




                <div>
                    {errors.description && <p className="errordescription">{errors.description}</p>}
                    <label className="desfor"> Descripcion: </label>
                    <textarea type= "text" value={input.description} name="description" onChange={handlechange}></textarea>
                </div>


                <div>
                    {errors.released && <p className="errorreleased">{errors.released}</p>}
                    <label className="lanzamiento"> Fecha de Lanzamiento: </label>
                    <input type= "date" value={input.released} name="released" onChange={handlechange} placeholder= "dia-mes-año"></input>
                </div>

                
                        
                    <ul>
                         {input.genres.map((gen, i)=> (<li key={i}> {gen.name}</li>))}    
                    </ul>   
                    <div className="buttonsubmit">
                 <button  className="botonenviar" disabled={Object.keys(errors).length === 0 ? false : true} type="submit">Crear videojuego</button>  
                    </div>
                        
            </form>

                    <div className="seleccionados">


                    <div>
                            <p className="plataformassel">PLATAFORMAS SELECCIONADAS</p>
                            {input.platforms.map((plat) =>(
                                <div key = {plat.id}>
                                    <ul>
                                        <p className="plat">
                                            {plat}
                                        </p>
                                    </ul>
                                </div>
                            ))}    
                            <button  className="resetp" onClick={() => handleDeletep()}> Reset plataformas</button>
                                    
                            </div>


                            <div>
                            <p className="generossel">GENEROS SELECCIONADOS</p>               
                            {input.genres.map((gen) =>(
                                <div key={gen.id}>
                                    <ul>
                                    <p className="gen">{gen}
                                    </p>
                                    </ul>
                                </div>
                            ))}
                            <button className="resetg" onClick={() => handleDelete()}>Reset generos</button>
                            </div>

                    </div>

        </div>
    )
    
}
