import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetById = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el ID del planeta desde la URL
    const handleErrorImg = (event) => {
        event.target.src='https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    useEffect(() => {
        actions.getPlanetById(id);
    }, [id]);

    return (
        <div className="container mt-5">
            {store.planet ? (
                <div className="card shadow-sm border-warning bg-dark text-light" style={{ maxWidth: "100%" }}>
                    <div className="row g-0">
                        {/* Imagen del planeta */}
                        <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <div style={{ width: "100%", paddingTop: "100%", position: "relative" }}>
                                <img 
                                
                                    src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} 
                                    onError={handleErrorImg}
                                    alt={store.planet.name} 
                                    className="img-fluid rounded-start" 
                                    style={{ 
                                        objectFit: "cover", 
                                        width: "100%", 
                                        height: "100%", 
                                        position: "absolute", 
                                        top: 0, 
                                        left: 0 
                                    }} 
                                />
                            </div>
                        </div>

                        {/* Contenido del planeta */}
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{store.planet.name}</h5>
                                <ul className="list-unstyled">
                                    <li><strong>Diameter:</strong> {store.planet.diameter}</li>
                                    <li><strong>Rotation Period:</strong> {store.planet.rotation_period}</li>
                                    <li><strong>Orbital Period:</strong> {store.planet.orbital_period}</li>
                                    <li><strong>Gravity:</strong> {store.planet.gravity}</li>
                                    <li><strong>Population:</strong> {store.planet.population}</li>
                                    <li><strong>Climate:</strong> {store.planet.climate}</li>
                                    <li><strong>Terrain:</strong> {store.planet.terrain}</li>
                                    <li><strong>Surface water:</strong> {store.planet.surface_water}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading planet details...</p>
            )}
        </div>
    );
};
