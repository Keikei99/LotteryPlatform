import "./App.css";
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header.js"
import Home from "./components/Home.js"
// import NftGallery from "./components/NftGallery.js"
// import Swap from "./components/Swap.js"
import Participant from "./components/Participant.js"
import Organizer from "./components/Organizer.js";
import PersonalCenter from "./components/PersonalCenter.js";

function App() {
  return (
  <div className="App">
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Participant" element={<Participant />} />
        <Route path="/Organizer" element={<Organizer />} />
        <Route path="/PersonalCenter" element={<PersonalCenter />} />
        </Routes>
  </div>
  )
}

export default App;