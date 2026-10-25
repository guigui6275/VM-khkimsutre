import { getArtiste, getRevues } from '@/lib/api';
import { getGoogleDoc, GOOGLE_DOCS } from '@/lib/google-doc';
import GaleriePresse from '@/components/GaleriePresse';

const SLUG = process.env.NEXT_PUBLIC_ARTISTE_SLUG;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const revalidate = 3600;

export default async function AProposPage() {
  const [artiste, revues, bioCourteParagraphes] = await Promise.all([
    getArtiste(SLUG),
    getRevues(SLUG),
    GOOGLE_DOCS.biographieCourteKHK
      ? getGoogleDoc(GOOGLE_DOCS.biographieCourteKHK.url, GOOGLE_DOCS.biographieCourteKHK.options)
      : Promise.resolve(null),
  ]);

  const a = artiste.data[0];
  if (!a) return <div style={{ padding: '40px' }}>Artiste non trouvé.</div>;

  const citations = revues.data.filter(r => r.citation);
  const documents = revues.data.filter(r => r.document);

  return (
    <div>

      {/* ── EN-TÊTE ── */}
      <div className="apropos-header" style={{
        padding: '44px 44px 32px',
        borderBottom: '0.5px solid var(--color-bordure)',
      }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-or)',
          marginBottom: '10px',
          fontWeight: '300',
        }}>Kyung-Hee Kim-Sutre</p>
        <h1 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: '32px',
          fontWeight: '400',
        }}>À propos</h1>
      </div>

      {/* ── LAYOUT PRINCIPAL ── */}
      <div className="apropos-layout" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 240px',
        borderBottom: '0.5px solid var(--color-bordure)',
      }}>

        {/* ── COLONNE PRINCIPALE ── */}
        <div className="apropos-main" style={{
          padding: '40px 36px 40px 44px',
          borderRight: '0.5px solid var(--color-bordure)',
        }}>

          {/* Identité */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px',
            paddingBottom: '32px',
            borderBottom: '0.5px solid var(--color-bordure-legere)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '1px solid var(--color-accent)',
              background: 'transparent',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-playfair)',
              fontSize: '24px',
              color: 'var(--color-accent)',
            }}>{a.nom.split(/[\s-]/).map(n => n[0]).filter(Boolean).slice(0, 3).join('')}</div>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '4px',
              }}>{a.nom}</h2>
              <p style={{
                fontSize: '14px',
                fontStyle: 'italic',
                color: 'var(--color-accent)',
                fontWeight: '300',
              }}>{a.instrument}</p>
            </div>
          </div>

          {/* Biographie courte */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '16px',
            fontWeight: '300',
          }}>Biographie</p>

          <div style={{ marginBottom: '24px' }}>
            {bioCourteParagraphes ? (
              bioCourteParagraphes.map((paragraphe, i) => (
                <p key={i} style={{
                  fontSize: '15px',
                  lineHeight: '1.85',
                  color: 'var(--color-texte-secondaire)',
                  fontWeight: '300',
                  marginBottom: '16px',
                  textAlign: 'justify',
                }} dangerouslySetInnerHTML={{ __html: paragraphe }} />
              ))
            ) : (
              <p style={{
                fontSize: '15px',
                lineHeight: '1.85',
                color: 'var(--color-texte-secondaire)',
                fontWeight: '300',
                textAlign: 'justify',
              }}>{a.bio_courte}</p>
            )}
          </div>

          <a href="/a-propos/bio-complete" style={{
            display: 'inline-block',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            border: '0.5px solid var(--color-accent)',
            padding: '10px 22px',
            fontWeight: '300',
            marginBottom: '40px',
          }}>Lire la biographie complète</a>

          {/* Citations presse */}
          {citations.length > 0 && (
            <div style={{
              paddingTop: '32px',
              borderTop: '0.5px solid var(--color-bordure-legere)',
              marginBottom: '40px',
            }}>
              <p style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '24px',
                fontWeight: '300',
              }}>Ce qu'on dit d'elle</p>

              {citations.map(revue => (
                <div key={revue.id} style={{
                  padding: '20px 0',
                  borderBottom: '0.5px solid var(--color-bordure-legere)',
                }}>
                  <div style={{
                    borderLeft: '2px solid var(--color-accent)',
                    paddingLeft: '20px',
                    marginBottom: '10px',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: '17px',
                      fontStyle: 'italic',
                      color: 'var(--color-texte)',
                      lineHeight: '1.5',
                    }}>« {revue.citation} »</p>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--color-texte-muted)',
                    fontWeight: '300',
                  }}>
                    {revue.publication}
                    {revue.date ? ` · ${new Date(revue.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}` : ''}
                  </p>
                  {revue.lien && (
                    <a href={revue.lien} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)',
                      borderBottom: '0.5px solid var(--color-accent)',
                      paddingBottom: '1px',
                      fontWeight: '300',
                      marginTop: '8px',
                      display: 'inline-block',
                    }}>Lire l'article</a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Documents presse */}
          {documents.length > 0 && (
            <div style={{
              paddingTop: '32px',
              borderTop: '0.5px solid var(--color-bordure-legere)',
            }}>
              <p style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '20px',
                fontWeight: '300',
              }}>Presse & programmes</p>

              <GaleriePresse documents={documents} strapiUrl={STRAPI_URL} />
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <div className="apropos-sidebar" style={{ padding: '40px 28px' }}>
          {a.site_web && (
            <div style={{
              marginBottom: '24px',
              paddingBottom: '24px',
              borderBottom: '0.5px solid var(--color-bordure-legere)',
            }}>
              <p style={{
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '10px',
                fontWeight: '300',
              }}>Site web</p>
              <a href={a.site_web} style={{
                fontSize: '13px',
                color: 'var(--color-or)',
                fontWeight: '300',
                borderBottom: '0.5px solid var(--color-or)',
              }}>{a.site_web}</a>
            </div>
          )}

          {a.email && (
            <div style={{
              marginBottom: '24px',
              paddingBottom: '24px',
              borderBottom: '0.5px solid var(--color-bordure-legere)',
            }}>
              <p style={{
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '10px',
                fontWeight: '300',
              }}>Contact</p>
              <a href={`mailto:${a.email}`} style={{
                fontSize: '13px',
                color: 'var(--color-or)',
                fontWeight: '300',
                borderBottom: '0.5px solid var(--color-or)',
              }}>{a.email}</a>
            </div>
          )}

          <div style={{
            background: 'var(--color-bg-alt)',
            padding: '20px',
            borderRadius: '2px',
          }}>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-texte-muted)',
              marginBottom: '10px',
              fontWeight: '300',
            }}>Biographie complète</p>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-texte-secondaire)',
              lineHeight: '1.6',
              fontWeight: '300',
              marginBottom: '12px',
            }}>Parcours, distinctions, enregistrements et enseignement.</p>
            <a href="/a-propos/bio-complete" style={{
              display: 'block',
              width: '100%',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              border: '0.5px solid var(--color-accent)',
              padding: '7px 14px',
              background: 'transparent',
              fontWeight: '300',
              textAlign: 'center',
            }}>Lire la biographie</a>
          </div>
        </div>
      </div>
    </div>
  );
}
