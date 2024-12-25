import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 py-4"
      style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(100px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="text-white text-2xl font-bold">
              AnimateX
            </Link>
          </motion.div>

          {/* Center Navigation */}
          <div className="flex items-center space-x-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/docs" className="text-gray-400 hover:text-white transition-colors">
                Docs
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/components" className="text-gray-400 hover:text-white transition-colors">
                Components
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/github" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </Link>
            </motion.div>
          </div>

          {/* GitHub Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <button className="flex items-center px-4 py-2 rounded-lg bg-zinc-800/80 text-white hover:bg-zinc-700/80 transition-colors">
              <span className="mr-2">⭐</span>
              <span>Star on GitHub</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar