import meshgridImg from '@/assets/project-meshgrid.jpg';
import payoutsImg from '@/assets/project-payouts.jpg';
import ridelineImg from '@/assets/project-rideline.jpg';

export type Project = {
  title: string;
  alt: string;
  desc: string;
  highlights: string[];
  img: string;
  metrics: { label: string; value: string }[];
  overview: string;
  role: string;
  slug: string;
  stack: string[];
  tags: string;
  timeline: string;
  year: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Meshgrid',
    alt: 'Iridescent chrome node network — Meshgrid project artwork',
    desc: 'Realtime infra dashboard streaming 40k events/min.',
    highlights: [
      'Go WebSocket gateway with per-tenant backpressure and windowed snapshots',
      'Virtualized React grid rendering 10k live rows at a steady 60fps',
      'Alert rules engine with dry-run previews against historical event replays',
      'Zero-downtime rollouts driven by a custom Kubernetes operator',
    ],
    img: meshgridImg,
    metrics: [
      { label: 'events / min', value: '40k' },
      { label: 'p95 latency', value: '120ms' },
      { label: 'clusters', value: '26' },
    ],
    overview:
      'Meshgrid gives platform teams a single live view of every node, deploy and alert across a multi-cluster fleet. The hard part was keeping a 40k events/min firehose readable: we built a Go fan-out layer that collapses bursts into windowed snapshots before they ever hit the browser.',
    role: 'Tech lead · fullstack',
    slug: 'meshgrid',
    stack: ['TypeScript', 'React', 'Go', 'Kubernetes', 'WebSockets', 'ClickHouse'],
    tags: 'ts · go · k8s · websockets',
    timeline: '8 months · 2024',
    year: '2024',
  },
  {
    title: 'Payouts',
    alt: 'Holographic chrome payment card floating — Payouts project artwork',
    desc: 'Payments engine handling $2M/day settled flows.',
    highlights: [
      'Append-only double-entry ledger in Postgres with strict invariants',
      'Idempotent Rust workers surviving partial provider outages',
      'GraphQL API with per-field authorization for finance and support roles',
      'Automated daily reconciliation against three payment providers',
    ],
    img: payoutsImg,
    metrics: [
      { label: 'settled / day', value: '$2M' },
      { label: 'reconciliation', value: '99.99%' },
      { label: 'manual ops', value: '-90%' },
    ],
    overview:
      'A ledger-first payouts engine replacing a spreadsheet-driven settlement process. Every money movement is a double-entry record, so balances are always reconstructible and reconciliation runs are boring by design.',
    role: 'Backend lead',
    slug: 'payouts',
    stack: ['Rust', 'PostgreSQL', 'GraphQL', 'Redis', 'Terraform'],
    tags: 'rust · sql · graphql',
    timeline: '11 months · 2023',
    year: '2023',
  },
  {
    title: 'Rideline',
    alt: 'Metallic chrome audio waveform sculpture — Rideline project artwork',
    desc: 'Collaborative audio editor with live transport.',
    highlights: [
      'Sample-accurate Web Audio transport shared over WebRTC data channels',
      'CRDT session state with offline editing and clean merges',
      'Waveform rendering offloaded to a worker + OffscreenCanvas',
      'Non-destructive edit history with instant revert',
    ],
    img: ridelineImg,
    metrics: [
      { label: 'sync drift', value: '<5ms' },
      { label: 'session size', value: '300 clips' },
      { label: 'collaborators', value: '8 live' },
    ],
    overview:
      "Rideline lets two producers edit the same session from different cities with a shared transport. Playhead, clip edits and fades sync through CRDTs so nobody ever overwrites anyone else's take.",
    role: 'Fullstack · audio',
    slug: 'rideline',
    stack: ['React', 'Node', 'Web Audio API', 'WebRTC', 'CRDTs'],
    tags: 'react · node · webaudio',
    timeline: '6 months · 2023',
    year: '2023',
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
