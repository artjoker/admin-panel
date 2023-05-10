import { transliterate as tr, slugify } from 'transliteration';

export const generateSlug = (text: string): string => {
  const transliterated = tr(text);
  const slug = slugify(transliterated);
  const ignorePattern = /[^a-zA-Z0-9\-]/g;
  const urlSlug = slug.replace(ignorePattern, '');
  return urlSlug;
};
