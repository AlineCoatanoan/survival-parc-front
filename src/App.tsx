import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Animations } from './pages/Animations';
import { Labyrinthe } from './pages/Labyrinthe';
import { Hotels } from './pages/Hotels';
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
          <Route path="/labyrinthe" element={<Labyrinthe />} />
          <Route path="/Hotels" element={<Hotels />} />
          <Route path="/Plan" element={<Plan />} />
          <Route path="/Reservations" element={<Reservations />} />
        </Routes>
      </div>
    </Router>
  );
}

