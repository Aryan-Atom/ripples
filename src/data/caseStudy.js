/** Nehru Garden case study  media resolved through the Supabase asset manifest. */

import { asset } from './assets.js'

export const CS_ASSETS = 'case-study'

export function csAsset(file) {
  return asset(`${CS_ASSETS}/${file}`)
}

function wgoaSlide(n) {
  return asset(`case-study/W-Goa/Slideshow ${n}.webp`)
}

export const CASE_STUDY_CHOICES = [
  {
    id: 'nehru-garden',
    to: '/case-study/nehru-garden',
    eyebrow: 'Case Study',
    titleLines: ['A lake garden', 'asks for a', 'Show.'],
    titleEm: 'Show.',
    video: csAsset('Intro.mp4'),
    poster: csAsset('before-03.webp'),
    place: 'Nehru Garden, Udaipur',
  },
  {
    id: 'wow-goa',
    to: '/case-study/wow-goa',
    eyebrow: 'Case Study',
    titleLines: ['A coastal night', 'asks for a', 'Show.'],
    titleEm: 'Show.',
    video: '',
    poster: wgoaSlide(1),
    slides: [1, 2, 5, 4, 6, 3].map(wgoaSlide),
    place: 'W-Goa',
  },
]

export const CASE_STUDY = {
  hero: CASE_STUDY_CHOICES[0],

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
    note: 'The signed musical fountain layout  nozzle families, pump loads, and jet heights locked before fabrication.',
    images: [
      {
        src: csAsset('sketch-01.webp'),
        title: 'Site sketch',
        alt: 'Hand-annotated Nehru Garden pool layout sketch',
      },
      {
        src: csAsset('approved-02.webp'),
        title: 'Pool layout 1:100',
        alt: 'Approved Nehru Garden musical fountain layout plan',
      },
      {
        src: csAsset('approved-01.webp'),
        title: 'Hydraulic layout',
        alt: 'Approved hydraulic layout with elevations',
      },
      {
        src: csAsset('final-01.webp'),
        title: 'Basin works',
        alt: 'Section drawings for basin systems',
      },
      {
        src: csAsset('final-02.webp'),
        title: 'Field systems',
        alt: 'Plan and elevation for field jets',
      },
      {
        src: csAsset('final-03.webp'),
        title: 'Assembly',
        alt: 'Assembly and detailing sheet',
      },
    ],
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

/** W Goa prefabricated rock pool  same chapter shape as Nehru Garden. */
export const WOW_GOA_STUDY = {
  hero: CASE_STUDY_CHOICES[1],

  brief: {
    eyebrow: 'The brief',
    titleLines: ["India's largest", 'rock pool.'],
    titleEm: 'rock pool.',
    body: 'How it was built  a modular engineering case study in scale, precision, and execution.',
    image: {
      src: wgoaSlide(1),
      alt: 'Night aerial of the finished rock pool at W Goa',
    },
  },

  before: {
    eyebrow: 'From pit to pool',
    intro:
      'An existing hillside pit was carefully assessed and prepared to accommodate a large-scale prefabricated pool system, aligned to the site’s natural form and structural constraints.',
    images: [
      {
        src: wgoaSlide(3),
        alt: 'Hillside pit at W Goa before the prefabricated pool',
      },
    ],
  },

  design: {
    eyebrow: 'Off-site fabrication',
    titleLines: ['Made to', 'travel.'],
    titleEm: 'travel.',
    body: 'Core pool sections were manufactured and tested at real scale in a controlled factory environment to ensure precision, strength, and consistency.',
    note: 'Factory-built modules, signed off in Noida before they ever left the floor.',
    images: [
      {
        src: wgoaSlide(5),
        title: 'Daylight form',
        alt: 'Finished W Goa rock pool in daylight above the beach',
      },
      {
        src: wgoaSlide(2),
        title: 'Evening set',
        alt: 'W Goa rock pool at dusk with the coastal bar',
      },
    ],
  },

  engineering: {
    act: { id: 'engineering', roman: 'III', label: 'Design' },
    titleLines: ['Drawn until', 'it can hold.'],
    titleEm: 'hold.',
    body: 'Modular geometry, joints, and coastal loads share one drawing set. What leaves the board is already a machine  thirty-two modules ready for the road to Goa.',
    slides: [
      {
        src: wgoaSlide(3),
        type: 'image',
        alt: 'Hillside pit prepared for the prefabricated pool',
      },
      {
        src: wgoaSlide(5),
        type: 'image',
        alt: 'Finished W Goa rock pool in daylight',
      },
      {
        src: wgoaSlide(1),
        type: 'image',
        alt: 'Night aerial of the finished W Goa rock pool',
      },
    ],
    labels: [
      { text: 'Modular Analysis', x: 12, y: 18 },
      { text: 'Factory Test', x: 68, y: 14 },
      { text: 'Joint Mapping', x: 78, y: 48 },
      { text: 'Transport Plan', x: 18, y: 62 },
      { text: 'Structural Integrity', x: 55, y: 78 },
    ],
  },

  fabrication: {
    eyebrow: 'Transport to site',
    titleLines: ['By road.', 'To Goa.'],
    titleEm: 'Goa.',
    body: 'The structure was divided into 32 prefabricated modules and transported by road from Delhi NCR to Goa for secure, phase-wise handling.',
    items: [
      { src: wgoaSlide(3), caption: 'Site set', alt: 'Hillside pit before the modules arrived' },
      { src: wgoaSlide(5), caption: 'Daylight form', alt: 'Finished pool in daylight' },
      { src: wgoaSlide(2), caption: 'Evening set', alt: 'Pool and bar at dusk' },
      { src: wgoaSlide(1), caption: 'Night form', alt: 'Night aerial of the finished pool' },
    ],
  },

  construction: {
    act: { id: 'construction', roman: 'II', label: 'Engineering' },
    titleLines: ['Modules first.', 'Then rock.'],
    titleEm: null,
    body: null,
    images: [
      { src: wgoaSlide(3), alt: 'Hillside pit before the prefabricated pool' },
      { src: wgoaSlide(5), alt: 'Finished rock pool in daylight' },
      { src: wgoaSlide(4), alt: 'Finished rock pool at dusk, facing the sea' },
      { src: wgoaSlide(1), alt: 'Night aerial of the finished rock pool' },
    ],
  },

  visualization: {
    eyebrow: 'Day and night',
    titleLines: ['Seen by day.', 'Seen at night.'],
    titleEm: 'night.',
    body: 'Daylight water and night light as the same form  the pool agreed as landscape before the last module locked.',
    poster: wgoaSlide(5),
    modes: [
      { id: 'day', label: 'Day', src: wgoaSlide(5) },
      { id: 'night', label: 'Night', src: wgoaSlide(1) },
    ],
  },

  process: [
    { n: '01', label: 'Pit', href: '#wgoa-pit' },
    { n: '02', label: 'Factory', href: '#wgoa-factory' },
    { n: '03', label: 'Road', href: '#wgoa-road' },
    { n: '04', label: 'Assembly', href: '#wgoa-assembly' },
    { n: '05', label: 'Water', href: '#wgoa-compare' },
  ],

  assembly: {
    eyebrow: 'Structural assembly',
    titleLines: ['Joined on', 'the hill.'],
    titleEm: 'the hill.',
    body: 'Modules were positioned, aligned, and joined on-site to form the primary structure with engineering-grade accuracy. Zero on-site civil construction  a lighter, safer set on sensitive coastal ground.',
    completion:
      'The pool was fully assembled, tested, and commissioned  delivering a large-scale, durable aquatic structure.',
    frames: [
      {
        src: wgoaSlide(3),
        caption: 'The pit',
        alt: 'Hillside pit before the prefabricated pool',
      },
      {
        src: wgoaSlide(5),
        caption: 'Daylight water',
        alt: 'Finished rock pool in daylight',
      },
      {
        src: wgoaSlide(4),
        caption: 'Dusk',
        alt: 'Finished rock pool at dusk, facing the sea',
      },
      {
        src: wgoaSlide(6),
        caption: 'Night water',
        alt: 'Night view of the illuminated rock pool',
      },
    ],
  },

  installation: {
    act: { id: 'installation', roman: 'V', label: 'Installation' },
    title: 'On site',
    lines: ['Precision.', 'Alignment.', 'Execution.'],
    body: 'Modules were positioned, aligned, and joined on-site to form the primary structure with engineering-grade accuracy. Zero on-site civil construction  a lighter, safer set on sensitive coastal ground.',
    video: '',
    poster: wgoaSlide(4),
  },

  result: {
    eyebrow: 'The result',
    titleLines: ['Rock pool,', 'W Goa.'],
    titleEm: 'W Goa.',
    video: '',
    poster: wgoaSlide(2),
    image: {
      src: wgoaSlide(4),
      alt: 'Finished W Goa rock pool at dusk, facing the sea',
    },
    outcomes: [
      'Zero on-site civil construction',
      'Faster build timelines through prefabrication',
      'Safer, scalable on-site execution',
      'Lightweight modular structure suited for sensitive coastal terrain',
      'Factory-built components reduced site impact and compliance risk',
      'An engineered solution aligned with environmental and regulatory constraints',
    ],
  },

  cta: {
    eyebrow: 'Next',
    title: 'Have a lake, lobby, or plaza in mind?',
    primary: { label: 'Start a project', to: '/contact' },
  },
}

export function getCaseStudy(slug) {
  if (slug === 'wow-goa') return WOW_GOA_STUDY
  return CASE_STUDY
}
