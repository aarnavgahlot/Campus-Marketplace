import { useState, useEffect, useRef } from "react"

// ── DATA ──────────────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "● 248 ITEMS LISTED TODAY",
  "● 37 STUDENTS SELLING",
  "● 19 ITEMS REUSED THIS WEEK",
  "● 12 NEW LISTINGS NEAR YOU",
  "● SAVE MONEY. REUSE MORE.",
  "● AVG SAVING ₹1,400",
  "● 0.4 KM AVERAGE DISTANCE",
  "● 100% STUDENT VERIFIED",
]

interface HeroCard {
  id: number
  name: string
  price: string
  seller: string
  distance: string
  condition: string
  badge: string
  badgeColor: string
  emoji: string
  emojiColor: string
  wrapperStyle: React.CSSProperties
  floatAnim: string
  floatDuration: string
  floatDelay: string
}

const HERO_CARDS: HeroCard[] = [
  {
    id: 1,
    name: "Engineering Maths",
    price: "₹250",
    seller: "Rohan S.",
    distance: "0.4 km",
    condition: "Like New",
    badge: "JUST LISTED",
    badgeColor: "#F4511E",
    emoji: "📚",
    emojiColor: "#FEF3C7",
    wrapperStyle: { position: "absolute", top: "7%", left: "1%" },
    floatAnim: "heroFloat1",
    floatDuration: "5.5s",
    floatDelay: "0s",
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: "₹52,000",
    seller: "Priya K.",
    distance: "0.8 km",
    condition: "Good",
    badge: "POPULAR",
    badgeColor: "#16A34A",
    emoji: "💻",
    emojiColor: "#DBEAFE",
    wrapperStyle: { position: "absolute", top: "4%", right: "1%" },
    floatAnim: "heroFloat2",
    floatDuration: "7s",
    floatDelay: "1.2s",
  },
  {
    id: 3,
    name: "Firefox Bicycle",
    price: "₹6,500",
    seller: "Arjun M.",
    distance: "1.1 km",
    condition: "Good",
    badge: "SELLER ONLINE",
    badgeColor: "#16A34A",
    emoji: "🚲",
    emojiColor: "#D1FAE5",
    wrapperStyle: { position: "absolute", top: "40%", left: "0.5%" },
    floatAnim: "heroFloat3",
    floatDuration: "6.2s",
    floatDelay: "0.6s",
  },
  {
    id: 4,
    name: "Sci. Calculator",
    price: "₹900",
    seller: "Sneha R.",
    distance: "0.2 km",
    condition: "Like New",
    badge: "3 SAVED",
    badgeColor: "#F4511E",
    emoji: "🔢",
    emojiColor: "#FCE7F3",
    wrapperStyle: { position: "absolute", top: "42%", right: "0.5%" },
    floatAnim: "heroFloat1",
    floatDuration: "5.8s",
    floatDelay: "1.8s",
  },
  {
    id: 5,
    name: "Hostel Mattress",
    price: "₹1,200",
    seller: "Vikram T.",
    distance: "0.6 km",
    condition: "Good",
    badge: "URGENT",
    badgeColor: "#EF4444",
    emoji: "🛏️",
    emojiColor: "#FEE2E2",
    wrapperStyle: { position: "absolute", bottom: "9%", left: "1.5%" },
    floatAnim: "heroFloat2",
    floatDuration: "7.5s",
    floatDelay: "2.4s",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: "₹2,500",
    seller: "Aisha B.",
    distance: "0.3 km",
    condition: "Like New",
    badge: "JUST LISTED",
    badgeColor: "#F4511E",
    emoji: "⌨️",
    emojiColor: "#EDE9FE",
    wrapperStyle: { position: "absolute", bottom: "10%", right: "1%" },
    floatAnim: "heroFloat3",
    floatDuration: "6.6s",
    floatDelay: "0.9s",
  },
]

interface Listing {
  id: number
  name: string
  price: number
  condition: "NEW" | "LIKE NEW" | "GOOD"
  tag: "POPULAR" | "NEW" | "NEGOTIABLE" | "URGENT"
  seller: string
  initials: string
  distance: string
  emoji: string
  emojiColor: string
  avatarColor: string
  category: "BOOKS" | "ELECTRONICS" | "HOSTEL" | "OTHER"
}

const LISTINGS: Listing[] = [
  {
    id: 1,
    name: "MacBook Air M2",
    price: 52000,
    condition: "GOOD",
    tag: "POPULAR",
    seller: "Priya K.",
    initials: "PK",
    distance: "0.8 km",
    emoji: "💻",
    emojiColor: "#DBEAFE",
    avatarColor: "#DBEAFE",
    category: "ELECTRONICS",
  },
  {
    id: 2,
    name: "Engineering Books Bundle",
    price: 700,
    condition: "LIKE NEW",
    tag: "NEGOTIABLE",
    seller: "Rohan S.",
    initials: "RS",
    distance: "0.4 km",
    emoji: "📚",
    emojiColor: "#FEF3C7",
    avatarColor: "#FEF3C7",
    category: "BOOKS",
  },
  {
    id: 3,
    name: "IKEA Study Chair",
    price: 1800,
    condition: "GOOD",
    tag: "NEW",
    seller: "Meera T.",
    initials: "MT",
    distance: "1.2 km",
    emoji: "🪑",
    emojiColor: "#D1FAE5",
    avatarColor: "#D1FAE5",
    category: "HOSTEL",
  },
  {
    id: 4,
    name: "Firefox Bicycle",
    price: 6500,
    condition: "GOOD",
    tag: "POPULAR",
    seller: "Arjun M.",
    initials: "AM",
    distance: "1.1 km",
    emoji: "🚲",
    emojiColor: "#FCE7F3",
    avatarColor: "#FCE7F3",
    category: "OTHER",
  },
  {
    id: 5,
    name: "Scientific Calculator",
    price: 900,
    condition: "LIKE NEW",
    tag: "NEW",
    seller: "Sneha R.",
    initials: "SR",
    distance: "0.2 km",
    emoji: "🔢",
    emojiColor: "#EDE9FE",
    avatarColor: "#EDE9FE",
    category: "ELECTRONICS",
  },
  {
    id: 6,
    name: "Hostel Mattress",
    price: 1200,
    condition: "GOOD",
    tag: "URGENT",
    seller: "Vikram T.",
    initials: "VT",
    distance: "0.6 km",
    emoji: "🛏️",
    emojiColor: "#FEE2E2",
    avatarColor: "#FEE2E2",
    category: "HOSTEL",
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    price: 2500,
    condition: "LIKE NEW",
    tag: "NEW",
    seller: "Aisha B.",
    initials: "AB",
    distance: "0.3 km",
    emoji: "⌨️",
    emojiColor: "#F3F4F6",
    avatarColor: "#F3F4F6",
    category: "ELECTRONICS",
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 600,
    condition: "GOOD",
    tag: "NEGOTIABLE",
    seller: "Dev P.",
    initials: "DP",
    distance: "0.7 km",
    emoji: "💡",
    emojiColor: "#FEF9C3",
    avatarColor: "#FEF9C3",
    category: "HOSTEL",
  },
]

