import { buildTerrainMesh, terrainFraming, type TerrainVariant, type Vec3 } from "./terrain-mesh";

export interface TerrainCamera {
  travel: number;
  x: number;
  y: number;
}

export const TERRAIN_LIGHT: Vec3 = normalize([-0.58, 0.88, -0.42]);

const SURFACE_VERTEX = `
#version 300 es
layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in float ambient;

uniform mat4 camera;
uniform mat4 lightCamera;
out vec3 world;
out vec3 surfaceNormal;
out float contact;
out vec4 lightPosition;

void main() {
  world = position;
  surfaceNormal = normal;
  contact = ambient;
  lightPosition = lightCamera * vec4(position, 1.0);
  gl_Position = camera * vec4(position, 1.0);
}
`.trim();

const SURFACE_FRAGMENT = `
#version 300 es
precision highp float;

in vec3 world;
in vec3 surfaceNormal;
in float contact;
in vec4 lightPosition;
uniform vec3 lightDirection;
uniform sampler2D shadowMap;
uniform float shadowTexel;
out vec4 color;

float lightVisibility(float incidence) {
  if (shadowTexel <= 0.0) return 1.0;
  vec3 sampleAt = lightPosition.xyz / lightPosition.w * 0.5 + 0.5;
  vec3 dx = dFdx(sampleAt);
  vec3 dy = dFdy(sampleAt);
  if (any(lessThan(sampleAt, vec3(0.0))) || any(greaterThan(sampleAt, vec3(1.0)))) {
    return 1.0;
  }

  // Compare each texel with the depth of the receiving plane at that texel.
  float jacobian = dx.x * dy.y - dx.y * dy.x;
  vec2 gradient = vec2(0.0);
  if (abs(jacobian) > 1e-10) {
    gradient = clamp(
      vec2(dx.z * dy.y - dx.y * dy.z, dx.x * dy.z - dx.z * dy.x) / jacobian,
      vec2(-3.0), vec2(3.0)
    );
  }
  float bias = max(0.00022, 0.00075 * (1.0 - incidence));
  float lit = 0.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      vec2 offset = vec2(float(x), float(y)) * shadowTexel * 1.15;
      vec2 texel = floor((sampleAt.xy + offset) / shadowTexel);
      vec2 center = (texel + 0.5) * shadowTexel;
      float depth = texture(shadowMap, center).r;
      float receiver = sampleAt.z + dot(center - sampleAt.xy, gradient);
      lit += step(receiver - bias, depth);
    }
  }
  return lit / 9.0;
}

void main() {
  vec3 n = normalize(surfaceNormal);
  float incidence = max(0.0, dot(n, lightDirection));
  float sun = incidence * lightVisibility(incidence);
  float sky = mix(0.69, 0.81, clamp(n.y, 0.0, 1.0));
  float mineral = sin(dot(world, vec3(2.7, 1.5, 3.6))) *
                  cos(dot(world, vec3(-2.1, 3.0, 1.8))) * 0.005;
  vec3 limestone = vec3(0.979, 0.969, 0.946) + mineral;
  vec3 ambient = limestone * sky * vec3(0.964, 0.984, 1.0);
  vec3 direct = limestone * (0.25 * sun);
  color = vec4((ambient + direct) * contact, 1.0);
}
`.trim();

const SHADOW_VERTEX = `
#version 300 es
layout(location = 0) in vec3 position;
uniform mat4 lightCamera;
void main() {
  gl_Position = lightCamera * vec4(position, 1.0);
}
`.trim();

const SHADOW_FRAGMENT = `
#version 300 es
precision mediump float;
void main() {}
`.trim();

function normalize([x, y, z]: Vec3): Vec3 {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
}

