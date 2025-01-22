import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const StarshipsById = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el ID del personaje desde la URL
    const handleErrorImg = (event) => {
        event.target.src='https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    useEffect(() => {
        actions.getStarshipById(id);
    }, [id]);

    return (
        <div className="container mt-5">
            {store.starship ? (
                <div className="card shadow-sm border-warning bg-dark text-light">
                    <div className="row g-0">
                        {/* Imagen del personaje */}
                        <div className="col-4">
                            <div
                                style={{
                                    width: "100%",
                                    paddingTop: "100%",
                                    position: "relative",
                                }}
                            >
                                <img
                                
                                    src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                                    onError={handleErrorImg}
                                    alt={store.starship.name}
                                    className="img-fluid rounded-start"
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Contenido del personaje */}
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title text-center">{store.starship.name}</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Model:</strong> {store.starship.model}
                                    </li>
                                    <li>
                                        <strong>Starship Class:</strong> {store.starship.starship_class}
                                    </li>
                                    <li>
                                        <strong>Manufacturer:</strong> {store.starship.manufacturer}
                                    </li>
                                    <li>
                                        <strong>Cost in credits:</strong> {store.starship.cost_in_credits}
                                    </li>
                                    <li>
                                        <strong>Length:</strong> {store.starship.lenght}
                                    </li>
                                    <li>
                                        <strong>Crew:</strong> {store.starship.crew}
                                    </li>
                                    <li>
                                        <strong>Passengers:</strong> {store.starship.passengers}
                                    </li><li>
                                        <strong>Max atmosphering speed:</strong> {store.starship.max_atmosphering_speed}
                                    </li><li>
                                        <strong>Hyperdrive rating:</strong> {store.starship.hyperdrive_rating}
                                    </li><li>
                                        <strong>MGLT:</strong> {store.starship.MGLT}
                                    </li><li>
                                        <strong>Cargo capacity:</strong> {store.starship.cargo_capacity}
                                    </li><li>
                                        <strong>Consumables:</strong> {store.starship.consumables}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading starship details...</p>
            )}
        </div>
    );
};
