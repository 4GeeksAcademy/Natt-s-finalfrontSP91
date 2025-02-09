import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const EditContact = () => {
    const { store, actions } = useContext(Context);

    const { id } = useParams(); // Obtener el ID del contacto desde la URL
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (id) {
            // Si estamos editando, cargamos los datos del contacto
            const contact = store.contacts.find((contact) => contact.id === parseInt(id));
            if (contact) {
                setFullName(contact.name);
                setEmail(contact.email);
                setPhone(contact.phone);
                setAddress(contact.address);
            }
        }
    }, [id, store.contacts]);

    
    const handleSave = () => {
       
        actions.editContact(id,{
            name: fullName,
            email: email,
            phone: phone,
            address: address,

        });
    };

    return (  
        <div className="container">
            <h2 className="text-center">Add a new contact</h2>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                   Full Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) =>setFullName(e.target.value)} 
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
                <label htmlFor="emailInput" className="form-label">
                   Phone
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                   Address
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} 
                />
            </div>
            
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
            
        </div>
    );
};
