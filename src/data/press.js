/**
 * Press / media clippings  images from legacy ripplesfountains.com press archive.
 * thumbnail: card image. fullImage: lightbox scan.
 */

export const PRESS_PUBLICATIONS = [
  {
    "id": "amar-ujala",
    "name": "Amar Ujala",
    "short": "Amar Ujala"
  },
  {
    "id": "regional",
    "name": "Press",
    "short": "Press"
  },
  {
    "id": "dainik",
    "name": "Dainik Jagaran",
    "short": "Dainik Jagaran"
  },
  {
    "id": "hindustan",
    "name": "Hindustan",
    "short": "Hindustan"
  },
  {
    "id": "project",
    "name": "Project coverage",
    "short": "Project coverage"
  },
  {
    "id": "toi",
    "name": "The Times of India",
    "short": "Times of India"
  },
  {
    "id": "archive",
    "name": "Press archive",
    "short": "Press archive"
  }
]

/** Wordmark paths for the “As featured in” strip */
export const PRESS_LOGOS = [
  {
    "publicationId": "toi",
    "src": "/press/logos/times-of-india.svg",
    "alt": "The Times of India"
  },
  {
    "publicationId": "hindu",
    "src": "/press/logos/the-hindu.svg",
    "alt": "The Hindu"
  },
  {
    "publicationId": "et",
    "src": "/press/logos/economic-times.svg",
    "alt": "The Economic Times"
  },
  {
    "publicationId": "hindustan",
    "src": "/press/logos/hindustan.svg",
    "alt": "Hindustan"
  },
  {
    "publicationId": "navbharat",
    "src": "/press/logos/navbharat.svg",
    "alt": "Navbharat"
  }
]

/**
 * @typedef {{
 *   id: string,
 *   publication: string,
 *   publicationId: string,
 *   headline: string,
 *   date: string,
 *   year: number,
 *   thumbnail: string,
 *   fullImage: string,
 *   alt: string,
 *   featured?: boolean,
 * }} PressClipping
 */

