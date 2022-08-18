import React from "react";
import { useEffect, useState } from "react";
import './paginado.css'


const pageNumberLimit = 8

export default function Paginado ({gamesPerPage, allvideogames, currentPage, setCurrentPage}){

    const [maxPageNumberList, setMaxPageNumberList] = useState(8);
    const [minPageNumberList, setMinPageNumberList] = useState(0);


    useEffect(()=> {
        setCurrentPage(1);
        setMaxPageNumberList(8);
        setMinPageNumberList(0)
    }, [allvideogames])

    const handleclick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allvideogames/gamesPerPage); i++){
        pageNumbers.push(i)
    }
    
 //-------------------boton next-----------------------------------------------------------   
    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);

        if(currentPage + 1 > maxPageNumberList){
            setMaxPageNumberList(maxPageNumberList + pageNumberLimit);
            setMinPageNumberList(minPageNumberList + pageNumberLimit);  
        }
    }
//--------------------boton prev-----------------------------------------------------------
    const handlePrevbtn = () =>{
        setCurrentPage(currentPage - 1);

        if((currentPage -1) % pageNumberLimit === 0){
            setMaxPageNumberList(maxPageNumberList - pageNumberLimit);
            setMinPageNumberList(minPageNumberList - pageNumberLimit);
        }
    };

    //--------------------------------------------------------------------------------------
    const renderPagenumbers = pageNumbers.map((number) => {
        if(number < maxPageNumberList + 1 && number > minPageNumberList){
            return(
                <li className="numeros" key={number}>
                <button key={number} id={number} onClick= {(e) => handleclick(e)} style = {currentPage === number? {backgroundColor: "red", color: "white", border: "black , 16px" }: {}}> {number}</button>
                 
                </li>
            );
        } else return null;
    })

//-------------------------------------------------------------------------------------------


    return(
        <div >
            <ul>
                <li>
                    <button className="prev"
                    onClick={handlePrevbtn}
                    disabled= {(currentPage === pageNumbers[0] || !pageNumbers.length) ? true: false }
                    >
                    PREV
                    </button>
                </li>
                  
             {renderPagenumbers }            
               
                <li>
                    <button className="next"
                    onClick={handleNextbtn}
                    disabled={(currentPage === pageNumbers[pageNumbers.length -1] || !pageNumbers.length)? true : false}
                    >
                    NEXT
                    </button>
                </li>
                
                {
                pageNumbers.length?
                <p>
    
                </p>:
                <h2>
                    cargando datos....
                </h2>
                 }
            </ul>
        </div>
    )
}