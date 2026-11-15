'use client';

import { useEffect, useRef } from 'react';
import { cssEaseOut, graph } from '@/src/lib/motion';
import { heroGraph, svgCenterOrigin } from '@/src/styles/classes';
import type { HeroGraphProps, WaveArrival } from '@/src/types';
import { edgePaths, edges, neighbors, nodes, token, waveOrigins } from './graph';

function spread(origin: number, maxHops: number, skip: number[] = []): WaveArrival[] {
  const reached = new Map<number, WaveArrival>();
  const queue: WaveArrival[] = [{ node: origin, t: 0, hops: 0, via: null, from: null }];
  while (queue.length) {
    queue.sort((p, q) => p.t - q.t);
    const cur = queue.shift()!;
    if (reached.has(cur.node)) continue;
    reached.set(cur.node, cur);
    if (cur.hops >= maxHops) continue;
    neighbors[cur.node].forEach(({ node, edge }) => {
      if (reached.has(node) || skip.includes(edge)) return;
      queue.push({ node, t: cur.t + edges[edge].len / graph.waveSpeed, hops: cur.hops + 1, via: edge, from: cur.node });
    });
  }
  return Array.from(reached.values());
}

export default function HeroGraph({ chips }: HeroGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const litRefs = useRef<(SVGCircleElement | null)[]>([]);
  const haloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const cometRefs = useRef<(SVGPathElement | null)[]>([]);
  const mlRef = useRef<HTMLSpanElement>(null);
  const engineerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pulse = (edge: number, from: number, delay: number, strength: number) => {
      const el = edgeRefs.current[edge];
      if (!el) return;
      const { a, len } = edges[edge];
      const before = `${graph.pulseLength}px`;
      const after = `${-len}px`;
      const [start, end] = from === a ? [before, after] : [after, before];
      el.animate(
        [
          { strokeDashoffset: start, opacity: strength },
          { strokeDashoffset: end, opacity: strength },
        ],
        { duration: ((len + graph.pulseLength) / graph.waveSpeed) * 1000, delay: delay * 1000, easing: 'linear' },
      );
    };

    const flash = (node: number, delay: number, strength: number, big = false) => {
      litRefs.current[node]?.animate([{ opacity: 0 }, { opacity: strength, offset: 0.15 }, { opacity: 0 }], {
        duration: graph.flashDuration * 1000,
        delay: delay * 1000,
        easing: 'ease-out',
      });
      haloRefs.current[node]?.animate(
        [
          { opacity: strength, transform: 'scale(1)' },
          { opacity: 0, transform: `scale(${big ? 4.2 : 3.2})` },
        ],
        { duration: graph.haloDuration * (big ? 1.4 : 1) * 1000, delay: delay * 1000, easing: cssEaseOut },
      );
    };

    const wave = (origin: number, delay: number, maxHops: number, strength: number, skip?: number[]) => {
      spread(origin, maxHops, skip).forEach(({ node, t, hops, via, from }) => {
        const fade = (h: number) => strength * (1 - h / (maxHops + 1));
        if (hops > 0) flash(node, delay + t, fade(hops));
        if (via !== null && from !== null) pulse(via, from, delay + t - edges[via].len / graph.waveSpeed, fade(hops - 1));
      });
    };

    const ring = (el: HTMLSpanElement | null, delay: number) =>
      el?.animate([{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0 }], {
        duration: 1600,
        delay: delay * 1000,
        easing: 'ease-out',
      });

    let lastOrigin = -1;

    const runWave = () => {
      let origin = lastOrigin;
      while (origin === lastOrigin) origin = waveOrigins[Math.floor(Math.random() * waveOrigins.length)];
      lastOrigin = origin;
      flash(origin, 0, 1, true);
      wave(origin, 0, graph.waveHops, 1);
    };

    const runToken = () => {
      const travel = (len: number) => ({
        duration: ((token.length + len) / graph.tokenSpeed) * 1000,
        easing: 'linear',
      });
      [heroGraph.comet.glow, heroGraph.comet.core].forEach((len, i) => {
        cometRefs.current[i]?.animate(
          [
            { strokeDashoffset: `${len}px`, opacity: 1 },
            { strokeDashoffset: `${-token.length}px`, opacity: 1 },
          ],
          travel(len),
        );
      });
      ring(mlRef.current, 0);
      token.path.forEach((node, k) => {
        const t = token.at[k] / graph.tokenSpeed;
        const { kind } = nodes[node];
        const last = k === token.path.length - 1;
        flash(node, t, 1, last);
        if (kind === 'accent' || kind === 'head') wave(node, t, graph.tokenHops, 0.7, token.edges);
        if (last) ring(engineerRef.current, t);
      });
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = false;
    let timer: number | undefined;
    let step = 0;

    const loop = () => {
      const isToken = step++ % 3 === 0;
      if (isToken) runToken();
      else runWave();
      const [min, max] = graph.gapAfterWave;
      const gap = isToken ? graph.gapAfterToken : min + Math.random() * (max - min);
      timer = window.setTimeout(loop, gap * 1000);
    };

    const stop = () => {
      window.clearTimeout(timer);
      timer = undefined;
      root.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    };

    const sync = () => {
      const run = onScreen && !document.hidden && !reduce.matches;
      if (run && timer === undefined) timer = window.setTimeout(loop, 500);
      else if (!run && timer !== undefined) stop();
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(root);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
      stop();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 hidden h-[760px] w-[1440px] -translate-x-1/2 lg:block"
    >
      <svg width={1440} height={760} viewBox="0 0 1440 760" fill="none" className="absolute left-0 top-0 max-w-none">
        <g className="stroke-edge">
          {edgePaths.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <g className="stroke-accent" strokeWidth={2.25} strokeLinecap="round">
          {edges.map(({ a, b, len }, i) => (
            <line
              key={`${a}-${b}`}
              ref={(el) => {
                edgeRefs.current[i] = el;
              }}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              strokeDasharray={`${graph.pulseLength} ${len + graph.pulseLength}`}
              opacity={0}
            />
          ))}
        </g>

        {nodes.map((n, i) =>
          n.kind === 'node' ? (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={n.r} className="fill-node" />
              <circle
                ref={(el) => {
                  litRefs.current[i] = el;
                }}
                cx={n.x}
                cy={n.y}
                r={n.r + 1.5}
                className="fill-accent"
                opacity={0}
              />
            </g>
          ) : null,
        )}

        <path d={token.d} className="stroke-accent" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {[
          { len: heroGraph.comet.glow, width: 9, className: 'stroke-accent/35' },
          { len: heroGraph.comet.core, width: 3, className: 'stroke-head' },
        ].map(({ len, width, className }, i) => (
          <path
            key={len}
            ref={(el) => {
              cometRefs.current[i] = el;
            }}
            d={token.d}
            className={className}
            strokeWidth={width}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${len} ${token.length + len}`}
            opacity={0}
          />
        ))}

        {nodes.map((n, i) =>
          n.kind === 'accent' || n.kind === 'head' ? (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} className={n.kind === 'accent' ? 'fill-accent' : 'fill-head'} />
          ) : null,
        )}

        <g className="fill-accent/10 stroke-accent">
          {nodes.map((n, i) =>
            n.r > 0 ? (
              <circle
                key={i}
                ref={(el) => {
                  haloRefs.current[i] = el;
                }}
                cx={n.x}
                cy={n.y}
                r={n.r + 3}
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
                opacity={0}
                style={svgCenterOrigin}
              />
            ) : null,
          )}
        </g>
      </svg>

      <span className={`${heroGraph.chip} left-[660px] top-[636px]`}>
        {chips.ml}
        <span ref={mlRef} className={heroGraph.chipRing} />
      </span>
      <span className={`${heroGraph.chip} left-[1300px] top-[58px]`}>
        {chips.engineer}
        <span ref={engineerRef} className={heroGraph.chipRing} />
      </span>
    </div>
  );
}
