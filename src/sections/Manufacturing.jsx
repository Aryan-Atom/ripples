import { RuleTitle } from '../ui/GoldRule'

export default function Manufacturing() {
  return (
    <section
      className="bg-cream px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4.5rem,12vw,7.5rem)] text-ink"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <RuleTitle light align="left">
            Manufacturing
          </RuleTitle>
          <p className="mt-8 text-[0.95rem] leading-[1.85] text-ink/70">
            Our in-house factory in Noida is where design becomes hardware 
            nozzles, manifolds, control panels, and show systems built under one
            roof.
          </p>
          <p className="mt-4 text-[0.95rem] leading-[1.85] text-ink/70">
            Dedicated R&amp;D in hydraulics, lighting, and control systems keeps
            every installation precise, durable, and ready for the night it has
            to perform.
          </p>
        </div>

        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-ink/50">
          Noida  Design, fabricate, commission
        </p>
      </div>
    </section>
  )
}
