import { BrowserRouter as Router } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Components/Navbar Components/Navbar'
import Robo from './Components/Robo'
import ComponentsShowcase from './Components/ComponentsShowcase'
import Loader from './Components/Loader'

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode='wait'>
        {loading ? (
          <Loader setLoading={setLoading} key="loader" />
        ) : (
          <div className="bg-black min-h-screen relative">
            <Navbar />
            <div className="h-screen">
              <Robo/>
            </div>
            <div className="relative z-10">
              <ComponentsShowcase/>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Router>
  )
}

export default App