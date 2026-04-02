/**
 * Récupère le contenu d'un Google Doc publié sous forme
 * d'un tableau de paragraphes (texte brut, pas de HTML).
 *
 * @param {string} pubUrl - URL de publication du Google Doc (format /pub)
 * @param {object} [options]
 * @param {number} [options.revalidate=3600] - Durée du cache en secondes
 * @param {string} [options.startAfter] - Texte marqueur de début du vrai contenu
 * @returns {string[]|null} Tableau de paragraphes, ou null en cas d'erreur
 *
 * Exemple :
 *   const paragraphes = await getGoogleDoc(GOOGLE_DOCS.biographieFRKHK.url, GOOGLE_DOCS.biographieFRKHK.options);
 *   // ['Guillaume SUTRE n\'a que 18 ans...', 'Originaire de Douai...', ...]
 */
export async function getGoogleDoc(pubUrl, options = {}) {
  const { revalidate = 3600, startAfter } = options;

  try {
    const res = await fetch(pubUrl, {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error(`Erreur fetch Google Doc (${pubUrl}):`, res.status);
      return null;
    }

    const html = await res.text();
    return extraireParagraphes(html, startAfter);
  } catch (err) {
    console.error(`Erreur récupération Google Doc (${pubUrl}):`, err);
    return null;
  }
}

/**
 * URLs et options des Google Docs publiés.
 */
export const GOOGLE_DOCS = {
  biographieCompleteKHK: {
  url: 'https://docs.google.com/document/d/e/2PACX-1vS9AYkArRD1y04VUkvXMGjEdAO3yDnpdjqKzbKOx99FuiHWUS5UZfxgXx_JykCm_iXRJB6cf7cP87-2/pub',
  options: { startAfter: 'Kyung-Hee Kim-Sutre est née' },
},
  biographieCourteKHK: {
    url: 'https://docs.google.com/document/d/e/2PACX-1vTWnio10-PDY_GbeJ5B406WQuWbQ0Npgiwuk1rTb7U2X9qBh3tVKgETH7RgkDgLy1w1vJQWi3_4YzCh/pub',
    options: { startAfter: 'Née à Séoul' },
  },
  // biographieEN: { url: '...', options: { startAfter: 'Guillaume SUTRE' } },
};

/**
 * Extrait les paragraphes de texte brut depuis le HTML Google Docs.
 * Retourne un tableau de chaînes (une par paragraphe non vide).
 */
function extraireParagraphes(html, startAfter) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return null;

  let contenu = bodyMatch[1];

  // Supprimer les balises non textuelles
  contenu = contenu.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  contenu = contenu.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // Extraire le texte de chaque balise <p>
  const regexP = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const paragraphes = [];
  let match;

  while ((match = regexP.exec(contenu)) !== null) {
    // Supprimer toutes les balises HTML du contenu du paragraphe
    let texte = match[1]
      .replace(/<[^>]+>/g, '')     // supprimer les balises
      .replace(/&nbsp;/g, ' ')     // espaces insécables
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')        // normaliser les espaces
      .trim();

    if (texte.length > 0) {
      paragraphes.push(texte);
    }
  }

  if (paragraphes.length === 0) return null;

  // Trouver le premier paragraphe qui contient startAfter
  // et commencer à partir de celui-là
  if (startAfter) {
    const idx = paragraphes.findIndex(p => p.includes(startAfter));
    if (idx !== -1) {
      return paragraphes.slice(idx);
    }
    // Si le marqueur n'est pas trouvé, fallback : ignorer
    // les paragraphes courts (boilerplate) et commencer au premier long
    const idxFallback = paragraphes.findIndex(p => p.length > 80);
    if (idxFallback !== -1) return paragraphes.slice(idxFallback);
  }

  return paragraphes;
}