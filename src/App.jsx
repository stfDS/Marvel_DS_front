import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CharacterComics from "./pages/CharacterComics";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import { AuthProvider } from "./context/connect.provider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/character/:id" element={<CharacterComics />} />
          <Route path="/comics" element={<Comics />} />

          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
