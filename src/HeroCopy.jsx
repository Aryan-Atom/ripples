import { useHeroScrollProgress } from "hero-video-anim";

const PHASES = [
  {
    start: 0,
    end: 0.22,
    title: "Held breath",
    tagline: "Before the first surge.",
    description:
      "A quiet, anticipatory moment where every detail is tuned for flawless motion. We design with precision so the opening pulse arrives with perfect timing, harnessing water, light, and sound in one seamless movement.",
  },
  {
    start: 0.22,
    end: 0.4,
    title: "Built to rise",
    tagline: "Every pump. Every nozzle. Made here.",
    description:
      "Precision engineering and custom fabrication power each dynamic water expression. Our in-house systems are crafted for reliability and responsiveness, ensuring every fountain behavior is controlled at the highest level.",
  },
  {
    start: 0.4,
    end: 0.58,
    title: "It breaks free",
    tagline: "Water climbs — light catches every arc.",
    description:
      "Flows and lighting converge in engineered choreography that captivates every spectator. We shape each arc and beam to feel effortless, even as complex mechanics work beneath the surface.",
  },
  {
    start: 0.58,
    end: 0.74,
    title: "Spectacle",
    tagline: "Laser. Music. Water. In sync.",
    description:
      "Immersive shows blend technology and artistry to create unforgettable moments. Every effect is calibrated to build drama, delight audiences, and make spaces feel truly alive.",
  },
  {
    start: 0.74,
    end: 0.88,
    title: "Their faces",
    tagline: "That pause. That gasp. That wow.",
    description:
      "Audiences pause in wonder when every plume, beam, and note arrives together. We craft those emotional beats deliberately, with engineering that supports memorable, shared reactions.",
  },
  {
    start: 0.88,
    end: 1.001,
    title: "Since 1989",
    tagline: "Design. Build. Manufacture.",
    description:
      "Decades of in-house expertise create enduring water features for iconic spaces. From initial concept to final installation, our team delivers systems designed to perform beautifully for years.",
  },
];

const FADE_EDGE = 0.12;

function phaseOpacity(progress, phase, index, total) {
  const span = phase.end - phase.start;
  if (span <= 0) return 0;

  const local = (progress - phase.start) / span;
  if (local < 0 || local > 1) return 0;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (!isFirst && local < FADE_EDGE) return local / FADE_EDGE;
  if (!isLast && local > 1 - FADE_EDGE) return (1 - local) / FADE_EDGE;
  return 1;
}

export default function HeroCopy() {
  const progress = useHeroScrollProgress();

  return (
    <div className="home-hero">
      <div className="home-hero__backdrop" aria-hidden="true" />
      <div className="home-hero__stack">
        {PHASES.map((phase, index) => {
          const opacity = phaseOpacity(progress, phase, index, PHASES.length);
          const isActive = opacity > 0.5;

          return (
            <div
              key={phase.title}
              className="home-hero__slide"
              style={{ opacity }}
              aria-hidden={!isActive}
            >
              <h1 className="home-hero__title">{phase.title}</h1>
              <p className="home-hero__description">{phase.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
