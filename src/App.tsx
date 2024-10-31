import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Animations } from './pages/Animations';
import { Attraction } from './pages/Attractions';
import { Labyrinthe } from './pages/Labyrinthe';
import { Cinema } from './pages/Cinema';
import { Escape } from './pages/Escape';
import { Postapo } from './pages/HotelPostapo';
import { Refuge } from './pages/HotelRefuge';
import { Plan } from './pages/Plan';
import { Reservations } from './pages/Reservations';
import  { Header } from './components/Header';

export function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen"> {/* Fond pour le reste de la page */}
        <Header /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Animations" element={<Animations />} />
          <Route path="/Attractions" element={<Attraction />} />
          <Route path="/labyrinthe" element={<Labyrinthe />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/escape" element={<Escape />} />
          <Route path="/postapo" element={<Postapo />} />
          <Route path="/refuge" element={<Refuge />} />
          <Route path="/Plan" element={<Plan />} />
          <Route path="/Reservations" element={<Reservations />} />
        </Routes>
      </div>
    </Router>
  );
}