/** @type {PressClipping[]} */
export const PRESS_CLIPPINGS = [
  {
    "id": "press-01-01-amar-ujala-my-city",
    "publication": "Amar Ujala",
    "publicationId": "amar-ujala",
    "headline": "Amar Ujala My City",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/01-amar-ujala-my-city.jpg",
    "fullImage": "/press/clippings/01-amar-ujala-my-city.jpg",
    "alt": "Amar Ujala  Amar Ujala My City",
    "featured": true
  },
  {
    "id": "press-02-02-amar-ujala",
    "publication": "Amar Ujala",
    "publicationId": "amar-ujala",
    "headline": "Amar Ujala",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/02-amar-ujala.jpg",
    "fullImage": "/press/clippings/02-amar-ujala.jpg",
    "alt": "Amar Ujala  Amar Ujala",
    "featured": true
  },
  {
    "id": "press-03-03-bhopal-1",
    "publication": "Regional press",
    "publicationId": "regional",
    "headline": "Bhopal 1",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/03-bhopal-1.jpg",
    "fullImage": "/press/clippings/03-bhopal-1.jpg",
    "alt": "Regional press  Bhopal 1",
    "featured": false
  },
  {
    "id": "press-04-04-bhopal-3",
    "publication": "Regional press",
    "publicationId": "regional",
    "headline": "Bhopal 3",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/04-bhopal-3.jpeg",
    "fullImage": "/press/clippings/04-bhopal-3.jpeg",
    "alt": "Regional press  Bhopal 3",
    "featured": false
  },
  {
    "id": "press-05-05-bhopal-4",
    "publication": "Regional press",
    "publicationId": "regional",
    "headline": "Bhopal 4",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/05-bhopal-4.jpg",
    "fullImage": "/press/clippings/05-bhopal-4.jpg",
    "alt": "Regional press  Bhopal 4",
    "featured": false
  },
  {
    "id": "press-06-06-bhopal-5",
    "publication": "Regional press",
    "publicationId": "regional",
    "headline": "Bhopal 5",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/06-bhopal-5.jpg",
    "fullImage": "/press/clippings/06-bhopal-5.jpg",
    "alt": "Regional press  Bhopal 5",
    "featured": false
  },
  {
    "id": "press-07-07-bhopal-6",
    "publication": "Regional press",
    "publicationId": "regional",
    "headline": "Bhopal 6",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/07-bhopal-6.jpg",
    "fullImage": "/press/clippings/07-bhopal-6.jpg",
    "alt": "Regional press  Bhopal 6",
    "featured": false
  },
  {
    "id": "press-08-08-dainik-jagaran",
    "publication": "Dainik Jagaran",
    "publicationId": "dainik",
    "headline": "Dainik Jagaran",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/08-dainik-jagaran.jpg",
    "fullImage": "/press/clippings/08-dainik-jagaran.jpg",
    "alt": "Dainik Jagaran  Dainik Jagaran",
    "featured": true
  },
  {
    "id": "press-09-09-hindustan",
    "publication": "Hindustan",
    "publicationId": "hindustan",
    "headline": "Hindustan",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/09-hindustan.jpg",
    "fullImage": "/press/clippings/09-hindustan.jpg",
    "alt": "Hindustan  Hindustan",
    "featured": true
  },
  {
    "id": "press-10-10-jusco-2",
    "publication": "Project coverage",
    "publicationId": "project",
    "headline": "Jusco 2",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/10-jusco-2.jpg",
    "fullImage": "/press/clippings/10-jusco-2.jpg",
    "alt": "Project coverage  Jusco 2",
    "featured": false
  },
  {
    "id": "press-11-11-jusco-3",
    "publication": "Project coverage",
    "publicationId": "project",
    "headline": "Jusco 3",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/11-jusco-3.jpg",
    "fullImage": "/press/clippings/11-jusco-3.jpg",
    "alt": "Project coverage  Jusco 3",
    "featured": false
  },
  {
    "id": "press-12-12-raipur-1",
    "publication": "Regional press",
    "publicationId": "regional",
    "headline": "Raipur 1",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/12-raipur-1.jpg",
    "fullImage": "/press/clippings/12-raipur-1.jpg",
    "alt": "Regional press  Raipur 1",
    "featured": false
  },
  {
    "id": "press-13-13-raipur-2",
    "publication": "Regional press",
    "publicationId": "regional",
    "headline": "Raipur 2",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/13-raipur-2.jpg",
    "fullImage": "/press/clippings/13-raipur-2.jpg",
    "alt": "Regional press  Raipur 2",
    "featured": false
  },
  {
    "id": "press-14-14-ripples-in-news",
    "publication": "Press",
    "publicationId": "regional",
    "headline": "Ripples In News",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/14-ripples-in-news.jpg",
    "fullImage": "/press/clippings/14-ripples-in-news.jpg",
    "alt": "Press  Ripples In News",
    "featured": false
  },
  {
    "id": "press-15-15-sail-1",
    "publication": "Project coverage",
    "publicationId": "project",
    "headline": "Sail 1",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/15-sail-1.jpg",
    "fullImage": "/press/clippings/15-sail-1.jpg",
    "alt": "Project coverage  Sail 1",
    "featured": false
  },
  {
    "id": "press-16-16-sail-2",
    "publication": "Project coverage",
    "publicationId": "project",
    "headline": "Sail 2",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/16-sail-2.jpg",
    "fullImage": "/press/clippings/16-sail-2.jpg",
    "alt": "Project coverage  Sail 2",
    "featured": false
  },
  {
    "id": "press-17-17-sail",
    "publication": "Project coverage",
    "publicationId": "project",
    "headline": "Sail",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/17-sail.jpg",
    "fullImage": "/press/clippings/17-sail.jpg",
    "alt": "Project coverage  Sail",
    "featured": false
  },
  {
    "id": "press-18-18-times-of-india-front-page",
    "publication": "The Times of India",
    "publicationId": "toi",
    "headline": "Times Of India Front Page",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/18-times-of-india-front-page.jpg",
    "fullImage": "/press/clippings/18-times-of-india-front-page.jpg",
    "alt": "The Times of India  Times Of India Front Page",
    "featured": true
  },
  {
    "id": "press-19-19-times-of-india-page-2",
    "publication": "The Times of India",
    "publicationId": "toi",
    "headline": "Times Of India Page 2",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/19-times-of-india-page-2.jpg",
    "fullImage": "/press/clippings/19-times-of-india-page-2.jpg",
    "alt": "The Times of India  Times Of India Page 2",
    "featured": true
  },
  {
    "id": "press-20-20-scan-1",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 1",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/20-scan-1.jpg",
    "fullImage": "/press/clippings/20-scan-1.jpg",
    "alt": "Press archive  Press Scan 1",
    "featured": false
  },
  {
    "id": "press-21-21-scan-2",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 2",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/21-scan-2.jpg",
    "fullImage": "/press/clippings/21-scan-2.jpg",
    "alt": "Press archive  Press Scan 2",
    "featured": false
  },
  {
    "id": "press-22-22-scan-3",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 3",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/22-scan-3.jpg",
    "fullImage": "/press/clippings/22-scan-3.jpg",
    "alt": "Press archive  Press Scan 3",
    "featured": false
  },
  {
    "id": "press-23-23-scan-4",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 4",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/23-scan-4.jpg",
    "fullImage": "/press/clippings/23-scan-4.jpg",
    "alt": "Press archive  Press Scan 4",
    "featured": false
  },
  {
    "id": "press-24-24-scan-5",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 5",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/24-scan-5.jpg",
    "fullImage": "/press/clippings/24-scan-5.jpg",
    "alt": "Press archive  Press Scan 5",
    "featured": false
  },
  {
    "id": "press-25-25-scan-6",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 6",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/25-scan-6.jpg",
    "fullImage": "/press/clippings/25-scan-6.jpg",
    "alt": "Press archive  Press Scan 6",
    "featured": false
  },
  {
    "id": "press-26-26-scan-7",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 7",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/26-scan-7.jpg",
    "fullImage": "/press/clippings/26-scan-7.jpg",
    "alt": "Press archive  Press Scan 7",
    "featured": false
  },
  {
    "id": "press-27-27-scan-8",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 8",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/27-scan-8.jpg",
    "fullImage": "/press/clippings/27-scan-8.jpg",
    "alt": "Press archive  Press Scan 8",
    "featured": false
  },
  {
    "id": "press-28-28-scan-10",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 10",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/28-scan-10.jpg",
    "fullImage": "/press/clippings/28-scan-10.jpg",
    "alt": "Press archive  Press Scan 10",
    "featured": false
  },
  {
    "id": "press-29-29-scan-11",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 11",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/29-scan-11.jpg",
    "fullImage": "/press/clippings/29-scan-11.jpg",
    "alt": "Press archive  Press Scan 11",
    "featured": false
  },
  {
    "id": "press-30-30-scan-12",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 12",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/30-scan-12.jpg",
    "fullImage": "/press/clippings/30-scan-12.jpg",
    "alt": "Press archive  Press Scan 12",
    "featured": false
  },
  {
    "id": "press-31-31-scan-13",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 13",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/31-scan-13.jpg",
    "fullImage": "/press/clippings/31-scan-13.jpg",
    "alt": "Press archive  Press Scan 13",
    "featured": false
  },
  {
    "id": "press-32-32-scan-14",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 14",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/32-scan-14.jpg",
    "fullImage": "/press/clippings/32-scan-14.jpg",
    "alt": "Press archive  Press Scan 14",
    "featured": false
  },
  {
    "id": "press-33-33-scan-15",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 15",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/33-scan-15.jpg",
    "fullImage": "/press/clippings/33-scan-15.jpg",
    "alt": "Press archive  Press Scan 15",
    "featured": false
  },
  {
    "id": "press-34-34-scan-16",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 16",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/34-scan-16.jpg",
    "fullImage": "/press/clippings/34-scan-16.jpg",
    "alt": "Press archive  Press Scan 16",
    "featured": false
  },
  {
    "id": "press-35-35-scan-17",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 17",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/35-scan-17.jpg",
    "fullImage": "/press/clippings/35-scan-17.jpg",
    "alt": "Press archive  Press Scan 17",
    "featured": false
  },
  {
    "id": "press-36-36-scan-18",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 18",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/36-scan-18.jpg",
    "fullImage": "/press/clippings/36-scan-18.jpg",
    "alt": "Press archive  Press Scan 18",
    "featured": false
  },
  {
    "id": "press-37-37-scan-21",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 21",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/37-scan-21.jpg",
    "fullImage": "/press/clippings/37-scan-21.jpg",
    "alt": "Press archive  Press Scan 21",
    "featured": false
  },
  {
    "id": "press-38-38-scan-22",
    "publication": "Press archive",
    "publicationId": "archive",
    "headline": "Press Scan 22",
    "date": "",
    "year": 0,
    "thumbnail": "/press/clippings/38-scan-22.jpg",
    "fullImage": "/press/clippings/38-scan-22.jpg",
    "alt": "Press archive  Press Scan 22",
    "featured": false
  }
]

export const FEATURED_PRESS = PRESS_CLIPPINGS.filter((c) => c.featured).slice(0, 6)

export const PRESS_YEARS = [...new Set(PRESS_CLIPPINGS.map((c) => c.year).filter(Boolean))].sort(
  (a, b) => b - a,
)
