import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const categories = [
    {
      title: "Text Animations",
      items: [
        { name: "Split Text", isNew: false },
        { name: "Blur Text", isNew: false },
        { name: "Shiny Text", isNew: false },
        { name: "Decrypted Text", isNew: true },
        { name: "Count Up", isNew: false },
        { name: "Gradient Text", isNew: false },
        { name: "True Focus", isNew: true },
        { name: "Variable Proximity", isNew: true },
      ]
    },
    {
      title: "Animations",
      items: [
        { name: "Animated Content", isNew: false },
        { name: "Fade Content", isNew: false },
        { name: "Magnet Lines", isNew: false },
        { name: "Magnet", isNew: false },
        { name: "Noise", isNew: true },
        { name: "Crosshair", isNew: false },
        { name: "Splash Cursor", isNew: false },
        { name: "Follow Cursor", isNew: false },
        { name: "Blob Cursor", isNew: false },
        { name: "Star Border", isNew: false }
      ]
    },
    {
      title: "Components",
      items: [
        { name: "Morphing SVG", isNew: true },
        { name: "Card Carousel", isNew: true },
        { name: "Card Swiper", isNew: true },
        { name: "Fluid Distortion", isNew: true },
        { name: "Shader Gradient", isNew: true },
        { name: "Blob Gradient", isNew: true },
        { name: "String Animation", isNew: true },
      
        { name: "Stack", isNew: false },
        { name: "Dock", isNew: true },
        { name: "Masonry", isNew: false },
        { name: "Magnetic Button", isNew: true },
        { name: "Particle Text", isNew: true },
        { name: "Liquid Wave", isNew: true },
        { name: "Glitch Effect", isNew: true },
        
      ]
    }
  ];

  const isActive = (itemName) => {
    const path = `/components/${itemName.toLowerCase().replace(/\s+/g, '-')}`;
    return location.pathname === path;
  };

  return (
    <aside className="w-64 border-r border-gray-800 p-6 overflow-x-hidden">
      {categories.map((category) => (
        <div key={category.title} className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">{category.title}</h2>
          <ul className="space-y-2">
            {category.items.map((item) => (
              <li key={item.name} className="flex items-center gap-2">
                <Link 
                  to={`/components/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`transition-colors ${
                    isActive(item.name) 
                      ? 'text-cyan-400 font-medium' 
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
                >
                  {item.name}
                </Link>
                {item.isNew && (
                  <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar; 