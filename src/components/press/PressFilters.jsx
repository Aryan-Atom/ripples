/**
 * Client-side filter pills  All / publication / year.
 */
export default function PressFilters({
  publications,
  years,
  publicationFilter,
  yearFilter,
  onPublicationChange,
  onYearChange,
}) {
  return (
    <div className="press-filters" role="toolbar" aria-label="Filter press coverage">
      <div className="press-filters__group" role="group" aria-label="Publication">
        <button
          type="button"
          className={`press-filters__pill${publicationFilter === 'all' ? ' is-active' : ''}`}
          aria-pressed={publicationFilter === 'all'}
          onClick={() => onPublicationChange('all')}
        >
          All
        </button>
        {publications.map((pub) => (
          <button
            type="button"
            key={pub.id}
            className={`press-filters__pill${publicationFilter === pub.id ? ' is-active' : ''}`}
            aria-pressed={publicationFilter === pub.id}
            onClick={() => onPublicationChange(pub.id)}
          >
            {pub.short}
          </button>
        ))}
      </div>

      {years?.length > 0 && (
        <div className="press-filters__group" role="group" aria-label="Year">
          <button
            type="button"
            className={`press-filters__pill${yearFilter === 'all' ? ' is-active' : ''}`}
            aria-pressed={yearFilter === 'all'}
            onClick={() => onYearChange('all')}
          >
            All years
          </button>
          {years.map((year) => (
            <button
              type="button"
              key={year}
              className={`press-filters__pill${yearFilter === year ? ' is-active' : ''}`}
              aria-pressed={yearFilter === year}
              onClick={() => onYearChange(year)}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
