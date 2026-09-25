import FadeUp from '../../motion/FadeUp'
import { CaseStudyFooterCta } from './CaseStudySections'

function Title({ id, lines, em, className }) {
  return (
    <h2 id={id} className={className}>
      {lines.map((line) => (
        <span key={line} className="wgoa-title__line">
          {line === em ? <em>{line}</em> : line}
        </span>
      ))}
    </h2>
  )
}

function WGoaOpener({ study }) {
  const { brief, process } = study
  return (
    <section className="wgoa-opener" aria-labelledby="wgoa-brief-title">
      <div className="wgoa-opener__media" aria-hidden="true">
        <img src={brief.image.src} alt="" />
        <div className="wgoa-opener__veil" />
      </div>
      <div className="r-container wgoa-opener__copy">
        <p className="r-label">{brief.eyebrow}</p>
        <Title
          id="wgoa-brief-title"
          className="wgoa-title wgoa-opener__title"
          lines={brief.titleLines}
          em={brief.titleEm}
        />
        <p className="wgoa-opener__lead">{brief.body}</p>
        {process?.length ? (
          <ol className="wgoa-index">
            {process.map((step) => (
              <li key={step.n}>
                <a href={step.href}>
                  <span className="wgoa-index__n">{step.n}</span>
                  {step.label}
                </a>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  )
}

function WGoaPit({ study }) {
  const { before } = study
  const image = before.images[0]
  return (
    <section id="wgoa-pit" className="wgoa-pit" aria-labelledby="wgoa-pit-title">
      <img src={image.src} alt={image.alt} />
      <div className="wgoa-pit__card">
        <FadeUp as="p" className="r-label" id="wgoa-pit-title">
          {before.eyebrow}
        </FadeUp>
        <FadeUp as="p" className="wgoa-copy wgoa-pit__intro" y={16} delay={0.08}>
          {before.intro}
        </FadeUp>
      </div>
    </section>
  )
}

function WGoaFactory({ study }) {
  const { design } = study
  return (
    <section id="wgoa-factory" className="wgoa-factory" aria-labelledby="wgoa-factory-title">
      <div className="r-container wgoa-factory__head">
        <FadeUp as="p" className="r-label">
          {design.eyebrow}
        </FadeUp>
        <Title
          id="wgoa-factory-title"
          className="wgoa-title wgoa-title--center"
          lines={design.titleLines}
          em={design.titleEm}
        />
        <FadeUp as="p" className="wgoa-copy wgoa-factory__body" y={16} delay={0.08}>
          {design.body}
        </FadeUp>
      </div>
      <div className="wgoa-factory__stack">
        {design.images.map((image, i) => (
          <FadeUp
            key={image.src}
            className={`wgoa-factory__shot wgoa-factory__shot--${i % 2 === 0 ? 'left' : 'right'}`}
            delay={0.06 + i * 0.08}
            y={28}
          >
            <img src={image.src} alt={image.alt} />
            {image.title ? <p className="wgoa-caption">{image.title}</p> : null}
          </FadeUp>
        ))}
      </div>
      {design.note ? (
        <FadeUp as="p" className="wgoa-factory__note r-container" delay={0.12} y={14}>
          {design.note}
        </FadeUp>
      ) : null}
    </section>
  )
}

function WGoaTransport({ study }) {
  const { fabrication } = study
  return (
    <section id="wgoa-road" className="wgoa-road" aria-labelledby="wgoa-road-title">
      <div className="r-container wgoa-road__band">
        <FadeUp as="p" className="wgoa-road__stat" y={20}>
          32
        </FadeUp>
        <div className="wgoa-road__copy">
          <FadeUp as="p" className="r-label">
            {fabrication.eyebrow}
          </FadeUp>
          <Title
            id="wgoa-road-title"
            className="wgoa-title wgoa-title--sm"
            lines={fabrication.titleLines}
            em={fabrication.titleEm}
          />
          <FadeUp as="p" className="wgoa-copy" y={16} delay={0.08}>
            {fabrication.body}
          </FadeUp>
        </div>
      </div>
      <FadeUp className="wgoa-road__wide" y={24} delay={0.1}>
        <img
          src={fabrication.items[2]?.src || fabrication.items[0].src}
          alt={fabrication.items[2]?.alt || fabrication.items[0].alt}
        />
      </FadeUp>
    </section>
  )
}

function WGoaAssembly({ study }) {
  const { assembly } = study
  return (
    <section id="wgoa-assembly" className="wgoa-assembly" aria-labelledby="wgoa-assembly-title">
      <div className="r-container wgoa-assembly__head">
        <FadeUp as="p" className="r-label">
          {assembly.eyebrow}
        </FadeUp>
        <div className="wgoa-assembly__intro">
          <Title
            id="wgoa-assembly-title"
            className="wgoa-title"
            lines={assembly.titleLines}
            em={assembly.titleEm}
          />
          <FadeUp as="p" className="wgoa-copy" y={16} delay={0.08}>
            {assembly.body}
          </FadeUp>
        </div>
      </div>
      <div className="wgoa-film">
        {assembly.frames.map((frame, i) => (
          <FadeUp key={frame.src} className="wgoa-film__row" delay={i * 0.04} y={22}>
            <figure className={`wgoa-film__frame wgoa-film__frame--${(i % 2) + 1}`}>
              <img src={frame.src} alt={frame.alt} />
              <figcaption>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {frame.caption}
              </figcaption>
            </figure>
            {i === 1 && assembly.completion ? (
              <p className="wgoa-film__aside">{assembly.completion}</p>
            ) : null}
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function WGoaCompare({ study }) {
  const { visualization } = study
  return (
    <section id="wgoa-compare" className="wgoa-compare" aria-labelledby="wgoa-compare-title">
      <div className="r-container wgoa-compare__head">
        <FadeUp as="p" className="r-label">
          {visualization.eyebrow}
        </FadeUp>
        <Title
          id="wgoa-compare-title"
          className="wgoa-title wgoa-title--center"
          lines={visualization.titleLines}
          em={visualization.titleEm}
        />
        <FadeUp as="p" className="wgoa-copy wgoa-compare__body" y={16} delay={0.08}>
          {visualization.body}
        </FadeUp>
      </div>
      <div className="wgoa-compare__pair r-container">
        {visualization.modes.map((mode, i) => (
          <FadeUp key={mode.id} className="wgoa-compare__cell" delay={0.06 + i * 0.08} y={24}>
            <p className="wgoa-caption">{mode.label}</p>
            <img src={mode.src} alt={`${mode.label} view of the W Goa rock pool`} />
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function WGoaResult({ study }) {
  const { result } = study
  const image = result.image || { src: result.poster, alt: '' }
  return (
    <section id="wgoa-result" className="wgoa-result" aria-labelledby="wgoa-result-title">
      <div className="r-container wgoa-result__grid">
        <div className="wgoa-result__copy">
          <FadeUp as="p" className="r-label">
            {result.eyebrow}
          </FadeUp>
          <h2 id="wgoa-result-title" className="wgoa-title wgoa-title--sm">
            {result.titleLines.map((line) =>
              line === result.titleEm ? <em key={line}>{line}</em> : <span key={line}>{line} </span>,
            )}
          </h2>
          {result.outcomes?.length ? (
            <ol className="wgoa-outcomes">
              {result.outcomes.map((item, i) => (
                <FadeUp as="li" key={item} delay={0.05 + i * 0.04} y={14}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </FadeUp>
              ))}
            </ol>
          ) : null}
        </div>
        <FadeUp className="wgoa-result__media" y={24} delay={0.1}>
          <img src={image.src} alt={image.alt} />
        </FadeUp>
      </div>
    </section>
  )
}

/** W-Goa process journal  not the Nehru Garden split-panel stack. */
export default function WGoaStudy({ study }) {
  return (
    <div className="wgoa-study">
      <WGoaOpener study={study} />
      <WGoaPit study={study} />
      <WGoaFactory study={study} />
      <WGoaTransport study={study} />
      <WGoaAssembly study={study} />
      <WGoaCompare study={study} />
      <WGoaResult study={study} />
      <CaseStudyFooterCta study={study} />
    </div>
  )
}
