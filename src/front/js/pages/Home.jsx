import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<img src= {"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png"}/>
		</div>
	);
};
