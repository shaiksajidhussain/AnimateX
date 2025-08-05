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
            <a href="/docs" className="hidden md:block hover:text-cyan-400">
              Docs
            </a>
            <a href="/components" className="hidden md:block hover:text-cyan-400">
              Components
            </a>
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