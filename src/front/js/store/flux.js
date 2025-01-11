const getState = ({ getStore, getActions, setStore }) => {
	const baseURL = "https://playground.4geeks.com/contact";
	const user = "Natt-s";
	const baseUrlStarWars = "https://www.swapi.tech/api/";
	//const charatcrers 

	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
			favorites:[]

		},
		actions: {
			// Use getActions to call a function within a fuction
			//boton favoritos
			addFavorites: (item) =>{
				const favorites = getStore().favorites;
				if(!favorites.includes(item)){
				setStore({favorites: [...getStore().favorites,item]});
			}

			},
			removeFavorites: (item) =>{
				const favorites = getStore().favorites;
				setStore({favorites:favorites.filter((favorite) => favorite != item)})
			},
			//
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				//reset the global store
				setStore({ demo: demo });
			},
			//CONTACT LIST
			// GET: Obtener los contactos
			getContacts: async () => {

				const uri = `${baseURL}/agendas/${user}`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ contacts: data.contacts })
			},

			//DELETE:eliminar contactos
			deleteContact: async (contactId) => {
				const uri = `${baseURL}/agendas/${user}/contacts/${contactId}`;
				const options = {
					method: 'DELETE',
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText);
					return;
				}


				const { getContacts } = getActions();
				getContacts();
			},
			//PUT:editar
			editContact: async (contactId, contactData) => {
				const uri = `${baseURL}/agendas/${user}/contacts/${contactId}`
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(contactData),
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText);
					return;
				}


				const { getContacts } = getActions();
				getContacts();
			},

			//POST: añadir contacto
			addContact: async (contactData) => {
				const uri = `${baseURL}/agendas/${user}/contacts`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(contactData),
				};


				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText);
					return;
				}

				const { getContacts } = getActions();
				getContacts();
			},
			//Starwars 
			//Getcharacters

			getCharacters: async () => {
				const uri = `${baseUrlStarWars}/people`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ characters: data.results })
				localStorage.setItem('localCharacters',JSON.stringify(data.results))

			},
			//GetCharacterID
			getCharacter: async (id) => {
				const uri = `${baseUrlStarWars}/people/${id}`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ character: data.result.properties })
				localStorage.setItem('localCharacterId',JSON.stringify(data.result.properties))

			},
			//GetPlanets

			getPlanets: async () => {
				const uri = `${baseUrlStarWars}/planets`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ planets: data.results })
				localStorage.setItem('localPlanets',JSON.stringify(data.results))

			},
			//GetPlanetID
			getPlanetById: async (id) => {
				const uri = `${baseUrlStarWars}/planets/${id}`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ planet: data.result.properties })
				localStorage.setItem('localPlanetId',JSON.stringify(data.result.properties))

			},

			//GetStarships

			getStarships: async () => {
				const uri = `${baseUrlStarWars}/starships`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ starships: data.results })
				localStorage.setItem('localStarships',JSON.stringify(data.results))

			},
			//GetStarshipID
			getStarshipById: async (id) => {
				const uri = `${baseUrlStarWars}/starships/${id}`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ starship: data.result.properties })
				localStorage.setItem('localStarshipsId',JSON.stringify(data.result.properties))

			},



		}

	}
};

export default getState;
