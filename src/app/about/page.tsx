// app/about/page.tsx
// Next.js App Router – About Us page for EasyAstro (server-safe, no styled-jsx)

export const metadata = {
  title: "About Us – EasyAstro",
  description:
    "At EasyAstro, we blend ancient wisdom with modern experiences to help you discover your soulmate, unlock wealth, and decode your life path.",
  openGraph: {
    title: "About Us – EasyAstro",
    description:
      "Astrologers, intuitive artists, and energy readers guiding India with modern, human-first astrology.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us – EasyAstro",
    description:
      "Astrologers, intuitive artists, and energy readers guiding India with modern, human-first astrology.",
  },
};

export default function AboutPage() {
  return (
    <main className="about">
      {/* Server-safe global styles (scoped by class names) */}
      <style>{`
        .about {
          min-height: 100vh;
          background: #0b0b12;
          color: #eef2f6;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Inter, Arial;
          padding: 80px 20px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
        }
        h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 20px;
          background: linear-gradient(90deg, #9b7bff, #25d0ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        h2 {
          font-size: clamp(1.25rem, 3.2vw, 1.6rem);
          margin: 28px 0 10px;
          color: #dfe6f0;
          letter-spacing: 0.2px;
        }
        p {
          color: #aab1bf;
          line-height: 1.75;
          font-size: 1.075rem;
          margin-bottom: 16px;
        }
        ul {
          margin: 0 0 12px 1.15rem;
          padding: 0;
          color: #bcc4d1;
          line-height: 1.7;
          font-size: 1.02rem;
        }
        li { margin: 6px 0; }
        .note {
          margin-top: 22px;
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
          border: 1px solid rgba(255,255,255,.10);
          padding: 16px;
          color: #c9d1de;
        }
      `}</style>

      <div className="container">
        <h1>About Us</h1>

        {/* Your original content */}
        <p>
          At EasyAstro, we believe the universe holds answers to questions your
          heart hasn’t dared to ask yet.
        </p>
        <p>
          We’re a team of passionate astrologers, intuitive artists, and energy
          readers helping people across India discover their soulmate, unlock
          wealth, and decode their life path — all through ancient wisdom
          delivered in modern ways.
        </p>

        {/* More content in the SAME section */}
        <h2>Our Story</h2>
        <p>
          EasyAstro began as a simple promise: make astrology feel clear,
          compassionate, and truly useful. We took the depth of classical Vedic
          principles and shaped them into modern, human-first experiences that
          are easy to understand and put into action.
        </p>

        <h2>How We Work</h2>
        <p>
          Every reading combines time-tested methods with practical guidance.
          You’ll get insights you can use today—whether that’s timing a career
          move, calling in aligned relationships, or finding steady momentum on
          your life path.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Love &amp; Soulmates:</strong> Deep compatibility reads and
            timing windows to attract and nurture aligned relationships.
          </li>
          <li>
            <strong>Career &amp; Wealth:</strong> Mahadasha and transit
            analysis to map opportunity windows and guide strategic decisions.
          </li>
          <li>
            <strong>Life Path &amp; Remedies:</strong> Personalized mantras,
            rituals, and practices grounded in tradition and adapted for modern
            life.
          </li>
        </ul>

        <div className="note">
          <p style={{ marginBottom: 0 }}>
            We don’t do fear or jargon—just clarity, care, and credible
            guidance. Your journey is unique, and our work is crafted to honor
            that uniqueness with respect and precision.
          </p>
        </div>
      </div>
    </main>
  );
}
