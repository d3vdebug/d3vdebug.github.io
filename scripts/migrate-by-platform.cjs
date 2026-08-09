#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'writeups');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await walk(res));
    } else if (e.isFile() && res.endsWith('.md')) {
      files.push(res);
    }
  }
  return files;
}

function slugify(s) {
  return s.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '').replace(/\-+/g,'-');
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

(async () => {
  try {
    const files = await walk(CONTENT_DIR);
    if (!files.length) {
      console.log('No markdown files found under', CONTENT_DIR);
      return;
    }

    const moved = [];

    for (const file of files) {
      const raw = await fs.readFile(file, 'utf8');
      const parsed = matter(raw);
      const data = parsed.data || {};

      const platform = (data.platform || data.category || 'Unsorted').toString();
      const platformDirName = platform.replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9\-]/g, '') || 'Unsorted';

      const destDir = path.join(CONTENT_DIR, platformDirName);
      await ensureDir(destDir);

      const filename = path.basename(file);
      const destPath = path.join(destDir, filename);

      // add slug if missing
      if (!data.slug) {
        const nameOnly = path.basename(filename, path.extname(filename));
        data.slug = slugify(nameOnly);
      }

      // add dateModified if missing
      if (!data.dateModified) {
        data.dateModified = new Date().toISOString().split('T')[0];
      }

      const newContent = matter.stringify(parsed.content, data);

      // write new content to destination and remove original
      await fs.writeFile(destPath, newContent, 'utf8');
      if (file !== destPath) {
        await fs.unlink(file);
      }

      moved.push({ from: file, to: destPath });
      console.log(`Moved: ${file} -> ${destPath}`);
    }

    console.log(`\nMigration complete. ${moved.length} files moved.`);
  } catch (err) {
    console.error('Error during migration:', err);
    process.exitCode = 1;
  }
})();
