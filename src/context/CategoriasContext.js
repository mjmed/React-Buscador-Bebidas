import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


// Crear el Context
export const CategoriasContext = createContext();

// Crear el Provider, donde se encuentran las funciones y state
const CategoriasProvider = (props) => {

    // crear el state del Context
    const [ categorias, setCategorias ] = useState([]);

    useEffect(() => {
    
        const obtenerCategorias = async() => {

            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const categorias = await axios.get( url );

            setCategorias(categorias.data.drinks);
        }

        obtenerCategorias();

    }, []);

    return (
        <CategoriasContext.Provider
            value={{ categorias }}
        >
            { props.children }
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;