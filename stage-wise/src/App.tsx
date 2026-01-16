import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Transformations from './components/Transformations';
import HowItWorks from './components/HowItWorks';
import WhoItsFor from './components/WhoItsFor';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { supabase } from './lib/supabase';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    checkAuth();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', session.user.id)
        .maybeSingle();

      setIsAuthenticated(!!adminUser);
    }

    setLoading(false);
  }

  if (currentPath === '/admin') {
    if (loading) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-slate-600">Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Transformations />
        <HowItWorks />
        <WhoItsFor />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
