/** Shared journey/case-study copy helpers and defaults. */

export const JOURNEY_ACTS = [
  { id: 'foundation', roman: 'I', label: 'Foundation' },
  { id: 'design', roman: 'II', label: 'Design' },
  { id: 'engineering', roman: 'III', label: 'Engineering' },
  { id: 'manufacturing', roman: 'IV', label: 'Manufacturing' },
  { id: 'installation', roman: 'V', label: 'Installation' },
  { id: 'performance', roman: 'VI', label: 'Performance' },
]

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
  {
    year: '1989',
    title: 'First Fountain',
    body: 'Ripples launched as the first company in India to offer indoor fountains.',
  },
  {
    year: '1994',
    title: 'Architectural',
    body: 'Entered the field of architectural fountains, revolutionizing the outdoor fountains business by using submersible pumps for large installations.',
  },
  {
    year: '2006',
    title: 'Swimming Pools',
    body: 'Ventured into the business of swimming pools and related features.',
  },
  {
    year: '2012',
    title: 'Showroom & SGRP',
    body: "Opened a showroom in New Delhi, introduced SGRP, and designed 'Rockpool' for W. Goa.",
  },
  {
    year: '2017',
    title: 'Musical Fountain',
    body: 'Designed the Bhopal musical fountain and revolutionized the world of entertainment with water, light & sound.',
  },
  {
    year: '2019',
    title: 'Public Shows',
    body: 'Executed various Musical Fountains & Public Multimedia Shows since 2017 including floating musical fountain at Raipur and Central Park fountain at Connaught Place, New Delhi.',
  },
  {
    year: '2022',
    title: 'Brand Transformation',
    body: 'Brand transformation with focus on Multimedia Fountain Shows.',
  },
  {
    year: 'Today',
    title: '2,400+',
    body: 'Thirty-seven years on  still drawing the next line.',
  },
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
