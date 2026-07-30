/** Oversized looping text band. `items` are joined with a droplet separator. */
export default function TextMarquee({ items, reverse = false, className = '' }) {
  const set = (key) => (
    <div className="text-marquee__set" aria-hidden={key !== 'a'} key={key}>
      {items.map((item) => (
        <span className="text-marquee__item" key={`${key}-${item}`}>
          {item}
          <i className="text-marquee__dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  )

  return (
    <div className={`text-marquee${reverse ? ' text-marquee--reverse' : ''} ${className}`.trim()}>
      <div className="text-marquee__track">
        {set('a')}
        {set('b')}
      </div>
    </div>
  )
}
