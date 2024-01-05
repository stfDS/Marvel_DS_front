import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CharacterComics from "./pages/CharacterComics";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import { AuthProvider } from "./context/connect.provider";
import { Toaster } from "react-hot-toast";
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/characters" element={<Characters />} />

          <Route path="/character/:id" element={<CharacterComics />} />

          <Route path="/comics" element={<Comics />} />

          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
