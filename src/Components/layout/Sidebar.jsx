const Sidebar = () => {
  const categories = [
    {
      title: "Text Animations",
      items: ["Split Text", "Blur Text", "Wave Text", "Shiny Text", "Gradient Text", "Count Up"]
    },
    {
      title: "Animations",
      items: ["Animated Container", "Blob Cursor", "Follow Cursor", "Crosshair", "Magnet", "Fade"]
    },
    {
      title: "Components",
      items: ["Stack", "Dock", "Masonry"]
    }
  ]

  return (
    <aside className="w-64 border-r border-gray-800 p-6">
      {categories.map((category) => (
        <div key={category.title} className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">{category.title}</h2>
          <ul className="space-y-2">
            {category.items.map((item) => (
              <li key={item}>
                <a 
                  href={`/components/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-400 hover:text-cyan-400"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}

export default Sidebar 