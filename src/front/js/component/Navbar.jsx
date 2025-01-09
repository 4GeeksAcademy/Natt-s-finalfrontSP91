import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	//Code JS

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid d-flex justify-content-end">
				<Link to="/">
					<span className="navbar-brand h1">Home</span>
				</Link>
				<Link to="/contact">
					<span className="navbar-brand h1">Contacts</span>
				</Link>
				<div className="ms-3">
					<Link to="/add-contact">
						<button className="btn btn-primary">Add new contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
