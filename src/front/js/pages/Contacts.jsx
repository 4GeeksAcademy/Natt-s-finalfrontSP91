import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTrashAlt, FaEdit } from "react-icons/fa";

export const Contacts = () => {
    const { store, actions } = useContext(Context); // Obtengo los datos del contexto

    return (
        <div className="container">
            <h1 className="text-center mb-4">Contacts</h1>

            <div className="list-group">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="list-group-item d-flex align-items-center justify-content-between flex-wrap p-3 mb-3 shadow-sm"
                        >
                            {/* Imagen del contacto */}
                            <div className="d-flex align-items-center">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="contact"
                                    className="rounded-circle me-3"
                                    style={{ width: "80px", height: "80px" }}
                                />
                                <div>
                                    <h5 className="mb-1">{contact.name}</h5>
                                    <p className="mb-1">
                                        <FaMapMarkerAlt className="me-2 text-muted" />
                                        {contact.address}
                                    </p>
                                    <p className="mb-1">
                                        <FaPhoneAlt className="me-2 text-muted" />
                                        {contact.phone}
                                    </p>
                                    <p className="mb-0">
                                        <FaEnvelope className="me-2 text-muted" />
                                        {contact.email}
                                    </p>
                                </div>
                            </div>
                         
                            <div className="d-flex align-items-center">
                                <Link to={`/edit-contact/${contact.id}`} className="btn btn-primary btn-sm me-2">
                                    <FaEdit />
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => actions.deleteContact(contact.id)}

                                >

                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No hay contactos disponibles.</p>
                )}
            </div>
        </div>
    );
};
