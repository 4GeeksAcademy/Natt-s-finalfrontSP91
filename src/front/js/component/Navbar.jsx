import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
			<div className="container-fluid d-flex justify-content-end">

				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand text-muted h1 mx-3">Home</span>
				</Link>
				<Link to="/characters" className="text-decoration-none">
					<span className="navbar-brand text-muted h1 mx-3">Characters</span>
				</Link>
				<Link to="/planets" className="text-decoration-none">
					<span className="navbar-brand text-muted h1 mx-3">Planets</span>
				</Link>
				<Link to="/starships" className="text-decoration-none">
					<span className="navbar-brand text-muted h1 mx-3">Starships</span>
				</Link>
				<Link to="/contact" className="text-decoration-none">
					<span className="navbar-brand text-muted h1 mx-3">Contacts</span>
				</Link>

				<div className="dropdown">
					<button
						className="btn btn-outline-warning btn-sm dropdown-toggle"
						type="button"
						id="favoritesDropdown"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites <i className="far fa-heart text-warning"></i>
					</button>
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
						{store.favorites.length > 0 ? (
							store.favorites.map((item, index) => (
								<li key={index}
									className="dropdown-item d-flex justify-content-between align-items-center">
									<Link
										to={
											store.planets.some((planet) => planet.name === item)
												? `/planet/${store.planets.find((planet) => planet.name === item).uid || store.planets.find((planet) => planet.name === item).id}`
												: store.characters.some((character) => character.name === item)
												? `/character/${store.characters.find((character) => character.name === item).uid || store.characters.find((character) => character.name === item).id}`
												: store.starships.some((starship) => starship.name === item)
												? `/starship/${store.starships.find((starship) => starship.name === item).uid || store.starships.find((starship) => starship.name === item).id}`
												: "/"
										}
										className="text-decoration-none text-dark"
									>
										{item}
									</Link>

									<span onClick={() => actions.removeFavorites(item)}>
										<i className="fas fa-trash text-warning ms-2"></i>
									</span>
								</li>
							))
						) : (
							<li className="dropdown-item text-center text-muted">No favorites added</li>
						)}
					</ul>
				</div>
			</div>
		</nav>

	);
};
