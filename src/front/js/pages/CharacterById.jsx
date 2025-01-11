import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterById = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el ID del personaje desde la URL
    const handleErrorImg = (event) => {
        event.target.src='https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    useEffect(() => {
        actions.getCharacter(id);
    }, [id]);

    return (
        <div className="container mt-5">
            {store.character ? (
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
                                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                                    onError={handleErrorImg}
                                    alt={store.character.name}
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
                                <h5 className="card-title text-center">{store.character.name}</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Mass:</strong> {store.character.mass}
                                    </li>
                                    <li>
                                        <strong>Hair Color:</strong> {store.character.hair_color}
                                    </li>
                                    <li>
                                        <strong>Eye Color:</strong> {store.character.eye_color}
                                    </li>
                                    <li>
                                        <strong>Birth Year:</strong> {store.character.birth_year}
                                    </li>
                                    <li>
                                        <strong>Gender:</strong> {store.character.gender}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading character details...</p>
            )}
        </div>
    );
};
