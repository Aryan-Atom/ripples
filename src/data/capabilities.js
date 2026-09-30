/** Legacy capability pages  structure & photos from ripplesfountains.com archives. */

import { withRemoteAssets } from './assets.js'
import { getWaterworksCategoryPage } from './waterworksCategories.js'

/** Footer Explore column  WaterWorks category pages */
export const FOOTER_EXPLORE_LINKS = [
  {
    "label": "Multimedia",
    "to": "/waterworks/multimedia"
  },
  {
    "label": "Architectural",
    "to": "/waterworks/architectural"
  },
  {
    "label": "Prefabs",
    "to": "/waterworks/prefabs"
  },
  {
    "label": "Others",
    "to": "/waterworks/others"
  }
]

/** Footer / top-level Capabilities only */
export const CAPABILITY_LINKS = [
  {
    "label": "WaterWorks",
    "to": "/waterworks"
  },
  {
    "label": "Prefab Water Features",
    "to": "/waterworks/prefabs"
  }
]

/** Nested under Water Features (not in footer Capabilities) */
export const WATER_FEATURE_CATEGORIES = [
  {
    "label": "Architectural Fountains",
    "to": "/waterworks/architectural",
    "slug": "architectural-fountains"
  },
  {
    "label": "Floating Fountains",
    "to": "/waterworks/others#floating-fountains",
    "slug": "floating-fountains"
  },
  {
    "label": "Programmable Fountains",
    "to": "/waterworks/others#programmable-fountains",
    "slug": "programmable-fountains"
  },
  {
    "label": "Swimming Pools",
    "to": "/waterworks/others#swimming-pools",
    "slug": "swimming-pools"
  },
  {
    "label": "Kids Play Areas",
    "to": "/waterworks/others#kids-play",
    "slug": "kids-play-areas"
  }
]

/** All routable capability paths (top-level + water-feature categories) */
export const CAPABILITY_ROUTES = [
  {
    "label": "Water Features",
    "to": "/water-features"
  },
  {
    "label": "Prefab Water Features",
    "to": "/prefab-water-features"
  },
  {
    "label": "Architectural Fountains",
    "to": "/architectural-fountains"
  },
  {
    "label": "Floating Fountains",
    "to": "/floating-fountains"
  },
  {
    "label": "Programmable Fountains",
    "to": "/programmable-fountains"
  },
  {
    "label": "Swimming Pools",
    "to": "/swimming-pools"
  },
  {
    "label": "Kids Play Areas",
    "to": "/kids-play-areas"
  }
]

