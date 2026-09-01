/** Legacy capability pages  structure & photos from ripplesfountains.com archives. */

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
  },
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

export const CAPABILITY_PAGES = [
  {
    "slug": "water-features",
    "label": "Water Features",
    "eyebrow": "Capabilities  Water",
    "titleBefore": "Water that",
    "titleEm": "belongs",
    "lead": "Architectural fountains, floating systems, programmable jets, pools, and play  designed, engineered, and manufactured under one roof since 1989.",
    "body": "Every system begins as a site-specific composition. We shape hydraulics, lighting, and control so the water reads as architecture  then build the hardware ourselves so it performs for decades.",
    "gallery": [
      {
        "title": "ADNOC Abu Dhabi",
        "src": "/capabilities/water-features/01-adnoc-abu-dhabi.jpg"
      },
      {
        "title": "Hyatt Hyderabad(3)",
        "src": "/capabilities/water-features/02-hyatt-hyderabad3.jpg"
      },
      {
        "title": "M3M Golf Estate Gurgaon",
        "src": "/capabilities/water-features/03-m3m-golf-estate-gurgaon.jpg"
      },
      {
        "title": "M3M Golf Estate Gurgaon1",
        "src": "/capabilities/water-features/04-m3m-golf-estate-gurgaon1.jpg"
      },
      {
        "title": "Tata Steel Jamshedpur(16)",
        "src": "/capabilities/water-features/06-tata-steel-jamshedpur16.jpg"
      }
    ]
  },
  {
    "slug": "architectural-fountains",
    "label": "Architectural",
    "eyebrow": "WaterWorks  Architectural",
    "titleBefore": "Fountains as",
    "titleEm": "architecture",
    "lead": "Site-specific architectural fountains  basins, nozzles, and light composed for plazas, campuses, and civic destinations.",
    "body": "Form follows hydraulics. We design the silhouette and engineer the system so the water holds its line in wind, heat, and daily use  built in our workshop, installed as architecture.",
    "gallery": [
      {
        "title": "Aarohan, Gurgaon",
        "src": "/assets/architectural/aarohan-gurgaon.jpg"
      },
      {
        "title": "Abu Dhabi Airport",
        "src": "/assets/architectural/abu-dhabi-airport.jpg"
      },
      {
        "title": "Adani Power Plant, Mundra",
        "src": "/assets/architectural/adani-power-plant-mundra.jpg"
      },
      {
        "title": "Aditya World City, Noida",
        "src": "/assets/architectural/aditya-world-city-noida.jpg"
      },
      {
        "title": "Ansal Township, Lucknow",
        "src": "/assets/architectural/ansal-township-lucknow.jpg"
      },
      {
        "title": "APRA Builders",
        "src": "/assets/architectural/apra-builders.jpg"
      },
      {
        "title": "Asiana Hotel, Dubai",
        "src": "/assets/architectural/asiana-hotel-dubai.jpg"
      },
      {
        "title": "Bombay Dyeing",
        "src": "/assets/architectural/bombay-dying.jpg"
      },
      {
        "title": "Country Inn & Suites",
        "src": "/assets/architectural/country-inn-and-suites.jpg"
      },
      {
        "title": "Crowne Plaza Rohini",
        "src": "/assets/architectural/crowne-plaza-rohini.jpg"
      },
      {
        "title": "DLF Princeton",
        "src": "/assets/architectural/dlf-prinston.jpg"
      },
      {
        "title": "F1 Track, Greater Noida",
        "src": "/assets/architectural/f1-track-g-noida.jpg"
      },
      {
        "title": "Fortis, Gurgaon",
        "src": "/assets/architectural/fortis-gurgaon.jpg"
      },
      {
        "title": "Golf Park",
        "src": "/assets/architectural/golf-park.jpg"
      },
      {
        "title": "Harsha, Dubai",
        "src": "/assets/architectural/harsha-dubai-1.jpg"
      },
      {
        "title": "Radisson SAS, Dubai",
        "src": "/assets/architectural/hotel-radisson-sas-dubai.jpg"
      },
      {
        "title": "Hyatt Hyderabad",
        "src": "/assets/architectural/hyatt-hyderabad.jpg"
      },
      {
        "title": "INS Karamba",
        "src": "/assets/architectural/ins-karamba.jpg"
      },
      {
        "title": "IOCL Panipat",
        "src": "/assets/architectural/iocl-panipat.jpg"
      }
    ]
  },
  {
    "slug": "floating-fountains",
    "label": "Floating Fountains",
    "eyebrow": "Water Features  Floating",
    "titleBefore": "Lakes, reimagined",
    "titleEm": "as stages",
    "lead": "Floating fountain systems for lakes, lagoons, and open water  reliable platforms that carry light, spray, and spectacle without a permanent basin on shore.",
    "body": "From municipal lakes to private estates, our floating arrays are built for duty cycles, climate, and service access  so the show stays on long after opening night.",
    "gallery": [
      {
        "title": "Creek Fountain, Sharjah",
        "src": "/capabilities/floating-fountains/01-creek-fountain-sharjah-010.jpg"
      },
      {
        "title": "ADNOC, Abu Dhabi",
        "src": "/capabilities/floating-fountains/02-adnoc-abu-dhabi-009.jpg"
      },
      {
        "title": "ADNOC, Abu Dhabi",
        "src": "/capabilities/floating-fountains/03-adnoc-abu-dhabi-008.jpg"
      },
      {
        "title": "DLF Golf Club, Gurgaon",
        "src": "/capabilities/floating-fountains/04-dlf-golf-club-gurgaon-007.jpg"
      },
      {
        "title": "Floating Fountain, Indore",
        "src": "/capabilities/floating-fountains/05-floating-fountain-indore-006.jpg"
      },
      {
        "title": "Jaypee Greens, G. Noida",
        "src": "/capabilities/floating-fountains/06-jaypee-greens-g.-noida-005.jpg"
      },
      {
        "title": "Jaypee Greens, G. Noida",
        "src": "/capabilities/floating-fountains/07-jaypee-greens-g.-noida-004.jpg"
      },
      {
        "title": "Jaypee Golf Course, G. Noida",
        "src": "/capabilities/floating-fountains/08-jaypee-golf-course-g.-noida-003.jpg"
      },
      {
        "title": "SVIL Mines, Katni",
        "src": "/capabilities/floating-fountains/09-svil-mines-katni-002.jpg"
      },
      {
        "title": "M3M, GURGAON",
        "src": "/capabilities/floating-fountains/10-m3m-gurgaon-001.jpg"
      }
    ]
  },
  {
    "slug": "programmable-fountains",
    "label": "Programmable Fountains",
    "eyebrow": "Water Features  Programmable",
    "titleBefore": "Jets that",
    "titleEm": "listen",
    "lead": "Programmable nozzles, jumping jets, and sequenced water  choreographed to music, light, and visitor flow.",
    "body": "We write the show and build the control racks that run it. Precision timing, safe public interaction, and hardware we can service for the life of the installation.",
    "gallery": [
      {
        "title": "R.K. Dying, Panipat",
        "src": "/capabilities/programmable-fountains/01-r.k.-dying-panipat-031.jpg"
      },
      {
        "title": "Private Residence, New Delhi",
        "src": "/capabilities/programmable-fountains/02-private-residence-new-delhi-030.jpg"
      },
      {
        "title": "Private Residence, New Delhi",
        "src": "/capabilities/programmable-fountains/03-private-residence-new-delhi-029.jpg"
      },
      {
        "title": "Taj Vivanta, Surajkund",
        "src": "/capabilities/programmable-fountains/04-taj-vivanta-surajkund-028.jpg"
      },
      {
        "title": "Jumping Jets Mall, Noida",
        "src": "/capabilities/programmable-fountains/05-jumping-jets-mall-noida-027.jpg"
      },
      {
        "title": "Jumping Jets ZECO, Haryana",
        "src": "/capabilities/programmable-fountains/06-jumping-jets-zeco-haryana-026.jpg"
      },
      {
        "title": "Jumping Jets Cross River Mall, Noida",
        "src": "/capabilities/programmable-fountains/07-jumping-jets-cross-river-mall-noida-025.jpg"
      },
      {
        "title": "Jumping Jets Club Florence, Gurgaon",
        "src": "/capabilities/programmable-fountains/08-jumping-jets-club-florence-gurgaon-024.jpg"
      },
      {
        "title": "Jumping Jets Club Florence, Gurgaon",
        "src": "/capabilities/programmable-fountains/09-jumping-jets-club-florence-gurgaon-023.jpg"
      },
      {
        "title": "Shantaram Talaov, Mumbai",
        "src": "/capabilities/programmable-fountains/10-shantaram-talaov-mumbai-022.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/11-tata-steel-jamshedpur-020.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/12-tata-steel-jamshedpur-019.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/13-tata-steel-jamshedpur-018.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/14-tata-steel-jamshedpur-017.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/15-tata-steel-jamshedpur-016.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/16-tata-steel-jamshedpur-015.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/17-tata-steel-jamshedpur-014.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/18-tata-steel-jamshedpur-013.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/19-tata-steel-jamshedpur-012.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/20-tata-steel-jamshedpur-011.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/21-tata-steel-jamshedpur-010.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/22-tata-steel-jamshedpur-009.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/23-tata-steel-jamshedpur-008.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/24-tata-steel-jamshedpur-007.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/25-tata-steel-jamshedpur-006.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/26-tata-steel-jamshedpur-005.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/27-tata-steel-jamshedpur-004.jpg"
      },
      {
        "title": "Tata Steel, Jamshedpur",
        "src": "/capabilities/programmable-fountains/28-tata-steel-jamshedpur-003.jpg"
      },
      {
        "title": "Programmed Fountain",
        "src": "/capabilities/programmable-fountains/29-programmed-fountain-002.jpg"
      },
      {
        "title": "Harsha, Dubai",
        "src": "/capabilities/programmable-fountains/30-harsha-dubai-001.jpg"
      }
    ]
  },
  {
    "slug": "swimming-pools",
    "label": "Swimming Pools",
    "eyebrow": "Water Features  Pools",
    "titleBefore": "Pools with",
    "titleEm": "presence",
    "lead": "Hospitality and private pools engineered as destinations  clarity, edge detail, and systems that stay quiet while guests stay longer.",
    "body": "From villas to hotels, we deliver the hydraulic backbone and finishes that make a pool feel intentional, not generic.",
    "gallery": [
      {
        "title": "Sapphire Heights, Mumbai",
        "src": "/capabilities/swimming-pools/01-sapphire-heights-mumbai-041.jpg"
      },
      {
        "title": "Taj Vivanta, Srinagar",
        "src": "/capabilities/swimming-pools/02-taj-vivanta-srinagar-040.jpg"
      },
      {
        "title": "Shalimar Grand, Lucknow",
        "src": "/capabilities/swimming-pools/03-shalimar-grand-lucknow-039.jpg"
      },
      {
        "title": "Private Villa Pool",
        "src": "/capabilities/swimming-pools/04-private-villa-pool-038.jpg"
      },
      {
        "title": "Private Villa Pool",
        "src": "/capabilities/swimming-pools/05-private-villa-pool-037.jpg"
      },
      {
        "title": "Private Pool, Dubai",
        "src": "/capabilities/swimming-pools/06-private-pool-dubai-036.jpg"
      },
      {
        "title": "Private Pool, Dubai",
        "src": "/capabilities/swimming-pools/07-private-pool-dubai-035.jpg"
      },
      {
        "title": "Private Farm, New Delhi",
        "src": "/capabilities/swimming-pools/08-private-farm-new-delhi-034.jpg"
      },
      {
        "title": "Orchid Woods, Mumbai",
        "src": "/capabilities/swimming-pools/09-orchid-woods-mumbai-033.jpg"
      },
      {
        "title": "Orchard Residency, Mumbai",
        "src": "/capabilities/swimming-pools/10-orchard-residency-mumbai-032.jpg"
      },
      {
        "title": "Moti Buildtech, Jaipur",
        "src": "/capabilities/swimming-pools/11-moti-buildtech-jaipur-031.jpg"
      },
      {
        "title": "Lodha Splendora, Thane",
        "src": "/capabilities/swimming-pools/12-lodha-splendora-thane-030.jpg"
      },
      {
        "title": "Lodha Splendora, Thane",
        "src": "/capabilities/swimming-pools/13-lodha-splendora-thane-029.jpg"
      },
      {
        "title": "Lodha Bellissimo, Mumbai",
        "src": "/capabilities/swimming-pools/14-lodha-bellissimo-mumbai-028.jpg"
      },
      {
        "title": "Lodha Bellissimo, Mumbai",
        "src": "/capabilities/swimming-pools/15-lodha-bellissimo-mumbai-027.jpg"
      },
      {
        "title": "Lodha Bellissimo, Mumbai",
        "src": "/capabilities/swimming-pools/16-lodha-bellissimo-mumbai-026.jpg"
      },
      {
        "title": "Lodha Bellazza, Hyderabad",
        "src": "/capabilities/swimming-pools/17-lodha-bellazza-hyderabad-025.jpg"
      },
      {
        "title": "Lodha Bellazza, Hyderabad",
        "src": "/capabilities/swimming-pools/18-lodha-bellazza-hyderabad-024.jpg"
      },
      {
        "title": "JW Marriot, Mumbai",
        "src": "/capabilities/swimming-pools/19-jw-marriot-mumbai-022.jpg"
      },
      {
        "title": "Intercontinental, Goa",
        "src": "/capabilities/swimming-pools/20-intercontinental-goa-021.jpg"
      },
      {
        "title": "Hyatt Regency, Gurgaon",
        "src": "/capabilities/swimming-pools/21-hyatt-regency-gurgaon-020.jpg"
      },
      {
        "title": "Hyatt Regency, Gurgaon",
        "src": "/capabilities/swimming-pools/22-hyatt-regency-gurgaon-019.jpg"
      },
      {
        "title": "Hyatt Regency, Gurgaon",
        "src": "/capabilities/swimming-pools/23-hyatt-regency-gurgaon-018.jpg"
      },
      {
        "title": "Hyatt, Hyderabad",
        "src": "/capabilities/swimming-pools/24-hyatt-hyderabad-017.jpg"
      },
      {
        "title": "Hyatt, Hyderabad",
        "src": "/capabilities/swimming-pools/25-hyatt-hyderabad-016.jpg"
      },
      {
        "title": "Hyatt, Chennai",
        "src": "/capabilities/swimming-pools/26-hyatt-chennai-015.jpg"
      },
      {
        "title": "Country Inn Suites, Ajmer",
        "src": "/capabilities/swimming-pools/27-country-inn-suites-ajmer-014.jpg"
      },
      {
        "title": "Claridges, Surajkund",
        "src": "/capabilities/swimming-pools/28-claridges-surajkund-013.jpg"
      },
      {
        "title": "The Bay Club, Mumbai",
        "src": "/capabilities/swimming-pools/29-the-bay-club-mumbai-011.jpg"
      },
      {
        "title": "The Bay Club, Mumbai",
        "src": "/capabilities/swimming-pools/30-the-bay-club-mumbai-010.jpg"
      },
      {
        "title": "Jaypee Resort, Greater Noida",
        "src": "/capabilities/swimming-pools/31-jaypee-resort-greater-noida-008.jpg"
      },
      {
        "title": "Orchid Residency, Mumbai",
        "src": "/capabilities/swimming-pools/32-orchid-residency-mumbai-006.jpg"
      },
      {
        "title": "Country Inn _ Suites, Ajmer",
        "src": "/capabilities/swimming-pools/33-country-inn-_-suites-ajmer-005.jpg"
      },
      {
        "title": "Taj Vivanta, Surajkund",
        "src": "/capabilities/swimming-pools/34-taj-vivanta-surajkund-004.jpg"
      },
      {
        "title": "MIRAJ, Mumbai",
        "src": "/capabilities/swimming-pools/35-miraj-mumbai-002.jpg"
      },
      {
        "title": "Rock Pool, W. Goa",
        "src": "/capabilities/swimming-pools/36-rock-pool-w.-goa-001.jpg"
      }
    ]
  },
  {
    "slug": "kids-play-areas",
    "label": "Kids Play Areas",
    "eyebrow": "Water Features  Play",
    "titleBefore": "Water play,",
    "titleEm": "engineered",
    "lead": "Interactive splash pads and kids play fountains that invite joy without compromising safety, filtration, or durability.",
    "body": "Soft flow profiles, accessible decks, and robust manifolds  designed for parks, resorts, and mixed-use destinations that expect daily use.",
    "gallery": [
      {
        "title": "Appu Ghar, Gurgaon",
        "src": "/capabilities/kids-play-areas/01-appu-ghar-gurgaon-013.jpg"
      },
      {
        "title": "Appu Ghar, Gurgaon",
        "src": "/capabilities/kids-play-areas/02-appu-ghar-gurgaon-012.jpg"
      },
      {
        "title": "DLF Hub Kids Play Fountain",
        "src": "/capabilities/kids-play-areas/03-dlf-hub-kids-play-fountain-011.jpg"
      },
      {
        "title": "Al Ain Stadium, UAE",
        "src": "/capabilities/kids-play-areas/04-al-ain-stadium-uae-010.jpg"
      },
      {
        "title": "Miraj Housing Mumbai",
        "src": "/capabilities/kids-play-areas/05-miraj-housing-mumbai-009.jpg"
      },
      {
        "title": "Bay Club Mumbai",
        "src": "/capabilities/kids-play-areas/06-bay-club-mumbai-008.jpg"
      },
      {
        "title": "Bay Club Mumbai",
        "src": "/capabilities/kids-play-areas/07-bay-club-mumbai-007.jpg"
      },
      {
        "title": "Bay Club Mumbai",
        "src": "/capabilities/kids-play-areas/08-bay-club-mumbai-006.jpg"
      },
      {
        "title": "Bay Club Mumbai",
        "src": "/capabilities/kids-play-areas/09-bay-club-mumbai-005.jpg"
      },
      {
        "title": "Bay Club Mumbai",
        "src": "/capabilities/kids-play-areas/10-bay-club-mumbai-004.jpg"
      },
      {
        "title": "Suncity Panchkula",
        "src": "/capabilities/kids-play-areas/11-suncity-panchkula-003.jpg"
      },
      {
        "title": "Suncity Panchkula",
        "src": "/capabilities/kids-play-areas/12-suncity-panchkula-002.jpg"
      },
      {
        "title": "Suncity Panchkula",
        "src": "/capabilities/kids-play-areas/13-suncity-panchkula-001.jpg"
      }
    ]
  },
  {
    "slug": "prefab-water-features",
    "label": "Prefabs",
    "eyebrow": "WaterWorks  Prefabs",
    "titleBefore": "Factory-built",
    "titleEm": "water",
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
            "src": "/assets/prefab/prefab-rock-pool-w-goa.png"
          },
          {
            "title": "Prefab Swimming Pool, W Goa",
            "src": "/assets/prefab/prefab-swimming-pool-w-goa.jpg"
          },
          {
            "title": "Prefab Swimming Pool, W Goa",
            "src": "/assets/prefab/prefab-swimming-pool-w-goa-2.jpg"
          },
          {
            "title": "Prefab Swimming Pool, W Goa",
            "src": "/assets/prefab/prefab-swimming-pool-w-goa-3.jpg"
          },
          {
            "title": "Prefab Rock Pool, W Goa",
            "src": "/assets/prefab/prefab-rock-pool-w-goa-2.png"
          },
          {
            "title": "Custom SGRP Pool with SS Columns, Dubai",
            "src": "/assets/prefab/custom-sgrp-pool-with-ss-columns-dubai.jpg"
          }
        ]
      },
      {
        "id": "prefab-fountains",
        "label": "Prefab Fountains",
        "gallery": [
          {
            "title": "Custom Geyser Jet Fountain, DMRC HQ, New Delhi",
            "src": "/assets/prefab/custom-geyser-jet-fountain-dmrc-hq-n-delhi.jpg"
          },
          {
            "title": "Custom Geyser Jets with Streams",
            "src": "/assets/prefab/custom-geyser-jets-with-streams.jpg"
          },
          {
            "title": "Custom SGRP Trickling Waterfall, TDI Township, Kundli",
            "src": "/assets/prefab/custom-sgrp-trickling-waterfall-tdi-township-kundli.jpg"
          },
          {
            "title": "Custom Sheet Waterfall, Private Client",
            "src": "/assets/prefab/custom-sheet-waterfall-private-client.jpg"
          },
          {
            "title": "Custom Trickling Waterfall, Hill Spring School, Mumbai",
            "src": "/assets/prefab/custom-trickling-waterfall-hill-spring-school-mumbai.jpg"
          },
          {
            "title": "Custom Trickling Waterfall, Hill Spring School, Mumbai",
            "src": "/assets/prefab/custom-trickling-waterfall-hill-spring-school-mumbai-2.jpg"
          },
          {
            "title": "McKinsey Gurgaon",
            "src": "/assets/prefab/mckinsey-gurgaon.jpg"
          },
          {
            "title": "Private Client Gurgaon",
            "src": "/assets/prefab/private-client-gurgaon.jpg"
          }
        ]
      }
    ]
  }
]

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
    { label: 'Others', to: '/waterworks/others' },
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
      ...waterworksPeers.filter((link) => link.to !== currentTo),
    ]
  }

  if (slug === 'water-features') return WATER_FEATURE_CATEGORIES
  if (WATER_FEATURE_CATEGORIES.some((c) => c.slug === slug)) {
    return [
      { label: 'All WaterWorks', to: '/waterworks' },
      ...WATER_FEATURE_CATEGORIES.filter((c) => c.slug !== slug),
      { label: 'Prefabs', to: '/waterworks/prefabs' },
    ]
  }
  return CAPABILITY_LINKS.filter((link) => link.to !== `/${slug}`)
}
