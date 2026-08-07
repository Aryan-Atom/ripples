import FadeUp from '../../motion/FadeUp'
import SplitLines from '../../motion/SplitLines'
import SplitPanel from './SplitPanel'
import { JOURNEY_PHILOSOPHY } from '../../data/journey'

export default function PhilosophySection() {
  const data = JOURNEY_PHILOSOPHY

  return (
    <SplitPanel
      id="philosophy"
      className="philosophy"
      ariaLabelledby="philosophy-title"
      media={
        <figure className="philosophy__media">
          <img
            src={data.image.src}
            alt={data.image.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>
      }
    >
      <FadeUp as="p" className="r-label">
        {data.label}
      </FadeUp>
      <SplitLines as="h2" id="philosophy-title" className="philosophy__title">
        {data.title}
      </SplitLines>
      <FadeUp as="p" className="philosophy__aside" delay={0.16}>
        <em>{data.aside}</em>
      </FadeUp>
    </SplitPanel>
  )
}
