import type { RefObject } from 'react';
import type { Content } from './content';

export type Point = readonly [x: number, y: number];

export type Bleed = 'left' | 'right';

export type ProjectLayout = 'featured' | 'regular';

export type Box = { x: number; w: number };

export type TagVariant = 'tint' | 'outline' | 'soft';

export type DateLabels = Content['dates'];

export type GraphNodeKind = 'node' | 'accent' | 'head' | 'joint';

export type GraphNode = { x: number; y: number; r: number; kind: GraphNodeKind };

export type GraphEdge = { a: number; b: number; len: number };

export type WaveArrival = { node: number; t: number; hops: number; via: number | null; from: number | null };

export type CarouselState = {
  enabled: boolean;
  active: number;
  scrollerRef: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  goTo: (index: number) => void;
  reset: () => void;
  itemRef: (slug: string) => (el: HTMLElement | null) => void;
};
