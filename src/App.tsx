import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FeaturedTransformations from './components/FeaturedTransformations';
import HowItWorks from './components/HowItWorks';

import WhoItsFor from './components/WhoItsFor';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import LeadFormModal from './components/LeadFormModal';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import { supabase } from './lib/supabase';

function HomePage({ onGetDemoClick }: { onGetDemoClick: () => void }) {
  return (
    <>
      <Navbar onGetDemoClick={onGetDemoClick} />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <FeaturedTransformations />
        <HowItWorks />

        <WhoItsFor />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-accent/20 flex items-center justify-center">
        <div className="text-primary font-medium animate-pulse">Checking access...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => checkAuth()} />;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="antialiased text-foreground bg-background min-h-screen flex flex-col">
        <Routes>
          <Route path="/admin" element={<AdminRoute />} />
          <Route
            path="/gallery"
            element={<Gallery onGetDemoClick={() => setIsModalOpen(true)} />}
          />
          <Route
            path="/"
            element={<HomePage onGetDemoClick={() => setIsModalOpen(true)} />}
          />
        </Routes>
        <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
