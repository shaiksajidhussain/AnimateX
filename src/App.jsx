import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './Components/Loader';
import Robo from './Components/Robo';
import ComponentsShowcase from './Components/ComponentsShowcase';
import Layout from './components/layout/Layout';
// import SplitText from './components/animations/SplitText';
import SplitTextPage from './pages/components/split-text';
import BlurTextPage from './pages/components/blur-text';
import WaveTextPage from './pages/components/WaveTextPage';
import ShinyTextPage from './pages/components/ShinyTextPage';
import CountUpPage from './pages/components/CountUpPage';
import DecryptedTextPage from './pages/components/decrypted-text';
import BlobCursorPage from './pages/components/blob-cursor';
import MagneticButtonPage from './pages/components/magnetic-button';
import ShaderGradientPage from './pages/components/shader-gradient';
import BlobGradientPage from './pages/components/blob-gradient';
import CloudParticlesDemo from './pages/components/cloud-particles';
// import AnimatedContainerPage from './pages/components/AnimatedContainer';
// ... import other component pages

function App() {
  // const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode='wait'>
        {/* {loading ? (
          <Loader setLoading={setLoading} key="loader" />
        ) : ( */}
          <Routes>
            {/* Home route with Robo and ComponentsShowcase */}
            <Route 
              path="/" 
              element={
                <div className="bg-black min-h-screen relative">
                  <div className="h-screen">
                    <Robo/>
                  </div>
                  <div className="relative z-10">
                    <ComponentsShowcase/>
                  </div>
                </div>
              } 
            />

            {/* Documentation routes wrapped in Layout */}
            <Route 
              path="/components/*" 
              element={
                <Layout>
                  <Routes>
                    <Route path="/split-text" element={<SplitTextPage />} />
                    <Route path="/blur-text" element={<BlurTextPage />} />
                    <Route path="/wave-text" element={<WaveTextPage />} />
                    <Route path="/shiny-text" element={<ShinyTextPage />} />
                    <Route path="/count-up" element={<CountUpPage />} />
                    <Route path="/decrypted-text" element={<DecryptedTextPage />} />
                    <Route path="/blob-cursor" element={<BlobCursorPage/>} />
                    <Route path="/magnet" element={<MagneticButtonPage/>} />
                    <Route path="/shader-gradient" element={<ShaderGradientPage/>} />
                    <Route path="/blob-gradient" element={<BlobGradientPage/>} />
             
                    {/* Add more component routes here */}
                  </Routes>
                </Layout>
              } 
            />
          </Routes>
        {/* )} */}
      </AnimatePresence>
    </Router>
  )
}

export default App