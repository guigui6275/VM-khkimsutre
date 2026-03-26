import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      padding: '18px 32px',
      background: 'var(--color-noir)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--font-playfair)',
        fontSize: '12px',
        color: 'var(--color-or)',
        letterSpacing: '0.1em',
      }}>
        Kyung-Hee Kim-Sutre
      </span>

      <span style={{
        fontSize: '11px',
        color: '#6A5A7A',
        fontWeight: '300',
        fontStyle: 'italic',
      }}>
        Artiste Sonarti Records
      </span>

      <div style={{ display: 'flex', gap: '18px' }}>
        {[
          { href: 'https://facebook.com', label: 'Facebook' },
          { href: '/contact', label: 'Contact' },
          { href: 'https://sonarti.com', label: 'Sonarti Records' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{
            fontSize: '11px',
            color: '#5A4A6A',
            fontWeight: '300',
          }}>
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}