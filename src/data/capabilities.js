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
      "label": "Architectural Fountains",
      "eyebrow": "WaterWorks  Architectural",
      "titleBefore": "Water as",
      "titleEm": "Architecture",
      "lead": "Site-specific architectural fountains  basins, nozzles, and light composed for plazas, campuses, and civic destinations.",
      "body": "Form follows hydraulics. We design the silhouette and engineer the system so the water holds its line in wind, heat, and daily use  built in our workshop, installed as architecture.",
      "gallery": [
        {
          "title": "Aarohan Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/aarohan-gurgaon.webp"
        },
        {
          "title": "Abu Dhabi Airport",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/abu-dhabi-airport.webp"
        },
        {
          "title": "Adani Power Plant Mundra",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/adani-power-plant-mundra.webp"
        },
        {
          "title": "Aditya World City Noida",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/aditya-world-city-noida.webp"
        },
        {
          "title": "Al Barari - Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Al Barari - Dubai.webp"
        },
        {
          "title": "Al Barshah Mall, Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Al Barshah Mall, Dubai.webp"
        },
        {
          "title": "Al Bawadi - Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Al Bawadi - Dubai.webp"
        },
        {
          "title": "Ansal Township Lucknow",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Ansal Township Lucknow.webp"
        },
        {
          "title": "Ansal Township Lucknow",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/ansal-township-lucknow.webp"
        },
        {
          "title": "Apra Builders",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/apra-builders.webp"
        },
        {
          "title": "ARA FARM (1)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/ARA FARM (1).webp"
        },
        {
          "title": "Artgate, Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Artgate, Dubai.webp"
        },
        {
          "title": "Asiana Hotel Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/asiana-hotel-dubai.webp"
        },
        {
          "title": "Bawadi Mall - Al Ain",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Bawadi Mall - Al Ain.webp"
        },
        {
          "title": "Bharti Airtel H.O. V.Kunj Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Bharti Airtel H.O. V.Kunj Gurgaon.webp"
        },
        {
          "title": "Bombay Dying",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/bombay-dying.webp"
        },
        {
          "title": "Business Bay Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Business Bay Dubai.webp"
        },
        {
          "title": "Centre Point (Penninsula Land) Mumbai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Centre Point (Penninsula Land) Mumbai.webp"
        },
        {
          "title": "CHARISMA HOTEL BANGALORE",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/CHARISMA HOTEL BANGALORE.webp"
        },
        {
          "title": "Club Florence Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Club Florence Gurgaon.webp"
        },
        {
          "title": "Country Inn And Suites",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/country-inn-and-suites.webp"
        },
        {
          "title": "Cross River Mall Noida",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Cross River Mall Noida.webp"
        },
        {
          "title": "CROWNE PLAZA ROHINI (3)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/CROWNE PLAZA ROHINI (3).webp"
        },
        {
          "title": "Crowne Plaza Rohini",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/crowne-plaza-rohini.webp"
        },
        {
          "title": "Delhi Metro Bhawan",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Delhi Metro Bhawan.webp"
        },
        {
          "title": "Desert Palm Resort - Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Desert Palm Resort - Dubai.webp"
        },
        {
          "title": "Dharampal Satyapal Noida",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Dharampal Satyapal Noida.webp"
        },
        {
          "title": "DLF Alameda Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/DLF Alameda Gurgaon.webp"
        },
        {
          "title": "Dlf Prinston",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/dlf-prinston.webp"
        },
        {
          "title": "Double Crown Fountain",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Double Crown Fountain.webp"
        },
        {
          "title": "Educomp Sl. Gurgaon (4)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Educomp Sl. Gurgaon (4).webp"
        },
        {
          "title": "Emaar Jaipur Green",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Emaar Jaipur Green.webp"
        },
        {
          "title": "Emporio Mall N Delhi",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Emporio Mall N Delhi.webp"
        },
        {
          "title": "Eros Nehru Place",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Eros Nehru Place.webp"
        },
        {
          "title": "Essel Tower - Outside",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Essel Tower - Outside.webp"
        },
        {
          "title": "F1 Track G Noida",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/F1 Track G Noida.webp"
        },
        {
          "title": "Fortis Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/fortis-gurgaon.webp"
        },
        {
          "title": "Gantooth Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Gantooth Dubai.webp"
        },
        {
          "title": "Golf Park",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/golf-park.webp"
        },
        {
          "title": "Half Dandelion",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Half Dandelion.webp"
        },
        {
          "title": "Harsha Dubai 1",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/harsha-dubai-1.webp"
        },
        {
          "title": "Hiranandani Chennai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Hiranandani Chennai.webp"
        },
        {
          "title": "holiday inn mumbai (2)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/holiday inn mumbai (2).webp"
        },
        {
          "title": "Hotel Hometel Mumbai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Hotel Hometel Mumbai.webp"
        },
        {
          "title": "Hotel Viceroy Hyderabad",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Hotel Viceroy Hyderabad.webp"
        },
        {
          "title": "Hotel Radisson Sas Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/hotel-radisson-sas-dubai.webp"
        },
        {
          "title": "HT MEDIA Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/HT MEDIA Gurgaon.webp"
        },
        {
          "title": "Hyatt Hyderabad",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/hyatt-hyderabad.webp"
        },
        {
          "title": "IBC Tech Park Bangalore",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/IBC Tech Park Bangalore.webp"
        },
        {
          "title": "Indus Valley",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Indus Valley.webp"
        },
        {
          "title": "Ins Karamba",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/ins-karamba.webp"
        },
        {
          "title": "Intercontinental Hotel Noida",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Intercontinental Hotel Noida.webp"
        },
        {
          "title": "IOCL Panipat(1)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/IOCL Panipat(1).webp"
        },
        {
          "title": "Iocl Panipat",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/iocl-panipat.webp"
        },
        {
          "title": "JAMES HOTEL CHANDIGARH",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/JAMES HOTEL CHANDIGARH.webp"
        },
        {
          "title": "Jaypee Palace Agra",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Jaypee Palace Agra.webp"
        },
        {
          "title": "Jaypee Resort Greater Noida(1)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Jaypee Resort Greater Noida(1).webp"
        },
        {
          "title": "JP Greens Noida",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/JP Greens Noida.webp"
        },
        {
          "title": "Laburnum Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Laburnum Gurgaon.webp"
        },
        {
          "title": "Living Style Mall",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Living Style Mall.webp"
        },
        {
          "title": "Lodha One Mumbai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Lodha One Mumbai.webp"
        },
        {
          "title": "M3M Sales Center Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/M3M Sales Center Gurgaon.webp"
        },
        {
          "title": "M3M Urbana Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/M3M Urbana Gurgaon.webp"
        },
        {
          "title": "Mawana Sugar. Shaheer Ass. Feb. 2009",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Mawana Sugar. Shaheer Ass. Feb. 2009.webp"
        },
        {
          "title": "McKinsey Gurgaon(1)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/McKinsey Gurgaon(1).webp"
        },
        {
          "title": "MGF Palm Spring (4)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/MGF Palm Spring (4).webp"
        },
        {
          "title": "Moolchand Hospital N Delhi",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Moolchand Hospital N Delhi.webp"
        },
        {
          "title": "National Museum N Delhi",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/National Museum N Delhi.webp"
        },
        {
          "title": "NDMC HQ N Delhi",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/NDMC HQ N Delhi.webp"
        },
        {
          "title": "Neelkanth Mansion Mumbai (2)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Neelkanth Mansion Mumbai (2).webp"
        },
        {
          "title": "Orchard Residency Mumbai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Orchard Residency Mumbai.webp"
        },
        {
          "title": "Parasvnath Exotica Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Parasvnath Exotica Gurgaon.webp"
        },
        {
          "title": "Park Hyatt Goa",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Park Hyatt Goa.webp"
        },
        {
          "title": "Pinnacle DLF (2)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Pinnacle DLF (2).webp"
        },
        {
          "title": "Pinnacle Tower Claridges Surajkund (2)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Pinnacle Tower Claridges Surajkund (2).webp"
        },
        {
          "title": "Private Farm N Delhi(5)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Private Farm N Delhi(5).webp"
        },
        {
          "title": "Private Residence N Delhi(2)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Private Residence N Delhi(2).webp"
        },
        {
          "title": "Radisson Blue N Delhi",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Radisson Blue N Delhi.webp"
        },
        {
          "title": "Rise Residences Noida(4)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Rise Residences Noida(4).webp"
        },
        {
          "title": "RMZ Bangalore",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/RMZ Bangalore.webp"
        },
        {
          "title": "SDA Srinagar",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/SDA Srinagar.webp"
        },
        {
          "title": "Shangrilla Hotel - Abu Dhabi",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Shangrilla Hotel - Abu Dhabi.webp"
        },
        {
          "title": "SUPREME INDUSTRIES MUMBAI (1)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/SUPREME INDUSTRIES MUMBAI (1).webp"
        },
        {
          "title": "Taj Vivanta Surajkund",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Taj Vivanta Surajkund.webp"
        },
        {
          "title": "TDI Township Kundli(2)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/TDI Township Kundli(2).webp"
        },
        {
          "title": "The Bella Vista Chandigarh",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/The Bella Vista Chandigarh.webp"
        },
        {
          "title": "THE IVY GURGAON",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/THE IVY GURGAON.webp"
        },
        {
          "title": "The Palm Springs Gurgaon(1)",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/The Palm Springs Gurgaon(1).webp"
        },
        {
          "title": "Trident Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Trident Gurgaon.webp"
        },
        {
          "title": "Unitech Harmony Gurgaon",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Unitech Harmony Gurgaon.webp"
        },
        {
          "title": "Uniworld SPA",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Uniworld SPA.webp"
        },
        {
          "title": "Vardhman City Mall, Dwarka",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Vardhman City Mall, Dwarka.webp"
        },
        {
          "title": "Water Curtain, Dubai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Water Curtain, Dubai.webp"
        },
        {
          "title": "Xansa Chennai",
          "src": "Ripples Assets/WaterWorks/Architectural/Section 2/Xansa Chennai.webp"
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
    "titleBefore": "Factory",
    "titleEm": "Water",
    "titleMid": "Built",
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
            "title": "Ireo Victory Valley Pool",
            "src": "Ripples Assets/WaterWorks/Prefabs/Section 2/IreoVictoryValleyPool1.webp"
          },
          {
            "title": "Ireo Victory Valley Pool",
            "src": "Ripples Assets/WaterWorks/Prefabs/Section 2/IreoVictoryValleyPool2.webp"
          },
          {
            "title": "Ireo Victory Valley Pool",
            "src": "Ripples Assets/WaterWorks/Prefabs/Section 2/IreoVictoryValleyPool3.webp"
          }
        ]
      },
      {
        "id": "prefab-fountains",
        "label": "Prefab Fountains",
        "gallery": [
          {
            "title": "Custom Geyser Jets with Streams",
            "src": "/assets/prefab/custom-geyser-jets-with-streams.webp"
          },
          {
            "title": "Custom SGRP Pool with SS Columns, Dubai",
            "src": "/assets/prefab/custom-sgrp-pool-with-ss-columns-dubai.webp"
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
            "src": "Ripples Assets/WaterWorks/Prefabs/Section 2/mckinsey-gurgaon.webp"
          },
          {
            "title": "McKinsey",
            "src": "Ripples Assets/WaterWorks/Prefabs/Section 2/Artboard5.webp"
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
