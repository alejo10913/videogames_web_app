import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getGenres, creategame, getPlatforms } from "../../redux/actions";

function validate(input){
    let errors= {};

    if(!input.name){
        errors.name = "se requiere nombre"
    }
    else if (!/^[A-Za-z0-9\s]+$/g.test(input.name)) {
        errors.name= "Ingrese más de una letra , solo letras y números"
    } 

    else if (!input.description){
        errors.description = "se requiere una descripcion"
    }
    else if (!input.released){
        errors.released = "fecha de lanzamiento es requerida"
    }
    else if (!input.image){
        errors.image = "la imagen es requerida"
    }

    //------------------------------- rating
    else if(!input.rating){
        errors.rating = "el rating es requerido"
    }else if(input.rating > 5){
        errors.rating = "el rating no puede ser mayor a 5"
    }else if(input.rating < 0){
        errors.rating = "el rating no puede ser menor a 0"
    } 

    //---------------------------------generos
    else if(input.genres.length === 0){
        errors.genres = "los generos son requeridos"
    }

    //-------------------------------plataformas

    else if(input.platforms.length === 0){
        errors.platforms = "las plataformas son requeridas"
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
console.log(input)


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
   

    function handleDelete(e){
        setInput({...input,
             genres: input.genres.filter(el => el !== e)})
        setErrors({
            genres: input.genres
        })
    }

    function handleDeletep(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !==e)
        })
        setErrors({
            platforms: input.platforms
        })

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


    
    return(

        <div>
            <h4> Ingresa la informacion requerida </h4>

            <form onSubmit={handleSubmit}>
                <div>
                    <label> Nombre: </label>
                    <input type= "text" value={input.name} name="name" onChange={handlechange} ></input>
                    {errors.name && <p>{errors.name}</p>}
                </div>


                <div>
                    <label> Descripcion: </label>
                    <textarea type= "text" value={input.description} name="description" onChange={handlechange}></textarea>
                    {errors.description && <p>{errors.description}</p>}
                </div>

                <div>
                    <label> Fecha de Lanzamiento: </label>
                    <input type= "date" value={input.released} name="released" onChange={handlechange} placeholder= "dia-mes-año"></input>
                    {errors.released && <p>{errors.released}</p>}
                </div>


                <div>
                    <label> Rating:</label>
                    <input type= "text" value={input.rating} name="rating" onChange={handlechange} placeholder = "valores de 1 a 5" ></input>
                    {errors.rating && <p>{errors.rating}</p>}
                </div>

                <div>
                    <label> Imagen: </label>
                    <input type= "text" value={input.image} name="image"  onChange={handlechange}></input>
                    {errors.image && <p>{errors.image}</p>}
                </div>

    

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


                <ul>
                {input.genres.map((gen, i)=> (<li key={i}> {gen.name}</li>))}    
                </ul>   
                <button disabled={Object.keys(errors).length === 0 ? false : true} type="submit">Crear videojuego</button>  
            
            </form>

                    <div>

                            <p>Generos:</p>               
                            {input.genres.map((gen) =>(
                                <div key={gen.id}>
                                    <ul>
                                    <p>{gen}
                                    <button  onClick={() => handleDelete(gen)}>X</button>
                                    </p>
                                    </ul>
                                </div>
                            ))}

                            <p>plataformas:</p>
                            {input.platforms.map((plat) =>(
                                <div key = {plat.id}>
                                    <ul>
                                        
                                        <p>
                                            {plat}
                                            <button onClick={() => handleDeletep(plat)}> X</button>
                                        </p>
                                    </ul>
                                </div>
                            ))}            

                    </div>

        </div>
    )
    
}
