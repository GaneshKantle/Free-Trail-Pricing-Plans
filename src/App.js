import { useEffect, useState } from "react";
import "./App.css";
import PricingSection11 from "./components/PricingSection11";

const validPages = ["home", "about", "contact"];

const homeHighlights = [
  {
    title: "Editorial presence",
    copy: "Position your brand, profile, or campaign with a refined, magazine-level presentation.",
  },
  {
    title: "Effortless flow",
    copy: "A clear structure that helps visitors understand the offering and move forward without friction.",
  },
  {
    title: "Designed to evolve",
    copy: "Begin with the essentials and expand into stronger visibility, sharper positioning, and deeper support.",
  },
];

const aboutPoints = [
  {
    title: "Adaptive by design",
    copy: "Built to support creators, brands, professionals, and campaign-driven projects with equal clarity.",
  },
  {
    title: "Refined brand experience",
    copy: "Every element is shaped to present WI Thinkers with precision, consistency, and intent.",
  },
  {
    title: "Clarity over clutter",
    copy: "A minimal structure that keeps the message focused and the next steps easy to follow.",
  },
];

const contactSteps = [
  {
    title: "Select your plan",
    copy: "Review the available options and choose the level that aligns with your current direction.",
  },
  {
    title: "Define your brief",
    copy: "Share your goals, audience, timeline, and creative direction to set a clear foundation.",
  },
  {
    title: "Proceed with alignment",
    copy: "With the right inputs in place, the next steps become structured, efficient, and purposeful.",
  },
];

function getRouteState() {
  if (typeof window === "undefined") {
    return { page: "home", section: "" };
  }

  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const section = params.get("section") || "";

  return {
    page: validPages.includes(page) ? page : "home",
    section,
  };
}

function buildUrl(page, section = "") {
  if (typeof window === "undefined") {
    return "/";
  }

  const params = new URLSearchParams();

  if (page !== "home") {
    params.set("page", page);
  }

  if (section) {
    params.set("section", section);
  }

  const query = params.toString();
  return `${window.location.pathname}${query ? `?${query}` : ""}`;
}

function NavItem({ currentPage, label, page, onNavigate }) {
  const isActive = currentPage === page;

  return (
    <a
      className={`nav-link ${isActive ? "nav-link-active" : ""}`.trim()}
      href={buildUrl(page)}
      onClick={onNavigate(page)}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </a>
  );
}

