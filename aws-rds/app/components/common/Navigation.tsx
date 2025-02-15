'use client';
import { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link'
import Image from 'next/image'
import NavIcon from '@/app/assets/logo.png'
import {AuthContext} from '../../auth/AuthContext'
import { useRouter } from 'next/navigation';

interface SomeContextType {
  isAuthenticated:boolean, hasPurchasedCourses:boolean, logout:() => void
}

const Navigation = () => {
  const router = useRouter();
  const { isAuthenticated, hasPurchasedCourses, logout } = useContext<SomeContextType>(AuthContext);
  const [isOpen, setIsOpen] = useState(false);


  const onLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      alert('You have been logged out.');
      router.push('/login');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#3434342f] bg-opacity-50 backdrop-blur-xl fixed w-full z-10">
    <div className="container mx-auto flex justify-between items-center p-4">
      <div className="flex items-center">
        <Link href="/">
          <Image src={NavIcon} alt="Logo" className="h-16 w-12" />
        </Link>
      </div>
      <div className="hidden md:flex items-center">
        <Link href="/" className="text-white hover:text-green-300 mx-4">
          Home
        </Link>
        <Link href="/blogs" className="text-white hover:text-green-300 mx-4">
          Blogs
        </Link>
        <Link href="/courses" className="text-white hover:text-green-300 mx-4">
          Courses
        </Link>
        <Link href="/team" className="text-white hover:text-green-300 mx-4">
          Meet Team
        </Link>
        {isAuthenticated ? (
          <>
            {hasPurchasedCourses && (
              <Link href="/my-courses" className="text-white hover:text-green-300 mx-4">
                My Courses
              </Link>
            )}
            <button onClick={onLogout} className="text-white hover:text-green-300 mx-4">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/register" className="text-white hover:text-green-300 mx-4">
              Register
            </Link>
            <Link href="/login" className="text-white hover:text-green-300 mx-4">
              Login
            </Link>
          </>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white hover:text-green-300">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
    </div>
    {isOpen && ( 
      <div className="md:hidden flex flex-col items-center bg-[#3434344f] bg-opacity-50 backdrop-blur-xl p-10">
        <Link href="/" className="text-white hover:text-green-300 mx-4 my-4" onClick={toggleMenu}>
          Home
        </Link>
        <Link href="/courses" className="text-white hover:text-green-300 mx-4 my-4" onClick={toggleMenu}>
          Courses
        </Link>
        <Link href="/team" className="text-white hover:text-green-300 mx-4 my-4" onClick={toggleMenu}>
          Meet Team
        </Link>
        {isAuthenticated ? (
          <div>
            {hasPurchasedCourses && (
              <Link href="/my-courses" className="text-white hover:text-green-300 mx-4 my-4" onClick={toggleMenu}>
                My Courses
              </Link>
            )}
            <button onClick={() => { onLogout(); toggleMenu(); }} className="text-white hover:text-green-300 mx-4 my-4">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link href="/register" className="text-white hover:text-green-300 mx-4 my-4" onClick={toggleMenu}>
              Register
            </Link>
            <Link href="/login" className="text-white hover:text-green-300 mx-4 my-4" onClick={toggleMenu}>
              Login
            </Link>
          </div>
        )}
      </div>
    )}
  </nav>
  )
}

export default Navigation
