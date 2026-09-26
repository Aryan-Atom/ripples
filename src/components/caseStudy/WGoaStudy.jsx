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

function ChapterNum({ n }) {
  return (
    <p className="wgoa-num">
      <span>{n}</span>
    </p>
  )
}

function Chapter({
  id,
  as: Tag = 'section',
  align = 'image',
  index,
  eyebrow,
  titleId,
  titleLines,
  titleEm,
  body,
  image,
  caption,
  children,
}) {
  return (
    <Tag
      id={id}
      className={`wgoa-chapter wgoa-chapter--${align}`}
      aria-labelledby={titleId}
    >
      <div className="wgoa-chapter__copy">
        {index ? <ChapterNum n={index} /> : null}
        {eyebrow && !index ? (
          <FadeUp as="p" className="r-label">
            {eyebrow}
          </FadeUp>
        ) : null}
        {titleLines ? (
          <Title id={titleId} className="wgoa-title wgoa-title--sm" lines={titleLines} em={titleEm} />
        ) : null}
        {body ? (
          <FadeUp as="p" className="wgoa-copy" y={16} delay={0.08}>
            {body}
          </FadeUp>
        ) : null}
        {children}
      </div>
      {image ? (
        <FadeUp className="wgoa-chapter__media" y={28} delay={0.08}>
          <img src={image.src} alt={image.alt} />
          {caption ? <p className="wgoa-caption">{caption}</p> : null}
        </FadeUp>
      ) : null}
    </Tag>
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
      <div className="wgoa-opener__copy">
        <p className="wgoa-opener__kicker">Case study</p>
        <p className="wgoa-opener__place">W Goa</p>
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
  return (
    <Chapter
      id="wgoa-pit"
      align="image"
      index="01"
      titleId="wgoa-pit-title"
      titleLines={['From pit', 'to pool.']}
      titleEm="to pool."
      image={before.images[0]}
    >
      <FadeUp as="p" className="wgoa-copy" y={16} delay={0.08}>
        {before.intro}
      </FadeUp>
    </Chapter>
  )
}

function WGoaFactory({ study }) {
  const { design } = study
  return (
    <Chapter
      id="wgoa-factory"
      align="text"
      index="02"
      titleId="wgoa-factory-title"
      titleLines={design.titleLines}
      titleEm={design.titleEm}
      body={design.body}
      image={design.images[0]}
    >
      {design.note ? (
        <FadeUp as="p" className="wgoa-chapter__note" y={14} delay={0.12}>
          {design.note}
        </FadeUp>
      ) : null}
    </Chapter>
  )
}

function WGoaTransport({ study }) {
  const { fabrication } = study
  const image = fabrication.items[2] || fabrication.items[0]
  return (
    <Chapter
      id="wgoa-road"
      align="image"
      index="03"
      titleId="wgoa-road-title"
      titleLines={fabrication.titleLines}
      titleEm={fabrication.titleEm}
      image={image}
      body={fabrication.body}
    />
  )
}

function WGoaAssembly({ study }) {
  const { assembly } = study
  return (
    <Chapter
      id="wgoa-assembly"
      align="text"
      index="04"
      titleId="wgoa-assembly-title"
      titleLines={assembly.titleLines}
      titleEm={assembly.titleEm}
      body={assembly.body}
      image={assembly.frames[0]}
    />
  )
}

function WGoaResult({ study }) {
  const { result, visualization, assembly, brief } = study
  const image = result.image || { src: result.poster, alt: '' }
  return (
    <section id="wgoa-result" className="wgoa-result" aria-labelledby="wgoa-result-title">
      <Chapter
        as="div"
        align="image"
        index="05"
        titleId="wgoa-result-title"
        titleLines={result.titleLines}
        titleEm={result.titleEm}
        image={image}
      >
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
      </Chapter>

      {visualization?.modes?.length ? (
        <div className="wgoa-result__pair">
          <p className="wgoa-num">
            <span>Day & night</span>
          </p>
          <div className="wgoa-result__modes">
            {visualization.modes.map((mode, i) => (
              <FadeUp key={mode.id} className="wgoa-result__mode" delay={0.06 + i * 0.08} y={20}>
                <p className="wgoa-caption">{mode.label}</p>
                <img src={mode.src} alt={`${mode.label} view of the W Goa rock pool`} />
              </FadeUp>
            ))}
          </div>
        </div>
      ) : null}

      <div className="wgoa-closer">
        <img src={brief.image.src} alt={brief.image.alt} />
        <div className="wgoa-closer__veil" />
        <div className="wgoa-closer__copy">
          <p className="wgoa-num">
            <span>Completion</span>
          </p>
          <p className="wgoa-closer__lead">{assembly.completion}</p>
        </div>
      </div>
    </section>
  )
}

/** W-Goa case study  opener, then alternating image / text chapters through the result. */
export default function WGoaStudy({ study }) {
  return (
    <div className="wgoa-study">
      <WGoaOpener study={study} />
      <WGoaPit study={study} />
      <WGoaFactory study={study} />
      <WGoaTransport study={study} />
      <WGoaAssembly study={study} />
      <WGoaResult study={study} />
      <CaseStudyFooterCta study={study} />
    </div>
  )
}