function FooterItem({ label, page, onNavigate }) {
  return (
    <a className="footer-link" href={buildUrl(page)} onClick={onNavigate(page)}>
      {label}
    </a>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <section className="page-card page-hero">
        <p className="eyebrow">WI Thinkers</p>
        <h1 className="page-title">Magazine Services</h1>
        <p className="page-copy">
          A simpler service page for editorial-style promotion, better
          presentation, and a more polished public image.
        </p>

        <div className="page-actions">
          <a
            className="button button-primary"
            href={buildUrl("home", "plans")}
            onClick={onNavigate("home", "plans")}
          >
            View Plans
          </a>
          <a
            className="button button-secondary"
            href={buildUrl("about")}
            onClick={onNavigate("about")}
          >
            About Us
          </a>
        </div>

        <div className="mini-grid">
          {homeHighlights.map((item) => (
            <article className="mini-card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="page-section"
        id="plans"
        aria-labelledby="plans-title"
      >
        <div className="section-intro">
          <p className="eyebrow">Plans</p>
          <h2 className="section-title" id="plans-title">
            Choose the service level that fits now
          </h2>
          <p className="section-copy">
            The pricing section stays on the home page so visitors can move from
            overview to action without extra steps.
          </p>
        </div>

        <div className="pricing-wrap">
          <PricingSection11 />
        </div>
      </section>
    </>
  );
}

function AboutPage({ onNavigate }) {
  return (
    <section className="page-card page-panel">
      <p className="eyebrow">About</p>
      <h1 className="page-title">About WI Thinkers Magazine Services</h1>
      <p className="page-copy">
        We don’t just publish magazines. We build presence.
      </p>
      <div className="copy-stack">
        <p>
          This platform was created for those who understand that visibility
          isn’t accidental — it’s crafted. Every feature, every cover, every
          story is a deliberate composition of identity, aesthetic, and intent.
        </p>
        <p>
        Rooted in fashion, beauty, and visual culture, our work goes beyond surface-level content. We curate narratives that capture individuality while aligning with a global standard of editorial excellence. From emerging talent to established faces, each inclusion is selected with purpose — not volume.
        </p>
        <p>
        Our ecosystem is designed to bridge talent with exposure. Through curated submissions, editorial placements, and digital amplification, we position creators where they are not just seen, but remembered.
        </p>
        <p>
        For contributors, this is more than a feature — it’s positioning.
        </p>
        <p>
        For readers, it’s a window into what defines relevance today and what shapes it tomorrow.        </p>
        <p>
        We don’t follow trends.
        <br/>
        We refine them, frame them, and publish them.</p>
      </div>
   
      <div className="mini-grid">
        {aboutPoints.map((item) => (
          <article className="mini-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
      <div className="page-actions">
        <a
          className="button button-primary"
          href={buildUrl("home", "plans")}
          onClick={onNavigate("home", "plans")}
        >
          View Plans
        </a>
        <a
          className="button button-secondary"
          href={buildUrl("contact")}
          onClick={onNavigate("contact")}
        >
          Contact Page
        </a>
      </div>
    </section>
  );
}

function ContactPage({ onNavigate }) {
  return (
<section className="page-card page-panel">
  <p className="eyebrow">Contact</p>
  <h1 className="page-title">Start with clarity</h1>
  <p className="page-copy">
    A well-defined brief sets the tone for everything that follows. Take a
    moment to choose the plan that fits your intent, then share the details
    that help us understand your vision with precision.
  </p>

  <div className="copy-stack">
    <p>
      This space is designed to keep things focused. Instead of overwhelming
      you with options, we guide you toward the next step that actually
      matters.
    </p>
    <p>
      When reaching out, include your objective, audience, timeline, and any
      creative direction you already have in mind. The clearer the input, the
      sharper and more aligned the outcome.
    </p>
  </div>

  <div className="mini-grid">
    {contactSteps.map((item) => (
      <article className="mini-card" key={item.title}>
        <h2>{item.title}</h2>
        <p>{item.copy}</p>
      </article>
    ))}
  </div>

  <div className="page-actions">
    <a
      className="button button-primary"
      href={buildUrl("home", "plans")}
      onClick={onNavigate("home", "plans")}
    >
      Choose a Plan
    </a>
    <a
      className="button button-secondary"
      href={buildUrl("about")}
      onClick={onNavigate("about")}
    >
      Read About
    </a>
  </div>
</section>
  );
}

function App() {
  const [{ page, section }, setRouteState] = useState(getRouteState);

  useEffect(() => {
    const syncRoute = () => {
      setRouteState(getRouteState());
    };

    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    if (page === "home" && section) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(section);

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (!/jsdom/i.test(window.navigator.userAgent)) {
      window.scrollTo(0, 0);
    }

    return undefined;
  }, [page, section]);

  const navigateTo =
    (nextPage, nextSection = "") =>
    (event) => {
      event.preventDefault();

      const nextState = {
        page: nextPage,
        section: nextSection,
      };

      window.history.pushState(nextState, "", buildUrl(nextPage, nextSection));
      setRouteState(nextState);
    };

  let pageContent = <HomePage onNavigate={navigateTo} />;

  if (page === "about") {
    pageContent = <AboutPage onNavigate={navigateTo} />;
  }

  if (page === "contact") {
    pageContent = <ContactPage onNavigate={navigateTo} />;
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand-link"
            href={buildUrl("home")}
            onClick={navigateTo("home")}
          >
            <span className="brand-kicker">WI Thinkers</span>
            <span className="brand-title">Magazine Services</span>
          </a>

          <nav className="site-nav" aria-label="Main navigation">
            <NavItem
              currentPage={page}
              label="Home"
              page="home"
              onNavigate={navigateTo}
            />
            <NavItem
              currentPage={page}
              label="About"
              page="about"
              onNavigate={navigateTo}
            />
            <NavItem
              currentPage={page}
              label="Contact"
              page="contact"
              onNavigate={navigateTo}
            />
          </nav>

          <a
            className="header-cta"
            href={buildUrl("home", "plans")}
            onClick={navigateTo("home", "plans")}
          >
            View Plans
          </a>
        </div>
      </header>

      <main className="site-main">
        <div className="container">{pageContent}</div>
      </main>

      <footer className="site-footer">
        <div className="footer-card">
          <div className="footer-inner">
            <div className="footer-copy">
              <p className="eyebrow">WI Thinkers</p>
              <p className="footer-title">Magazine Services by WI Thinkers</p>
              <p className="footer-text">
                A cleaner and more minimal service experience for
                editorial-style promotion, positioning, and brand presentation.
              </p>
            </div>

            <div className="footer-links">
              <FooterItem label="Home" page="home" onNavigate={navigateTo} />
              <FooterItem label="About" page="about" onNavigate={navigateTo} />
              <FooterItem
                label="Contact"
                page="contact"
                onNavigate={navigateTo}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
