'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const liens = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/discographie', label: 'Discographie' },
  { href: '/calendrier', label: 'Calendrier' },  // ← était /concerts
  { href: '/medias', label: 'Médias' },
  { href: '/presse', label: 'Presse' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOuvert(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOuvert(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        background: "var(--color-noir)",
        position: "relative",
      zIndex: 100,
        borderBottom: "0.5px solid var(--color-bordure)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: "56px",
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", flexDirection: "column" }}
          onClick={() => setMenuOuvert(false)}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: "400",
              letterSpacing: "0.14em",
              color: "var(--color-ivoire)",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
            }}
          >
            Guillaume Sutre
          </span>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "10px",
              fontWeight: "300",
              letterSpacing: "0.12em",
              color: "var(--color-accent)",
              marginTop: "1px",
              fontStyle: "italic",
            }}
          >
            Violoniste
          </span>
        </Link>

        <ul
          style={{
            display: "flex",
            gap: "24px",
            listStyle: "none",
          margin: 0,
          padding: 0,
          }}
          className="nav-desktop"
        >
          {liens.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                data-active={pathname === href}
                style={{
                  fontSize: "10.5px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: pathname === href ? "var(--color-accent)" : "#b0b0b0",
                  fontWeight: "300",
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.2s",
                  position: "relative",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOuvert(!menuOuvert)}
          className="nav-hamburger"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "none",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1px",
              background: menuOuvert
                ? "var(--color-accent)"
                : "var(--color-ivoire)",
              transition: "all .2s",
              transform: menuOuvert
                ? "rotate(45deg) translate(4px, 4px)"
                : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1px",
              background: menuOuvert ? "transparent" : "var(--color-ivoire)",
              transition: "all .2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1px",
              background: menuOuvert
                ? "var(--color-accent)"
                : "var(--color-ivoire)",
              transition: "all .2s",
              transform: menuOuvert
                ? "rotate(-45deg) translate(4px, -4px)"
                : "none",
            }}
          />
        </button>
      </div>

      {menuOuvert && (
        <div
          style={{
            background: "var(--color-noir)",
            borderTop: "0.5px solid var(--color-bordure)",
            padding: "16px 32px 24px",
          }}
          className="nav-mobile-menu"
        >
          {liens.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOuvert(false)}
              style={{
                display: "block",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: pathname === href ? "var(--color-accent)" : "#b0b0b0",
                fontWeight: "300",
                padding: "10px 0",
                borderBottom: "0.5px solid var(--color-bordure)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 830px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }

.nav-desktop a::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  transition: width 0.2s ease;
}

/* Hover uniquement sur les liens inactifs */
.nav-desktop a:not([data-active="true"]):hover::after {
  width: 100%;
}
      `}</style>
    </nav>
  );
}
