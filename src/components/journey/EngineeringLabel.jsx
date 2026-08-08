import { memo } from 'react'

/** Thin callout label with engineering leader line. */
function EngineeringLabel({ text, x = 50, y = 50, className = '' }) {
  const side = x > 50 ? 'right' : 'left'

  return (
    <div
      className={`eng-label eng-label--${side} ${className}`.trim()}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className="eng-label__dot" aria-hidden="true" />
      <span className="eng-label__line" aria-hidden="true" />
      <span className="eng-label__text">{text}</span>
    </div>
  )
}

export default memo(EngineeringLabel)
