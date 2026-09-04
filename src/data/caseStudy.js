/** Nehru Garden case study  media resolved through the Supabase asset manifest. */

import { asset } from './assets.js'

export const CS_ASSETS = 'case-study'

export function csAsset(file) {
  return asset(`${CS_ASSETS}/${file}`)
}

export const CASE_STUDY = {
  hero: {
    eyebrow: 'Case Study',
    titleLines: ['A lake garden', 'asks for a', 'show.'],
    titleEm: 'show.',
    video: csAsset('Intro.mp4'),
    poster: csAsset('before-03.webp'),
    place: 'Nehru Garden, Udaipur',
  },

  brief: {
    eyebrow: 'The brief',
    titleLines: ['Open water.', 'Heritage ground.'],
    titleEm: null,
    body: 'The ask was a musical fountain for Nehru Garden on the lake edge in Udaipur  open water, wind exposure, and a heritage garden setting that could not read as a theme-park insert. The system had to hold the view by day and carry a night show without fighting the landscape.',
    image: {
      src: csAsset('before-02.webp'),
      alt: 'Nehru Garden approach and empty basin before fountain works',
    },
  },

  before: {
    eyebrow: 'Before',
    intro: 'The basin and garden as found  before nozzles, headers, or night lighting.',
    images: [
      {
        src: csAsset('before-01.webp'),
        alt: 'Linear tiled basin looking toward the lake pavilion',
      },
      {
        src: csAsset('before-02.webp'),
        alt: 'Garden path and empty channel under palm rows',
      },
      {
        src: csAsset('before-04.webp'),
        alt: 'Site context before fountain installation',
      },
    ],
  },

  design: {
    eyebrow: 'The design',
    titleLines: ['Every fountain', 'starts as', 'a line.'],
    titleEm: 'line.',
    body: 'Before water moves, geometry does. Site surveys, hand sketches, and the first nozzle grid drawn until the idea can carry pressure.',
    image: {
      src: csAsset('sketch-01.webp'),
      alt: 'Hand-annotated Nehru Garden pool layout sketch',
    },
  },

  drawing: {
    eyebrow: 'Approved drawing',
    titleLines: ['Pool layout', '1:100'],
    titleEm: '1:100',
    body: 'The signed musical fountain layout  nozzle families, pump loads, and jet heights locked before fabrication.',
    image: {
      src: csAsset('approved-02.webp'),
      alt: 'Approved Nehru Garden musical fountain layout plan',
    },
  },

  /** Kept engineering overlay  MediaReveal / JOURNEY_DESIGN shape */
  engineering: {
    act: { id: 'engineering', roman: 'III', label: 'Design' },
    titleLines: ['Drawn until', 'it can hold.'],
    titleEm: 'hold.',
    body: 'Hydraulics, structure, and show control share one drawing set. What leaves the board is already a machine.',
    slides: [
      {
        src: csAsset('before-03.webp'),
        type: 'image',
        alt: 'Tiled circular basin during engineering review',
      },
      {
        src: csAsset('final-01.webp'),
        type: 'image',
        alt: 'Musical fountain section and effect references',
      },
      {
        src: csAsset('approved-01.webp'),
        type: 'image',
        alt: 'Approved hydraulic layout with elevations',
      },
    ],
    labels: [
      { text: 'Material Analysis', x: 12, y: 18 },
      { text: 'Hydraulic Design', x: 68, y: 14 },
      { text: 'Pressure Mapping', x: 78, y: 48 },
      { text: 'Flow Simulation', x: 18, y: 62 },
      { text: 'Structural Integrity', x: 55, y: 78 },
    ],
  },

  fabrication: {
    eyebrow: 'Fabrication',
    titleLines: ['Made under', 'one roof.'],
    titleEm: 'roof.',
    body: 'Nozzles, manifolds, and control racks are fabricated in Noida  then tested before they ever leave the floor.',
    items: [
      { src: csAsset('final-01.webp'), caption: 'Basin Works', alt: 'Section drawings for basin systems' },
      { src: csAsset('final-02.webp'), caption: 'Field Systems', alt: 'Plan and elevation for field jets' },
      { src: csAsset('final-03.webp'), caption: 'Assembly', alt: 'Assembly and detailing sheet' },
      { src: csAsset('final-04.webp'), caption: 'Commissioning Prep', alt: 'Commissioning reference drawing' },
    ],
  },

  /** Kept construction collage */
  construction: {
    act: { id: 'construction', roman: 'II', label: 'Engineering' },
    titleLines: ['Concrete first.', 'Then tile.'],
    titleEm: null,
    body: null,
    images: [
      { src: csAsset('before-01.webp'), alt: 'Basin channel before finishes' },
      { src: csAsset('before-02.webp'), alt: 'Garden approach during site works' },
      { src: csAsset('before-03.webp'), alt: 'Circular tiled basin shell' },
      { src: csAsset('before-04.webp'), alt: 'Site works at Nehru Garden' },
    ],
  },

  visualization: {
    eyebrow: 'Visualization',
    titleLines: ['Seen before', 'it was built.'],
    titleEm: 'built.',
    body: 'Jet pattern and light sequence signed off in simulation  the show agreed before the first header hit the water.',
    poster: csAsset('before-02.webp'),
    modes: [
      { id: 'day', label: 'Day', src: csAsset('day.mp4') },
      { id: 'night', label: 'Night', src: csAsset('night.mp4') },
    ],
  },

  /** Kept installation / Precision chapter */
  installation: {
    act: { id: 'installation', roman: 'V', label: 'Installation' },
    title: 'On site',
    lines: ['Precision.', 'Alignment.', 'Execution.'],
    body: 'Every nozzle finds its mark. Tolerance is not a slogan  it is the difference between a spray and a show.',
    video: csAsset('installation.mp4'),
    poster: csAsset('before-03.webp'),
  },

  result: {
    eyebrow: 'The result',
    titleLines: ['The final', 'show.'],
    titleEm: 'show.',
    video: csAsset('final_video.mp4'),
    poster: csAsset('before-03.webp'),
  },

  cta: {
    eyebrow: 'Next',
    title: 'Have a lake, lobby, or plaza in mind?',
    primary: { label: 'Start a project', to: '/contact' },
  },
}
