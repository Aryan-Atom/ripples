import { forwardRef } from 'react'

/** Lightweight chapter wrapper for act sections. */
const JourneyChapter = forwardRef(function JourneyChapter(
  { id, children, className = '', as: Tag = 'section', ...rest },
  ref,
) {
  return (
    <Tag ref={ref} id={id} className={`journey-chapter ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
})

export default JourneyChapter
