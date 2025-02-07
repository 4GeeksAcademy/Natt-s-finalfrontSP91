import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const UserPrivate = () => {
    const { store } = useContext(Context); // Obtengo los datos del contexto

    return (
        <div className="container">

            <h1 className="text-center mb-4">Wellcome, {store.user?.email}! </h1>

        </div>
           
    );
};

