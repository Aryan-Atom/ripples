/** WaterWorks landing categories + gallery page payloads. */
import { withRemoteAssets } from './assets.js'

export const WATERWORKS_CATEGORIES = withRemoteAssets([
  {
    "id": "multimedia",
    "label": "Multimedia",
    "to": "/waterworks/multimedia",
    "slug": "multimedia-shows",
    "tags": [
      "Shows",
      "Light",
      "Music"
    ],
    "place": "Worldwide",
    "description": "Immersive fountain shows where water, light, and music move as one choreographed system. Built for plazas, lakes, and landmark nights  every effect engineered in-house so the performance holds its drama from opening surge to final fade.",
    "cover": "/assets/multimedia/bhopal-musical.webp",
    "previews": [
      "/assets/multimedia/bhopal-musical.webp",
      "/assets/multimedia/statue-of-unity-fountain.webp",
      "/assets/multimedia/jk-temple.webp"
    ]
  },
  {
    "id": "architectural",
    "label": "Architectural",
    "to": "/waterworks/architectural",
    "slug": "architectural-fountains",
    "tags": [
      "Civic",
      "Campus",
      "Plazas"
    ],
    "place": "Site-specific",
    "description": "Site-specific architectural fountains composed as built form. Basins, nozzles, and light are engineered for wind, climate, and daily use  so the water reads as architecture long after opening day.",
    "cover": "/assets/architectural/aarohan-gurgaon.webp",
    "previews": [
      "/assets/architectural/aarohan-gurgaon.webp",
      "/assets/architectural/abu-dhabi-airport.webp",
      "/assets/architectural/hyatt-hyderabad.webp"
    ]
  },
  {
    "id": "prefabs",
    "label": "Prefabs",
    "to": "/waterworks/prefabs",
    "slug": "prefab-water-features",
    "tags": [
      "Pools",
      "Fountains",
      "Modular"
    ],
    "place": "Workshop-built",
    "description": "Prefab pools, rock pools, and waterfalls manufactured in our workshop. Modules arrive ready to set  still custom in the finish, still built to Ripples tolerances.",
    "cover": "/assets/prefab/prefab-swimming-pool-w-goa.webp",
    "previews": [
      "/assets/prefab/prefab-swimming-pool-w-goa.webp",
      "/assets/prefab/custom-geyser-jet-fountain-dmrc-hq-n-delhi.webp",
      "/assets/prefab/mckinsey-gurgaon.webp"
    ]
  },
  {
    "id": "others",
    "label": "Others",
    "to": "/waterworks/others",
    "slug": "waterworks-others",
    "tags": [
      "Floating",
      "Programmable",
      "Play"
    ],
    "place": "Full catalogue",
    "description": "Floating systems, programmable jets, swimming pools, and kids play water. The wider Ripples catalogue beyond shows and architecture  each system still designed, engineered, and built under one roof.",
    "cover": "/assets/ww-others/floating-fountains/creek-fountain-sharjah.webp",
    "previews": [
      "/assets/ww-others/floating-fountains/creek-fountain-sharjah.webp",
      "/assets/ww-others/programmable-fountains/jumping-jets-mall-noida.webp",
      "/assets/ww-others/swimming-pools/intercontinental-goa.webp"
    ]
  }
])

