export default function Footer() {
  return (
    <footer className="border-t border-gold/45 bg-void-soft pt-[clamp(3.5rem,8vw,5rem)] text-mist/55">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-[clamp(1.25rem,4vw,3rem)] pb-12 md:grid-cols-4">
        <div>
          <h3 className="mb-4 font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-gold">
            Capabilities
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#services">
                Indoor Fountains
              </a>
            </li>
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#services">
                Architectural Fountains
              </a>
            </li>
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#services">
                Swimming Pools
              </a>
            </li>
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#services">
                Multimedia Shows
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-gold">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#about">
                Our Story
              </a>
            </li>
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#contact">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-gold">
            Projects
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#projects">
                Isola Courtyard Fountain
              </a>
            </li>
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#projects">
                Multimedia Fountain Show
              </a>
            </li>
            <li>
              <a data-cursor="hover" className="hover:text-mist" href="#projects">
                International Exhibitions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-gold">
            Contact
          </h3>
          <address className="text-sm not-italic leading-relaxed">
            C-119, Hosiery Complex
            <br />
            Phase 2 Extension, Noida
            <br />
            Uttar Pradesh 201305
          </address>
          <a
            data-cursor="hover"
            className="mt-3 block text-sm hover:text-mist"
            href="tel:+919350001901"
          >
            +91 93500 01901
          </a>
          <a
            data-cursor="hover"
            className="mt-1 block text-sm hover:text-mist"
            href="mailto:admin@ripplesfountains.com"
          >
            admin@ripplesfountains.com
          </a>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 px-[clamp(1.25rem,4vw,3rem)] py-5 text-[0.68rem] uppercase tracking-[0.1em]">
        <span className="font-display tracking-[0.08em] text-mist">
          Ripples Engineering Pvt. Ltd.
        </span>
        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  )
}
