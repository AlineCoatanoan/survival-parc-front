import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Animations } from '../pages/Animations';
import { Attraction } from '../pages/Attractions';
import { Labyrinthe } from '../pages/Labyrinthe';
import { Cinema } from '../pages/Cinema';
import { Escape } from '../pages/Escape';
import { Postapo } from '../pages/HotelPostapo';
import { Refuge } from '../pages/HotelRefuge';
import { Plan } from '../pages/Plan';
import { Calendrier } from '../pages/Calendrier';
import { Ticket } from '../pages/Ticket';
import { Pass } from '../pages/Pass';
import { Profile } from '../pages/Profile';
import { Dashboard } from '../pages/Dashboard';
import { Reservations } from '../pages/Reservations';
import { Header } from '../components/Header';
import { FixedModal } from '../components/SideBar';  
import { AuthProvider } from '../features/auth/authContext';
import { CartProvider } from '../features/auth/cartContext'; // Importez votre CartProvider
import PrivateRoute from '../routers/PrivateRoute';

export function AppRouter() {
  return (
    <AuthProvider>
      <CartProvider> {/* Enveloppez avec CartProvider */}
        <Router>
          <div className="bg-gray-100 min-h-screen flex">
            {/* Contenu principal */}
            <div className="flex-grow">
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
                <Route path="/plan" element={<Plan />} />
                <Route path="/calendrier" element={<Calendrier />} />
                <Route path="/Ticket" element={<Ticket />} />
                <Route path="/Pass" element={<Pass />} />

                {/* Routes protégées */}
                <Route element={<PrivateRoute />}>
                <Route path="/mon-compte/:userId" element={<Profile />} />
                </Route>

                <Route element={<PrivateRoute />}>
                  <Route path="/reservations/:userId" element={<Reservations />} />
                </Route>

                {/* Route protégée pour la page de dashboard */}
                <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                  <Route path="/Dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </div>

            {/* Sidebar fixe à droite */}
            <FixedModal />
          </div>
        </Router>
      </CartProvider> {/* Fermez CartProvider ici */}
    </AuthProvider>
  );
}
