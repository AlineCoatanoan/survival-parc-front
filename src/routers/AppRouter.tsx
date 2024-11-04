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
import { Reservations } from '../pages/Reservations';
import { Profile } from '../pages/Profile'; // Remplacez cela si nécessaire
//import { OrderConfirmationPage } from '../pages/OrderConfirmationPage'; // Remplacez cela si nécessaire
//import { DashboardPage } from '../pages/DashboardPage'; // Assurez-vous d'importer toutes les bonnes pages
import { Header } from '../components/Header';
import { AuthProvider } from '../features/auth/authContext';
import PrivateRoute from '../routers/PrivateRoute'; 

export function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
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

            {/* Routes protégées */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              {/*<Route path="/commande-confirmation/:id" element={<OrderConfirmationPage />} />*/}
              <Route path="/Reservations" element={<Reservations />} />
            </Route>

            {/* Route protégée pour la page de dashboard */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              {/*<Route path="/dashboard" element={<DashboardPage />} />*/}
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
