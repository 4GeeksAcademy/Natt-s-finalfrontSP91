import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

//Custom Component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";

//Custom Pages
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Single } from "./pages/single";
import { Error404 } from "./pages/Error404.jsx";
import { Contacts } from "./pages/Contacts.jsx";
import { UserPrivate } from "./pages/UserPrivate.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { CharacterById} from "./pages/CharacterById.jsx";
import { Planets } from "./pages/Planets.jsx";
import { PlanetById } from "./pages/PlanetById.jsx";
import { Starships } from "./pages/Starships.jsx";
import { StarshipsById } from "./pages/StarshipsById.jsx";





//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<CharacterById/>} path="/character/:id" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<PlanetById />} path="/planet/:id" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<StarshipsById />} path="/starship/:id" />
                        <Route element={<Contacts />} path="/contact" />
                        <Route element={<UserPrivate />} path="/userprivate" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<AddContact />} path="/add-contact" />
                        <Route element={<EditContact />} path="/edit-contact/:id" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Error404 />} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
