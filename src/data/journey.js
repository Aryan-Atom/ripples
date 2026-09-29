/** Shared journey/case-study copy helpers and defaults. */

export const JOURNEY_ACTS = [
  { id: 'foundation', roman: 'I', label: 'Foundation' },
  { id: 'design', roman: 'II', label: 'Design' },
  { id: 'engineering', roman: 'III', label: 'Engineering' },
  { id: 'manufacturing', roman: 'IV', label: 'Manufacturing' },
  { id: 'installation', roman: 'V', label: 'Installation' },
  { id: 'performance', roman: 'VI', label: 'Performance' },
]

/** Default MediaReveal shape when a study does not pass engineering data. */
export const JOURNEY_DESIGN = {
  act: JOURNEY_ACTS[1],
  titleLines: ['Drawn until', 'it can Hold.'],
  titleEm: 'Hold.',
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

/** Default ConstructionGallery shape when a study does not pass construction data. */
export const JOURNEY_CONSTRUCTION = {
  act: JOURNEY_ACTS[2],
  titleLines: ['Concrete first.', 'Then tile.'],
  titleEm: null,
  body: null,
  images: [],
}

/** Homepage company timeline. */
export const JOURNEY_TIMELINE = [
  { year: '1989', title: 'First Fountain', body: 'Ripples takes root  the first workshops, the first sold systems.' },
  { year: '1994', title: 'Expansion', body: 'Manufacturing capacity grows with architectural water features across India.' },
  { year: '2006', title: '100 Projects', body: 'Control systems and lighting integrate into large public installations.' },
  { year: '2012', title: 'International', body: 'Multimedia shows become a signature  water, music, and light as one.' },
  { year: '2017', title: '500+ Projects', body: 'Design, R&D, fabrication, and commissioning under one Noida roof.' },
  { year: 'Today', title: '2,400+', body: 'Thirty-seven years on  still drawing the next line.' },
]

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
