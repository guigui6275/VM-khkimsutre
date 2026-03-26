'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const liens = [
  { href: '/', label: 'Accueil' },
  { href: '/biographie', label: 'Biographie' },
  { href: '/discographie', label: 'Discographie' },
  { href: '/concerts', label: 'Concerts' },
  { href: '/medias', label: 'Médias' },
  { href: '/presse', label: 'Presse' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      background: 'var(--color-noir)',
      height: '56px',
    }}>
      <Link href="/" style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: '14px',
          fontWeight: '400',
          letterSpacing: '0.1em',
          color: '#F7F5F8',
        }}>Kyung-Hee Kim-Sutre</span>
        <span style={{
          fontSize: '9px',
          fontWeight: '300',
          letterSpacing: '0.2em',
          color: 'var(--color-or)',
          marginTop: '2px',
          fontStyle: 'italic',
        }}>Harpiste</span>
      </Link>

      <ul style={{
        display: 'flex',
        gap: '22px',
        listStyle: 'none',
      }}>
        {liens.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} style={{
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: pathname === href ? 'var(--color-or)' : '#C8B8D8',
              fontWeight: '300',
              borderBottom: pathname === href ? '1px solid var(--color-or)' : 'none',
              paddingBottom: pathname === href ? '1px' : '0',
            }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}