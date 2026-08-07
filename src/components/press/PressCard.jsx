/**
 * Single press clipping card  keyboard activatable, opens lightbox via onOpen.
 */
export default function PressCard({ clipping, onOpen }) {
  const open = () => onOpen?.(clipping)

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      open()
    }
  }

  return (
    <article className="press-card">
      <button
        type="button"
        className="press-card__hit"
        onClick={open}
        onKeyDown={onKeyDown}
        aria-label={`View clipping: ${clipping.headline}, ${clipping.publication}`}
      >
        <div className="press-card__media">
          <img
            src={clipping.thumbnail}
            alt={clipping.alt}
            loading="lazy"
            decoding="async"
            width={640}
            height={480}
          />
        </div>

        <div className="press-card__body">
          <p className="press-card__pub">{clipping.publication}</p>
          <h3 className="press-card__headline">{clipping.headline}</h3>
          {clipping.date ? (
            <div className="press-card__meta">
              <time className="press-card__date" dateTime={`${clipping.year || ''}`}>
                {clipping.date}
              </time>
              <span className="press-card__view">
                View clipping <span aria-hidden="true">→</span>
              </span>
            </div>
          ) : (
            <div className="press-card__meta">
              <span className="press-card__view">
                View clipping <span aria-hidden="true">→</span>
              </span>
            </div>
          )}
        </div>
      </button>
    </article>
  )
}
