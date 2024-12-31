const ComponentDoc = ({ title, description, dependencies = [], preview, code }) => {
  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 text-5xl font-bold">{title}</h1>
      
      {description && (
        <p className="mb-6 text-gray-400">{description}</p>
      )}

      {dependencies.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold">Dependencies</h2>
          <div className="flex gap-2">
            {dependencies.map(dep => (
              <span key={dep} className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8 rounded-lg bg-gray-900 p-8">
        {preview}
      </div>

      <div className="rounded-lg bg-gray-900">
        <div className="border-b border-gray-800 p-4">
          <div className="flex gap-4">
            <button className="text-cyan-400">Default</button>
            <button className="text-gray-400">Tailwind</button>
          </div>
        </div>
        <pre className="p-4">
          <code className="text-sm text-gray-300">{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default ComponentDoc 