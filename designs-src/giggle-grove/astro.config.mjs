import { defineConfig } from 'astro/config';

// Fictional sample design, hosted as static files inside the Hopbook site at /designs/giggle-grove/.
export default defineConfig({
  output: 'static',
  base: '/designs/giggle-grove',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