export const CAPABILITY_PAGES = withRemoteAssets([
  {
    "slug": "water-features",
    "label": "Water Features",
    "eyebrow": "Capabilities  Water",
    "titleBefore": "Water that",
    "titleEm": "Belongs",
    "lead": "Architectural fountains, floating systems, programmable jets, pools, and play  designed, engineered, and manufactured under one roof since 1989.",
    "body": "Every system begins as a site-specific composition. We shape hydraulics, lighting, and control so the water reads as architecture  then build the hardware ourselves so it performs for decades.",
    "gallery": []
  },
  {
    "slug": "architectural-fountains",
    "label": "Architectural",
    "eyebrow": "WaterWorks  Architectural",
    "titleBefore": "Fountains as",
    "titleEm": "Architecture",
    "lead": "Site-specific architectural fountains  basins, nozzles, and light composed for plazas, campuses, and civic destinations.",
    "body": "Form follows hydraulics. We design the silhouette and engineer the system so the water holds its line in wind, heat, and daily use  built in our workshop, installed as architecture.",
    "gallery": [
      {
        "title": "Aarohan, Gurgaon",
        "src": "/assets/architectural/aarohan-gurgaon.webp"
      },
      {
        "title": "Abu Dhabi Airport",
        "src": "/assets/architectural/abu-dhabi-airport.webp"
      },
      {
        "title": "Adani Power Plant, Mundra",
        "src": "/assets/architectural/adani-power-plant-mundra.webp"
      },
      {
        "title": "Aditya World City, Noida",
        "src": "/assets/architectural/aditya-world-city-noida.webp"
      },
      {
        "title": "Al Barari, Dubai",
        "src": "/assets/architectural/Al Barari - Dubai.webp"
      },
      {
        "title": "Al Barshah Mall, Dubai",
        "src": "/assets/architectural/Al Barshah Mall, Dubai.webp"
      },
      {
        "title": "Al Bawadi, Dubai",
        "src": "/assets/architectural/Al Bawadi - Dubai.webp"
      },
      {
        "title": "Ansal Township, Lucknow",
        "src": "/assets/architectural/ansal-township-lucknow.webp"
      },
      {
        "title": "APRA Builders",
        "src": "/assets/architectural/apra-builders.webp"
      },
      {
        "title": "ARA Farm",
        "src": "/assets/architectural/ARA FARM (1).webp"
      },
      {
        "title": "Artgate, Dubai",
        "src": "/assets/architectural/Artgate, Dubai.webp"
      },
      {
        "title": "Asiana Hotel, Dubai",
        "src": "/assets/architectural/asiana-hotel-dubai.webp"
      },
      {
        "title": "Bawadi Mall, Al Ain",
        "src": "/assets/architectural/Bawadi Mall - Al Ain.webp"
      },
      {
        "title": "Bharti Airtel H.O., Vasant Kunj",
        "src": "/assets/architectural/Bharti Airtel H.O. V.Kunj Gurgaon.webp"
      },
      {
        "title": "Bombay Dyeing",
        "src": "/assets/architectural/bombay-dying.webp"
      },
      {
        "title": "Centre Point, Mumbai",
        "src": "/assets/architectural/Centre Point (Penninsula Land) Mumbai.webp"
      },
      {
        "title": "Club Florence, Gurgaon",
        "src": "/assets/architectural/Club Florence Gurgaon.webp"
      },
      {
        "title": "Country Inn & Suites",
        "src": "/assets/architectural/country-inn-and-suites.webp"
      },
      {
        "title": "Cross River Mall, Noida",
        "src": "/assets/architectural/Cross River Mall Noida.webp"
      },
      {
        "title": "Crowne Plaza Rohini",
        "src": "/assets/architectural/crowne-plaza-rohini.webp"
      },
      {
        "title": "Delhi Metro Bhawan",
        "src": "/assets/architectural/Delhi Metro Bhawan.webp"
      },
      {
        "title": "Desert Palm Resort, Dubai",
        "src": "/assets/architectural/Desert Palm Resort - Dubai.webp"
      },
      {
        "title": "Dharampal Satyapal, Noida",
        "src": "/assets/architectural/Dharampal Satyapal Noida.webp"
      },
      {
        "title": "DLF Alameda, Gurgaon",
        "src": "/assets/architectural/DLF Alameda Gurgaon.webp"
      },
      {
        "title": "DLF Princeton",
        "src": "/assets/architectural/dlf-prinston.webp"
      },
      {
        "title": "Educomp, Gurgaon",
        "src": "/assets/architectural/Educomp Sl. Gurgaon (4).webp"
      },
      {
        "title": "Emaar Jaipur Green",
        "src": "/assets/architectural/Emaar Jaipur Green.webp"
      },
      {
        "title": "Emporio Mall, New Delhi",
        "src": "/assets/architectural/Emporio Mall N Delhi.webp"
      },
      {
        "title": "Essel Tower",
        "src": "/assets/architectural/Essel Tower - Outside.webp"
      },
      {
        "title": "F1 Track, Greater Noida",
        "src": "/assets/architectural/F1 Track G Noida.webp"
      },
      {
        "title": "Fortis, Gurgaon",
        "src": "/assets/architectural/fortis-gurgaon.webp"
      },
      {
        "title": "Gantooth, Dubai",
        "src": "/assets/architectural/Gantooth Dubai.webp"
      },
      {
        "title": "Golf Park",
        "src": "/assets/architectural/golf-park.webp"
      },
      {
        "title": "Harsha, Dubai",
        "src": "/assets/architectural/harsha-dubai-1.webp"
      },
      {
        "title": "Hotel Hometel, Mumbai",
        "src": "/assets/architectural/Hotel Hometel Mumbai.webp"
      },
      {
        "title": "Hotel Viceroy, Hyderabad",
        "src": "/assets/architectural/Hotel Viceroy Hyderabad.webp"
      },
      {
        "title": "Radisson SAS, Dubai",
        "src": "/assets/architectural/hotel-radisson-sas-dubai.webp"
      },
      {
        "title": "Hyatt Hyderabad",
        "src": "/assets/architectural/hyatt-hyderabad.webp"
      },
      {
        "title": "IBC Tech Park, Bangalore",
        "src": "/assets/architectural/IBC Tech Park Bangalore.webp"
      },
      {
        "title": "Indus Valley",
        "src": "/assets/architectural/Indus Valley.webp"
      },
      {
        "title": "INS Karamba",
        "src": "/assets/architectural/ins-karamba.webp"
      },
      {
        "title": "IOCL Panipat",
        "src": "/assets/architectural/iocl-panipat.webp"
      },
      {
        "title": "Living Style Mall",
        "src": "/assets/architectural/Living Style Mall.webp"
      },
      {
        "title": "M3M Urbana, Gurgaon",
        "src": "/assets/architectural/M3M Urbana Gurgaon.webp"
      },
      {
        "title": "MGF Palm Spring",
        "src": "/assets/architectural/MGF Palm Spring (4).webp"
      },
      {
        "title": "Neelkanth Mansion, Mumbai",
        "src": "/assets/architectural/Neelkanth Mansion Mumbai (2).webp"
      },
      {
        "title": "Parasvnath Exotica, Gurgaon",
        "src": "/assets/architectural/Parasvnath Exotica Gurgaon.webp"
      },
      {
        "title": "Park Hyatt, Goa",
        "src": "/assets/architectural/Park Hyatt Goa.webp"
      },
      {
        "title": "Pinnacle DLF",
        "src": "/assets/architectural/Pinnacle DLF (2).webp"
      },
      {
        "title": "Rise Residences, Noida",
        "src": "/assets/architectural/Rise Residences Noida(4).webp"
      },
      {
        "title": "RMZ, Bangalore",
        "src": "/assets/architectural/RMZ Bangalore.webp"
      },
      {
        "title": "SDA, Srinagar",
        "src": "/assets/architectural/SDA Srinagar.webp"
      },
      {
        "title": "Shangri-La Hotel, Abu Dhabi",
        "src": "/assets/architectural/Shangrilla Hotel - Abu Dhabi.webp"
      },
      {
        "title": "Supreme Industries, Mumbai",
        "src": "/assets/architectural/SUPREME INDUSTRIES MUMBAI (1).webp"
      },
      {
        "title": "Taj Vivanta, Surajkund",
        "src": "/assets/architectural/Taj Vivanta Surajkund.webp"
      },
      {
        "title": "TDI Township, Kundli",
        "src": "/assets/architectural/TDI Township Kundli(2).webp"
      },
      {
        "title": "The Ivy, Gurgaon",
        "src": "/assets/architectural/THE IVY GURGAON.webp"
      },
      {
        "title": "The Palm Springs, Gurgaon",
        "src": "/assets/architectural/The Palm Springs Gurgaon(1).webp"
      },
      {
        "title": "Trident, Gurgaon",
        "src": "/assets/architectural/Trident Gurgaon.webp"
      },
      {
        "title": "Uniworld SPA",
        "src": "/assets/architectural/Uniworld SPA.webp"
      },
      {
        "title": "Vardhman City Mall, Dwarka",
        "src": "/assets/architectural/Vardhman City Mall, Dwarka.webp"
      },
      {
        "title": "Water Curtain, Dubai",
        "src": "/assets/architectural/Water Curtain, Dubai.webp"
      }
    ]
  },
  {
    "slug": "floating-fountains",
    "label": "Floating Fountains",
    "eyebrow": "Water Features  Floating",
    "titleBefore": "Lakes, reimagined",
    "titleEm": "As stages",
    "lead": "Floating fountain systems for lakes, lagoons, and open water  reliable platforms that carry light, spray, and spectacle without a permanent basin on shore.",
    "body": "From municipal lakes to private estates, our floating arrays are built for duty cycles, climate, and service access  so the show stays on long after opening night.",
    "gallery": []
  },
  {
    "slug": "programmable-fountains",
    "label": "Programmable Fountains",
    "eyebrow": "Water Features  Programmable",
    "titleBefore": "Jets that",
    "titleEm": "Listen",
    "lead": "Programmable nozzles, jumping jets, and sequenced water  choreographed to music, light, and visitor flow.",
    "body": "We write the show and build the control racks that run it. Precision timing, safe public interaction, and hardware we can service for the life of the installation.",
    "gallery": []
  },
  {
    "slug": "swimming-pools",
    "label": "Swimming Pools",
    "eyebrow": "Water Features  Pools",
    "titleBefore": "Pools with",
    "titleEm": "Presence",
    "lead": "Hospitality and private pools engineered as destinations  clarity, edge detail, and systems that stay quiet while guests stay longer.",
    "body": "From villas to hotels, we deliver the hydraulic backbone and finishes that make a pool feel intentional, not generic.",
    "gallery": []
  },
  {
    "slug": "kids-play-areas",
    "label": "Kids Play Areas",
    "eyebrow": "Water Features  Play",
    "titleBefore": "Water play,",
    "titleEm": "Engineered",
    "lead": "Interactive splash pads and kids play fountains that invite joy without compromising safety, filtration, or durability.",
    "body": "Soft flow profiles, accessible decks, and robust manifolds  designed for parks, resorts, and mixed-use destinations that expect daily use.",
    "gallery": []
  },
  {
    "slug": "prefab-water-features",
    "label": "Prefabs",
    "eyebrow": "WaterWorks  Prefabs",
    "titleBefore": "Factory-built",
    "titleEm": "Water",
    "lead": "Prefab pools and waterfalls from the Ripples workshop  precision-built modules that install faster without losing the finish of a custom system.",
    "body": "Every prefab piece is manufactured under one roof: swimming pools, rock pools, sheet and trickling waterfalls, geyser jets. Workshop control means tighter tolerances, cleaner edges, and site schedules that stay on track.",
    "gallery": [],
    "sections": [
      {
        "id": "prefab-pools",
        "label": "Prefab Pools",
        "gallery": [
          {
            "title": "Prefab Rock Pool, W Goa",
            "src": "/assets/prefab/prefab-rock-pool-w-goa.webp"
          },
          {
            "title": "Prefab Swimming Pool, W Goa",
            "src": "/assets/prefab/prefab-swimming-pool-w-goa.webp"
          },
          {
            "title": "Prefab Swimming Pool, W Goa",
            "src": "/assets/prefab/prefab-swimming-pool-w-goa-2.webp"
          },
          {
            "title": "Prefab Swimming Pool, W Goa",
            "src": "/assets/prefab/prefab-swimming-pool-w-goa-3.webp"
          },
          {
            "title": "Prefab Rock Pool, W Goa",
            "src": "/assets/prefab/prefab-rock-pool-w-goa-2.webp"
          },
          {
            "title": "Custom SGRP Pool with SS Columns, Dubai",
            "src": "/assets/prefab/custom-sgrp-pool-with-ss-columns-dubai.webp"
          }
        ]
      },
      {
        "id": "prefab-fountains",
        "label": "Prefab Fountains",
        "gallery": [
          {
            "title": "Custom Geyser Jet Fountain, DMRC HQ, New Delhi",
            "src": "/assets/prefab/custom-geyser-jet-fountain-dmrc-hq-n-delhi.webp"
          },
          {
            "title": "Custom Geyser Jets with Streams",
            "src": "/assets/prefab/custom-geyser-jets-with-streams.webp"
          },
          {
            "title": "Custom SGRP Trickling Waterfall, TDI Township, Kundli",
            "src": "/assets/prefab/custom-sgrp-trickling-waterfall-tdi-township-kundli.webp"
          },
          {
            "title": "Custom Sheet Waterfall, Private Client",
            "src": "/assets/prefab/custom-sheet-waterfall-private-client.webp"
          },
          {
            "title": "Custom Trickling Waterfall, Hill Spring School, Mumbai",
            "src": "/assets/prefab/custom-trickling-waterfall-hill-spring-school-mumbai.webp"
          },
          {
            "title": "Custom Trickling Waterfall, Hill Spring School, Mumbai",
            "src": "/assets/prefab/custom-trickling-waterfall-hill-spring-school-mumbai-2.webp"
          },
          {
            "title": "McKinsey Gurgaon",
            "src": "/assets/prefab/mckinsey-gurgaon.webp"
          },
          {
            "title": "Private Client Gurgaon",
            "src": "/assets/prefab/private-client-gurgaon.webp"
          }
        ]
      }
    ]
  }
])