const SELLERS = [
  {
    id: 1,
    name: "Priya Krishnamurthy",
    course: "B.Tech CSE",
    year: "3rd Year",
    rating: 4.9,
    sold: 12,
    initials: "PK",
    color: "#DBEAFE",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    course: "B.Arch",
    year: "2nd Year",
    rating: 4.7,
    sold: 8,
    initials: "AM",
    color: "#D1FAE5",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    course: "BBA",
    year: "4th Year",
    rating: 5.0,
    sold: 19,
    initials: "SR",
    color: "#FCE7F3",
  },
  {
    id: 4,
    name: "Vikram Tiwari",
    course: "M.Sc Physics",
    year: "1st Year",
    rating: 4.8,
    sold: 5,
    initials: "VT",
    color: "#FEE2E2",
  },
]

const HOW_IT_WORKS = [
  { step: "01", title: "LIST", desc: "Post your item in seconds. Photo, price, condition. Done." },
  { step: "02", title: "DISCOVER", desc: "Find exactly what you need from students nearby." },
  { step: "03", title: "CONNECT", desc: "Chat directly with students on your own campus." },
  { step: "04", title: "BUY / SELL", desc: "Make the deal conveniently, right on campus." },
  { step: "05", title: "REUSE", desc: "Give useful things a second life. Save money." },
]

const CAMPUS_PINS = [
  {
    id: "books",
    icon: "📚",
    label: "12 books",
    x: 285,
    y: 95,
    listings: ["Engineering Maths ₹250", "Physics Vol 2 ₹180", "ML Handbook ₹400"],
  },
  {
    id: "electronics",
    icon: "💻",
    label: "4 electronics",
    x: 455,
    y: 158,
    listings: ["MacBook M2 ₹52,000", "Keyboard ₹2,500", "Calculator ₹900"],
  },
  {
    id: "cycles",
    icon: "🚲",
    label: "3 cycles",
    x: 128,
    y: 285,
    listings: ["Firefox ₹6,500", "Atlas ₹4,200", "Hero ₹3,000"],
  },
  {
    id: "furniture",
    icon: "🪑",
    label: "8 furniture",
    x: 355,
    y: 268,
    listings: ["IKEA Chair ₹1,800", "Study Table ₹2,400", "Mattress ₹1,200"],
  },
  {
    id: "sports",
    icon: "⚽",
    label: "5 sports",
    x: 198,
    y: 145,
    listings: ["Cricket Kit ₹1,500", "Badminton ₹800", "Basketball ₹600"],
  },
]

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav
      className="fixed z-50 top-4 left-1/2"
      style={{ transform: "translateX(-50%)", width: "min(94%, 1080px)" }}
    >
      <div
        className="flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-300"
        style={{
          background: scrolled ? "rgba(248,247,243,0.94)" : "rgba(248,247,243,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: scrolled ? "rgba(15,15,14,0.12)" : "rgba(15,15,14,0.08)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "#F4511E", fontFamily: "var(--font-display)" }}
          >
            C
          </div>
          <span
            className="hidden sm:block text-sm font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "#0F0F0E" }}
          >
            CAMPUS MARKETPLACE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {["EXPLORE", "CATEGORIES", "HOW IT WORKS", "COMMUNITY"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[10px] tracking-widest transition-colors hover:opacity-100"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(15,15,14,0.5)",
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="hidden sm:block text-[10px] tracking-widest px-4 py-2.5 rounded-full text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#F4511E", fontFamily: "var(--font-mono)" }}
          >
            SELL AN ITEM
          </button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "#0F0F0E", fontFamily: "var(--font-display)" }}
          >
            U
          </div>
        </div>
      </div>
    </nav>
  )
}

