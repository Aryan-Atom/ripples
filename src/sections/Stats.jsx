import { useCounter } from '../motion/useCounter'
import { RuleTitle } from '../ui/GoldRule'
import GoldRule from '../ui/GoldRule'

function Stat({ value, suffix = '', label, isText }) {
  const ref = useCounter(isText ? 0 : value, { suffix })
  return (
    <article className="flex flex-col items-center gap-3 text-center">
      <span
        ref={isText ? undefined : ref}
        className="font-display text-[clamp(2rem,4vw,3.25rem)] font-normal tracking-[0.04em] text-gold"
      >
        {isText ? value : `0${suffix}`}
      </span>
      <span className="font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-mist/55">
        {label}
      </span>
    </article>
  )
}

export default function Stats() {
  return (
    <section className="bg-void px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4.5rem,12vw,7.5rem)]">
      <div className="mx-auto max-w-7xl">
        <RuleTitle>India&apos;s Largest Fountain Manufacturer</RuleTitle>
        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <Stat value={35} suffix="+" label="Years" />
          <Stat value={170} suffix="+" label="Employees" />
          <Stat value="ISO 9001:2015" label="Certified" isText />
          <Stat value={1000} suffix="+" label="Projects" />
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl">
        <GoldRule />
      </div>
    </section>
  )
}
