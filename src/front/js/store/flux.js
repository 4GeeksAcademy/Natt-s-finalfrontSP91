const getState = ({ getStore, getActions, setStore }) => {
	const baseURL = "https://playground.4geeks.com/contact";
	const user = "Natt-s";
	const baseUrlStarWars = "https://www.swapi.tech/api/";
	//const charatcrers 

	return {
		store: {
			message: null,
			contacts: [],
			favorites: [],
			userprivate: [],
			isLogged: false,
			alert: { text: '', background: 'primary', visible: false },

		},
		actions: {
			setAlert: (newAlert) => setStore({ alert: newAlert }),
			hideAlert: () =>{
				setStore({ alert: {...getStore().alert, visible:false} });
			},

			//SingUp
			SignUp: async (userData) => {
				const uri = `${process.env.BACKEND_URL}/api/signup`;
				console.log("Llamando a:", uri);

				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(userData)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText)
					return
				}
				const data = await response.json()
				console.log("Respuesta del servidor:", data);
				setStore({ signup: data.signup });
			},

			//Login
			login: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				console.log(uri, options);
				const response = await fetch(uri, options);
				if (!response.ok) {
					// tratar el error
					console.log('Error:', response.status, response.statusText);
					if (response.status == 401) {
						console.log('en el error 401');
						setStore({ alert: { text: 'Email o contraseña no válido', background: 'danger', visible: true } })
					}
					return   // IMPORTANTE
				}
				const data = await response.json()
				console.log(data)
				localStorage.setItem('token', data.access_token)
				setStore({
					isLogged: true,
					user: {
						email: data.results.email,
						first_name: data.results.first_name,
						last_name: data.results.last_name
					}
				})
			},
			getUser: async (userId) => {
				const uri = `${process.env.BACKEND_URL}/api/users/${userId}`;
				const options = {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()
				console.log(data);

			},
			accessProtected: async () => {
				const uri = `${process.env.BACKEND_URL}/api/protected`;
				const options = {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					// tratamos el erros
					console.log('Error:', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ alert: { text: data.message, background: 'success', visible: true } })
			},
			logout:() =>{
				setStore({
					isLogged: false,
					user: null,
				});
				localStorage.removeItem("token");
			},

			//boton favoritos
			addFavorites: (item) => {
				const favorites = getStore().favorites;
				if (!favorites.includes(item)) {
					setStore({ favorites: [...getStore().favorites, item] });
				}

			},
			removeFavorites: (item) => {
				const favorites = getStore().favorites;
				setStore({ favorites: favorites.filter((favorite) => favorite != item) })
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
				localStorage.setItem('localCharacters', JSON.stringify(data.results))
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
				localStorage.setItem('localCharacterId', JSON.stringify(data.result.properties))
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
				localStorage.setItem('localPlanets', JSON.stringify(data.results))

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
				localStorage.setItem('localPlanetId', JSON.stringify(data.result.properties))

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
				localStorage.setItem('localStarships', JSON.stringify(data.results))

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
				localStorage.setItem('localStarshipsId', JSON.stringify(data.result.properties))

			},

		}

	}
};

export default getState;