export const WATERWORKS_CATEGORY_PAGES = withRemoteAssets({
  "multimedia-shows": {
    "slug": "multimedia-shows",
    "label": "Multimedia",
    "eyebrow": "WaterWorks  Multimedia",
    "titleBefore": "Water as",
    "titleEm": "performance",
    "lead": "Multimedia fountain shows  light, music, and water choreographed as one system.",
    "body": "From lake spectacles to urban promenades, we design and manufacture the show systems that turn water into a nightly performance.",
    "showreel": {
      "src": "/assets/multimedia/bhopal-musical-clip.mp4",
      "poster": "/assets/multimedia/bhopal-musical.webp",
      "title": "Bhopal Musical showreel",
      "caption": "Bhopal Musical"
    },
    "gallery": [
      {
        "title": "Bhopal Musical",
        "src": "/assets/multimedia/bhopal-musical.webp"
      },
      {
        "title": "Birsa Munda Memorial Park",
        "src": "/assets/multimedia/birsa-munda-memorial-park.webp"
      },
      {
        "title": "HUB",
        "src": "/assets/multimedia/hub-07.webp"
      },
      {
        "title": "JK Temple",
        "src": "/assets/multimedia/jk-temple.webp"
      },
      {
        "title": "Luv Kush Garden",
        "src": "/assets/multimedia/luv-kush-garden.webp"
      },
      {
        "title": "NDMC",
        "src": "/assets/multimedia/ndmc-image-9.webp"
      },
      {
        "title": "PCMC",
        "src": "/assets/multimedia/pcmc-1.webp"
      },
      {
        "title": "Statue of Unity Fountain",
        "src": "/assets/multimedia/statue-of-unity-fountain.webp"
      }
    ]
  },
  "waterworks-others": {
    "slug": "waterworks-others",
    "label": "Others",
    "eyebrow": "WaterWorks  Others",
    "titleBefore": "Beyond the",
    "titleEm": "stage",
    "lead": "Floating fountains, programmable jets, pools, and play areas from the Ripples workshop.",
    "body": "A curated set of systems outside multimedia shows and architectural fountains  each still designed, engineered, and built in-house.",
    "gallery": [],
    "sections": [
      {
        "id": "floating-fountains",
        "label": "Floating Fountains",
        "titleBefore": "Floating",
        "titleEm": "systems",
        "gallery": [
          {
            "title": "ADNOC, Abu Dhabi",
            "src": "/assets/ww-others/floating-fountains/adnoc-abu-dhabi.webp"
          },
          {
            "title": "ADNOC, Abu Dhabi",
            "src": "/assets/ww-others/floating-fountains/adnoc-abu-dhabi-2.webp"
          },
          {
            "title": "Creek Fountain, Sharjah",
            "src": "/assets/ww-others/floating-fountains/creek-fountain-sharjah.webp"
          },
          {
            "title": "DLF Golf Club, Gurgaon",
            "src": "/assets/ww-others/floating-fountains/dlf-golf-club-gurgaon.webp"
          },
          {
            "title": "Floating Fountain, Indore",
            "src": "/assets/ww-others/floating-fountains/floating-fountain-indore.webp"
          },
          {
            "title": "Jaypee Golf Course, Greater Noida",
            "src": "/assets/ww-others/floating-fountains/jaypee-golf-course-g-noida.webp"
          },
          {
            "title": "Jaypee Greens, Greater Noida",
            "src": "/assets/ww-others/floating-fountains/jaypee-greens-g-noida.webp"
          },
          {
            "title": "Jaypee Greens, Greater Noida",
            "src": "/assets/ww-others/floating-fountains/jaypee-greens-g-noida-2.webp"
          },
          {
            "title": "M3M Golf Estate, Gurgaon",
            "src": "/assets/ww-others/floating-fountains/m3m-golf-estate-gurgaon.webp"
          },
          {
            "title": "M3M Golf Estate, Gurgaon",
            "src": "/assets/ww-others/floating-fountains/m3m-golf-estate-gurgaon-2.webp"
          },
          {
            "title": "M3M Golf Estate, Gurgaon",
            "src": "/assets/ww-others/floating-fountains/m3m-golf-estate-gurgaon-3.webp"
          },
          {
            "title": "Park Hyatt, Goa",
            "src": "/assets/ww-others/floating-fountains/park-hyatt-goa.webp"
          },
          {
            "title": "SVIL Mines, Katni",
            "src": "/assets/ww-others/floating-fountains/svil-mines-katni.webp"
          }
        ]
      },
      {
        "id": "programmable-fountains",
        "label": "Programmable Fountains",
        "titleBefore": "Programmable",
        "titleEm": "jets",
        "gallery": [
          {
            "title": "Harsha, Dubai",
            "src": "/assets/ww-others/programmable-fountains/harsha-dubai.webp"
          },
          {
            "title": "Jumping Jets, Club Florence Gurgaon",
            "src": "/assets/ww-others/programmable-fountains/jumping-jets-club-florence-gurgaon.webp"
          },
          {
            "title": "Jumping Jets, Cross River Mall Noida",
            "src": "/assets/ww-others/programmable-fountains/jumping-jets-cross-river-mall-noida.webp"
          },
          {
            "title": "Jumping Jets, Mall Noida",
            "src": "/assets/ww-others/programmable-fountains/jumping-jets-mall-noida.webp"
          },
          {
            "title": "Jumping Jets, ZECO Haryana",
            "src": "/assets/ww-others/programmable-fountains/jumping-jets-zeco-haryana.webp"
          },
          {
            "title": "Orange County, Indirapuram",
            "src": "/assets/ww-others/programmable-fountains/orange-county-indirapuram.webp"
          },
          {
            "title": "Private Residence, New Delhi",
            "src": "/assets/ww-others/programmable-fountains/private-residence-n-delhi.webp"
          },
          {
            "title": "Private Residence, New Delhi",
            "src": "/assets/ww-others/programmable-fountains/private-residence-n-delhi-2.webp"
          },
          {
            "title": "Programmed Fountain",
            "src": "/assets/ww-others/programmable-fountains/programmed-fountain.webp"
          },
          {
            "title": "Shantaram Talaov, Mumbai",
            "src": "/assets/ww-others/programmable-fountains/shantaram-talaov-mumbai.webp"
          },
          {
            "title": "Taj Vivanta, Surajkund",
            "src": "/assets/ww-others/programmable-fountains/taj-vivanta-surajkund.webp"
          },
          {
            "title": "Tata Steel, Jamshedpur",
            "src": "/assets/ww-others/programmable-fountains/tata-steel-jamshedpur.webp"
          },
          {
            "title": "Tata Steel, Jamshedpur",
            "src": "/assets/ww-others/programmable-fountains/tata-steel-jamshedpur-2.webp"
          },
          {
            "title": "Tata Steel, Jamshedpur",
            "src": "/assets/ww-others/programmable-fountains/tata-steel-jamshedpur-3.webp"
          }
        ]
      },
      {
        "id": "swimming-pools",
        "label": "Swimming Pools",
        "titleBefore": "Swimming",
        "titleEm": "pools",
        "gallery": [
          {
            "title": "Country Inn & Suites, Ajmer",
            "src": "/assets/ww-others/swimming-pools/country-inn-and-suites-ajmer.webp"
          },
          {
            "title": "Private Pool",
            "src": "/assets/ww-others/swimming-pools/private-pool-img-0633.webp"
          },
          {
            "title": "Intercontinental, Goa",
            "src": "/assets/ww-others/swimming-pools/intercontinental-goa.webp"
          },
          {
            "title": "JW Marriott, Mumbai",
            "src": "/assets/ww-others/swimming-pools/jw-marriot-mumbai.webp"
          },
          {
            "title": "Lodha Bellezza, Hyderabad",
            "src": "/assets/ww-others/swimming-pools/lodha-bellezza-hyderabad.webp"
          },
          {
            "title": "M3M Golf Estate, Gurgaon",
            "src": "/assets/ww-others/swimming-pools/m3m-golf-estate-gurgaon.webp"
          },
          {
            "title": "Private Farm, New Delhi",
            "src": "/assets/ww-others/swimming-pools/private-farm-n-delhi.webp"
          },
          {
            "title": "Sapphire Heights, Mumbai and Kids Play Pool",
            "src": "/assets/ww-others/swimming-pools/sapphire-heights-mumbai-swimming-pool-and-kids-play-pool.webp"
          },
          {
            "title": "Taj Vivanta, Surajkund",
            "src": "/assets/ww-others/swimming-pools/taj-vivanta-suraj-kund.webp"
          },
          {
            "title": "Taj Vivanta, Surajkund",
            "src": "/assets/ww-others/swimming-pools/taj-vivanta-surajkund.webp"
          },
          {
            "title": "Taj Vivanta, Surajkund",
            "src": "/assets/ww-others/swimming-pools/taj-vivanta-surajkund-2.webp"
          },
          {
            "title": "The Bay Club, Mumbai",
            "src": "/assets/ww-others/swimming-pools/the-bay-club-mumbai.webp"
          },
          {
            "title": "The Bay Club, Mumbai",
            "src": "/assets/ww-others/swimming-pools/the-bay-club-mumbai-2.webp"
          },
          {
            "title": "The Bay Club, Mumbai",
            "src": "/assets/ww-others/swimming-pools/the-bay-club-mumbai-3.webp"
          }
        ]
      },
      {
        "id": "kids-play",
        "label": "Kids Play Areas",
        "titleBefore": "Kids",
        "titleEm": "play",
        "gallery": [
          {
            "title": "Al Ain Stadium, UAE",
            "src": "/assets/ww-others/kids-play/al-ain-stadium-uae.webp"
          },
          {
            "title": "Appu Ghar, Gurgaon",
            "src": "/assets/ww-others/kids-play/appu-ghar-gurgaon.webp"
          },
          {
            "title": "Appu Ghar, Gurgaon",
            "src": "/assets/ww-others/kids-play/appu-ghar-gurgaon-2.webp"
          },
          {
            "title": "Bay Club, Mumbai",
            "src": "/assets/ww-others/kids-play/bay-club-mumbai.webp"
          },
          {
            "title": "Bay Club, Mumbai",
            "src": "/assets/ww-others/kids-play/bay-club-mumbai-2.webp"
          },
          {
            "title": "Bay Club, Mumbai",
            "src": "/assets/ww-others/kids-play/bay-club-mumbai-3.webp"
          },
          {
            "title": "Bay Club, Mumbai",
            "src": "/assets/ww-others/kids-play/bay-club-mumbai-4.webp"
          },
          {
            "title": "Bay Club, Mumbai",
            "src": "/assets/ww-others/kids-play/bay-club-mumbai-5.webp"
          },
          {
            "title": "Bay Club, Mumbai",
            "src": "/assets/ww-others/kids-play/bay-club-mumbai-6.webp"
          },
          {
            "title": "Bay Club, Mumbai",
            "src": "/assets/ww-others/kids-play/bay-club-mumbai-7.webp"
          },
          {
            "title": "Bay Club, Mumbai",
            "src": "/assets/ww-others/kids-play/bay-club-mumbai-8.webp"
          },
          {
            "title": "M3M Golf Estate, Gurgaon",
            "src": "/assets/ww-others/kids-play/m3m-golf-estate-gurgaon.webp"
          },
          {
            "title": "Miraj Housing, Mumbai",
            "src": "/assets/ww-others/kids-play/miraj-housing-mumbai.webp"
          },
          {
            "title": "Suncity, Panchkula",
            "src": "/assets/ww-others/kids-play/suncity-panchkula.webp"
          },
          {
            "title": "Suncity, Panchkula",
            "src": "/assets/ww-others/kids-play/suncity-panchkula-2.webp"
          },
          {
            "title": "Suncity, Panchkula",
            "src": "/assets/ww-others/kids-play/suncity-panchkula-3.webp"
          }
        ]
      }
    ]
  }
})

export function getWaterworksCategoryPage(slug) {
  return WATERWORKS_CATEGORY_PAGES[slug] ?? null
}
