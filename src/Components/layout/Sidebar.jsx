const Sidebar = () => {
  const categories = [
    {
      title: "Text Animations",
      items: [
        { name: "Split Text", isNew: false },
        { name: "Blur Text", isNew: false },
        { name: "Shiny Text", isNew: false },
        { name: "Gradient Text", isNew: false },
        { name: "Decrypted Text", isNew: true },
        { name: "True Focus", isNew: true },
        { name: "Variable Proximity", isNew: true },
        { name: "Count Up", isNew: false }
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
        { name: "Stack", isNew: false },
        { name: "Dock", isNew: true },
        { name: "Masonry", isNew: false },
        { name: "Magnetic Button", isNew: true },
        { name: "Particle Text", isNew: true },
        { name: "Liquid Wave", isNew: true },
        { name: "Glitch Effect", isNew: true },
        { name: "Morphing SVG", isNew: true },
        { name: "Shader Gradient", isNew: true },
        { name: "Blob Gradient", isNew: true },
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-gray-800 p-6">
      {categories.map((category) => (
        <div key={category.title} className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">{category.title}</h2>
          <ul className="space-y-2">
            {category.items.map((item) => (
              <li key={item.name} className="flex items-center gap-2">
                <a 
                  href={`/components/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-400 hover:text-cyan-400"
                >
                  {item.name}
                </a>
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