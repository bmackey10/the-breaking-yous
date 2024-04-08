import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "../src/Components/Pages/Home.js"
import ForYou from "../src/Components/Pages/ForYou.js"
import Community from "../src/Components/Pages/Community.js"
import LogIn from "../src/Components/Pages/LogIn.js"
import Header from "../src/Components/Header/Header.js"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/community" element={<Community />} />
        <Route path="/log-in" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
