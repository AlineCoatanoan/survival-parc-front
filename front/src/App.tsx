import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import Header from './components/Header.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Header />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
