/** Small four-point spark used as a quiet luxury accent in reference layouts. */
export default function JourneySpark({ className = '' }) {
  return (
    <svg
      className={`journey-spark ${className}`.trim()}
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        d="M12 1.5 L13.2 10.8 L22.5 12 L13.2 13.2 L12 22.5 L10.8 13.2 L1.5 12 L10.8 10.8 Z"
        fill="currentColor"
      />
    </svg>
  )
}
