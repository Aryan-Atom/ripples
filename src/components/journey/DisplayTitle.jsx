import { emphasizeLine } from '../../data/journey'

/** Static display title with optional italic emphasis (for animated parents). */
export default function DisplayTitle({
  as: Tag = 'h2',
  lines,
  emWord,
  className = '',
  id,
}) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line) => {
        const parts = emphasizeLine(line, emWord)
        return (
          <span key={line} className="journey-heading__line">
            {parts.before}
            {parts.em ? <em>{parts.em}</em> : null}
            {parts.after}
            <br />
          </span>
        )
      })}
    </Tag>
  )
}
