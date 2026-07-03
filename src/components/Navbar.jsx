import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Activity, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('noesana_theme');
    if (saved === 'light') {
      document.documentElement.classList.add('light');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('light');
      localStorage.setItem('noesana_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('noesana_theme', 'dark');
      setIsDark(true);
    }
  };

  const activeStyle = ({ isActive }) =>
    `text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${
      isActive ? "text-noesana-orange" : "text-slate-400 hover:text-white"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center bg-noesana-orange rounded-full shadow-lg shadow-noesana-orange/20">
            <Activity className="w-4.5 h-4.5 text-black stroke-[2.5]" />
          </div>
          <span className="font-cyber font-black text-lg tracking-widest text-white">
            NOESANA
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-10">
          <NavLink to="/" className={activeStyle}>
            Home
          </NavLink>
          <NavLink to="/technology" className={activeStyle}>
            Technology
          </NavLink>
          <NavLink to="/pricing" className={activeStyle}>
            Pricing
          </NavLink>
          <NavLink to="/shop" className={activeStyle}>
            Shop
          </NavLink>
          <NavLink to="/contact" className={activeStyle}>
            Contact
          </NavLink>
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-noesana-orange hover:border-noesana-orange/30 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            to="/shop"
            className="text-xs px-5 py-2.5 bg-noesana-orange text-black hover:bg-white transition-all rounded font-bold uppercase tracking-wider shadow-lg shadow-noesana-orange/10 hover:shadow-noesana-orange/20"
          >
            Get Yours
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-white/5 py-8 px-6 flex flex-col space-y-6">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={activeStyle}
          >
            Overview
          </NavLink>
          <NavLink
            to="/technology"
            onClick={() => setIsOpen(false)}
            className={activeStyle}
          >
            Technology
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className={activeStyle}
          >
            Pricing
          </NavLink>
          <NavLink
            to="/shop"
            onClick={() => setIsOpen(false)}
            className={activeStyle}
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={activeStyle}
          >
            Contact
          </NavLink>
          <hr className="border-white/5" />
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 text-xs text-slate-400 hover:text-noesana-orange transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="uppercase font-bold tracking-wider">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="py-3 px-6 bg-noesana-orange text-black font-bold rounded text-sm uppercase tracking-wider"
            >
              Get Yours
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
