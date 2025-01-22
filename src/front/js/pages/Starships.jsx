import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ImInsertTemplate } from "react-icons/im";


export const Starships = () => {
    const { store, actions } = useContext(Context);
    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }



    return (
        <div className="container">
            <h1 className="text-center mb-4">Starships</h1>

            <div className="row">
                {store.starships && store.starships.length > 0 ? (
                    store.starships.map((starship, index) => (
                        <div key={index} className="col-md-4 col-lg-3 mb-4">
                            <div className="card shadow-sm card border-warning h-100">
                                {/* Imagen de la nave */}
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`}
                                    onError={handleErrorImg}
                                    alt={starship.name}
                                    className="card-img-top"
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                                {/* Contenido de la tarjeta */}

                                <div className="card-body card border-warning d-flex flex-column bg-dark">
                                    <h5 className="card-title text-center text-muted ">{starship.name}</h5>
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between ">
                                            <Link to={`/starship/${starship.uid}`} className="btn btn-secondary btn-sm">
                                                Details
                                            </Link>
                                            <button
                                                className="btn btn-outline-warning btn-sm"
                                                onClick={() => actions.addFavorites(starship.name)}
                                            >
                                                <i
                                                    className={
                                                        store.favorites.includes(starship.name)
                                                            ? "fas fa-heart text-warning"
                                                            : "far fa-heart text-warning"
                                                    }
                                                ></i>
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

