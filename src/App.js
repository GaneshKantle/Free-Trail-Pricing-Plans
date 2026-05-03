import './App.css';
import PricingSection11 from './components/PricingSection11';

const serviceHighlights = [
  {
    title: 'Editorial Positioning',
    copy: 'Shape your public presence with a cleaner, more polished magazine-style presentation.',
  },
  {
    title: 'Promotion Support',
    copy: 'Pair visibility with thoughtful campaign structure so your growth feels premium and intentional.',
  },
  {
    title: 'Flexible Growth Plans',
    copy: 'Start where you are and scale into stronger placements, priority support, and premium momentum.',
  },
];

const aboutCards = [
  {
    title: 'Magazine-first thinking',
    copy: 'Every service is designed to make your brand feel curated, publishable, and aligned with editorial quality.',
  },
  {
    title: 'Built for modern creators',
    copy: 'The structure works for individual talent, personal brands, and collaboration-led campaigns that need clarity.',
  },
  {
    title: 'Growth with polish',
    copy: 'We focus on visibility that feels elevated, helping you move from scattered presence to stronger positioning.',
  },
];

const contactCards = [
  {
    title: 'Choose a plan',
    copy: 'Select the level that fits your current stage and open the built-in intake flow in just a few clicks.',
  },
  {
    title: 'Share your brief',
    copy: 'Use the details field during checkout to explain your goals, timeline, audience, and collaboration needs.',
  },
  {
    title: 'Start aligned',
    copy: 'Your information reaches the WI Thinkers team before payment so the right service path can be prepared.',
  },
];

function App() {
  return (
    <div className="services-page" id="top">
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo-link" href="#top" aria-label="WI Thinkers Magazine Services home">
            <span className="logo-mark">WI</span>
            <span className="logo-copy">
              <span className="logo-text">WI Thinkers</span>
              <span className="logo-subtext">Magazine Services</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Main navigation">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="nav-cta" href="#plans">
            View Plans
          </a>
        </div>
      </header>

      <main className="services-main">
        <section
          className="services-intro container anchor-section"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="intro-panel">
            <p className="section-kicker">Editorial Growth Studio</p>

            <div className="intro-grid">
              <div>
                <h1 id="services-title">Magazine Services by WI Thinkers</h1>
                <p className="intro-copy">
                  Premium magazine-style services for creators, talent, and modern brands that
                  want a polished public presence, stronger visibility, and growth that feels
                  intentional.
                </p>
              </div>

              <div className="intro-note">
                <span className="note-pill">Light glassmorphism</span>
                <p>
                  The experience stays clean and airy while keeping the same editorial mood,
                  making the service page feel more premium without drifting away from the
                  existing theme.
                </p>
              </div>
            </div>

            <div className="intro-highlights" aria-label="Service highlights">
              {serviceHighlights.map((item) => (
                <article className="highlight-card" key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="anchor-section" id="plans">
          <PricingSection11 />
        </div>

        <section className="content-section container anchor-section" id="about" aria-labelledby="about-title">
          <div className="glass-section">
            <p className="section-kicker">About</p>
            <h2 className="section-heading" id="about-title">
              A more polished way to present creative talent
            </h2>
            <p className="section-copy">
              WI Thinkers builds magazine service experiences for creators and brands that want to
              look more refined, more credible, and more ready for the next opportunity. Instead of
              generic promotion, the focus is on presentation, positioning, and visibility that
              feels professionally curated.
            </p>
            <p className="section-copy">
              Whether you are strengthening a personal brand, preparing for collaborations, or
              creating a stronger editorial identity, these services are structured to help you move
              with more confidence and consistency. The goal is simple: make your growth look as
              premium as the work behind it.
            </p>

            <div className="feature-grid">
              {aboutCards.map((item) => (
                <article className="feature-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section container anchor-section" id="contact" aria-labelledby="contact-title">
          <div className="glass-section">
            <p className="section-kicker">Contact</p>
            <h2 className="section-heading" id="contact-title">
              Start the conversation with the right brief
            </h2>
            <p className="section-copy">
              Choose a plan to begin right away, then use the intake form to share your project
              goals, brand direction, collaboration needs, and timeline. That keeps every request
              organized and gives the WI Thinkers team the context needed to support you properly.
            </p>

            <div className="contact-grid">
              {contactCards.map((item) => (
                <article className="contact-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>

            <div className="section-actions">
              <a className="section-button section-button-primary" href="#plans">
                Choose a Plan
              </a>
              <a className="section-button section-button-secondary" href="#about">
                Read About the Service
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-shell">
            <div className="footer-brand">
              <p className="section-kicker">WI Thinkers</p>
              <h2>Magazine Services</h2>
              <p>
                A cleaner, more general service experience for creators, talent, and brands that
                want editorial-style growth support.
              </p>
            </div>

            <div className="footer-column">
              <h3>Navigate</h3>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-column">
              <h3>How It Works</h3>
              <p>Explore the plans, choose the best fit, and send your brief through the intake flow to get started.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
