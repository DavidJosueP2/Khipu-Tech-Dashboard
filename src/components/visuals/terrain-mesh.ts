import type { ModuleId } from "@/data/platform";

export type TerrainVariant = "home" | ModuleId;
export type Vec3 = readonly [number, number, number];

interface Sample {
  x: number;
  z: number;
  field: number;
}

interface Landform {
  x: number;
  z: number;
  width: number;
  length: number;
  weight: number;
  angle: number;
}

interface Landscape {
  forms: readonly Landform[];
  azimuth: number;
  center: number;
}

const LANDSCAPES: Record<TerrainVariant, Landscape> = {
  home: {
    azimuth: -0.10,
    center: 0.3,
    forms: [
      { x: 5.4, z: -1.6, width: 5.9, length: 4.7, weight: 1.28, angle: -0.52 },
      { x: 6.8, z: -1.3, width: 2.0, length: 1.8, weight: -1.06, angle: -0.58 },
      { x: 7.4, z: 5.9, width: 4.3, length: 3.5, weight: 0.83, angle: 0.61 },
      { x: -6.7, z: 5.6, width: 5.8, length: 2.4, weight: 0.65, angle: 0.39 },
      { x: -3.4, z: -5.9, width: 5.7, length: 2.6, weight: 0.72, angle: -0.31 },
      { x: -7.4, z: -5.5, width: 2.0, length: 1.5, weight: -0.50, angle: 0.20 },
      { x: -3.0, z: 0.1, width: 4.7, length: 2.8, weight: -0.24, angle: 0.19 },
    ],
  },
  "01": {
    azimuth: -0.28,
    center: 0.55,
    forms: [
      { x: 5.6, z: -2.2, width: 5.5, length: 3.5, weight: 1.37, angle: -0.68 },
      { x: 2.5, z: 2.8, width: 4.0, length: 2.7, weight: 0.61, angle: -0.57 },
      { x: 5.4, z: 1.4, width: 2.5, length: 1.3, weight: -0.75, angle: -0.41 },
      { x: -6.5, z: -4.0, width: 3.1, length: 2.8, weight: 0.68, angle: 0.72 },
      { x: -6.4, z: 6.1, width: 6.0, length: 2.2, weight: 0.66, angle: 0.14 },
    ],
  },
  "02": {
    azimuth: 0.11,
    center: -0.2,
    forms: [
      { x: -5.5, z: 0.2, width: 6.3, length: 3.4, weight: 1.12, angle: 0.45 },
      { x: -5.0, z: 0.7, width: 3.2, length: 1.0, weight: -0.76, angle: 0.45 },
      { x: -6.0, z: -4.8, width: 4.6, length: 2.2, weight: 0.67, angle: 0.46 },
      { x: 4.9, z: 4.8, width: 6.0, length: 1.9, weight: 0.69, angle: 0.35 },
      { x: 7.8, z: -5.5, width: 3.6, length: 3.2, weight: 0.58, angle: -0.36 },
      { x: 4.4, z: -0.8, width: 4.1, length: 2.6, weight: -0.20, angle: 0.35 },
    ],
  },
  "03": {
    azimuth: -0.13,
    center: 1.05,
    forms: [
      { x: 5.8, z: -4.1, width: 4.5, length: 3.0, weight: 0.95, angle: 0.28 },
      { x: 5.9, z: 2.9, width: 4.7, length: 4.0, weight: 1.10, angle: -0.66 },
      { x: 5.1, z: 2.9, width: 1.7, length: 1.7, weight: -0.88, angle: -0.35 },
      { x: -2.0, z: 6.5, width: 5.5, length: 2.3, weight: 0.72, angle: -0.31 },
      { x: -7.1, z: -3.7, width: 4.1, length: 3.8, weight: 0.71, angle: 0.50 },
      { x: -3.7, z: -5.1, width: 2.7, length: 1.6, weight: -0.33, angle: 0.40 },
    ],
  },
  "04": {
    azimuth: 0.19,
    center: 0.7,
    forms: [
      { x: 6.2, z: 1.1, width: 6.7, length: 2.7, weight: 1.15, angle: -0.78 },
      { x: 5.9, z: 1.7, width: 5.2, length: 0.9, weight: -0.86, angle: -0.79 },
      { x: 1.6, z: 5.7, width: 5.3, length: 2.4, weight: 0.72, angle: -0.45 },
      { x: -5.4, z: -4.6, width: 5.4, length: 3.7, weight: 0.78, angle: 0.10 },
      { x: -4.9, z: -4.8, width: 2.5, length: 1.7, weight: -0.51, angle: -0.20 },
      { x: -7.7, z: 5.6, width: 3.9, length: 3.0, weight: 0.58, angle: 0.40 },
    ],
  },
};

