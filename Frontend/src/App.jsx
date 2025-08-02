import Header from './components/header&footer/header';
import Footer from './components/header&footer/footer';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <main className="flex-grow">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
