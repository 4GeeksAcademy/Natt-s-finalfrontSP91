import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Characters = () => {
    const { store, actions } = useContext(Context); 
    const handleErrorImg = (event) => {
        event.target.src='https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }
    

    return (
        <div className="container">
            <h1 className="text-center mb-4">Characters</h1>

            <div className="row">
                {store.characters && store.characters.length > 0 ? (
                    store.characters.map((character, index) => (
                        <div key={index} className="col-md-4 col-lg-3 mb-4">
                            <div className="card shadow-sm card border-warning h-100">
                                {/* Imagen del personaje */}
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                                    onError={handleErrorImg}
                                    alt={character.name}
                                    className="card-img-top"
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                                {/* Contenido de la tarjeta */}
                                
                                <div className="card-body card border-warning d-flex flex-column bg-dark">
                                    <h5 className="card-title text-center text-muted ">{character.name}</h5>
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between ">
                                            <Link to={`/character/${character.uid}`} className="btn btn-secondary btn-sm">
                                                Details
                                            </Link>
                                            <button
                                                className="btn btn-outline-warning btn-sm"
                                                onClick={() => actions.addFavorites(character.name)}
                                            >
                                               <i className="far fa-heart text-warning"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         ))
                    ) : (
                    <p className="text-center">Help me Obi-Wan.</p>
                )}
            </div>
        </div>
    );
};

