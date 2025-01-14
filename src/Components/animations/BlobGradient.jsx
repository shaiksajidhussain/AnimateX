import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/*
Installation:
1. Create a new file: src/components/animations/BlobGradient.jsx
2. Copy this entire code
3. Import and use in your React component:

import BlobGradient from './components/animations/BlobGradient';

function App() {
  return (
    <BlobGradient 
      width="100%" 
      height="600px"
      color1={[0.2, 0.8, 1.0]}  // Cyan
      color2={[1.0, 0.2, 0.8]}  // Pink
      color3={[0.8, 0.2, 1.0]}  // Purple
      color4={[1.0, 0.8, 0.2]}  // Yellow
    />
  );
}
*/

// Linear interpolation function
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Function to get mouse position relative to the container or viewport
const getMousePos = (e, container) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };
  }
  return { x: e.clientX, y: e.clientY };
};

// Complete vertex shader
const vertexShader = `
  attribute vec4 position;
  attribute vec2 a_texCoord;
  varying vec2 vUv;
  
  void main() {
    vUv = a_texCoord;
    gl_Position = position;
  }
`;

// Complete fragment shader with all effects
const fragmentShader = `
  precision mediump float;
  
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  
  varying vec2 vUv;

  // Noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                       0.366025403784439,
                      -0.577350269189626,
                       0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 pos = uv * 2.0 - 1.0;
    pos.x *= uResolution.x/uResolution.y;
    
    // Mouse influence
    vec2 mouse = uMouse * 2.0 - 1.0;
    float mouseDist = length(pos - mouse);
    float mouseInfluence = smoothstep(0.8, 0.0, mouseDist);
    
    float time = uTime * 0.3;
    
    // Create multiple layers of noise
    float noise1 = snoise(pos * 1.5 + time + mouse * 0.1);
    float noise2 = snoise(pos * 2.0 - time * 0.5 + mouse * 0.05);
    float noise3 = snoise(pos * 3.0 + time * 0.2 + mouse * 0.15);
    
    // Combine noises for organic shape
    float finalNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2) * 1.5;
    finalNoise += mouseInfluence * 0.3;
    
    // Create blob shape
    float blob = smoothstep(0.2, 0.8, 1.0 - length(pos + vec2(
      cos(time) * 0.2 + mouse.x * 0.1,
      sin(time * 0.7) * 0.2 + mouse.y * 0.1
    )));
    
    // Combine blob with noise
    float shape = blob + finalNoise * 0.3;
    
    // Create gradient with smooth transitions
    vec3 color = mix(
      mix(uColor1, uColor2, shape),
      mix(uColor3, uColor4, shape),
      sin(shape * 3.14159 + time) * 0.5 + 0.5
    );
    
    // Add shine effect
    float shine = pow(1.0 - length(pos), 3.0) * 0.5;
    color += shine + mouseInfluence * 0.2;
    
    // Smooth edges
    float edge = smoothstep(0.0, 0.1, shape);
    
    gl_FragColor = vec4(color, edge);
  }
`;

// Helper functions for WebGL setup
const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

// Main component
const BlobGradient = ({ 
  width = '100%', 
  height = '400px',
  color1 = [0.2, 0.8, 1.0],
  color2 = [1.0, 0.2, 0.8],
  color3 = [0.8, 0.2, 1.0],
  color4 = [1.0, 0.8, 0.2]
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Create shaders
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

    if (!vertShader || !fragShader) {
      console.error('Shader creation failed');
      return;
    }

    // Create program
    const program = createProgram(gl, vertShader, fragShader);
    if (!program) {
      console.error('Program creation failed');
      return;
    }

    // Set up vertex data
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]);

    const texCoords = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      1, 1
    ]);

    // Create and bind position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Create and bind texCoord buffer
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    // Get attribute locations
    const positionLocation = gl.getAttribLocation(program, 'position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, 'uTime');
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const color1Location = gl.getUniformLocation(program, 'uColor1');
    const color2Location = gl.getUniformLocation(program, 'uColor2');
    const color3Location = gl.getUniformLocation(program, 'uColor3');
    const color4Location = gl.getUniformLocation(program, 'uColor4');

    // Use program
    gl.useProgram(program);

    // Set up attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Set colors
    gl.uniform3fv(color1Location, color1);
    gl.uniform3fv(color2Location, color2);
    gl.uniform3fv(color3Location, color3);
    gl.uniform3fv(color4Location, color4);

    // Add mouse uniform location
    const mouseLocation = gl.getUniformLocation(program, 'uMouse');

    // Mouse move handler
    const handleMouseMove = (e) => {
      const pos = getMousePos(e, canvas);
      targetMouseRef.current = {
        x: pos.x / canvas.width,
        y: pos.y / canvas.height
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const startTime = Date.now();

    // Animation loop
    const render = () => {
      // Smooth mouse movement using lerp
      mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.1);
      mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.1);

      // Update canvas size if needed
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // Update uniforms
      gl.uniform1f(timeLocation, (Date.now() - startTime) * 0.001);
      gl.uniform2f(resolutionLocation, width, height);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      
      // Update colors
      gl.uniform3fv(color1Location, color1);
      gl.uniform3fv(color2Location, color2);
      gl.uniform3fv(color3Location, color3);
      gl.uniform3fv(color4Location, color4);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, [color1, color2, color3, color4]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
          display: 'block',
          borderRadius: '12px'
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="w-6 h-6 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{
            left: `${mouseRef.current.x * 100}%`,
            top: `${mouseRef.current.y * 100}%`,
            transform: `translate(-50%, -50%) scale(${
              lerp(1.2, 0.8, Math.min(1, Math.abs(mouseRef.current.x - targetMouseRef.current.x) * 10))
            })`
          }}
        />
      </div>
    </div>
  );
};

BlobGradient.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color1: PropTypes.arrayOf(PropTypes.number),
  color2: PropTypes.arrayOf(PropTypes.number),
  color3: PropTypes.arrayOf(PropTypes.number),
  color4: PropTypes.arrayOf(PropTypes.number)
};

export default BlobGradient; 