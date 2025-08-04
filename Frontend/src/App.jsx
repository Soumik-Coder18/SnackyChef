import Header from './components/header&footer/header';
import Footer from './components/header&footer/footer';
import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
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
