import { buildTerrainMesh, type TerrainVariant } from "./terrain-mesh";
import { TERRAIN_LIGHT, terrainLightMatrix, terrainViewMatrix } from "./terrain-renderer";

const SHADOW_SIZE = 640;
const STRIDE = 7;

function project(mesh: Float32Array, matrix: Float32Array, width: number, height: number) {
  const positions = new Float32Array(mesh.length / STRIDE * 4);
  for (let index = 0, point = 0; index < mesh.length; index += STRIDE, point += 4) {
    const [x, y, z] = [mesh[index], mesh[index + 1], mesh[index + 2]];
    const w = x * matrix[3] + y * matrix[7] + z * matrix[11] + matrix[15];
    positions[point] = (0.5 + 0.5 * (x * matrix[0] + y * matrix[4] + z * matrix[8] + matrix[12]) / w) * width;
    positions[point + 1] = (0.5 - 0.5 * (x * matrix[1] + y * matrix[5] + z * matrix[9] + matrix[13]) / w) * height;
    positions[point + 2] = 0.5 + 0.5 * (x * matrix[2] + y * matrix[6] + z * matrix[10] + matrix[14]) / w;
    positions[point + 3] = w;
  }
  return positions;
}

type PaintPixel = (vertex: number, pixel: number, u: number, v: number, w: number) => void;

function rasterize(points: Float32Array, width: number, height: number, paint?: PaintPixel) {
  const depth = new Float32Array(width * height).fill(1);
  for (let a = 0, vertex = 0; a < points.length; a += 12, vertex += 3 * STRIDE) {
    const b = a + 4;
    const c = a + 8;
    const aw = points[a + 3], bw = points[b + 3], cw = points[c + 3];
    if (aw <= 0 || bw <= 0 || cw <= 0) continue;
    const ax = points[a], ay = points[a + 1];
    const bx = points[b], by = points[b + 1];
    const cx = points[c], cy = points[c + 1];
    const area = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
    if (Math.abs(area) < 1e-5) continue;

    const left = Math.max(0, Math.floor(Math.min(ax, bx, cx)));
    const right = Math.min(width - 1, Math.ceil(Math.max(ax, bx, cx)));
    const top = Math.max(0, Math.floor(Math.min(ay, by, cy)));
    const bottom = Math.min(height - 1, Math.ceil(Math.max(ay, by, cy)));

    for (let y = top; y <= bottom; y++) {
      for (let x = left; x <= right; x++) {
        const dx = x + 0.5 - cx;
        const dy = y + 0.5 - cy;
        const u = ((by - cy) * dx + (cx - bx) * dy) / area;
        const v = ((cy - ay) * dx + (ax - cx) * dy) / area;
        const w = 1 - u - v;
        if (u < 0 || v < 0 || w < 0) continue;
        const index = y * width + x;
        const z = u * points[a + 2] + v * points[b + 2] + w * points[c + 2];
        if (z < 0 || z >= depth[index]) continue;
        depth[index] = z;
        if (paint) {
          const total = u / aw + v / bw + w / cw;
          paint(vertex, index, u / aw / total, v / bw / total, w / cw / total);
        }
      }
    }
  }
  return depth;
}

export function createTerrainFallback(context: CanvasRenderingContext2D, variant: TerrainVariant) {
  const mesh = buildTerrainMesh(variant, true);
  const lightPoints = project(mesh, terrainLightMatrix(), SHADOW_SIZE, SHADOW_SIZE);
  const shadow = rasterize(lightPoints, SHADOW_SIZE, SHADOW_SIZE);

  return (width: number, height: number) => {
    const frame = context.createImageData(width, height);
    const pixels = frame.data;
    const camera = terrainViewMatrix(variant, width / height, { travel: 0, x: 0, y: 0 });
    rasterize(project(mesh, camera, width, height), width, height, (vertex, pixel, u, v, w) => {
      const b = vertex + STRIDE;
      const c = b + STRIDE;
      const light = vertex / STRIDE * 4;
      const lightX = lightPoints[light] * u + lightPoints[light + 4] * v + lightPoints[light + 8] * w;
      const lightY = lightPoints[light + 1] * u + lightPoints[light + 5] * v + lightPoints[light + 9] * w;
      const lightZ = lightPoints[light + 2] * u + lightPoints[light + 6] * v + lightPoints[light + 10] * w;
      const [nx, ny, nz] = [mesh[vertex + 3], mesh[vertex + 4], mesh[vertex + 5]];
      const incidence = Math.max(0, nx * TERRAIN_LIGHT[0] + ny * TERRAIN_LIGHT[1] + nz * TERRAIN_LIGHT[2]);
      let lightCount = 0;
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
          const sx = Math.floor(lightX - 0.5) + x;
          const sy = Math.floor(lightY - 0.5) + y;
          const outside = sx < 0 || sy < 0 || sx >= SHADOW_SIZE || sy >= SHADOW_SIZE;
          if (outside || lightZ - 0.0013 <= shadow[sy * SHADOW_SIZE + sx]) lightCount++;
        }
      }

      const contact = mesh[vertex + 6] * u + mesh[b + 6] * v + mesh[c + 6] * w;
      const ambient = 0.69 + 0.12 * Math.max(0, ny);
      const sun = incidence * lightCount * 0.0625;
      const index = pixel * 4;
      pixels[index] = 250 * (ambient * 0.964 + sun) * contact;
      pixels[index + 1] = 247 * (ambient * 0.984 + sun) * contact;
      pixels[index + 2] = 241 * (ambient + sun) * contact;
      pixels[index + 3] = 255;
    });
    context.putImageData(frame, 0, 0);
  };
}