const EXTENT_X = 20;
const EXTENT_Z = 17;
const FIELD_STEP = 0.108;
const STRATUM = 0.255;
const BEVEL_FIELD = 0.012;
const BEVEL_HEIGHT = 0.036;
const FLOOR = -0.43;

function interpolate(a: Sample, b: Sample, level: number): Sample {
  const mix = (level - a.field) / (b.field - a.field);
  return { x: a.x + (b.x - a.x) * mix, z: a.z + (b.z - a.z) * mix, field: level };
}

function clip(points: readonly Sample[], level: number, above: boolean) {
  const clipped: Sample[] = [];
  let previous = points[points.length - 1];
  for (const point of points) {
    const enters = above ? point.field >= level : point.field <= level;
    const wasInside = above ? previous.field >= level : previous.field <= level;
    if (enters !== wasInside) clipped.push(interpolate(previous, point, level));
    if (enters) clipped.push(point);
    previous = point;
  }
  return clipped;
}

function createField(variant: TerrainVariant) {
  const forms = LANDSCAPES[variant].forms.map((form) => ({
    ...form,
    cos: Math.cos(form.angle),
    sin: Math.sin(form.angle),
  }));
  const phase = variant === "home" ? 0 : Number(variant) * 0.81;

  return (x: number, z: number) => {
    const warpedX = x + 0.51 * Math.sin(z * 0.56 + phase) + 0.23 * Math.sin(x * 0.87 - z * 0.74);
    const warpedZ = z + 0.45 * Math.sin(x * 0.52 - phase) + 0.17 * Math.cos(z * 0.97 + x * 0.51);
    let field = 0.16 + 0.044 * Math.sin((x + z * 0.33) * 0.52 + phase);
    for (const form of forms) {
      const dx = warpedX - form.x;
      const dz = warpedZ - form.z;
      const across = (dx * form.cos + dz * form.sin) / form.width;
      const along = (-dx * form.sin + dz * form.cos) / form.length;
      field += form.weight * Math.exp(-across * across - along * along);
    }
    return Math.max(0.015, field);
  };
}

export function terrainFraming(variant: TerrainVariant) {
  const { azimuth, center } = LANDSCAPES[variant];
  return { azimuth, center };
}

