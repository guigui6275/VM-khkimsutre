import { getArtiste, getAlbums, getConcerts, getRevues } from '@/lib/api';

const SLUG = process.env.NEXT_PUBLIC_ARTISTE_SLUG;

export default async function HomePage() {
  const [artiste, albums, concerts, revues] = await Promise.all([
    getArtiste(SLUG),
    getAlbums(SLUG),
    getConcerts(SLUG, true),
    getRevues(SLUG),
  ]);

  const a = artiste.data[0];
  const dernierAlbum = albums.data[0];
  const prochainConcert = concerts.data[0];

  if (!a) return <div style={{ padding: '40px' }}>Artiste non trouvé.</div>;

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 220px',
        borderBottom: '0.5px solid var(--color-bordure)',
        minHeight: '280px',
      }}>
        <div style={{
          padding: '48px 36px 48px 40px',
          borderRight: '0.5px solid var(--color-bordure)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-or)',
            marginBottom: '14px',
            fontWeight: '300',
          }}>{a.instrument}</p>

          <h1 style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '38px',
            fontWeight: '400',
            color: 'var(--color-texte)',
            marginBottom: '6px',
            lineHeight: '1.1',
          }}>{a.nom}</h1>

          <p style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '17px',
            fontStyle: 'italic',
            color: 'var(--color-accent)',
            marginBottom: '20px',
          }}>Musique de chambre & récital</p>

          <p style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: 'var(--color-texte-secondaire)',
            fontWeight: '300',
            marginBottom: '24px',
          }}>{a.bio_courte}</p>

          <div style={{ display: 'flex', gap: '14px' }}>
            <a href="/concerts" style={{
              padding: '8px 18px',
              background: 'var(--color-noir)',
              color: '#F8F4EF',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: '300',
            }}>Prochains concerts</a>
            <a href="/biographie" style={{
              padding: '8px 18px',
              background: 'transparent',
              color: 'var(--color-noir)',
              border: '0.5px solid var(--color-noir)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: '300',
            }}>Biographie</a>
          </div>
        </div>

        <div style={{
          background: 'var(--color-bg-alt)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'var(--color-noir)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-playfair)',
            fontSize: '28px',
            color: '#F8F4EF',
          }}>
            {a.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-or)',
            border: '0.5px solid var(--color-or)',
            padding: '2px 7px',
            fontWeight: '300',
            background: 'var(--color-bg-alt)',
          }}>Sonarti Records</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.5px 1fr 0.5px 1fr',
        borderBottom: '0.5px solid var(--color-bordure)',
      }}>
        <div style={{ padding: '28px 24px' }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '16px',
            fontWeight: '300',
          }}>Dernier album</p>

          {dernierAlbum ? (
            <>
              <div style={{
                width: '100%',
                aspectRatio: '1',
                background: 'var(--color-bg-alt)',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '0.5px solid var(--color-bordure)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  color: 'var(--color-texte-muted)',
                }}>{dernierAlbum.titre}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '15px', marginBottom: '3px' }}>
                {dernierAlbum.titre}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-texte-muted)', fontWeight: '300' }}>
                {dernierAlbum.date_sortie
                  ? new Date(dernierAlbum.date_sortie).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                  : ''}
              </p>
            </>
          ) : (
            <p style={{ fontSize: '13px', color: 'var(--color-texte-muted)', fontStyle: 'italic' }}>
              Aucun album pour l'instant
            </p>
          )}
        </div>

        <div style={{ background: 'var(--color-bordure)' }} />

        <div style={{ padding: '28px 24px' }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '16px',
            fontWeight: '300',
          }}>Prochain concert</p>

          {prochainConcert ? (
            <div>
              <p style={{ fontSize: '11px', color: 'var(--color-or)', marginBottom: '3px', fontWeight: '300' }}>
                {new Date(prochainConcert.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '14px', marginBottom: '2px' }}>
                {prochainConcert.titre}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-texte-muted)', fontWeight: '300' }}>
                {prochainConcert.lieu} · {prochainConcert.ville}
              </p>
            </div>
          ) : (
            <p style={{ fontSize: '13px', color: 'var(--color-texte-muted)', fontStyle: 'italic' }}>
              Prochaines dates bientôt
            </p>
          )}
        </div>

        <div style={{ background: 'var(--color-bordure)' }} />

        <div style={{ padding: '28px 24px' }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '16px',
            fontWeight: '300',
          }}>Presse</p>

          {revues.data.slice(0, 2).map(revue => (
            <div key={revue.id} style={{
              paddingBottom: '12px',
              marginBottom: '12px',
              borderBottom: '0.5px solid var(--color-bordure-legere)',
            }}>
              <p style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'var(--color-noir)',
                lineHeight: '1.5',
                marginBottom: '6px',
              }}>« {revue.citation} »</p>
              <p style={{ fontSize: '11px', color: 'var(--color-texte-muted)', fontWeight: '300' }}>
                {revue.publication}
                {revue.date ? ` · ${new Date(revue.date).getFullYear()}` : ''}
              </p>
            </div>
          ))}

          {revues.data.length === 0 && (
            <p style={{ fontSize: '13px', color: 'var(--color-texte-muted)', fontStyle: 'italic' }}>
              Revues de presse à venir
            </p>
          )}
        </div>
      </div>

      <div style={{
        background: 'var(--color-noir)',
        padding: '32px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '32px',
        alignItems: 'center',
      }}>
        <div>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-or)',
            marginBottom: '10px',
            fontWeight: '300',
          }}>En bref</p>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: '#C8B8A8',
            fontWeight: '300',
            maxWidth: '520px',
          }}>{a.bio_courte}</p>
        </div>
        <a href="/biographie" style={{
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '10px 20px',
          border: '0.5px solid var(--color-or)',
          color: 'var(--color-or)',
          fontWeight: '300',
          whiteSpace: 'nowrap',
        }}>Lire la biographie</a>
      </div>
    </div>
  );
}