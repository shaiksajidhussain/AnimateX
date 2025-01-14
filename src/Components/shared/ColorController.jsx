import PropTypes from 'prop-types';

const ColorControl = ({ label, color, onChange }) => {
  const rgbToHex = (r, g, b) => {
    const toHex = (n) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        <div 
          className="w-10 h-10 rounded-lg border border-gray-700"
          style={{
            backgroundColor: rgbToHex(color[0], color[1], color[2])
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Red</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={color[0]}
            onChange={(e) => onChange(0, e.target.value)}
            className="w-full accent-red-500"
          />
          <div className="text-xs text-gray-400 mt-1">{(color[0] * 255).toFixed(0)}</div>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Green</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={color[1]}
            onChange={(e) => onChange(1, e.target.value)}
            className="w-full accent-green-500"
          />
          <div className="text-xs text-gray-400 mt-1">{(color[1] * 255).toFixed(0)}</div>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Blue</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={color[2]}
            onChange={(e) => onChange(2, e.target.value)}
            className="w-full accent-blue-500"
          />
          <div className="text-xs text-gray-400 mt-1">{(color[2] * 255).toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
};

ColorControl.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired
};

export default ColorControl; 