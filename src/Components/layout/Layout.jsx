import { useState } from "react";
import PropTypes from 'prop-types';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 fixed h-[calc(100vh-64px)] top-16 left-0 overflow-y-auto border-r border-gray-800 overflow-x-hidden">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden fixed inset-0 bg-black/50 z-40"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed md:hidden top-0 left-0 h-full w-64 bg-black border-r border-gray-800 z-50 overflow-y-auto"
              >
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg"
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
                <Sidebar onItemClick={() => setIsSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout; 