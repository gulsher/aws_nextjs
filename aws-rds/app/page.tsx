"use client";
import { useState , useEffect } from "react";
import Navigation from "./components/common/Navigation";
import { AuthProvider } from "./auth/AuthContext";
import MainPage from "./home/page";
import Footer from "./components/common/Footer";
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); 
  };

  return (
    <>
    <AuthProvider>
      <div>
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <MainPage />
        <Footer />
      </div>
    </AuthProvider>
    </>
  );
}
