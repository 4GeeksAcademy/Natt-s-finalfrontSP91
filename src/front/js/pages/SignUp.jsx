import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";  // Importamos useNavigate
import { Context } from "../store/appContext";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();

    const handleSignUp = () => {
        const result = actions.SignUp({
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
        });

        navigate("/login"); 

    };

    return (
        <div className="container">
            <h2 className="text-center">Sign Up</h2>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                    First Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                    Last Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="name@example.com"
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

            <button className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
            </button>
        </div>
    );
};
