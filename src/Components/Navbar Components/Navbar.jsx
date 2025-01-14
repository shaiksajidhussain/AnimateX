import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full z-40 py-4"
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-white text-2xl font-bold">
              AnimateX
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/docs" className="text-gray-300 hover:text-white">
                Docs
              </Link>
              <Link to="/components" className="text-gray-300 hover:text-white">
                Components
              </Link>
              <a 
                href="https://github.com/yourusername/animatex" 
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg"
              >
                <span>⭐</span> Star
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-64 bg-gray-900 z-50 md:hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:text-white"
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <Link 
                    to="/docs" 
                    className="block text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Docs
                  </Link>
                  <Link 
                    to="/components" 
                    className="block text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Components
                  </Link>
                  <a 
                    href="https://github.com/yourusername/animatex" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>⭐</span> Star on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;