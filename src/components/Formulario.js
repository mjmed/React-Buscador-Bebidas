import React, { useContext, useState } from 'react';

import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';


export const Formulario = () => {

    const [ busqueda, setBusqueda ] = useState({
        nombre: '',
        categoria: ''
    });
    
    const { categorias } = useContext( CategoriasContext );
    const { buscarRecetas, setConsultar } = useContext( RecetasContext );

    const handleInputChange = ({ target }) => {
        
        setBusqueda({
            ...busqueda,
            [target.name]: target.value 
        });
    }

    return (
        <form
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();
                buscarRecetas( busqueda );
                setConsultar( true );
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente"
                        name="nombre"
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={ handleInputChange }
                    >
                        <option value="">-- Selecciona una categoría --</option>
                        {
                            categorias.map(categoria => (
                                <option
                                    key={ categoria.strCategory }
                                    value={ categoria.strCategory }
                                >
                                    { categoria.strCategory }
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar bebidas"
                    />
                </div>
            </div>
        </form>
    )
}
