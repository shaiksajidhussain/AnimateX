# Opened Files
## File Name
src/App.jsx
## File Content
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import Robo from './Components/Robo';
import ComponentsShowcase from './Components/ComponentsShowcase';
import Layout from './Components/layout/Layout';
// import SplitText from './Components/animations/SplitText';
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
import MorphingSvgPage from './pages/components/morphing-svg';
import StringAnimationPage from './pages/components/string-animation';
import CarouselPage from './pages/components/carousel';
import CardSwiperPage from './pages/components/card-swiper';
import FluidDistortionPage from './pages/components/fluid-distortion';

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
              path="/components/split-text" 
              element={<Layout><SplitTextPage /></Layout>} 
            />
            <Route 
              path="/components/blur-text" 
              element={<Layout><BlurTextPage /></Layout>} 
            />
            <Route 
              path="/components/wave-text" 
              element={<Layout><WaveTextPage /></Layout>} 
            />
            <Route 
              path="/components/shiny-text" 
              element={<Layout><ShinyTextPage /></Layout>} 
            />
            <Route 
              path="/components/count-up" 
              element={<Layout><CountUpPage /></Layout>} 
            />
            <Route 
              path="/components/decrypted-text" 
              element={<Layout><DecryptedTextPage /></Layout>} 
            />
            <Route 
              path="/components/blob-cursor" 
              element={<Layout><BlobCursorPage /></Layout>} 
            />
            <Route 
              path="/components/magnet" 
              element={<Layout><MagneticButtonPage /></Layout>} 
            />
            <Route 
              path="/components/shader-gradient" 
              element={<Layout><ShaderGradientPage /></Layout>} 
            />
            <Route 
              path="/components/blob-gradient" 
              element={<Layout><BlobGradientPage /></Layout>} 
            />
            <Route 
              path="/components/morphing-svg" 
              element={<Layout><MorphingSvgPage /></Layout>} 
            />
            <Route 
              path="/components/string-animation" 
              element={<Layout><StringAnimationPage /></Layout>} 
            />
            <Route 
              path="/components/card-carousel" 
              element={<Layout><CarouselPage /></Layout>} 
            />
            <Route 
              path="/components/card-swiper" 
              element={<Layout><CardSwiperPage /></Layout>} 
            />
            <Route 
              path="/components/fluid-distortion" 
              element={<Layout><FluidDistortionPage /></Layout>} 
            />
          </Routes>
        {/* )} */}
      </AnimatePresence>
    </Router>
  )
}

export default App
# Opened Files
## File Name
src/Components/layout/Navbar.jsx
## File Content
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="fixed top-0 w-full z-40 border-b border-gray-800 bg-black/90 backdrop-blur-xl">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
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
            
           <Link to="/"> <h1 className="text-2xl font-bold">AnimateX</h1></Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/docs" className="hidden md:block hover:text-cyan-400">
              Docs
            </Link>
            <Link to="/components" className="hidden md:block hover:text-cyan-400">
              Components
            </Link>
            <a
              href="https://github.com/your-repo"
              className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700"
            >
              <span>⭐</span> Star
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired
};

export default Navbar;
