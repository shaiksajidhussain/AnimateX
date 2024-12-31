const Navbar = () => {
  return (
    <nav className="border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">AnimateX</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/docs" className="hover:text-cyan-400">Docs</a>
          <a href="/components" className="hover:text-cyan-400">Components</a>
          <a 
            href="https://github.com/your-repo" 
            className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 hover:bg-gray-700"
          >
            <span>⭐</span> Star on GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 