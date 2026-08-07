import { Fragment } from 'react'
import FadeUp from '../../motion/FadeUp'
import SplitLines from '../../motion/SplitLines'
import { emphasizeLine } from '../../data/journey'

export default function SectionHeading({
  act,
  label,
  titleLines,
  titleEm,
  body,
  className = '',
  align = 'left',
  titleId,
  ruled = false,
  titleClassName = '',
  asTitle: TitleTag = null,
}) {
  const Title = TitleTag || (ruled ? 'h2' : SplitLines)

  const titleNodes = titleLines?.map((line, i) => {
    const parts = emphasizeLine(line, titleEm)
    return (
      <Fragment key={line}>
        {ruled ? (
          <span className="journey-heading__ruled-line">
            <span className="journey-heading__ruled-text">
              {parts.before}
              {parts.em ? <em>{parts.em}</em> : null}
              {parts.after}
            </span>
          </span>
        ) : (
          <>
            {parts.before}
            {parts.em ? <em>{parts.em}</em> : null}
            {parts.after}
            {i < titleLines.length - 1 ? <br /> : null}
          </>
        )}
      </Fragment>
    )
  })

  return (
    <div className={`journey-heading journey-heading--${align}${ruled ? ' journey-heading--ruled' : ''} ${className}`.trim()}>
      {act && (
        <FadeUp as="p" className="journey-heading__act r-label">
          {act.label}
        </FadeUp>
      )}
      {label && !act && (
        <FadeUp as="p" className="r-label">
          {label}
        </FadeUp>
      )}
      {titleLines?.length > 0 && (
        ruled ? (
          <FadeUp as="div" y={24}>
            <h2 id={titleId} className={`r-display journey-heading__title ${titleClassName}`.trim()}>
              {titleNodes}
            </h2>
          </FadeUp>
        ) : (
          <Title as="h2" id={titleId} className={`r-display journey-heading__title ${titleClassName}`.trim()}>
            {titleNodes}
          </Title>
        )
      )}
      {body && (
        <FadeUp as="p" className="journey-heading__body" delay={0.12}>
          {body}
        </FadeUp>
      )}
    </div>
  )
}
