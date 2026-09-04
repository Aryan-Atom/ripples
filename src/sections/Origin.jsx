import { RuleTitle } from '../ui/GoldRule'
import RevealText from '../motion/RevealText'

export default function Origin() {
  return (
    <section
      id="about"
      className="bg-void-soft px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4.5rem,12vw,7.5rem)]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <RuleTitle align="left">The Origin</RuleTitle>
          <p className="mt-8 text-[0.95rem] leading-[1.85] text-mist/65">
            In 1988, at a Delhi exhibition, an idea took shape: what if an
            aquarium pump could become the heart of a fountain? A working
            prototype drew a crowd  and the first batch sold out.
          </p>
          <p className="mt-4 text-[0.95rem] leading-[1.85] text-mist/65">
            That moment of curiosity became Ripples Engineering: a company built
            on making water move with purpose, beauty, and precision.
          </p>
          <blockquote className="mt-10">
            <RevealText
              as="p"
              className="font-display text-[clamp(1.35rem,2.4vw,1.9rem)] italic leading-[1.45] text-mist"
            >
              From a single exhibition floor to India&apos;s largest fountain
              manufacturer  one ripple at a time.
            </RevealText>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