function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function lookAt(eye: Vec3, target: Vec3) {
  const back = normalize([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const right = normalize([back[2], 0, -back[0]]);
  const up: Vec3 = [
    back[1] * right[2] - back[2] * right[1],
    back[2] * right[0] - back[0] * right[2],
    back[0] * right[1] - back[1] * right[0],
  ];

  return new Float32Array([
    right[0], up[0], back[0], 0,
    right[1], up[1], back[1], 0,
    right[2], up[2], back[2], 0,
    -dot(right, eye), -dot(up, eye), -dot(back, eye), 1,
  ]);
}

function multiply(a: Float32Array, b: Float32Array) {
  const product = new Float32Array(16);
  for (let column = 0; column < 16; column += 4) {
    for (let row = 0; row < 4; row++) {
      product[column + row] =
        a[row] * b[column] + a[4 + row] * b[column + 1] +
        a[8 + row] * b[column + 2] + a[12 + row] * b[column + 3];
    }
  }
  return product;
}

function perspective(aspect: number) {
  const focal = 1 / Math.tan(0.71 / 2);
  const near = 0.5;
  const far = 75;
  return new Float32Array([
    focal / aspect, 0, 0, 0,
    0, focal, 0, 0,
    0, 0, (far + near) / (near - far), -1,
    0, 0, (2 * far * near) / (near - far), 0,
  ]);
}

export function terrainLightMatrix() {
  const near = 0.5;
  const far = 65;
  const projection = new Float32Array([
    1 / 19.5, 0, 0, 0,
    0, 1 / 17.5, 0, 0,
    0, 0, -2 / (far - near), 0,
    0, 0, -(far + near) / (far - near), 1,
  ]);
  const eye: Vec3 = [TERRAIN_LIGHT[0] * 31, TERRAIN_LIGHT[1] * 31, TERRAIN_LIGHT[2] * 31];
  return multiply(projection, lookAt(eye, [0, 0, 0]));
}

export function terrainViewMatrix(variant: TerrainVariant, aspect: number, camera: TerrainCamera) {
  const framing = terrainFraming(variant);
  const portrait = Math.max(0, 1 - aspect);
  const distance = 14.1 * (1 + 0.52 * portrait + 0.075 * camera.travel) * Math.min(1, 2.2 / aspect);
  const azimuth = framing.azimuth + camera.x * 0.032 + camera.travel * 0.11;
  const elevation = 0.99 + camera.y * 0.023 - camera.travel * 0.075;
  const target: Vec3 = [
    framing.center + portrait * (variant === "02" ? -2.9 : 3.2) + camera.x * 0.11,
    0.76,
    0.20 + camera.travel * 0.74,
  ];
  const groundDistance = distance * Math.cos(elevation);
  const eye: Vec3 = [
    target[0] + Math.sin(azimuth) * groundDistance,
    target[1] + Math.sin(elevation) * distance,
    target[2] + Math.cos(azimuth) * groundDistance,
  ];
  return multiply(perspective(aspect), lookAt(eye, target));
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("No se pudo crear el shader del Atlas.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

  const log = gl.getShaderInfoLog(shader);
  gl.deleteShader(shader);
  throw new Error(log || "No se pudo compilar el shader del Atlas.");
}

function link(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string) {
  const program = gl.createProgram();
  if (!program) throw new Error("No se pudo crear el programa del Atlas.");
  const shaders: WebGLShader[] = [];
  try {
    shaders.push(compile(gl, gl.VERTEX_SHADER, vertexSource));
    shaders.push(compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
    for (const shader of shaders) gl.attachShader(program, shader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "No se pudo enlazar el programa del Atlas.");
    }
    return program;
  } catch (error) {
    gl.deleteProgram(program);
    throw error;
  } finally {
    for (const shader of shaders) gl.deleteShader(shader);
  }
}

export function createTerrainRenderer(
  gl: WebGL2RenderingContext,
  variant: TerrainVariant,
  compact: boolean
) {
  const mesh = buildTerrainMesh(variant, compact);
  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();
  const shadows = gl.createFramebuffer();
  const depth = gl.createTexture();
  let surface: WebGLProgram | undefined;
  let shadow: WebGLProgram | undefined;

  const dispose = () => {
    if (surface) gl.deleteProgram(surface);
    if (shadow) gl.deleteProgram(shadow);
    gl.deleteVertexArray(vao);
    gl.deleteBuffer(buffer);
    gl.deleteFramebuffer(shadows);
    gl.deleteTexture(depth);
  };

  try {
    if (!vao || !buffer || !shadows || !depth) throw new Error("No se pudo reservar el terreno del Atlas.");
    surface = link(gl, SURFACE_VERTEX, SURFACE_FRAGMENT);
    shadow = link(gl, SHADOW_VERTEX, SHADOW_FRAGMENT);
  } catch (error) {
    dispose();
    throw error;
  }

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 28, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 28, 12);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 28, 24);
  const vertices = mesh.length / 7;
  gl.enable(gl.DEPTH_TEST);

  const light = terrainLightMatrix();
  const shadowSize = Math.min(compact ? 1024 : 1536, gl.getParameter(gl.MAX_TEXTURE_SIZE) as number);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, depth);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, shadowSize, shadowSize, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.NONE);
  gl.bindFramebuffer(gl.FRAMEBUFFER, shadows);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depth, 0);
  gl.drawBuffers([gl.NONE]);
  gl.readBuffer(gl.NONE);
  const shadowReady = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  if (shadowReady) {
    gl.viewport(0, 0, shadowSize, shadowSize);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.useProgram(shadow);
    gl.uniformMatrix4fv(gl.getUniformLocation(shadow, "lightCamera"), false, light);
    gl.drawArrays(gl.TRIANGLES, 0, vertices);
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.clearColor(247 / 255, 245 / 255, 240 / 255, 1);
  gl.useProgram(surface);
  gl.uniformMatrix4fv(gl.getUniformLocation(surface, "lightCamera"), false, light);
  gl.uniform3f(gl.getUniformLocation(surface, "lightDirection"), ...TERRAIN_LIGHT);
  gl.uniform1i(gl.getUniformLocation(surface, "shadowMap"), 0);
  gl.uniform1f(gl.getUniformLocation(surface, "shadowTexel"), shadowReady ? 1 / shadowSize : 0);
  const cameraUniform = gl.getUniformLocation(surface, "camera");

  return {
    render(camera: TerrainCamera) {
      const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(cameraUniform, false, terrainViewMatrix(variant, aspect, camera));
      gl.drawArrays(gl.TRIANGLES, 0, vertices);
    },
    dispose,
  };
}