export function buildTerrainMesh(variant: TerrainVariant, compact: boolean) {
  const columns = compact ? 132 : 196;
  const rows = compact ? 112 : 166;
  const dx = (2 * EXTENT_X) / columns;
  const dz = (2 * EXTENT_Z) / rows;
  const heightField = createField(variant);
  const vertices: number[] = [];

  function vertex(point: Sample, y: number, normal: Vec3, ambient: number) {
    vertices.push(point.x, y, point.z, ...normal, ambient);
  }

  function surface(
    polygon: readonly Sample[],
    elevation: (value: number) => number,
    ambient: (value: number) => number
  ) {
    for (let index = 1; index + 1 < polygon.length; index++) {
      const a = polygon[0];
      const b = polygon[index];
      const c = polygon[index + 1];
      const ay = elevation(a.field);
      const by = elevation(b.field);
      const cy = elevation(c.field);
      const abx = b.x - a.x;
      const aby = by - ay;
      const abz = b.z - a.z;
      const acx = c.x - a.x;
      const acy = cy - ay;
      const acz = c.z - a.z;
      const nx = aby * acz - abz * acy;
      const ny = abz * acx - abx * acz;
      const nz = abx * acy - aby * acx;
      const length = Math.hypot(nx, ny, nz);
      if (length < 1e-9) continue;
      const normal: Vec3 = [nx / length, ny / length, nz / length];
      vertex(a, ay, normal, ambient(a.field));
      vertex(b, by, normal, ambient(b.field));
      vertex(c, cy, normal, ambient(c.field));
    }
  }

  function wall(a: Sample, b: Sample, lower: number, upperA: number, upperB = upperA) {
    const x = a.z - b.z;
    const z = b.x - a.x;
    const length = Math.hypot(x, z);
    if (length < 1e-7) return;
    const normal: Vec3 = [x / length, 0, z / length];
    vertex(a, lower, normal, 0.73);
    vertex(b, lower, normal, 0.73);
    vertex(a, upperA, normal, 0.98);
    vertex(b, lower, normal, 0.73);
    vertex(b, upperB, normal, 0.98);
    vertex(a, upperA, normal, 0.98);
  }

  function stratumHeight(level: number, field: number) {
    const bevel = Math.max(0, 1 - (field - level * FIELD_STEP) / BEVEL_FIELD);
    return level === 0 ? 0 : level * STRATUM - BEVEL_HEIGHT * bevel;
  }

  function sculpt(triangle: readonly [Sample, Sample, Sample]) {
    const [a, b, c] = triangle;
    const first = Math.floor(Math.min(a.field, b.field, c.field) / FIELD_STEP);
    const last = Math.floor(Math.max(a.field, b.field, c.field) / FIELD_STEP);
    for (let level = first; level <= last; level++) {
      const low = level * FIELD_STEP;
      const high = (level + 1) * FIELD_STEP;
      const elevation = level * STRATUM;
      const stratum = clip(clip(triangle, low, true), high, false);
      if (stratum.length < 3) continue;
      const ambient = (value: number) => 1 - 0.23 * Math.exp(-(high - value) / 0.034);

      if (level === 0) {
        surface(stratum, () => elevation, ambient);
        continue;
      }

      const shoulder = low + BEVEL_FIELD;
      surface(clip(stratum, shoulder, true), () => elevation, ambient);
      surface(
        clip(stratum, shoulder, false),
        (value) => stratumHeight(level, value),
        ambient
      );

      for (let index = 0; index < stratum.length; index++) {
        const start = stratum[index];
        const end = stratum[(index + 1) % stratum.length];
        if (start.field === low && end.field === low) {
          wall(start, end, elevation - STRATUM, elevation - BEVEL_HEIGHT);
        }
      }
    }
  }

  function makeRow(row: number) {
    const z = row * dz - EXTENT_Z;
    return Array.from({ length: columns + 1 }, (_, column): Sample => {
      const x = column * dx - EXTENT_X;
      return { x, z, field: heightField(x, z) };
    });
  }

  function closeEdge(a: Sample, b: Sample) {
    const min = Math.min(a.field, b.field);
    const max = Math.max(a.field, b.field);
    const joins = [a, b];

    for (let level = Math.max(1, Math.floor(min / FIELD_STEP)); level * FIELD_STEP < max; level++) {
      const boundary = level * FIELD_STEP;
      for (const field of [boundary, boundary + BEVEL_FIELD]) {
        if (field > min && field < max) joins.push(interpolate(a, b, field));
      }
    }

    joins.sort((left, right) => (a.field <= b.field ? 1 : -1) * (left.field - right.field));
    for (let index = 1; index < joins.length; index++) {
      const previous = joins[index - 1];
      const next = joins[index];
      const level = Math.floor((previous.field + next.field) / (2 * FIELD_STEP));
      wall(previous, next, FLOOR, stratumHeight(level, previous.field), stratumHeight(level, next.field));
    }
  }

  let upper = makeRow(0);
  for (let column = 1; column <= columns; column++) closeEdge(upper[column], upper[column - 1]);

  for (let row = 1; row <= rows; row++) {
    const lower = makeRow(row);
    closeEdge(upper[0], lower[0]);
    closeEdge(lower[columns], upper[columns]);

    for (let column = 0; column < columns; column++) {
      sculpt([upper[column], lower[column], upper[column + 1]]);
      sculpt([upper[column + 1], lower[column], lower[column + 1]]);
    }
    upper = lower;
  }

  for (let column = 1; column <= columns; column++) closeEdge(upper[column - 1], upper[column]);
  const corners = [
    { x: -EXTENT_X, z: -EXTENT_Z, field: 0 },
    { x: EXTENT_X, z: -EXTENT_Z, field: 0 },
    { x: EXTENT_X, z: EXTENT_Z, field: 0 },
    { x: -EXTENT_X, z: EXTENT_Z, field: 0 },
  ];
  surface(corners, () => FLOOR, () => 0.9);

  return new Float32Array(vertices);
}
