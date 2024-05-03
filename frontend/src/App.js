import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "../src/Components/Pages/Home.js";
import ForYou from "../src/Components/Pages/ForYou.js";
import Community from "../src/Components/Pages/Community.js";
import LogIn from "../src/Components/Pages/LogIn.js";
import Register from "../src/Components/Pages/Register.js";
import Profile from "../src/Components/Pages/Profile.js";
import SelectInterests from "../src/Components/Pages/SelectInterests.js";
import CreatePost from "../src/Components/Pages/CreatePost.js";
import Header from "../src/Components/Header/Header.js";
import RestrictedRoute from "../src/Components/Routes/RestrictedRoute.js";
import PrivateRoute from "../src/Components/Routes/PrivateRoute.js";
import { Modal } from "flowbite-react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogInChange = (param) => {
        setIsLoggedIn(param);
    };


    return (
        <div className="h-dvh">
            <Router>
                <Header loggedIn={isLoggedIn} sendToParent={handleLogInChange} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<RestrictedRoute />}>
                        <Route path="log-in" element={<LogIn sendToParent={handleLogInChange} />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="for-you" element={<ForYou />} />
                        <Route path="community" element={<Community />} />
                        <Route path="profile/:username" element={<Profile />} />
                        <Route
                            path="profile/:username/select-interests"
                            element={<SelectInterests />}
                        />
                        <Route
                            path="create-post/:article_id"
                            element={<CreatePost />}
                        />
                    </Route>
                </Routes>
            </Router>
            {/* <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <div className="font-merriweather font-semibold text-theme-dark-red text-xl">Please log in to access this page!</div>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal> */}
        </div>

    );
}

export default App;
