import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";  // Importamos useNavigate
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 

    const navigate = useNavigate(); 

    const handleLogin= () => {
        actions.login({
            email: email,
            password: password,
        });

        navigate("/userprivate");  
    };

    return (  
        <div className="container">
            <h2 className="text-center">Login</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                   email
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                   Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="*****"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            
            <button className="btn btn-primary" onClick={handleLogin}>
                Enter
            </button>
        </div>
    );
};
