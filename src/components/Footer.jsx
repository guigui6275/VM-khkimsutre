import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" style={{
      padding: '18px 32px',
      background: 'var(--color-noir)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '0.5px solid var(--color-bordure)',
    }}>
      <span className="footer-nom" style={{
        fontSize: '12px',
        color: 'var(--color-accent)',
        letterSpacing: '0.12em',
        fontFamily: 'var(--font-sans)',
        textTransform: 'uppercase',
        fontWeight: '300',
      }}>
        Kyung-Hee Kim-Sutre
      </span>

      <span className="footer-label" style={{
        fontSize: '11px',
        color: 'var(--color-texte-muted)',
        fontWeight: '300',
        fontStyle: 'italic',
        fontFamily: 'var(--font-playfair)',
      }}>
        Artiste Sonarti Records
      </span>

      <div className="footer-liens" style={{ display: 'flex', gap: '18px' }}>
        <a href="https://www.facebook.com/KyungheeKimSutreHarp/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#8a8a8a', fontWeight: '300' }}>Facebook</a>
        <Link href="/contact" style={{ fontSize: '11px', color: '#8a8a8a', fontWeight: '300' }}>Contact</Link>
        <a href="https://sonarti.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#8a8a8a', fontWeight: '300' }}>Sonarti Records</a>
        <Link href="/mentions-legales" style={{ fontSize: '11px', color: '#8a8a8a', fontWeight: '300' }}>Mentions légales</Link>
      </div>
    </footer>
  );
}
