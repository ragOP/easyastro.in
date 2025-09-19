import { useEffect } from "react";
import Link from "next/link";

const TARGET =
  "https://chat.whatsapp.com/ImMzsSD1gg2H9TbBMnAn5D?mode=ems_copy_c";

export default function Thanks() {
  useEffect(() => {
    const goNow = () => {
      try {
        window.location.replace(TARGET);
      } catch {
        window.location.href = TARGET;
      }
    };
    goNow();
    const t1 = setTimeout(goNow, 500);
    const t2 = setTimeout(goNow, 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1220",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          textAlign: "center",
          padding: 24,
          borderRadius: 16,
          background: "#111827",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
          Thanks! Redirecting you to WhatsApp…
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: 20 }}>
          If you’re not redirected automatically, click below.
        </p>
        <Link
          href={TARGET}
          style={{
            display: "inline-block",
            padding: "12px 20px",
            borderRadius: 10,
            background: "#22c55e",
            color: "#000",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Open WhatsApp Group
        </Link>
      </div>
    </main>
  );
}
