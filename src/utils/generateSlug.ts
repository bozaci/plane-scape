const generateSlug = (slug: string) => {
  const formattedSlug = slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');

  return formattedSlug;
};

export { generateSlug };
