import { useCallback, useLayoutEffect, useRef } from "react";
import { useHeroScrollSubscribe } from "hero-video-anim";

const PHASES = [
  {
    start: 0,
    end: 0.22,
    title: "Who turns engineering into wonder?",
    description:
      "Every show begins in quiet precision — pressure, light, and timing tuned long before the first surge arrives.",
  },
  {
    start: 0.22,
    end: 0.4,
    title: "What happens before water moves?",
    description:
      "Pumps, nozzles, and control systems — designed and built in-house so every arc lands exactly where it should.",
  },
  {
    start: 0.4,
    end: 0.58,
    title: "Ever asked who teaches water to dance?",
    description:
      "Flows and light move in choreography that looks effortless. Complex mechanics work beneath the surface.",
  },
  {
    start: 0.58,
    end: 0.74,
    title: "When water becomes a performance — who's behind the stage?",
    description:
      "Laser, music, and water sync into one immersive show — every effect calibrated to build drama.",
  },
  {
    start: 0.74,
    end: 0.88,
    title: "What does it take to leave people speechless?",
    description:
      "That pause. That gasp. We engineer those moments — every plume, beam, and note arriving together.",
  },
  {
    start: 0.88,
    end: 1.001,
    title: "What if the real masterpiece isn't the water?",
    description:
      "Since 1989, we've designed, built, and manufactured the systems behind iconic fountains worldwide.",
  },
];

/** Absolute progress width for crossfades — phases meet at 0.5, never both 0. */
const FADE = 0.035;

function phaseOpacity(progress, phase, index, total) {
  const { start, end } = phase;
  const fadeInFrom = index === 0 ? start : start - FADE;
  const fadeOutTo = index === total - 1 ? end : end + FADE;

  if (progress < fadeInFrom || progress > fadeOutTo) return 0;

  let opacity = 1;
  if (index > 0 && progress < start + FADE) {
    opacity = Math.min(opacity, (progress - (start - FADE)) / (2 * FADE));
  }
  if (index < total - 1 && progress > end - FADE) {
    opacity = Math.min(opacity, (end + FADE - progress) / (2 * FADE));
  }
  return Math.max(0, Math.min(1, opacity));
}

export default function HeroCopy() {
  const slideRefs = useRef([]);

  const updateSlides = useCallback((progress) => {
    PHASES.forEach((phase, index) => {
      const slide = slideRefs.current[index];
      if (!slide) return;

      const opacity = phaseOpacity(progress, phase, index, PHASES.length);
      slide.style.opacity = String(opacity);
      slide.setAttribute("aria-hidden", opacity <= 0.5 ? "true" : "false");
    });
  }, []);

  useHeroScrollSubscribe(updateSlides);

  // First paint: show phase 0 immediately (CSS defaults slides to opacity 0).
  useLayoutEffect(() => {
    updateSlides(0);
  }, [updateSlides]);

  return (
    <div className="home-hero">
      <div className="home-hero__backdrop" aria-hidden="true" />
      <div className="home-hero__stack">
        {PHASES.map((phase, index) => (
          <div
            key={phase.title}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className="home-hero__slide"
            style={index === 0 ? { opacity: 1 } : undefined}
            aria-hidden={index !== 0}
          >
            <h1 className="home-hero__title">{phase.title}</h1>
            <p className="home-hero__description">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
