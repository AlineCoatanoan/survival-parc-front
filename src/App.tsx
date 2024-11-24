import { AppRouter } from "./routers/AppRouter";
import 'react-toastify/dist/ReactToastify.css';
// Dans src/index.js ou src/App.js
import './index.css'; // ou './global.css' si c'est le nom que tu utilises


export function App() {
  return (
    <>
     <AppRouter />
    </>
  );
}