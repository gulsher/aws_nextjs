import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
    children?: React.ReactNode
  };

export const AuthContext = createContext();
export const AuthProvider = ({ children }: Props) => {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [hasPurchasedCourses, setHasPurchasedCourses] = useState(false);

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsAuthenticated(true);
    checkPurchasedCourses(token);
  }
}, []);


const checkPurchasedCourses = async (token:string) => {
    try {
      const response = await axios.get('http://localhost:3000/purchased/purchased-courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setHasPurchasedCourses(response.data.length > 0);
    } catch (error) {
      console.error('Error checking purchased courses:', error);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
    const token = localStorage.getItem('token');
    if (token) {
      checkPurchasedCourses(token);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasPurchasedCourses(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, hasPurchasedCourses, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}