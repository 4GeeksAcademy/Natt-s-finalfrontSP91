import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const UserPrivate = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };

    useEffect(() => {
        if (!store.isLogged) {
            navigate("/");
        }
    }, [store.isLogged, navigate]);

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm border-warning bg-dark text-light" style={{ width: "22rem" }}>
                
                {/* Imagen usuario */}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/MCM_London_May_15_-_Stormtrooper_%2818246218651%29.jpg"
                    onError={handleErrorImg}
                    alt="user"
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "250px" }}
                />

                {/* Cuerpo de la tarjeta */}
                <div className="card-body text-center">
                    <h6 className="card-title">Welcome, {store.user?.first_name}!</h6>
                    <ul className="list-unstyled mt-3">
                        <li>
                            <h5>User Data:</h5>
                        </li>
                        <li>
                            <strong>First Name:</strong> {store.user?.first_name}
                        </li>
                        <li>
                            <strong>Last Name:</strong> {store.user?.last_name}
                        </li>
                        <li>
                            <strong>Email:</strong> {store.user?.email}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
