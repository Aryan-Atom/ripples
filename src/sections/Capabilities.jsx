import { RuleTitle } from '../ui/GoldRule'

const ITEMS = [
  {
    title: 'Indoor Fountains',
    description:
      'Refined water features for lobbies, atriums, and interiors  quiet engineering, lasting presence.',
  },
  {
    title: 'Architectural Fountains',
    description:
      'Bespoke outdoor installations that become the signature landmark of hotels, campuses, and civic spaces.',
  },
  {
    title: 'Swimming Pools',
    description:
      'Precision-built aquatic environments where hydraulics, finishes, and form meet hospitality standards.',
  },
  {
    title: 'Multimedia Shows',
    description:
      'Water, light, laser, and sound choreographed into night-time spectacles that draw crowds again and again.',
  },
]

export default function Capabilities() {
  return (
    <section
      id="services"
      className="bg-cream px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4.5rem,12vw,7.5rem)] text-ink"
    >
      <div className="mx-auto max-w-7xl">
        <RuleTitle light>Capabilities</RuleTitle>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              data-cursor="hover"
              className="group border border-gold/30 bg-void/15 p-8 transition duration-500 hover:-translate-y-1 hover:border-gold/70"
            >
              <div className="mb-6 h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" />
              <h3 className="font-display text-xl uppercase tracking-[0.08em] text-ink">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {item.description}
              </p>
              <a
                href="#contact"
                className="relative mt-6 inline-block font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-gold after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-400 hover:after:scale-x-100"
              >
                Discover
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