function HeroCard({ card }: { card: HeroCard }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!innerRef.current) return
    const r = innerRef.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14
    const y = ((e.clientY - r.top) / r.height - 0.5) * 14
    setTilt({ x: -y, y: x })
  }

  return (
    <div
      style={{
        ...card.wrapperStyle,
        animationName: card.floatAnim,
        animationDuration: card.floatDuration,
        animationDelay: card.floatDelay,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        zIndex: hovered ? 10 : 4,
        width: "176px",
      }}
    >
      <div
        ref={innerRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 })
          setHovered(false)
        }}
        className="rounded-2xl border overflow-hidden cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "rgba(15,15,14,0.1)",
          transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.06 : 1})`,
          transition: "transform 0.12s ease, box-shadow 0.2s ease",
          boxShadow: hovered
            ? "0 24px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)"
            : "0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="h-14 flex items-center justify-center text-3xl relative"
          style={{ background: card.emojiColor }}
        >
          {card.emoji}
          <span
            className="absolute top-1.5 right-1.5 text-[8px] font-medium px-1.5 py-0.5 rounded-full"
            style={{
              background: card.badgeColor,
              color: "#FFFFFF",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
            }}
          >
            {card.badge}
          </span>
        </div>
        <div className="p-2.5">
          <p
            className="text-[11px] font-semibold leading-tight truncate"
            style={{ color: "#0F0F0E", fontFamily: "var(--font-body)" }}
          >
            {card.name}
          </p>
          <p
            className="text-base font-black mt-0.5"
            style={{ color: "#F4511E", fontFamily: "var(--font-display)" }}
          >
            {card.price}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span
              className="text-[8px] border rounded px-1 py-0.5"
              style={{
                color: "rgba(15,15,14,0.4)",
                borderColor: "rgba(15,15,14,0.1)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
              }}
            >
              {card.condition}
            </span>
          </div>
          <div
            className="flex items-center gap-1 mt-1.5 pt-1.5 border-t"
            style={{ borderColor: "rgba(15,15,14,0.06)" }}
          >
            <span
              className="text-[9px] truncate"
              style={{ color: "rgba(15,15,14,0.45)", fontFamily: "var(--font-mono)" }}
            >
              {card.seller} · {card.distance}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    const glow = glowRef.current
    if (!el || !glow) return
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      glow.style.background = `radial-gradient(700px circle at ${x}% ${y}%, rgba(244,81,30,0.05), transparent 60%)`
    }
    el.addEventListener("mousemove", handler)
    return () => el.removeEventListener("mousemove", handler)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#F8F7F3" }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,15,14,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
        }}
      />

      {/* Decorative SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <line
          x1="18%"
          y1="14%"
          x2="40%"
          y2="33%"
          stroke="#F4511E"
          strokeWidth="1"
          strokeDasharray="5 7"
          opacity="0.25"
        />
        <line
          x1="82%"
          y1="12%"
          x2="62%"
          y2="32%"
          stroke="#F4511E"
          strokeWidth="1"
          strokeDasharray="5 7"
          opacity="0.25"
        />
        <line
          x1="18%"
          y1="77%"
          x2="40%"
          y2="68%"
          stroke="#16A34A"
          strokeWidth="1"
          strokeDasharray="5 7"
          opacity="0.25"
        />
        <line
          x1="82%"
          y1="80%"
          x2="60%"
          y2="68%"
          stroke="#16A34A"
          strokeWidth="1"
          strokeDasharray="5 7"
          opacity="0.25"
        />
      </svg>

      {/* Floating product cards */}
      {HERO_CARDS.map((card) => (
        <HeroCard key={card.id} card={card} />
      ))}

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-[10px] tracking-[0.28em] uppercase"
          style={{
            borderColor: "rgba(15,15,14,0.1)",
            color: "rgba(15,15,14,0.4)",
            fontFamily: "var(--font-mono)",
            background: "rgba(255,255,255,0.6)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#16A34A", animation: "pulseDot 2s ease-in-out infinite" }}
          />
          ONE CAMPUS · ONE MARKETPLACE
        </div>

        <h1
          className="font-black uppercase leading-[0.86]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(58px, 9.5vw, 136px)",
            letterSpacing: "-0.025em",
            color: "#0F0F0E",
          }}
        >
          YOUR CAMPUS
          <br />
          IS A
          <br />
          <span style={{ color: "#F4511E" }}>MARKETPLACE.</span>
        </h1>

        <p
          className="mt-8 leading-relaxed max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(15,15,14,0.55)",
          }}
        >
          Buy what you need. Sell what you don&apos;t. Keep everything within
          your campus.
        </p>

        <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
          <button
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-[11px] tracking-widest transition-all hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ background: "#F4511E", fontFamily: "var(--font-mono)" }}
          >
            EXPLORE MARKETPLACE →
          </button>
          <button
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] tracking-widest border transition-all hover:bg-[#0F0F0E] hover:text-white active:scale-95"
            style={{
              borderColor: "rgba(15,15,14,0.2)",
              color: "#0F0F0E",
              fontFamily: "var(--font-mono)",
            }}
          >
            + SELL SOMETHING
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
          {[
            { label: "248 items listed today", dot: "#F4511E" },
            { label: "100% student verified", dot: "#16A34A" },
            { label: "0.4 km avg distance", dot: "#0F0F0E" },
          ].map(({ label, dot }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] tracking-wider"
              style={{
                borderColor: "rgba(15,15,14,0.1)",
                color: "rgba(15,15,14,0.55)",
                fontFamily: "var(--font-mono)",
                background: "rgba(255,255,255,0.65)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: dot }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span
          className="text-[9px] tracking-widest"
          style={{ fontFamily: "var(--font-mono)", color: "#0F0F0E" }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-8"
          style={{
            background: "#0F0F0E",
            animation: "scrollCue 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  )
}

function TickerBanner() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="overflow-hidden py-4" style={{ background: "#0F0F0E" }}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="shrink-0 mr-14 text-[11px] tracking-widest"
            style={{
              fontFamily: "var(--font-mono)",
              color: i % 2 === 0 ? "rgba(248,247,243,0.85)" : "#F4511E",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function CategoriesSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  const cats = [
    {
      id: "books",
      label: "BOOKS",
      emoji: "📚",
      count: 124,
      color: "#FEF3C7",
      grid: "col-span-2 row-span-2",
      min: "280px",
      large: true,
    },
    {
      id: "electronics",
      label: "ELECTRONICS",
      emoji: "💻",
      count: 87,
      color: "#DBEAFE",
      grid: "col-span-1 row-span-1",
      min: "130px",
      large: false,
    },
    {
      id: "furniture",
      label: "FURNI-TURE",
      emoji: "🪑",
      count: 43,
      color: "#D1FAE5",
      grid: "col-span-1 row-span-2",
      min: "280px",
      large: false,
    },
    {
      id: "hostel",
      label: "HOSTEL ESSENTIALS",
      emoji: "🛏️",
      count: 96,
      color: "#FEE2E2",
      grid: "col-span-1 row-span-1",
      min: "130px",
      large: false,
    },
    {
      id: "study",
      label: "STUDY MATERIALS",
      emoji: "📝",
      count: 58,
      color: "#FCE7F3",
      grid: "col-span-2 row-span-1",
      min: "120px",
      large: false,
    },
    {
      id: "cycles",
      label: "CYCLES",
      emoji: "🚲",
      count: 31,
      color: "#EDE9FE",
      grid: "col-span-1 row-span-1",
      min: "120px",
      large: false,
    },
    {
      id: "sports",
      label: "SPORTS",
      emoji: "⚽",
      count: 22,
      color: "#DCFCE7",
      grid: "col-span-1 row-span-1",
      min: "120px",
      large: false,
    },
  ]

  return (
    <section className="px-4 py-24" style={{ background: "#F8F7F3" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.4)" }}
          >
            WHAT&apos;S AROUND YOU
          </p>
          <h2
            className="font-black uppercase leading-[0.88]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6vw, 88px)",
              letterSpacing: "-0.025em",
              color: "#0F0F0E",
            }}
          >
            WHY BUY NEW
            <br />
            WHEN IT&apos;S
            <br />
            ALREADY HERE?
          </h2>
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {cats.map((cat) => {
            const isHov = hovered === cat.id
            return (
              <div
                key={cat.id}
                className={`${cat.grid} rounded-3xl p-6 cursor-pointer border overflow-hidden transition-all duration-300`}
                style={{
                  background: cat.color,
                  minHeight: cat.min,
                  borderColor: isHov ? "rgba(15,15,14,0.18)" : "transparent",
                  transform: isHov ? "scale(1.02)" : "scale(1)",
                  boxShadow: isHov ? "0 12px 32px rgba(0,0,0,0.1)" : "none",
                }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="text-4xl mb-3 transition-transform duration-300"
                  style={{
                    fontSize: cat.large ? "52px" : "36px",
                    transform: isHov ? "scale(1.12) rotate(6deg)" : "none",
                  }}
                >
                  {cat.emoji}
                </div>
                <p
                  className="text-[9px] tracking-widest uppercase mb-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "rgba(15,15,14,0.45)",
                  }}
                >
                  {cat.count} items
                </p>
                <h3
                  className="font-black uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isHov && cat.large
                      ? "clamp(28px,3.5vw,48px)"
                      : cat.large
                      ? "clamp(22px,2.8vw,40px)"
                      : "clamp(16px,1.8vw,24px)",
                    color: "#0F0F0E",
                    transition: "font-size 0.3s",
                  }}
                >
                  {cat.label}
                </h3>
                {isHov && (
                  <div
                    className="mt-3 text-[10px] tracking-widest"
                    style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.6)" }}
                  >
                    EXPLORE →
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

type FilterType = "ALL" | "NEAR ME" | "UNDER ₹500" | "BOOKS" | "ELECTRONICS" | "HOSTEL"

function ListingCard({ listing }: { listing: Listing }) {
  const [hov, setHov] = useState(false)
  const condColors = {
    NEW: { bg: "#0F0F0E", text: "#F8F7F3" },
    "LIKE NEW": { bg: "#16A34A", text: "#FFFFFF" },
    GOOD: { bg: "#F4511E", text: "#FFFFFF" },
  }
  const c = condColors[listing.condition]

  return (
    <div
      className="rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        background: "#FFFFFF",
        borderColor: "rgba(15,15,14,0.08)",
        transform: hov ? "translateY(-5px) scale(1.015)" : "none",
        boxShadow: hov
          ? "0 20px 40px rgba(0,0,0,0.12)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="h-40 flex items-center justify-center text-5xl relative"
        style={{ background: listing.emojiColor }}
      >
        {listing.emoji}
        <span
          className="absolute top-3 left-3 text-[8px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: listing.tag === "URGENT" ? "#EF4444" : "#F4511E",
            color: "#FFFFFF",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.06em",
          }}
        >
          {listing.tag}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-bold text-base leading-tight flex-1"
            style={{ fontFamily: "var(--font-display)", color: "#0F0F0E" }}
          >
            {listing.name}
          </h3>
          <span
            className="text-[8px] px-1.5 py-0.5 rounded shrink-0"
            style={{
              background: c.bg,
              color: c.text,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
            }}
          >
            {listing.condition}
          </span>
        </div>

        <p
          className="font-black text-2xl mt-1"
          style={{ fontFamily: "var(--font-display)", color: "#F4511E" }}
        >
          ₹{listing.price.toLocaleString("en-IN")}
        </p>

        <div
          className="flex items-center justify-between mt-3 pt-3 border-t"
          style={{ borderColor: "rgba(15,15,14,0.08)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                background: listing.avatarColor,
                fontFamily: "var(--font-display)",
                color: "#0F0F0E",
              }}
            >
              {listing.initials}
            </div>
            <div>
              <p
                className="text-[10px] font-semibold leading-none"
                style={{ fontFamily: "var(--font-body)", color: "#0F0F0E" }}
              >
                {listing.seller}
              </p>
              <p
                className="text-[9px] mt-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "rgba(15,15,14,0.4)",
                }}
              >
                {listing.distance}
              </p>
            </div>
          </div>
          <button
            className="text-[9px] tracking-wider px-3 py-1.5 rounded-full transition-all"
            style={{
              fontFamily: "var(--font-mono)",
              background: hov ? "#F4511E" : "transparent",
              color: hov ? "#FFFFFF" : "#0F0F0E",
              border: `1px solid ${hov ? "#F4511E" : "rgba(15,15,14,0.2)"}`,
            }}
          >
            MESSAGE
          </button>
        </div>
      </div>
    </div>
  )
}

function MarketplaceFeed() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL")
  const FILTERS: FilterType[] = [
    "ALL",
    "NEAR ME",
    "UNDER ₹500",
    "BOOKS",
    "ELECTRONICS",
    "HOSTEL",
  ]

  const filtered = LISTINGS.filter((l) => {
    if (activeFilter === "ALL" || activeFilter === "NEAR ME") return true
    if (activeFilter === "UNDER ₹500") return l.price < 500
    if (activeFilter === "BOOKS") return l.category === "BOOKS"
    if (activeFilter === "ELECTRONICS") return l.category === "ELECTRONICS"
    if (activeFilter === "HOSTEL") return l.category === "HOSTEL"
    return true
  })

  return (
    <section className="px-4 py-24" style={{ background: "#F8F7F3" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.4)" }}
            >
              MARKETPLACE FEED
            </p>
            <h2
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 64px)",
                letterSpacing: "-0.025em",
                color: "#0F0F0E",
              }}
            >
              JUST DROPPED
              <br />
              ON CAMPUS
            </h2>
          </div>
          <button
            className="text-[10px] tracking-widest transition-colors hover:opacity-100"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.4)" }}
          >
            VIEW ALL →
          </button>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-2 rounded-full text-[10px] tracking-widest border transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                background: activeFilter === f ? "#0F0F0E" : "transparent",
                color: activeFilter === f ? "#F8F7F3" : "#0F0F0E",
                borderColor: activeFilter === f ? "#0F0F0E" : "rgba(15,15,14,0.2)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
        >
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
          {filtered.length === 0 && (
            <div
              className="col-span-full text-center py-20 text-sm"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.25)" }}
            >
              No items in this category yet.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function DisconnectSection() {
  const [stage, setStage] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStage(1), 400)
          setTimeout(() => setStage(2), 2600)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="px-4 py-28 overflow-hidden"
      style={{ background: "#0F0F0E" }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-8"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.25)" }}
        >
          THE REAL PROBLEM
        </p>

        <h2
          className="font-black uppercase leading-[0.88] text-white"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 88px)",
            letterSpacing: "-0.025em",
          }}
        >
          THE PROBLEM
          <br />
          ISN&apos;T LACK
          <br />
          OF STUFF.
        </h2>

        <p
          className="font-black uppercase mt-4 leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4.5vw, 64px)",
            letterSpacing: "-0.025em",
            color: "#F4511E",
          }}
        >
          IT&apos;S THE DISCONNECT.
        </p>

        {/* Visualization */}
        <div className="mt-20 flex items-center justify-center gap-6 md:gap-12">
          <div
            className="flex flex-col items-center gap-3 transition-all duration-700"
            style={{
              transform: stage >= 1 ? "translateX(0)" : "translateX(-48px)",
              opacity: stage >= 1 ? 1 : 0,
            }}
          >
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.15)",
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  👤
                </div>
              ))}
            </div>
            <p
              className="text-[9px] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.4)" }}
            >
              NEED IT
            </p>
          </div>

          {/* Connection line */}
          <div
            className="flex-1 max-w-[260px] relative"
            style={{ height: "40px" }}
          >
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 260 40"
              preserveAspectRatio="none"
            >
              {stage === 1 && (
                <>
                  <line
                    x1="0"
                    y1="20"
                    x2="100"
                    y2="20"
                    stroke="rgba(244,81,30,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                  <text
                    x="130"
                    y="26"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.2)"
                    fontSize="16"
                    fontFamily="var(--font-display)"
                  >
                    ???
                  </text>
                  <line
                    x1="160"
                    y1="20"
                    x2="260"
                    y2="20"
                    stroke="rgba(244,81,30,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                </>
              )}
              {stage === 2 && (
                <line
                  x1="0"
                  y1="20"
                  x2="260"
                  y2="20"
                  stroke="#16A34A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ animation: "drawLine 0.7s ease forwards" }}
                />
              )}
            </svg>
          </div>

          <div
            className="flex flex-col items-center gap-3 transition-all duration-700"
            style={{
              transform: stage >= 1 ? "translateX(0)" : "translateX(48px)",
              opacity: stage >= 1 ? 1 : 0,
            }}
          >
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  👤
                </div>
              ))}
            </div>
            <p
              className="text-[9px] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.4)" }}
            >
              HAVE IT
            </p>
          </div>
        </div>

        {stage === 2 && (
          <div
            className="mt-12"
            style={{ animation: "fadeUp 0.5s ease forwards" }}
          >
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.65)" }}
            >
              Campus Marketplace connects them.
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#16A34A", animation: "pulseDot 2s ease-in-out infinite" }}
              />
              <span
                className="text-[10px] tracking-widest uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "#16A34A" }}
              >
                CONNECTED ON CAMPUS
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          HOW_IT_WORKS.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), i * 280)
          })
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="px-4 py-24" style={{ background: "#F8F7F3" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.4)" }}
          >
            THE PROCESS
          </p>
          <h2
            className="font-black uppercase leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              letterSpacing: "-0.025em",
              color: "#0F0F0E",
            }}
          >
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          <div
            className="hidden md:block absolute h-px left-8 right-8"
            style={{ top: "40px", background: "rgba(15,15,14,0.08)" }}
          />

          {HOW_IT_WORKS.map((step, i) => (
            <div
              key={step.step}
              className="relative flex flex-col items-start md:items-center md:text-center gap-4 p-4 transition-all duration-500"
              style={{
                opacity: activeStep >= i ? 1 : 0.15,
                transform: activeStep >= i ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center relative z-10 border-2 transition-all duration-400 shrink-0"
                style={{
                  background: activeStep >= i ? "#F4511E" : "#F8F7F3",
                  borderColor: activeStep >= i ? "#F4511E" : "rgba(15,15,14,0.15)",
                }}
              >
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: activeStep >= i ? "#FFFFFF" : "rgba(15,15,14,0.4)",
                  }}
                >
                  {step.step}
                </span>
              </div>

              <div>
                <h3
                  className="font-black uppercase text-2xl text-[#0F0F0E]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm mt-1 leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(15,15,14,0.5)",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CampusMapSection() {
  const [activePin, setActivePin] = useState<string | null>(null)

  return (
    <section className="px-4 py-24" style={{ background: "#EFEDE8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.4)" }}
            >
              CAMPUS PROXIMITY
            </p>
            <h2
              className="font-black uppercase leading-[0.88]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "-0.025em",
                color: "#0F0F0E",
              }}
            >
              EVERYTHING IS
              <br />
              CLOSER THAN
              <br />
              YOU THINK.
            </h2>
            <p
              className="mt-6 text-sm leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-body)", color: "rgba(15,15,14,0.55)" }}
            >
              Every listing is from a student on your own campus. Most items are
              less than 1 km away. No shipping. No strangers. Just campus.
            </p>

            <div
              className="mt-8 inline-flex items-center gap-5 px-6 py-4 rounded-2xl border"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderColor: "rgba(15,15,14,0.08)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <div>
                <p
                  className="font-black text-4xl"
                  style={{ fontFamily: "var(--font-display)", color: "#F4511E" }}
                >
                  47
                </p>
                <p
                  className="font-bold uppercase text-xs"
                  style={{ fontFamily: "var(--font-display)", color: "#0F0F0E" }}
                >
                  ITEMS
                </p>
              </div>
              <div
                className="w-px h-10"
                style={{ background: "rgba(15,15,14,0.1)" }}
              />
              <div>
                <p
                  className="text-xs"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(15,15,14,0.5)" }}
                >
                  Within
                </p>
                <p
                  className="font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "#0F0F0E" }}
                >
                  1 KM RADIUS
                </p>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="text-[11px] tracking-widest transition-colors hover:opacity-70"
                style={{ fontFamily: "var(--font-mono)", color: "#F4511E" }}
              >
                EXPLORE NEARBY →
              </button>
            </div>
          </div>

          {/* Campus Map */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden border relative"
              style={{
                background: "#E8E6DF",
                borderColor: "rgba(15,15,14,0.08)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="px-5 pt-4 pb-2 flex items-center justify-between"
              >
                <p
                  className="text-[9px] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.35)" }}
                >
                  CAMPUS MAP · TAP A PIN
                </p>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#16A34A", animation: "pulseDot 2s ease-in-out infinite" }}
                />
              </div>

              <svg
                viewBox="0 0 580 360"
                className="w-full"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {/* Roads */}
                <line x1="0" y1="180" x2="580" y2="180" stroke="rgba(15,15,14,0.07)" strokeWidth="10" />
                <line x1="290" y1="0" x2="290" y2="360" stroke="rgba(15,15,14,0.07)" strokeWidth="10" />
                <line x1="80" y1="0" x2="80" y2="360" stroke="rgba(15,15,14,0.05)" strokeWidth="7" />
                <line x1="500" y1="0" x2="500" y2="360" stroke="rgba(15,15,14,0.05)" strokeWidth="7" />
                <line x1="0" y1="100" x2="580" y2="100" stroke="rgba(15,15,14,0.05)" strokeWidth="6" />
                <line x1="0" y1="290" x2="580" y2="290" stroke="rgba(15,15,14,0.05)" strokeWidth="6" />

                {/* Buildings */}
                <rect x="100" y="118" width="160" height="50" rx="7" fill="rgba(15,15,14,0.07)" stroke="rgba(15,15,14,0.14)" strokeWidth="1" />
                <text x="180" y="148" textAnchor="middle" fontSize="7.5" fill="rgba(15,15,14,0.55)" fontWeight="700">ACADEMIC BLOCK</text>

                <rect x="305" y="20" width="110" height="65" rx="7" fill="rgba(244,81,30,0.07)" stroke="rgba(244,81,30,0.25)" strokeWidth="1" />
                <text x="360" y="55" textAnchor="middle" fontSize="7.5" fill="rgba(15,15,14,0.55)" fontWeight="700">LIBRARY</text>

                <rect x="95" y="20" width="110" height="65" rx="7" fill="rgba(15,15,14,0.05)" stroke="rgba(15,15,14,0.1)" strokeWidth="1" />
                <text x="150" y="52" textAnchor="middle" fontSize="7" fill="rgba(15,15,14,0.45)" fontWeight="600">SPORTS</text>
                <text x="150" y="63" textAnchor="middle" fontSize="7" fill="rgba(15,15,14,0.45)" fontWeight="600">COMPLEX</text>

                <rect x="305" y="198" width="90" height="70" rx="7" fill="rgba(22,163,74,0.07)" stroke="rgba(22,163,74,0.2)" strokeWidth="1" />
                <text x="350" y="237" textAnchor="middle" fontSize="7.5" fill="rgba(15,15,14,0.55)" fontWeight="700">CAFETERIA</text>

                {/* Hostels */}
                <rect x="100" y="305" width="55" height="42" rx="5" fill="rgba(15,15,14,0.06)" stroke="rgba(15,15,14,0.1)" strokeWidth="1" />
                <rect x="162" y="310" width="50" height="37" rx="5" fill="rgba(15,15,14,0.06)" stroke="rgba(15,15,14,0.1)" strokeWidth="1" />
                <rect x="219" y="305" width="52" height="42" rx="5" fill="rgba(15,15,14,0.06)" stroke="rgba(15,15,14,0.1)" strokeWidth="1" />
                <text x="172" y="355" textAnchor="middle" fontSize="7" fill="rgba(15,15,14,0.4)" fontWeight="600">HOSTELS</text>

                {/* Pins */}
                {CAMPUS_PINS.map((pin) => {
                  const isActive = activePin === pin.id
                  return (
                    <g
                      key={pin.id}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setActivePin(isActive ? null : pin.id)
                      }
                    >
                      {isActive && (
                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r="22"
                          fill="rgba(244,81,30,0.12)"
                        />
                      )}
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r="16"
                        fill={isActive ? "#F4511E" : "#FFFFFF"}
                        stroke={isActive ? "#F4511E" : "rgba(15,15,14,0.18)"}
                        strokeWidth="1.5"
                        style={{
                          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
                        }}
                      />
                      <text
                        x={pin.x}
                        y={pin.y + 6}
                        textAnchor="middle"
                        fontSize="14"
                      >
                        {pin.icon}
                      </text>
                      <rect
                        x={pin.x - 29}
                        y={pin.y + 20}
                        width="58"
                        height="15"
                        rx="7"
                        fill="rgba(15,15,14,0.8)"
                      />
                      <text
                        x={pin.x}
                        y={pin.y + 31}
                        textAnchor="middle"
                        fontSize="6"
                        fill="#F8F7F3"
                        fontWeight="600"
                      >
                        {pin.label}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Active pin popup */}
              {activePin && (
                <div
                  className="absolute top-10 right-4 rounded-2xl border p-4 min-w-[160px]"
                  style={{
                    background: "rgba(248,247,243,0.97)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderColor: "rgba(15,15,14,0.1)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    animation: "fadeUp 0.2s ease forwards",
                    zIndex: 20,
                  }}
                >
                  <p
                    className="text-[9px] tracking-widest uppercase mb-2"
                    style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.45)" }}
                  >
                    NEARBY LISTINGS
                  </p>
                  {CAMPUS_PINS.find((p) => p.id === activePin)?.listings.map(
                    (l, i) => (
                      <p
                        key={i}
                        className="text-[11px] py-1.5 border-b last:border-0"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "#0F0F0E",
                          borderColor: "rgba(15,15,14,0.07)",
                        }}
                      >
                        {l}
                      </p>
                    )
                  )}
                  <button
                    className="mt-2 text-[9px] tracking-wider"
                    style={{ fontFamily: "var(--font-mono)", color: "#F4511E" }}
                    onClick={() => setActivePin(null)}
                  >
                    CLOSE ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CommunitySection() {
  return (
    <section className="px-4 py-24" style={{ background: "#0F0F0E" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.25)" }}
          >
            TRUST & COMMUNITY
          </p>
          <h2
            className="font-black uppercase leading-[0.88] text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              letterSpacing: "-0.025em",
            }}
          >
            BUY FROM PEOPLE
            <br />
            YOU ACTUALLY SHARE
            <br />
            A CAMPUS WITH.
          </h2>
        </div>

        {/* Trust pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {[
            { icon: "✓", label: "College Verified", sub: "Every account is tied to a .edu email" },
            { icon: "✓", label: "Student-to-Student", sub: "No businesses. Just campus peers." },
            { icon: "✓", label: "Campus Proximity", sub: "Items within your campus boundary only" },
            { icon: "✓", label: "Transparent Profiles", sub: "Ratings, history, and student details" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-2xl border"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3"
                style={{ background: "#16A34A", fontFamily: "var(--font-display)" }}
              >
                {item.icon}
              </div>
              <p
                className="font-bold uppercase text-white text-sm mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)" }}
              >
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Seller cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SELLERS.map((seller) => (
            <div
              key={seller.id}
              className="p-5 rounded-2xl border cursor-pointer transition-all duration-200 hover:border-white/15 group"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mb-3"
                style={{
                  background: seller.color,
                  fontFamily: "var(--font-display)",
                  color: "#0F0F0E",
                }}
              >
                {seller.initials}
              </div>
              <p
                className="font-bold text-white text-sm leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {seller.name}
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.04em",
                }}
              >
                {seller.course}
              </p>
              <p
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.25)" }}
              >
                {seller.year}
              </p>

              <div
                className="flex items-center gap-3 mt-3 pt-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <p
                  className="font-black text-white text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ⭐ {seller.rating}
                </p>
                <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
                <p
                  className="text-[10px]"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.35)" }}
                >
                  {seller.sold} sold
                </p>
              </div>

              <div
                className="mt-3 text-[9px] tracking-wider px-2.5 py-1 rounded-full inline-block"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(22,163,74,0.14)",
                  color: "#22C55E",
                  letterSpacing: "0.06em",
                }}
              >
                ✓ COLLEGE VERIFIED
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReuseSection() {
  const journey = [
    { student: "Rahul · 2019", price: "₹900", action: "BOUGHT NEW", color: "#FEF3C7" },
    { student: "Divya · 2020", price: "₹600", action: "BOUGHT USED", color: "#DBEAFE" },
    { student: "Karan · 2021", price: "₹350", action: "BOUGHT USED", color: "#D1FAE5" },
    { student: "Ananya · 2022", price: "FREE", action: "PASSED ON", color: "#EDE9FE" },
  ]

  return (
    <section className="px-4 py-24 overflow-hidden" style={{ background: "#F8F7F3" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.4)" }}
          >
            SUSTAINABILITY
          </p>
          <h2
            className="font-black uppercase leading-[0.88]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 72px)",
              letterSpacing: "-0.025em",
              color: "#0F0F0E",
            }}
          >
            ONE ITEM.
            <br />
            MORE THAN
            <br />
            ONE LIFE.
          </h2>
        </div>

        {/* Journey */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {journey.map((node, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center border"
                  style={{
                    background: node.color,
                    borderColor: "rgba(15,15,14,0.1)",
                  }}
                >
                  <p
                    className="font-black text-center leading-none"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: node.price === "FREE" ? "18px" : "15px",
                      color: "#0F0F0E",
                    }}
                  >
                    {node.price}
                  </p>
                  <p
                    className="text-[7px] uppercase tracking-wider mt-1 text-center"
                    style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.45)" }}
                  >
                    {node.action}
                  </p>
                </div>
                <p
                  className="text-[9px] text-center"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.38)" }}
                >
                  {node.student}
                </p>
              </div>
              {i < journey.length - 1 && (
                <div className="flex items-center shrink-0 -mt-6">
                  <div className="w-3 md:w-6 h-px" style={{ background: "#F4511E" }} />
                  <span className="text-[#F4511E] text-sm">→</span>
                  <div className="w-3 md:w-6 h-px" style={{ background: "#F4511E" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div
            className="px-6 py-3 rounded-full border inline-flex items-center gap-3"
            style={{
              borderColor: "rgba(15,15,14,0.1)",
              background: "#FFFFFF",
            }}
          >
            <span className="text-xl">📚</span>
            <div>
              <p
                className="font-bold text-sm"
                style={{ fontFamily: "var(--font-display)", color: "#0F0F0E" }}
              >
                Engineering Mathematics
              </p>
              <p
                className="text-[9px] tracking-wider uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(15,15,14,0.4)" }}
              >
                PASSED THROUGH 4 STUDENTS · STILL USEFUL
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p
            className="font-black uppercase leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2.8vw, 36px)",
              color: "#0F0F0E",
              letterSpacing: "-0.015em",
            }}
          >
            Save money.{" "}
            <span style={{ color: "#16A34A" }}>Reduce waste.</span>{" "}
            Keep useful things moving.
          </p>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)

  return (
    <section className="px-4 py-32 text-center" style={{ background: "#0F0F0E" }}>
      <div className="max-w-3xl mx-auto">
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-10"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.25)" }}
        >
          START NOW
        </p>

        <h2
          className="font-black uppercase text-white leading-[0.86]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 7.5vw, 108px)",
            letterSpacing: "-0.025em",
          }}
        >
          WHAT ARE
          <br />
          YOU LOOKING
          <br />
          <span style={{ color: "#F4511E" }}>FOR?</span>
        </h2>

        <div className="mt-14 relative mx-auto max-w-lg">
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: focused
                ? "rgba(244,81,30,0.6)"
                : "rgba(255,255,255,0.1)",
              boxShadow: focused ? "0 0 0 4px rgba(244,81,30,0.1)" : "none",
            }}
          >
            <span className="text-lg" style={{ color: "rgba(255,255,255,0.25)" }}>
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Try 'calculator', 'cycle', 'hostel chair'..."
              className="flex-1 bg-transparent outline-none text-white"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "#FFFFFF",
              }}
            />
            {query && (
              <button
                className="px-4 py-2 rounded-xl text-white text-[10px] tracking-wider transition-all hover:opacity-90"
                style={{ background: "#F4511E", fontFamily: "var(--font-mono)" }}
              >
                SEARCH →
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div
            className="h-px flex-1 max-w-[80px]"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <span
            className="text-[10px] tracking-widest"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.25)" }}
          >
            OR
          </span>
          <div
            className="h-px flex-1 max-w-[80px]"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </div>

        <button
          className="mt-8 px-8 py-4 rounded-full border text-sm tracking-widest transition-all hover:bg-white hover:border-white active:scale-95"
          style={{
            fontFamily: "var(--font-mono)",
            borderColor: "rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.6)",
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget
            b.style.color = "#0F0F0E"
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget
            b.style.color = "rgba(255,255,255,0.6)"
          }}
        >
          SELL SOMETHING YOU DON&apos;T NEED →
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="px-4 py-16 border-t"
      style={{ background: "#0F0F0E", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "#F4511E", fontFamily: "var(--font-display)" }}
              >
                C
              </div>
              <span
                className="font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                CAMPUS MARKETPLACE
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)" }}
            >
              Built for students.
              <br />
              Powered by community.
            </p>
            <div className="flex gap-2.5 mt-6">
              {["IG", "TW", "LI", "DC"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] transition-all hover:border-white/30 hover:text-white"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-[9px] tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.25)" }}
            >
              EXPLORE
            </p>
            <div className="flex flex-col gap-3">
              {["Marketplace", "Categories", "Sell", "How it works"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm transition-colors"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-[9px] tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.25)" }}
            >
              SUPPORT
            </p>
            <div className="flex flex-col gap-3">
              {["Safety", "Contact", "Terms", "Privacy"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm transition-colors"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 border-t flex items-center justify-between flex-wrap gap-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-[10px] tracking-wider"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.18)" }}
          >
            © 2025 CAMPUS MARKETPLACE · ALL RIGHTS RESERVED
          </p>
          <p
            className="text-[10px] tracking-wider"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.18)" }}
          >
            STUDENT VERIFIED · CAMPUS ONLY
          </p>
        </div>
      </div>
    </footer>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <Navbar />
      <HeroSection />
      <TickerBanner />
      <CategoriesSection />
      <MarketplaceFeed />
      <DisconnectSection />
      <HowItWorks />
      <CampusMapSection />
      <CommunitySection />
      <ReuseSection />
      <FinalCTA />
      <Footer />
    </div>
  )
}
