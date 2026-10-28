import { getArtiste, getAlbums, getConcerts, getRevues } from '@/lib/api';
import FacebookWidget from '@/components/FacebookWidget';
import FacebookLikeButton from '@/components/FacebookLikeButton';

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

      {/* ── HERO ── */}
      <div className="home-hero" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 220px',
        borderBottom: '0.5px solid var(--color-bordure)',
        minHeight: '300px',
      }}>
        <div className="home-hero-main" style={{
          padding: '52px 40px 52px 44px',
          borderRight: '0.5px solid var(--color-bordure)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            borderLeft: '2px solid var(--color-accent)',
            paddingLeft: '24px',
          }}>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '14px',
              fontWeight: '300',
              fontFamily: 'var(--font-sans)',
            }}>{a.instrument}</p>

            <h1 style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '38px',
              fontWeight: '400',
              color: 'var(--color-ivoire)',
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
              marginBottom: '28px',
              maxWidth: '460px',
            }}>{a.bio_courte}</p>
          </div>

          <div style={{ display: 'flex', gap: '14px', paddingLeft: '26px' }}>
            <a href="/calendrier" style={{
              padding: '10px 22px',
              background: 'var(--color-accent)',
              color: 'var(--color-noir)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: '400',
            }}>Prochains concerts</a>
            <a href="/a-propos" style={{
              padding: '10px 22px',
              background: 'transparent',
              color: 'var(--color-accent)',
              border: '0.5px solid var(--color-accent)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: '300',
            }}>Biographie</a>
          </div>
        </div>

        {/* Aside — masqué sur mobile */}
        <div className="home-hero-aside" style={{
          background: 'var(--color-bg-alt)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '1px solid var(--color-accent)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-playfair)',
            fontSize: '24px',
            color: 'var(--color-accent)',
          }}>
            {a.nom.split(/[\s-]/).map(n => n[0]).filter(Boolean).slice(0, 3).join('')}
          </div>
          <span style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            fontSize: '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#8a8a8a',
            border: '0.5px solid #555',
            padding: '3px 8px',
            fontWeight: '300',
          }}>Sonarti Records</span>
        </div>
      </div>

      {/* ── TROIS COLONNES ── */}
      <div className="home-trois-colonnes" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.5px 1fr 0.5px 1fr',
        borderBottom: '0.5px solid var(--color-bordure)',
      }}>

        {/* Dernier album */}
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
              <div style={{ width: '100%', marginBottom: '10px', overflow: 'hidden' }}>
                {dernierAlbum.pochette ? (
                  <img
                    src={`${dernierAlbum.pochette.url}`}
                    alt={dernierAlbum.titre}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                ) : (
                  <div style={{
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--color-bg-alt)',
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '14px',
                    fontStyle: 'italic',
                    color: 'var(--color-texte-muted)',
                  }}>{dernierAlbum.titre}</div>
                )}
                {dernierAlbum.recompenses?.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px', marginBottom: '8px' }}>
                    {dernierAlbum.recompenses.map(r => (
                      <span key={r.id} title={r.nom}>
                        {r.image ? (
                          <img
                            src={`${r.image.url}`}
                            alt={r.nom}
                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                          />
                        ) : (
                          <span style={{ fontSize: '10px', color: 'var(--color-or)' }}>{r.nom}</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '15px', marginBottom: '3px', color: 'var(--color-ivoire)' }}>
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

        <div className="home-diviseur" style={{ background: 'var(--color-bordure)' }} />

        {/* Prochain concert */}
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
            <div style={{
              borderLeft: '2px solid var(--color-accent)',
              paddingLeft: '14px',
            }}>
              <p style={{ fontSize: '11px', color: 'var(--color-accent)', marginBottom: '3px', fontWeight: '300' }}>
                {new Date(prochainConcert.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '14px', marginBottom: '2px', color: 'var(--color-ivoire)' }}>
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

        <div className="home-diviseur" style={{ background: 'var(--color-bordure)' }} />

        {/* Presse */}
        <div style={{ padding: '28px 24px' }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '16px',
            fontWeight: '300',
          }}>Presse</p>

          {revues.data.slice(0, 2).map((revue, i) => (
            <div key={revue.id} style={{
              paddingBottom: '14px',
              marginBottom: '14px',
              borderBottom: '0.5px solid var(--color-bordure-legere)',
              borderLeft: i === 0 ? '2px solid var(--color-accent)' : '2px solid #555',
              paddingLeft: '14px',
            }}>
              <p style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '13px',
                fontStyle: 'italic',
                color: i === 0 ? 'var(--color-ivoire)' : 'var(--color-texte-secondaire)',
                lineHeight: '1.6',
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

      {/* ── BANDEAU BIO ── */}
      <div className="home-bandeau-bio" style={{
        background: 'var(--color-noir)',
        padding: '36px 44px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '32px',
        alignItems: 'center',
        borderBottom: '0.5px solid var(--color-bordure)',
      }}>
        <div>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '12px',
            fontWeight: '300',
          }}>En bref</p>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: 'var(--color-texte-secondaire)',
            fontWeight: '300',
            maxWidth: '520px',
          }}>{a.bio_courte}</p>
        </div>
        <a href="/a-propos" style={{
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '10px 22px',
          border: '0.5px solid var(--color-accent)',
          color: 'var(--color-accent)',
          fontWeight: '300',
          whiteSpace: 'nowrap',
        }}>Lire la biographie</a>
      </div>

      {/* ── FACEBOOK ── */}
      <div className="home-facebook" style={{
        padding: '32px 44px',
        borderBottom: '0.5px solid var(--color-bordure)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            fontWeight: '300',
          }}>Suivez-moi</p>
          <FacebookLikeButton pageUrl="https://www.facebook.com/KyungheeKimSutreHarp/" />
        </div>
        <FacebookWidget
          pageUrl="https://www.facebook.com/KyungheeKimSutreHarp/"
          tabs="timeline"
          height={400}
        />
      </div>

    </div>
  );
}