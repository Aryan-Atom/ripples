import PressCard from './PressCard'

/** Responsive card grid of clippings. */
export default function PressGrid({
  items,
  onOpen,
  emptyLabel = 'No clippings match these filters.',
}) {
  if (!items.length) {
    return (
      <p className="press-grid__empty" role="status">
        {emptyLabel}
      </p>
    )
  }

  return (
    <div className="press-grid" role="list">
      {items.map((clipping) => (
        <div className="press-grid__cell" key={clipping.id} role="listitem">
          <PressCard clipping={clipping} onOpen={onOpen} />
        </div>
      ))}
    </div>
  )
}
