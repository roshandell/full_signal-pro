import './App.css';
import './lib/i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import TokenCreation from './components/TokenCreation';
import TokenList from './components/TokenList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TokenCreation />
        <TokenList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