export function getCapabilityPage(slug) {
  return (
    CAPABILITY_PAGES.find((page) => page.slug === slug) ??
    getWaterworksCategoryPage(slug) ??
    null
  )
}

export function getCapabilityRelatedLinks(slug) {
  const waterworksPeers = [
    { label: 'Multimedia', to: '/waterworks/multimedia' },
    { label: 'Architectural', to: '/waterworks/architectural' },
    { label: 'Prefabs', to: '/waterworks/prefabs' },
    { label: 'Others', to: '/waterworks/others' }
  ]

  if (
    slug === 'multimedia-shows' ||
    slug === 'architectural-fountains' ||
    slug === 'prefab-water-features' ||
    slug === 'waterworks-others'
  ) {
    const currentTo =
      slug === 'multimedia-shows'
        ? '/waterworks/multimedia'
        : slug === 'architectural-fountains'
          ? '/waterworks/architectural'
          : slug === 'prefab-water-features'
            ? '/waterworks/prefabs'
            : '/waterworks/others'
    return [
      { label: 'All WaterWorks', to: '/waterworks' },
      ...waterworksPeers.filter((link) => link.to !== currentTo)
    ]
  }

  if (slug === 'water-features') return WATER_FEATURE_CATEGORIES
  if (WATER_FEATURE_CATEGORIES.some((c) => c.slug === slug)) {
    return [
      { label: 'All WaterWorks', to: '/waterworks' },
      ...WATER_FEATURE_CATEGORIES.filter((c) => c.slug !== slug),
      { label: 'Prefabs', to: '/waterworks/prefabs' }
    ]
  }
  return CAPABILITY_LINKS.filter((link) => link.to !== `/${slug}`)
}
