import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const writeupsDir = join(root, 'src/content/writeups');

function walkMarkdownFiles(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    if (statSync(fullPath).isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
    } else if (extname(name) === '.md') {
      files.push(fullPath);
    }
  }
  return files;
}

const unlistedSlugs = walkMarkdownFiles(writeupsDir)
  .filter((file) => /^unlisted:\s*true/m.test(readFileSync(file, 'utf8')))
  .map((file) => relative(writeupsDir, file).replace(/\.md$/, '').replace(/\\/g, '/'));

export default defineConfig({
  site: 'https://d3vdebug.github.io',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        if (page.includes('/search/')) return false;
        return !unlistedSlugs.some((slug) => page.includes(`/blogs/${slug}`));
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
