import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
    return (
        <div className="h-dvh">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/for-you" element={<ForYou />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/log-in" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route
                        path="/profile/:username/select-interests"
                        element={<SelectInterests />}
                    />
                    <Route
                        path="/create-post/:post_id"
                        element={<CreatePost />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
