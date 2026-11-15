import type { GraphEdge, GraphNode, Point } from '@/src/types';

const POLYLINES: Point[][] = [
  [[560, 700], [700, 610], [820, 650], [930, 560], [1010, 470], [1100, 380], [1180, 260], [1260, 170], [1340, 110]],
  [[700, 610], [760, 520], [860, 470], [930, 560]],
  [[820, 650], [900, 700], [1010, 640], [1100, 560], [1180, 470], [1260, 400], [1380, 330]],
  [[860, 470], [960, 400], [1010, 470]],
  [[960, 400], [1040, 300], [1100, 380], [1200, 330], [1260, 400]],
  [[1040, 300], [1120, 200], [1180, 260], [1250, 90]],
  [[1120, 200], [1200, 140], [1260, 170], [1380, 210], [1380, 330]],
  [[1010, 640], [1100, 700], [1220, 640], [1260, 520], [1380, 450]],
  [[480, 740], [560, 700], [620, 760]],
];

export const nodes: GraphNode[] = [
  { x: 560, y: 700, r: 4, kind: 'node' },
  { x: 760, y: 520, r: 3.5, kind: 'node' },
  { x: 820, y: 650, r: 4, kind: 'node' },
  { x: 860, y: 470, r: 3.5, kind: 'node' },
  { x: 900, y: 700, r: 3, kind: 'node' },
  { x: 960, y: 400, r: 4, kind: 'node' },
  { x: 1010, y: 640, r: 3.5, kind: 'node' },
  { x: 1040, y: 300, r: 3.5, kind: 'node' },
  { x: 1100, y: 560, r: 4, kind: 'node' },
  { x: 1120, y: 200, r: 3.5, kind: 'node' },
  { x: 1180, y: 470, r: 3, kind: 'node' },
  { x: 1200, y: 330, r: 3.5, kind: 'node' },
  { x: 1200, y: 140, r: 3, kind: 'node' },
  { x: 1260, y: 400, r: 4, kind: 'node' },
  { x: 1220, y: 640, r: 3.5, kind: 'node' },
  { x: 1260, y: 520, r: 3, kind: 'node' },
  { x: 1380, y: 210, r: 3.5, kind: 'node' },
  { x: 1380, y: 330, r: 4, kind: 'node' },
  { x: 1380, y: 450, r: 3, kind: 'node' },
  { x: 1250, y: 90, r: 3, kind: 'node' },
  { x: 1100, y: 700, r: 3, kind: 'node' },
  { x: 480, y: 740, r: 3, kind: 'node' },
  { x: 620, y: 760, r: 3, kind: 'node' },
  { x: 1010, y: 470, r: 0, kind: 'joint' },
  { x: 1180, y: 260, r: 0, kind: 'joint' },
  { x: 700, y: 610, r: 6, kind: 'accent' },
  { x: 930, y: 560, r: 5, kind: 'accent' },
  { x: 1100, y: 380, r: 5, kind: 'accent' },
  { x: 1260, y: 170, r: 8, kind: 'head' },
  { x: 1340, y: 110, r: 7, kind: 'head' },
];

const nodeIndex = new Map(nodes.map((n, i) => [`${n.x},${n.y}`, i]));

function indexOf([x, y]: Point) {
  const i = nodeIndex.get(`${x},${y}`);
  if (i === undefined) throw new Error(`Grafo do Hero: vértice ${x},${y} sem nó correspondente`);
  return i;
}

const toPath = (line: Point[]) => line.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('');

export const edgePaths = POLYLINES.map(toPath);

export const edges: GraphEdge[] = [];
const edgeIndex = new Map<string, number>();
const edgeKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);

POLYLINES.forEach((line) => {
  for (let i = 1; i < line.length; i++) {
    const a = indexOf(line[i - 1]);
    const b = indexOf(line[i]);
    const key = edgeKey(a, b);
    if (edgeIndex.has(key)) continue;
    edgeIndex.set(key, edges.length);
    edges.push({ a, b, len: Math.hypot(nodes[b].x - nodes[a].x, nodes[b].y - nodes[a].y) });
  }
});

export const neighbors: { node: number; edge: number }[][] = nodes.map(() => []);
edges.forEach((e, i) => {
  neighbors[e.a].push({ node: e.b, edge: i });
  neighbors[e.b].push({ node: e.a, edge: i });
});

const BEHIND_PHOTO = ['1040,300', '1120,200', '1200,140', '1200,330', '1260,400'];

export const waveOrigins = nodes.flatMap((n, i) =>
  n.kind === 'node' && !BEHIND_PHOTO.includes(`${n.x},${n.y}`) ? [i] : [],
);

export const token = (() => {
  const path = POLYLINES[0].map(indexOf);
  const edgeIds = path.slice(1).map((b, i) => edgeIndex.get(edgeKey(path[i], b))!);
  const at = [0];
  edgeIds.forEach((e) => at.push(at[at.length - 1] + edges[e].len));
  return { d: edgePaths[0], path, edges: edgeIds, at, length: at[at.length - 1] };
})();
