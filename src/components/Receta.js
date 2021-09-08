import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import { ModalContext } from '../context/ModalContext';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));


export const Receta = ({ receta }) => {

    const [ modalStyle ] = useState( getModalStyle );
    const [ open, setOpen ] = useState( false );

    const classes = useStyles();

    const handleOpen = () => {
        setOpen( true );
    }

    const handleClose = () => {
        setOpen( false );
    }

    const { recetaDetalle, setIdReceta, setReceta } = useContext( ModalContext );

    const mostrarIngredientes = ( recetaDetalle ) => {

        let ingredientes = [];
        for ( let i = 1; i < 16; i++ ) {
            if ( recetaDetalle[`strIngredient${ i }`] ) {
                ingredientes.push(
                    <li>{ recetaDetalle[`strIngredient${ i }`] } { recetaDetalle[`strMeasure${ i }`] }</li>
                )
            }
        }

        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">
                    { receta.strDrink }
                </h2>

                <img
                    className="card-img-top"
                    src={ receta.strDrinkThumb }
                    alt={`Imagen de ${ receta.strDrink }` }
                />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdReceta( receta.idDrink );
                            handleOpen();
                        }}
                    >
                        Ver receta
                    </button>

                    <Modal
                        open={ open }
                        onClose={() => {
                            setIdReceta( null );
                            setReceta({});
                            handleClose();
                        }}
                    >
                        <div style={ modalStyle } className={ classes.paper }>
                            <h2>{ recetaDetalle.strDrink }</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>{ recetaDetalle.strInstructions }</p>
                            <img className="img-fluid my-4" src={ recetaDetalle.strDrinkThumb } alt={ recetaDetalle.strDrink } />

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                { mostrarIngredientes(recetaDetalle) }
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

Receta.propTypes = {
    receta: PropTypes.object.isRequired
}
