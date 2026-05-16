import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { fetchCollection, submitBooking } from "./api";
import {
  fallbackBenefits,
  fallbackFaqs,
  fallbackSevas,
  fallbackTestimonials,
  processSteps,
} from "./data";
import "./styles.css";

const navItems = [
  { href: "#sevas", label: "Explore Sevas" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#trust", label: "Why Sri Mayam" },
  { href: "#faqs", label: "FAQs" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header" id="top">
      <nav className="nav" aria-label="Primary navigation">
        <a
          className="brand"
          href="#top"
          aria-label="Sri Mayam home"
          onClick={closeMenu}
        >
          <span className="brand-mark">ॐ</span>
          <span>
            <strong>Sri Mayam</strong>
            <small>Divine sevas, wherever you are</small>
          </span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="nav-links"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="sr-only">Toggle navigation</span>☰
        </button>
        <div className={`nav-links${isMenuOpen ? " open" : ""}`} id="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#booking" onClick={closeMenu}>
            Book a Seva
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-pad">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span></span> Join authentic sevas live
          </p>
          <h1>Book sacred pujas and temple sevas with Sri Mayam.</h1>
          <p className="hero-lead">
            Participate in Vedic rituals performed by experienced purohits at
            sacred kshetras. Share your name and gotra, witness the seva live,
            and receive prasadam at home.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#booking">
              Start My Devotional Journey
            </a>
            <a className="btn btn-secondary" href="#how-it-works">
              See How Blessings Reach You
            </a>
          </div>
          <div className="hero-points" aria-label="Sri Mayam highlights">
            {[
              "Visesh tithis",
              "Dosha parihara",
              "Live darshan",
              "Prasadam delivery",
            ].map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>

        <div className="hero-card" aria-label="Featured Seva">
          <div className="hero-card-top">
            <span className="live-pill">● LIVE</span>
            <span>Upcoming Seva</span>
          </div>
          <div className="mandala" aria-hidden="true">
            <span>श्री</span>
          </div>
          <h2>Maha Ganapati Homam</h2>
          <p>
            Invoke Lord Ganesha's blessings for obstacle removal, auspicious
            beginnings, prosperity, and family harmony.
          </p>
          <ul>
            <li>Performed with your sankalpa</li>
            <li>Live link shared before the ritual</li>
            <li>Prasadam and blessing kit delivered</li>
          </ul>
          <a className="card-link" href="#booking">
            Reserve your sankalpa →
          </a>
        </div>
      </div>
    </section>
  );
}

function BlessingStrip({ benefits }) {
  return (
    <section className="blessing-strip" aria-label="Seva benefits">
      <div className="container blessing-grid">
        {benefits.map((benefit) => (
          <article key={benefit.title}>
            <span className="icon">{benefit.icon}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Sevas({ sevas }) {
  return (
    <section className="section-pad" id="sevas">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">
            <span></span> Explore sevas
          </p>
          <h2>Choose a seva for your spiritual need.</h2>
          <p>
            Sri Mayam curates pujas for auspicious days, graha gochara,
            festivals, dosha parihara, health, prosperity, and family wellbeing.
          </p>
        </div>
        <div className="seva-grid">
          {sevas.map((seva) => (
            <article className="seva-card" key={seva.id || seva.title}>
              <div className={`seva-art ${seva.art || "ganapati"}`}></div>
              <span>{seva.category}</span>
              <h3>{seva.title}</h3>
              <p>{seva.description}</p>
              <a href="#booking">Book now</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section-pad how" id="how-it-works">
      <div className="container process-grid">
        <div className="section-heading left">
          <p className="eyebrow">
            <span></span> How blessings reach you
          </p>
          <h2>A simple path from booking to prasadam.</h2>
          <p>
            Inspired by the convenience of modern digital seva platforms, Sri
            Mayam keeps the journey easy while honoring the discipline of
            traditional worship.
          </p>
        </div>
        <div className="steps">
          {processSteps.map((step) => (
            <article key={step.step}>
              <b>{step.step}</b>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="section-pad stats" id="trust">
      <div className="container stats-grid">
        <div>
          <p className="eyebrow">
            <span></span> Why Sri Mayam
          </p>
          <h2>Devotion, transparency, and care in every ritual.</h2>
          <p>
            Sri Mayam is designed for devotees who want authentic worship
            without worrying about logistics, venue coordination, or ritual
            arrangements.
          </p>
        </div>
        <div className="stat-cards">
          <article>
            <strong>108+</strong>
            <span>Curated seva options</span>
          </article>
          <article>
            <strong>24/7</strong>
            <span>Digital booking access</span>
          </article>
          <article>
            <strong>100%</strong>
            <span>Sankalpa-focused rituals</span>
          </article>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ testimonials }) {
  return (
    <section className="section-pad testimonial-section">
      <div className="container testimonial-grid">
        {testimonials.map((testimonial) => (
          <article
            className={`testimonial-card${testimonial.featured ? " featured" : ""}`}
            key={testimonial.author}
          >
            <p>“{testimonial.quote}”</p>
            <strong>— {testimonial.author}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function BookingForm({ sevas }) {
  const [formState, setFormState] = useState({ name: "", phone: "", seva: "" });
  const [status, setStatus] = useState({
    state: "idle",
    message:
      "Connect VITE_API_BASE_URL to accept live bookings through your backend.",
  });

  const sevaOptions = useMemo(() => sevas.map((seva) => seva.title), [sevas]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: "loading", message: "Submitting your seva enquiry..." });

    try {
      const response = await submitBooking(formState);
      setFormState({ name: "", phone: "", seva: "" });
      setStatus({
        state: "success",
        message: response.offline
          ? `Thank you, ${formState.name}. Your enquiry for ${formState.seva} is ready for backend integration.`
          : `Thank you, ${formState.name}. Sri Mayam has received your enquiry for ${formState.seva}.`,
      });
    } catch (error) {
      console.error("Sri Mayam booking submit failed.", error);
      setStatus({
        state: "error",
        message:
          "We could not submit your enquiry right now. Please try again or contact Sri Mayam support.",
      });
    }
  };

  return (
    <section className="section-pad booking" id="booking">
      <div className="container booking-card">
        <div>
          <p className="eyebrow">
            <span></span> Book with Sri Mayam
          </p>
          <h2>Begin your seva request today.</h2>
          <p>
            Tell us the blessing you seek. Our team will help you choose the
            right puja, tithi, and prasadam option.
          </p>
        </div>
        <form
          className="booking-form"
          aria-label="Sri Mayam booking enquiry form"
          onSubmit={handleSubmit}
        >
          <label>
            Full name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formState.name}
              onChange={updateField}
              required
            />
          </label>
          <label>
            Mobile number
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formState.phone}
              onChange={updateField}
              required
            />
          </label>
          <label>
            Preferred seva
            <select
              name="seva"
              value={formState.seva}
              onChange={updateField}
              required
            >
              <option value="">Select a seva</option>
              {sevaOptions.map((seva) => (
                <option key={seva}>{seva}</option>
              ))}
            </select>
          </label>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={status.state === "loading"}
          >
            {status.state === "loading" ? "Submitting..." : "Request Booking"}
          </button>
          <p className={`form-note ${status.state}`}>{status.message}</p>
        </form>
      </div>
    </section>
  );
}

function Faqs({ faqs }) {
  return (
    <section className="section-pad faqs" id="faqs">
      <div className="container faq-grid">
        <div className="section-heading left">
          <p className="eyebrow">
            <span></span> FAQs
          </p>
          <h2>Clear your doubts before booking.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">ॐ</span>
            <span>
              <strong>Sri Mayam</strong>
              <small>Online puja & seva booking</small>
            </span>
          </a>
          <p>
            Bringing devotees closer to sacred rituals through simple digital
            booking, transparent updates, and heartfelt service.
          </p>
        </div>
        <div>
          <h3>Services</h3>
          <a href="#sevas">Explore Sevas</a>
          <a href="#booking">Book a Puja</a>
          <a href="#faqs">FAQs</a>
        </div>
        <div>
          <h3>Reach Us</h3>
          <p>support@srimayam.com</p>
          <p>+91 98765 43210</p>
          <p>Chennai, Tamil Nadu</p>
        </div>
      </div>
      <p className="copyright">© 2026 Sri Mayam. All rights reserved.</p>
    </footer>
  );
}

function App() {
  const [content, setContent] = useState({
    benefits: fallbackBenefits,
    sevas: fallbackSevas,
    testimonials: fallbackTestimonials,
    faqs: fallbackFaqs,
  });

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      const [benefits, sevas, testimonials, faqs] = await Promise.all([
        fetchCollection("benefits", fallbackBenefits),
        fetchCollection("sevas", fallbackSevas),
        fetchCollection("testimonials", fallbackTestimonials),
        fetchCollection("faqs", fallbackFaqs),
      ]);

      if (isMounted) {
        setContent({ benefits, sevas, testimonials, faqs });
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BlessingStrip benefits={content.benefits} />
        <Sevas sevas={content.sevas} />
        <HowItWorks />
        <Trust />
        <Testimonials testimonials={content.testimonials} />
        <BookingForm sevas={content.sevas} />
        <Faqs faqs={content.faqs} />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
