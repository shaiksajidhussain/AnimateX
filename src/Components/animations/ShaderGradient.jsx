import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const vertexShader = `
  attribute vec4 position;
  attribute vec2 a_texCoord;
  
  varying vec2 vUv;
  
  void main() {
    vUv = a_texCoord;
    gl_Position = position;
  }
`;

const fragmentShader = `
  precision mediump float;
  
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 pos = uv * 2.0 - 1.0;
    
    float time = uTime * 0.5;
    float d = length(pos);
    
    vec3 color = mix(
      mix(uColor1, uColor2, sin(d + time) * 0.5 + 0.5),
      uColor3,
      sin(d * 3.0 - time * 2.0) * 0.5 + 0.5
    );
    
    float glow = 0.03 / length(pos);
    color += glow * vec3(0.5, 0.8, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ShaderGradient = ({ 
  width = '100%', 
  height = '400px',
  color1 = [1.0, 0.0, 0.5],
  color2 = [0.0, 1.0, 0.8],
  color3 = [0.5, 0.0, 1.0]
}) => {
  const canvasRef = useRef(null);
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

    const startTime = Date.now();

    // Animation loop
    const render = () => {
      const time = (Date.now() - startTime) * 0.001;
      
      // Resize canvas
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // Update uniforms
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, width, height);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, [color1, color2, color3]);

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

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        display: 'block',
        borderRadius: '12px'
      }}
    />
  );
};

ShaderGradient.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color1: PropTypes.arrayOf(PropTypes.number),
  color2: PropTypes.arrayOf(PropTypes.number),
  color3: PropTypes.arrayOf(PropTypes.number)
};

export default ShaderGradient; 