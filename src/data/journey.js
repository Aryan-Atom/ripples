/** Timeline copy for /journey. Media files were removed with the unused Journey folder. */

export const JOURNEY_HERO = {
  label: 'Case Study',
  titleLines: ['35 years of', 'engineering', 'excellence'],
  titleEm: 'excellence',
  lead: 'From the first line on paper to opening night  the evolution of Ripples Engineering, told as it was built.',
}

export const JOURNEY_ACTS = [
  { id: 'foundation', roman: 'I', label: 'Foundation' },
  { id: 'design', roman: 'II', label: 'Design' },
  { id: 'engineering', roman: 'III', label: 'Engineering' },
  { id: 'manufacturing', roman: 'IV', label: 'Manufacturing' },
  { id: 'installation', roman: 'V', label: 'Installation' },
  { id: 'performance', roman: 'VI', label: 'Performance' },
]

export const JOURNEY_BLUEPRINT = {
  act: JOURNEY_ACTS[0],
  titleLines: ['Every fountain', 'starts as', 'a line.'],
  titleEm: 'line.',
  body: 'Before water moves, geometry does. Site surveys, hand sketches, and the first nozzle grid drawn until the idea can carry pressure.',
}

export const JOURNEY_DESIGN = {
  act: JOURNEY_ACTS[1],
  titleLines: ['Drawn until', 'it can hold.'],
  titleEm: 'hold.',
  body: 'Hydraulics, structure, and show control share one drawing set. What leaves the board is already a machine.',
  slides: [],
  labels: [
    { text: 'Material Analysis', x: 12, y: 18 },
    { text: 'Hydraulic Design', x: 68, y: 14 },
    { text: 'Pressure Mapping', x: 78, y: 48 },
    { text: 'Flow Simulation', x: 18, y: 62 },
    { text: 'Structural Integrity', x: 55, y: 78 },
  ],
}

export const JOURNEY_CONSTRUCTION = {
  act: JOURNEY_ACTS[2],
  titleLines: ['Concrete first.', 'Then tile.'],
  titleEm: null,
  body: null,
  images: [],
}

export const JOURNEY_MANUFACTURING = {
  act: JOURNEY_ACTS[3],
  titleLines: ['Made under', 'one roof.'],
  titleEm: 'roof.',
  body: 'Nozzles, manifolds, and control racks are fabricated in Noida  then tested before they ever leave the floor.',
  videos: [],
}

export const JOURNEY_INSTALLATION = {
  act: JOURNEY_ACTS[4],
  title: 'On site',
  lines: ['Precision.', 'Alignment.', 'Execution.'],
  body: 'Every nozzle finds its mark. Tolerance is not a slogan  it is the difference between a spray and a show.',
  video: '',
  poster: '',
}

export const JOURNEY_PERFORMANCE = {
  act: JOURNEY_ACTS[5],
  titleLines: ['When water', 'becomes theatre.'],
  titleEm: 'theatre.',
  body: 'Music, light, and pressure choreographed as one system. The quiet work of thirty-five years, audible for a few minutes each night.',
  day: {
    src: '',
    label: 'Day',
  },
  night: {
    src: '',
    label: 'Night',
  },
}

export const JOURNEY_TIMELINE = [
  { year: '1989', title: 'First Fountain', body: 'Ripples takes root  the first workshops, the first sold systems.' },
  { year: '1994', title: 'Expansion', body: 'Manufacturing capacity grows with architectural water features across India.' },
  { year: '2006', title: '100 Projects', body: 'Control systems and lighting integrate into large public installations.' },
  { year: '2012', title: 'International', body: 'Multimedia shows become a signature  water, music, and light as one.' },
  { year: '2017', title: '500+ Projects', body: 'Design, R&D, fabrication, and commissioning under one Noida roof.' },
  { year: 'Today', title: '2,000+', body: 'Thirty-five years on  still drawing the next line.' },
]

export const JOURNEY_TIMELINE_MEDIA = {
  blueprint: '',
  alt: 'V-Jet control nozzle prototype drawing  fluid dynamics study, c. 1991',
}

export const JOURNEY_STATS = [
  { value: '2,000+', label: 'Global Projects' },
  { value: '150+', label: 'Unique Designs' },
  { value: '30+', label: 'Countries' },
  { value: '36+', label: 'Years' },
]

export const JOURNEY_PHILOSOPHY = {
  label: 'Philosophy',
  title: '35 years of engineering excellence.',
  aside: 'Engineering, exposed.',
  image: {
    src: '',
    alt: 'Stone and structure  engineering, exposed',
  },
}

/** Render title lines with optional italic emphasis on a matching word. */
export function emphasizeLine(line, emWord) {
  if (!emWord || !line.includes(emWord)) return { before: line, em: null, after: '' }
  const idx = line.indexOf(emWord)
  return {
    before: line.slice(0, idx),
    em: emWord,
    after: line.slice(idx + emWord.length),
  }
}
