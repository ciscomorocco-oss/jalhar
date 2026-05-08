import { useState, useEffect, useRef } from "react";
import logo from "../logo.png";

/* ════════════════════════════════════════════════
   CONSTANTS / DATA
════════════════════════════════════════════════ */

const YELLOW = "#F5C300";

const HERO_SLIDES = [
  {
    img: "https://images.pexels.com/photos/8961029/pexels-photo-8961029.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    tag: "Vêtements de Sécurité Premium",
    title: ["MIEUX ÉQUIPÉ.", "MIEUX PROTÉGÉ."],
    cta: "Demander un Devis",
  },
  {
    img: "https://images.pexels.com/photos/18111488/pexels-photo-18111488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    tag: "Vêtements Industriels",
    title: ["DES VÊTEMENTS POUR", "CHAQUE CHANTIER"],
    cta: "Explorer les Produits",
  },
  {
    img: "https://images.pexels.com/photos/8961064/pexels-photo-8961064.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    tag: "Haute Visibilité & EPI",
    title: ["PROTÉGEZ VOTRE", "ÉQUIPE AUJOURD'HUI"],
    cta: "Voir le Catalogue",
  },
];

const SERVICE_BARS = [
  { icon: <svg style={{ width: 28, height: 28, color: YELLOW }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, title: "Devis Rapide", desc: "Obtenez un devis personnalisé rapidement, adapté à vos besoins." },
  { icon: <svg style={{ width: 28, height: 28, color: YELLOW }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.657m8.706-9.942a7.962 7.962 0 011.618 6.23 7.962 7.962 0 01-1.618 6.23M15.772 1.545a7.962 7.962 0 016.231 1.618 7.962 7.962 0 01-6.231-1.618M1.545 15.772a7.962 7.962 0 011.618-6.231 7.962 7.962 0 01-1.618 6.231M8.228 22.455a7.962 7.962 0 01-6.231-1.618 7.962 7.962 0 016.231 1.618"/></svg>, title: "Livraison Nationale", desc: "Expédition fiable et rapide, où que vous soyez." },
  { icon: <svg style={{ width: 28, height: 28, color: YELLOW }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.033A12.02 12.02 0 003 14.661c0 5.097 3.308 9.422 7.877 11.002a11.935 11.935 0 003.123 0C18.692 24.083 22 19.758 22 14.661a12.02 12.02 0 00-1.382-5.703z"/></svg>, title: "Paiements Sécurisés", desc: "Transactions 100% protégées et certifiées." },
  { icon: <svg style={{ width: 28, height: 28, color: YELLOW }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>, title: "Support Réactif", desc: "Notre équipe vous accompagne à chaque étape." },
];

const SECTORS = [
  { label: "Construction", img: "https://images.pexels.com/photos/14367425/pexels-photo-14367425.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { label: "Industrie",     img: "https://images.pexels.com/photos/29224625/pexels-photo-29224625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { label: "BTP",          img: "https://images.pexels.com/photos/14367421/pexels-photo-14367421.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { label: "EPI & Accessoires", img: "https://images.pexels.com/photos/8961064/pexels-photo-8961064.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
];

const TRUST_FEATURES = [
  { n: "01", icon: <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"/></svg>, title: "Qualité Garantie",     desc: "Produits certifiés, durables et fiables testés selon les normes professionnelles." },
  { n: "02", icon: <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>, title: "Conformité aux Normes",   desc: "Respect strict des normes de sécurité nationales et internationales." },
  { n: "03", icon: <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>, title: "Conseils Personnalisés",    desc: "Accompagnement dédié adapté à votre secteur et aux exigences du poste." },
  { n: "04", icon: <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>, title: "SAV Réactif",   desc: "Service efficace disponible pour répondre à tous vos besoins après achat." },
];

const PRODUCTS_INDUSTRY = [
  { name: "Veste de Travail PROVO",          img: "https://images.pexels.com/photos/8487362/pexels-photo-8487362.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { name: "Gilet Haute Visibilité Jaune",         img: "https://images.pexels.com/photos/8487797/pexels-photo-8487797.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { name: "Gilet Haute Visibilité Orange",         img: "https://images.pexels.com/photos/8487396/pexels-photo-8487396.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { name: "Veste de Travail Colemane",       img: "https://images.pexels.com/photos/8486913/pexels-photo-8486913.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { name: "Combinaison de Protection Intégrale",       img: "https://images.pexels.com/photos/8486899/pexels-photo-8486899.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { name: "Gilet de Sécurité Ferroviaire",        img: "https://images.pexels.com/photos/14189337/pexels-photo-14189337.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
];

const PRODUCTS_PROTECTION = [
  { name: "Combinaison de Soudure",    img: "https://images.pexels.com/photos/29224625/pexels-photo-29224625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { name: "Set de Sécurité d'Atelier",        img: "https://images.pexels.com/photos/15209789/pexels-photo-15209789.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { name: "Combinaison Anti-Étincelles", img: "https://images.pexels.com/photos/15059760/pexels-photo-15059760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { name: "Veste de Chantier",         img: "https://images.pexels.com/photos/14367421/pexels-photo-14367421.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { name: "Combinaison de Grutier",        img: "https://images.pexels.com/photos/9228771/pexels-photo-9228771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { name: "Pack Casque + Gilet",   img: "https://images.pexels.com/photos/18111488/pexels-photo-18111488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
];

const WHY_US = [
  { n: "01", title: "Leader du Secteur depuis 2014",  desc: "Nous concevons des vêtements de travail robustes et sur mesure adaptés à vos exigences professionnelles." },
  { n: "02", title: "Qualité Garantie",          desc: "Nos vêtements sont conçus pour la performance et la durabilité, même dans les environnements les plus exigeants." },
  { n: "03", title: "Prix Compétitifs Garantis", desc: "Grâce à un réseau de fournisseurs contrôlé, nous garantissons des prix compétitifs sans compromis sur la qualité." },
];

const PARTNERS = [
  "VOLVO", "DANONE", "SCHINDLER", "MERCEDES-BENZ", "LC WAIKIKI", "G4S",
  "CIMENTS DU MAROC", "SOFITEL", "ACCOR", "TOTAL", "ALSTOM", "SIEMENS",
];

const TESTIMONIAL = {
  quote: "La sécurité est une priorité absolue pour nos opérations, et Jalhar a répondu à nos exigences les plus strictes en matière d'équipement de protection. Leurs solutions EPI nous permettent de garantir des conditions de travail optimales pour nos employés, même dans les environnements les plus exigeants.",
  author: "— Directeur des Opérations",
  company: "Entreprise Partenaire",
  stars: 5,
};

const NAV_ITEMS = ["Accueil", "Produits", "Secteurs", "Pourquoi Nous", "Emplacement", "Contact"];

/* ════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase().replace(/\s+/g, "-"))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "#111" : "rgba(10,10,10,.82)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? `2px solid ${YELLOW}` : "2px solid transparent",
        transition: "all .35s",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 80, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", background: YELLOW, height: "100%", padding: "0 25px", marginLeft: -24 }}>
          <img src={logo} alt="JALHAR Logo" style={{ height: 72, width: "auto", objectFit: "contain" }} />
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 28 }} className="hidden-mobile">
          {NAV_ITEMS.map(item => (
            <button key={item} className="nav-link" onClick={() => go(item)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.8)", fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: "4px 0" }}>
              {item}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button onClick={() => go("Contact")}
          style={{ background: YELLOW, color: "#111", fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", border: "none", padding: "10px 22px", cursor: "pointer" }}
          className="hidden-mobile">
          Obtenir un Devis
        </button>

        {/* Burger */}
        <button onClick={() => setOpen(!open)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 22 }}
          className="burger-btn">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#111", borderTop: `1px solid rgba(255,255,255,.08)` }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => go(item)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 24px", color: "rgba(255,255,255,.8)", fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.05)", cursor: "pointer" }}>
              {item}
            </button>
          ))}
          <div style={{ padding: 16 }}>
            <button onClick={() => go("Contact")}
              style={{ width: "100%", background: YELLOW, color: "#111", fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", border: "none", padding: "12px", cursor: "pointer" }}>
              Obtenir un Devis
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .burger-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}

/* ════════════════════════════════════════════════
   HERO SLIDESHOW
════════════════════════════════════════════════ */
function Hero() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[cur];

  return (
    <section id="home" style={{ position: "relative", height: "100vh", minHeight: 560, overflow: "hidden" }}>
      {/* BG images — stack and fade */}
      {HERO_SLIDES.map((s, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${s.img})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: i === cur ? 1 : 0,
          transition: "opacity .9s ease",
        }} />
      ))}

      {/* Dark gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.3) 70%,transparent 100%)" }} />

      {/* Yellow left bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: YELLOW }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(245,195,0,.12)", border: `1px solid rgba(245,195,0,.35)`,
              color: YELLOW, fontSize: 11, fontWeight: 700, letterSpacing: 3,
              textTransform: "uppercase", padding: "6px 14px", marginBottom: 20,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: YELLOW, animation: "pulse 1.5s infinite" }} />
              {slide.tag}
            </div>

            <h1 style={{
              fontFamily: "'Barlow Condensed','Impact',sans-serif",
              fontWeight: 900, fontSize: "clamp(52px,7vw,96px)",
              lineHeight: 1, color: "#fff", textTransform: "uppercase",
              marginBottom: 28, letterSpacing: 2,
            }}>
              {slide.title.map((line, i) => (
                <span key={i} style={{ display: "block", color: i === 1 ? YELLOW : "#fff" }}>{line}</span>
              ))}
            </h1>

            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15, lineHeight: 1.7, maxWidth: 420, marginBottom: 36 }}>
              Jalhar fournit des vêtements de travail de sécurité premium et des équipements de protection individuelle pour la construction, l'industrie et les environnements de travail dangereux.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: YELLOW, color: "#111", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", border: "none", padding: "14px 32px", cursor: "pointer" }}>
                {slide.cta}
              </button>
              <button
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", border: "2px solid rgba(255,255,255,.3)", padding: "14px 32px", cursor: "pointer" }}>
                Voir les Produits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 3 }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} style={{
            width: i === cur ? 28 : 8, height: 8,
            borderRadius: 4, border: "none",
            background: i === cur ? YELLOW : "rgba(255,255,255,.35)",
            cursor: "pointer", transition: "all .3s",
          }} />
        ))}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   SERVICE BAR
════════════════════════════════════════════════ */
function ServiceBar() {
  return (
    <section style={{ background: "#fafafa", borderBottom: "1px solid #eee" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {SERVICE_BARS.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 16,
              padding: "28px 32px",
              borderRight: i < 3 ? "1px solid #eee" : "none",
            }}>
              <span style={{ fontSize: 28, lineHeight: 1, marginTop: 2 }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: "#888", lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){ div[style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   SECTORS
════════════════════════════════════════════════ */
function Sectors() {
  return (
    <section id="sectors" style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="sec-label">Équipement pour chaque environnement de travail</span>
          <h2 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 38, textTransform: "uppercase", letterSpacing: 2, color: "#111" }}>
            NOS SECTEURS D'ACTIVITÉ
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {SECTORS.map((s, i) => (
            <div key={i} className="pcard" style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "3/4" }}>
              <img src={s.img} alt={s.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {/* gradient */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.1) 55%,transparent 100%)" }} />
              {/* label */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px" }}>
                <div style={{ width: 32, height: 3, background: YELLOW, marginBottom: 8 }} />
                <div style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){ div[style*="grid-template-columns: repeat(4,1fr)"] { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   TRUST / PARTNER FEATURES  (dark bg, 4 cards)
════════════════════════════════════════════════ */
function TrustSection() {
  return (
    <section style={{ background: "#111", padding: "72px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="sec-label" style={{ color: "rgba(255,255,255,.4)" }}>Votre partenaire de confiance</span>
          <h2 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 36, textTransform: "uppercase", letterSpacing: 2, color: "#fff" }}>
            JALHAR, VOTRE PARTENAIRE DE CONFIANCE
          </h2>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
            Protéger vos équipes avec des solutions personnalisées, fiables et certifiées.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
          {TRUST_FEATURES.map((f, i) => (
            <div key={i} style={{
              background: "#1a1a1a",
              padding: "40px 28px",
              borderTop: `3px solid ${i === 0 ? YELLOW : "transparent"}`,
              transition: "border-color .3s",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderTopColor = YELLOW)}
              onMouseLeave={e => (e.currentTarget.style.borderTopColor = i === 0 ? YELLOW : "transparent")}
            >
              <div style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 52, color: "rgba(255,255,255,.06)", lineHeight: 1, marginBottom: 12 }}>{f.n}</div>
              <div style={{ fontSize: 26, marginBottom: 12, color: YELLOW }}>{f.icon}</div>
              <h4 style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 10 }}>{f.title}</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ div[style*="grid-template-columns: repeat(4,1fr)"] { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   PRODUCT SCROLL ROW
════════════════════════════════════════════════ */
function ProductRow({ label, title, products, dark = false }: {
  label: string; title: string;
  products: { name: string; img: string }[];
  dark?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <section id="products" style={{ background: dark ? "#0f0f0f" : "#fff", padding: "72px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 0" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="sec-label" style={{ color: dark ? "rgba(255,255,255,.4)" : "#888" }}>{label}</span>
            <h2 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 32, textTransform: "uppercase", letterSpacing: 2, color: dark ? "#fff" : "#111" }}>
              {title}
            </h2>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "none", border: `1.5px solid ${dark ? "rgba(255,255,255,.2)" : "#ccc"}`, color: dark ? "rgba(255,255,255,.6)" : "#555", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "9px 22px", cursor: "pointer" }}>
            Tout Voir →
          </button>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div ref={rowRef} style={{ overflowX: "auto", paddingBottom: 16, scrollbarWidth: "none" }}>
        <div style={{ display: "flex", gap: 16, paddingLeft: "max(24px,(100vw - 1280px)/2 + 24px)", paddingRight: 24, width: "max-content" }}>
          {products.map((p, i) => (
            <div key={i} className="pcard" style={{
              width: 210, flexShrink: 0, cursor: "pointer",
              background: dark ? "#1a1a1a" : "#f7f7f7",
            }}>
              <div style={{ overflow: "hidden", height: 260 }}>
                <img src={p.img} alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "14px 14px 18px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: YELLOW, marginBottom: 4 }}>Jalhar</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: dark ? "#fff" : "#111", lineHeight: 1.4 }}>{p.name}</div>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    marginTop: 12, width: "100%", background: YELLOW, color: "#111",
                    border: "none", fontWeight: 700, fontSize: 11, letterSpacing: 1,
                    textTransform: "uppercase", padding: "8px", cursor: "pointer",
                  }}>
                  Demander Devis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.pcard:hover { box-shadow: 0 8px 32px rgba(0,0,0,.13); }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   DARK FEATURE BANNER (full-width)
════════════════════════════════════════════════ */
function FeatureBanner() {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "#000", padding: "80px 0",
      minHeight: 420, display: "flex", alignItems: "center",
    }}>
      {/* BG image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(https://images.pexels.com/photos/8961029/pexels-photo-8961029.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200)`,
        backgroundSize: "cover", backgroundPosition: "center right",
        opacity: .18,
      }} />
      {/* yellow left bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: YELLOW }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 48px", width: "100%" }}>
        <div style={{ maxWidth: 540 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: YELLOW }}>Collection En Vedette</span>
          <h2 style={{
            fontFamily: "'Barlow Condensed','Impact',sans-serif",
            fontWeight: 900, fontSize: "clamp(48px,6vw,80px)",
            lineHeight: 1.05, color: "#fff", textTransform: "uppercase",
            letterSpacing: 2, margin: "16px 0 20px",
          }}>
            GILET DE SÉCURITÉ &<br /><span style={{ color: YELLOW }}>PANTALON</span><br />ATLANTA
          </h2>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
            Vêtements de travail haute visibilité certifiés EN ISO 20471. Protection et confort maximum dans toutes les conditions.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: YELLOW, color: "#111", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", border: "none", padding: "14px 36px", cursor: "pointer" }}>
            Demander un Devis →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   TWO PROMO BANNERS (side by side)
════════════════════════════════════════════════ */
function PromoBanners() {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Left – dark */}
      <div style={{
        position: "relative", overflow: "hidden",
        backgroundImage: `url(https://images.pexels.com/photos/18111488/pexels-photo-18111488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200)`,
        backgroundSize: "cover", backgroundPosition: "center",
        minHeight: 340,
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.65)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "48px 40px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ width: 36, height: 3, background: YELLOW, marginBottom: 12 }} />
          <h3 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 32, color: "#fff", textTransform: "uppercase", lineHeight: 1.1, marginBottom: 12 }}>
            INDISPENSABLE EN<br />TOUTES CONDITIONS
          </h3>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ alignSelf: "flex-start", background: YELLOW, color: "#111", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", border: "none", padding: "10px 22px", cursor: "pointer" }}>
            Découvrir →
          </button>
        </div>
      </div>

      {/* Right – yellow */}
      <div style={{
        position: "relative", overflow: "hidden",
        backgroundImage: `url(https://images.pexels.com/photos/8961064/pexels-photo-8961064.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200)`,
        backgroundSize: "cover", backgroundPosition: "center",
        minHeight: 340,
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,.6)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 5, height: "100%", background: YELLOW }} />
        <div style={{ position: "relative", zIndex: 1, padding: "48px 40px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: YELLOW, marginBottom: 8 }}>Protection Industrielle</span>
          <h3 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 32, color: "#fff", textTransform: "uppercase", lineHeight: 1.1, marginBottom: 12 }}>
            VÊTEMENTS DE<br /><span style={{ color: YELLOW }}>TRAVAIL INDUSTRIEL</span>
          </h3>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ alignSelf: "flex-start", background: "transparent", color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", border: `1.5px solid rgba(255,255,255,.4)`, padding: "10px 22px", cursor: "pointer" }}>
            Explorer →
          </button>
        </div>
      </div>
      <style>{`@media(max-width:640px){ section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   WHY US (3 dark cards with big numbers)
════════════════════════════════════════════════ */
function WhyUs() {
  return (
    <section id="why-us" style={{ background: "#fff", padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="sec-label">Nos avantages</span>
          <p style={{ fontSize: 13, color: "#aaa", fontStyle: "italic", marginBottom: 6 }}>Pourquoi nous</p>
          <h2 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 38, textTransform: "uppercase", letterSpacing: 2, color: "#111" }}>
            POURQUOI CHOISIR JALHAR
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {WHY_US.map((w, i) => (
            <div key={i} style={{
              background: "#111", padding: "44px 32px", position: "relative", overflow: "hidden",
              borderBottom: `4px solid ${YELLOW}`,
            }}>
              {/* watermark number */}
              <div style={{ position: "absolute", top: -8, right: 16, fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 100, color: "rgba(255,255,255,.04)", lineHeight: 1, userSelect: "none" }}>{w.n}</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "inline-block",
                  fontFamily: "'Barlow Condensed','Impact',sans-serif",
                  fontWeight: 900, fontSize: 18, color: YELLOW,
                  background: "rgba(245,195,0,.12)",
                  border: `1px solid rgba(245,195,0,.3)`,
                  padding: "4px 14px", marginBottom: 20,
                }}>{w.n}</div>
                <h3 style={{ fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 14 }}>{w.title}</h3>
                <div style={{ width: 32, height: 2, background: YELLOW, marginBottom: 14 }} />
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.5)", lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){ div[style*="grid-template-columns: repeat(3,1fr)"] { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   PARTNERS CAROUSEL
════════════════════════════════════════════════ */
function Partners() {
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <section style={{ background: "#fafafa", padding: "64px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 32, textTransform: "uppercase", letterSpacing: 2, color: "#111" }}>
          NOS PARTENAIRES, NOTRE FIERTÉ
        </h2>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="logo-track" style={{ display: "flex", gap: 0, width: "max-content" }}>
          {items.map((p, i) => (
            <div key={i} style={{
              width: 180, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRight: "1px solid #e5e5e5", padding: "12px 24px",
            }}>
              <span style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: 2, color: "#bbb", textTransform: "uppercase" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   TICKER (brand name scrolling, black bg)
════════════════════════════════════════════════ */
function Ticker() {
  const items = Array(12).fill("JALHAR");
  return (
    <div style={{ background: "#111", overflow: "hidden", padding: "18px 0", borderTop: `2px solid ${YELLOW}`, borderBottom: `2px solid ${YELLOW}` }}>
      <div className="ticker-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{
            fontFamily: "'Barlow Condensed','Impact',sans-serif",
            fontWeight: 900, fontSize: 22, letterSpacing: 8,
            textTransform: "uppercase", color: "#fff",
            padding: "0 32px",
            display: "inline-flex", alignItems: "center", gap: 32,
          }}>
            {t}
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: YELLOW }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   TESTIMONIAL
════════════════════════════════════════════════ */
function Testimonial() {
  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 16 }}>
          {[...Array(TESTIMONIAL.stars)].map((_, i) => (
            <svg key={i} style={{ width: 24, height: 24, color: YELLOW }} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          ))}
        </div>
        <blockquote style={{
          fontFamily: "'Barlow Condensed','Impact',sans-serif",
          fontWeight: 700, fontSize: "clamp(18px,2.5vw,26px)",
          color: "#111", lineHeight: 1.5, fontStyle: "normal",
          marginBottom: 28,
        }}>
          "{TESTIMONIAL.quote}"
        </blockquote>
        <div style={{ width: 48, height: 2, background: YELLOW, margin: "0 auto 16px" }} />
        <div style={{ fontWeight: 700, fontSize: 13, color: "#111", letterSpacing: 1, textTransform: "uppercase" }}>{TESTIMONIAL.author}</div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{TESTIMONIAL.company}</div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   LOCATION
════════════════════════════════════════════════ */
function Location() {
  return (
    <section id="location" style={{ background: "#f7f7f7", padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="sec-label">Où nous trouver</span>
          <h2 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 38, textTransform: "uppercase", letterSpacing: 2, color: "#111" }}>
            NOTRE EMPLACEMENT
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 24 }}>
          {/* Info card */}
          <div style={{ background: "#111", padding: "48px 40px" }}>
            <div style={{ display: "inline-block", background: YELLOW, padding: "10px 15px", marginBottom: 32 }}>
              <img src={logo} alt="JALHAR Logo" style={{ height: 60, width: "auto", objectFit: "contain", display: "block" }} />
            </div>

            {[
              { icon: <svg style={{ width: 20, height: 20, color: "#111" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, title: "Adresse", val: "Casablanca, Maroc" },
              { icon: <svg style={{ width: 20, height: 20, color: "#111" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>, title: "Téléphone", val: "+212 661-441178" },
              { icon: <svg style={{ width: 20, height: 20, color: "#111" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, title: "Email", val: "jalhar@gmx.com" },
              { icon: <svg style={{ width: 20, height: 20, color: "#111" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, title: "Horaires", val: "Lun – Ven: 8:00 – 18:30\nSam: 8:00 – 12:00\nDim: Fermé" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, background: YELLOW, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: YELLOW, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.val}</div>
                </div>
              </div>
            ))}

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ marginTop: 8, width: "100%", background: YELLOW, color: "#111", fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", border: "none", padding: "14px", cursor: "pointer" }}>
              Nous Contacter →
            </button>
          </div>

          {/* Map */}
          <div style={{ overflow: "hidden", minHeight: 420 }}>
            <iframe
              title="Jalhar location"
              src="https://maps.google.com/maps?q=33.595978964836526,-7.591935447036349&output=embed"
              width="100%" height="100%"
              style={{ border: 0, display: "block", minHeight: 420, filter: "grayscale(30%) contrast(1.05)" }}
              allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ div[style*="grid-template-columns: 1fr 1.6fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════════════ */
function CTABanner() {
  return (
    <section style={{ background: "#111", padding: "72px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%,rgba(245,195,0,.06) 0%,transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,48px)", color: "#fff", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16, lineHeight: 1.2 }}>
          BESOIN D'UN ACCOMPAGNEMENT À LA HAUTEUR<br />DE VOS EXIGENCES ?
        </h2>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
          Contactez-nous dès aujourd'hui pour construire ensemble une solution de vêtements de travail qui vous ressemble.
        </p>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: YELLOW, color: "#111", fontWeight: 700, fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase",
            border: "none", padding: "16px 40px", cursor: "pointer",
          }}>
          <span>✉</span> Demander des Conseils
        </button>
        <p style={{ marginTop: 24, color: "rgba(255,255,255,.25)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
          Jalhar – Mieux Équipé. Mieux Protégé. Mieux Accompagné.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: "#fff", padding: "80px 0" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="sec-label">Work with us</span>
          <h2 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 38, textTransform: "uppercase", letterSpacing: 2, color: "#111" }}>
            REQUEST A QUOTE
          </h2>
          <p style={{ color: "#999", fontSize: 14, marginTop: 10 }}>Tell us your needs — we'll get back to you within 24 hours.</p>
        </div>

        {sent ? (
          <div style={{ textAlign: "center", padding: "60px 24px", background: "#f7f7f7" }}>
            <div style={{ marginBottom: 16, color: YELLOW }}>
              <svg style={{ width: 48, height: 48 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 style={{ fontFamily: "'Barlow Condensed','Impact',sans-serif", fontWeight: 900, fontSize: 28, textTransform: "uppercase", marginBottom: 10 }}>Message Received!</h3>
            <p style={{ color: "#888", marginBottom: 24 }}>We'll be in touch within 24 hours.</p>
            <button onClick={() => setSent(false)} style={{ background: YELLOW, border: "none", color: "#111", fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", padding: "10px 28px", cursor: "pointer" }}>Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { key: "name",    label: "Full Name *",   type: "text",  placeholder: "John Smith",         required: true },
                { key: "company", label: "Company",       type: "text",  placeholder: "Company Ltd.",       required: false },
                { key: "email",   label: "Email *",       type: "email", placeholder: "email@company.com",  required: true },
                { key: "phone",   label: "Phone",         type: "tel",   placeholder: "+1 000 000 0000",    required: false },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#888", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} required={f.required} placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", fontSize: 13.5, color: "#111", background: "#fafafa", outline: "none" }}
                    onFocus={e => (e.target.style.borderColor = YELLOW)}
                    onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#888", marginBottom: 6 }}>Message / Requirements *</label>
              <textarea required rows={5} placeholder="Describe your workwear needs, quantities, sector..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", fontSize: 13.5, color: "#111", background: "#fafafa", resize: "vertical", outline: "none", fontFamily: "inherit" }}
                onFocus={e => (e.target.style.borderColor = YELLOW)}
                onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>
            <button type="submit"
              style={{ width: "100%", background: "#111", color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", border: "none", padding: "16px", cursor: "pointer", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = YELLOW) && (e.currentTarget.style.color = "#111")}
              onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}>
              Send Message →
            </button>
          </form>
        )}
      </div>
      <style>{`@media(max-width:640px){ form div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: "#0d0d0d", color: "rgba(255,255,255,.5)", padding: "64px 0 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "inline-block", background: YELLOW, padding: "12px 18px", marginBottom: 20 }}>
              <img src={logo} alt="JALHAR Logo" style={{ height: 66, width: "auto", objectFit: "contain", display: "block" }} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
              Your trusted partner for professional safety workwear and personal protective equipment. Quality and protection every day.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["f", "in", "tw", "ig"].map(s => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, border: "1px solid rgba(255,255,255,.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  color: "rgba(255,255,255,.4)", textDecoration: "none",
                  transition: "all .2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = YELLOW; (e.currentTarget as HTMLElement).style.color = YELLOW; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.12)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)"; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {NAV_ITEMS.map(item => (
                <li key={item}>
                  <button onClick={() => document.getElementById(item.toLowerCase().replace(/\s+/g, "-"))?.scrollIntoView({ behavior: "smooth" })}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.45)", fontSize: 13, fontWeight: 500, letterSpacing: .5, padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = YELLOW)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.45)")}>
                    → {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>Contact</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: <svg style={{ width: 16, height: 16, color: YELLOW, marginTop: 2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, val: "Casablanca, Maroc" },
                { icon: <svg style={{ width: 16, height: 16, color: YELLOW, marginTop: 2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>, val: "+212 661-441178" },
                { icon: <svg style={{ width: 16, height: 16, color: YELLOW, marginTop: 2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, val: "jalhar@gmx.com" },
                { icon: <svg style={{ width: 16, height: 16, color: YELLOW, marginTop: 2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, val: "Lun–Ven 8:00–18:30" },
              ].map((c, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: YELLOW, fontSize: 15, lineHeight: 1.5 }}>{c.icon}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-line" }}>{c.val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "20px 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 12 }}>© {new Date().getFullYear()} Jalhar. All rights reserved.</span>
          <span style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>Safety Workwear Specialists</span>
        </div>
      </div>
      <style>{`@media(max-width:768px){ footer div[style*="grid-template-columns: 1.4fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}

/* ════════════════════════════════════════════════
   APP ROOT
════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceBar />
      <Sectors />
      <TrustSection />
      <ProductRow
        label="Strength, Comfort & Certified Style at Work."
        title="WORKWEAR FOR INDUSTRY"
        products={PRODUCTS_INDUSTRY}
      />
      <FeatureBanner />
      <PromoBanners />
      <ProductRow
        label="Maximum protection for every environment."
        title="INDUSTRIAL PROTECTIVE CLOTHING"
        products={PRODUCTS_PROTECTION}
        dark
      />
      <WhyUs />
      <Partners />
      <Ticker />
      <Testimonial />
      <Location />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}
