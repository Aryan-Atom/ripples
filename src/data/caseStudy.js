/** Nehru Garden case study  media resolved through the Supabase asset manifest. */

import { asset, NEHRU_GARDEN_INTRO_VIDEO } from './assets.js'

export const CS_ASSETS = 'Ripples Assets/CaseStudy/NehruGarden'

export function csAsset(file) {
  return asset(`${CS_ASSETS}/${file}`)
}

function wgoaSlide(n) {
  return asset(`Ripples Assets/CaseStudy/WGoa/Section 1/Slideshow${n}.webp`)
}

function wgoaSection2(file) {
  return asset(`Ripples Assets/CaseStudy/WGoa/Section 2/${file}`)
}

export const CASE_STUDY_CHOICES = [
  {
    id: 'nehru-garden',
    to: '/case-study/nehru-garden',
    eyebrow: 'Case Study',
    titleLines: ['A lake garden', 'asks for a', 'Show.'],
    titleEm: 'Show.',
    video: NEHRU_GARDEN_INTRO_VIDEO,
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
    titleLines: ['Every fountain', 'starts as', 'a Line.'],
    titleEm: 'Line.',
    body: 'Before water moves, geometry does. Site surveys, hand sketches, and the first nozzle grid drawn until the idea can carry pressure.',
    bodySecondary:
      'Hydraulics, structure, and show control share one drawing set. What leaves the board is already a machine.',
    note: 'The signed musical fountain layout  nozzle families, pump loads, and jet heights locked before fabrication.',
    labels: [
      'Material Analysis',
      'Hydraulic Design',
      'Pressure Mapping',
      'Flow Simulation',
      'Structural Integrity',
    ],
    images: [
      {
        src: csAsset('design1.webp'),
        title: 'Shop drawing',
        alt: 'Nehru Garden musical fountain shop drawing on the desk',
      },
      {
        src: csAsset('design2.webp'),
        title: 'Section set',
        alt: 'Fountain section drawings on paper and laptop',
      },
      {
        src: csAsset('design3.webp'),
        title: 'Detail sheet',
        alt: 'Technical fountain detail sheet with reference photos',
      },
      {
        src: csAsset('design4.webp'),
        title: 'Arrangement plan',
        alt: 'Fountain and boat feature general arrangement plan',
      },
    ],
  },

  /** Design / engineering copy for Nehru Garden split panel. */
  engineering: {
    act: { id: 'engineering', roman: 'III', label: 'Design' },
    titleLines: ['Drawn until', 'it can Hold.'],
    titleEm: 'Hold.',
    body: 'Hydraulics, structure, and show control share one drawing set. What leaves the board is already a machine.',
    slides: [],
    labels: [],
  },

  fabrication: {
    eyebrow: 'Fabrication',
    titleLines: ['Made under', 'one Roof.'],
    titleEm: 'Roof.',
    body: 'Nozzles, manifolds, and control racks are fabricated in Noida  then tested before they ever leave the floor.',
    items: [
      {
        src: csAsset('fatorycasestudy1.webp'),
        caption: 'Shop floor',
        title: 'Shop floor',
        alt: 'Fabrication shop floor for Nehru Garden fountain components',
      },
      {
        src: csAsset('fatorycasestudy2.webp'),
        caption: 'Assembly',
        title: 'Assembly',
        alt: 'Manifold and nozzle assembly on the Noida fabrication floor',
      },
      {
        src: csAsset('fatorycasestudy3.webp'),
        caption: 'Testing',
        title: 'Testing',
        alt: 'Control rack and fittings tested before leaving the factory',
      },
      {
        src: csAsset('fatorycasestudy4.webp'),
        caption: 'Ready to ship',
        title: 'Ready to ship',
        alt: 'Fabricated fountain components prepared for site delivery',
      },
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
    titleLines: ['Seen before', 'it was Built.'],
    titleEm: 'Built.',
    body: 'Jet pattern and light sequence signed off in simulation  the show agreed before the first header hit the water.',
    poster: csAsset('before-02.webp'),
    modes: [
      { id: 'day', label: 'Day', src: csAsset('day.mp4') },
      { id: 'night', label: 'Night', src: csAsset('night.mp4') },
    ],
  },

  /** Site installation gallery (Before-section pattern) */
  installation: {
    act: { id: 'installation', roman: 'V', label: 'Installation' },
    intro: 'Every nozzle finds its mark. Tolerance is not a slogan  it is the difference between a spray and a show.',
    images: [
      {
        src: csAsset('site1.webp'),
        alt: 'Site installation at Nehru Garden',
      },
      {
        src: csAsset('site2.webp'),
        alt: 'Header and nozzle placement on site',
      },
      {
        src: csAsset('site3.webp'),
        alt: 'Basin works during fountain installation',
      },
      {
        src: csAsset('site4.webp'),
        alt: 'On-site alignment and fitting',
      },
      {
        src: csAsset('site5.webp'),
        alt: 'Installation progress at Nehru Garden',
      },
      {
        src: csAsset('site6.webp'),
        alt: 'Finished site installation at Nehru Garden',
      },
    ],
  },

  result: {
    eyebrow: 'The result',
    titleLines: ['The final', 'Show.'],
    titleEm: 'Show.',
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
    titleLines: ["India's largest", 'Rock pool.'],
    titleEm: 'Rock pool.',
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
        src: wgoaSection2('FromPitToPool.webp'),
        alt: 'Hillside pit at W Goa before the prefabricated pool',
      },
    ],
  },

  design: {
    eyebrow: 'Off-site fabrication',
    titleLines: ['Made to', 'Travel.'],
    titleEm: 'Travel.',
    body: 'Core pool sections were manufactured and tested at real scale in a controlled factory environment to ensure precision, strength, and consistency.',
    note: 'Factory-built modules, signed off in Noida before they ever left the floor.',
    images: [
      {
        src: wgoaSection2('OffSiteFabricated.webp'),
        alt: 'Prefabricated pool shell assembled off-site before transport to W Goa',
      },
    ],
  },

  engineering: {
    act: { id: 'engineering', roman: 'III', label: 'Design' },
    titleLines: ['Drawn until', 'it can Hold.'],
    titleEm: 'Hold.',
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
      {
        src: wgoaSection2('Completion.webp'),
        caption: 'Ready to ship',
        alt: 'Prefabricated pool modules completed and staged for transport to W Goa',
      },
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
    titleLines: ['Seen by day.', 'Seen at Night.'],
    titleEm: 'Night.',
    body: 'Daylight water and night light as the same form  the pool agreed as landscape before the last module locked.',
    poster: wgoaSlide(5),
    modes: [
      { id: 'day', label: 'Day', src: wgoaSlide(5) },
      { id: 'night', label: 'Night', src: wgoaSlide(6) },
    ],
  },

  process: [
    { n: '01', label: 'From pit to pool', href: '#wgoa-pit' },
    { n: '02', label: 'Off-site fabrication', href: '#wgoa-factory' },
    { n: '03', label: 'Transport to site', href: '#wgoa-road' },
    { n: '04', label: 'Structural assembly', href: '#wgoa-assembly' },
    { n: '05', label: 'Completion', href: '#wgoa-result' },
  ],

  assembly: {
    eyebrow: 'Structural assembly',
    titleLines: ['Joined on', 'The hill.'],
    titleEm: 'The hill.',
    body: 'Modules were positioned, aligned, and joined on-site to form the primary structure with engineering-grade accuracy. Zero on-site civil construction  a lighter, safer set on sensitive coastal ground.',
    completion:
      'The pool was fully assembled, tested, and commissioned  delivering a large-scale, durable aquatic structure.',
    frames: [
      {
        src: wgoaSection2('StructuralAssembly.webp'),
        caption: 'On the hill',
        alt: 'Prefabricated pool shell joined on site at W Goa',
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
    poster: wgoaSection2('Final.jpg'),
    image: {
      src: wgoaSection2('Final.jpg'),
      alt: 'Finished rock pool at W Goa, filled and landscaped',
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
