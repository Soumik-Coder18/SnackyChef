import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Header from './components/header&footer/header';
import Footer from './components/header&footer/footer';
import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import UserProfile from '../src/Dashboard/UserProfile';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
        {/* Needs to update for login or not later */}
        {user !== null && user !== undefined && <UserProfile />}
      </div>
      <main className="flex-grow bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6]">
        <AppRouter />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
