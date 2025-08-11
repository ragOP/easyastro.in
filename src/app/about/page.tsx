// app/about/page.tsx
// Next.js App Router – About Us page for EasyAstro

export const metadata = {
  title: "About Us – EasyAstro",
  description:
    "At EasyAstro, we blend ancient wisdom with modern experiences to help you discover your soulmate, unlock wealth, and decode your life path.",
};

export default function AboutPage() {
  return (
    <main className="about">
      <style jsx>{`
        .about {
          min-height: 100vh;
          background: #0b0b12;
          color: #eef2f6;
          font-family: ui-sans-serif, system-ui, sans-serif;
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
          -webkit-text-fill-color: transparent;
        }
        p {
          color: #aab1bf;
          line-height: 1.6;
          font-size: 1.1rem;
          margin-bottom: 18px;
        }
      `}</style>

      <div className="container">
        <h1>About Us</h1>
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
      </div>
    </main>
  );
}
