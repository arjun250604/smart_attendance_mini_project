import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.css'));

const replacements = [
  { pattern: /var\(--(sd|fd|ad|login)-bg\)/g, repl: 'var(--theme-bg)' },
  { pattern: /var\(--(sd|fd|ad|login)-surface\)/g, repl: 'var(--theme-surface)' },
  { pattern: /var\(--(sd|fd|ad|login)-sidebar\)/g, repl: 'var(--theme-sidebar)' },
  { pattern: /var\(--(sd|fd|ad|login)-card\)/g, repl: 'var(--theme-card)' },
  { pattern: /var\(--(sd|fd|ad|login)-card-border\)/g, repl: 'var(--theme-card-border)' },
  { pattern: /var\(--(sd|fd|ad|login)-accent\)/g, repl: 'var(--theme-accent)' },
  { pattern: /var\(--(sd|fd|ad|login)-accent2\)/g, repl: 'var(--theme-secondary)' },
  { pattern: /var\(--(sd|fd|ad|login)-accent-mid\)/g, repl: 'var(--theme-accent-light)' },
  { pattern: /var\(--(sd|fd|ad|login)-purple\)/g, repl: 'var(--theme-secondary)' },
  { pattern: /var\(--(sd|fd|ad|login)-blue\)/g, repl: 'var(--theme-secondary)' },
  { pattern: /var\(--(sd|fd|ad|login)-green\)/g, repl: 'var(--theme-green)' },
  { pattern: /var\(--(sd|fd|ad|login)-green-lt\)/g, repl: 'var(--theme-green)' },
  { pattern: /var\(--(sd|fd|ad|login)-red\)/g, repl: 'var(--theme-red)' },
  { pattern: /var\(--(sd|fd|ad|login)-yellow\)/g, repl: 'var(--theme-yellow)' },
  { pattern: /var\(--(sd|fd|ad)-yellow-lt\)/g, repl: 'var(--theme-yellow)' },
  { pattern: /var\(--(sd|fd|ad|login)-text\)/g, repl: 'var(--theme-text)' },
  { pattern: /var\(--(sd|fd|ad|login)-muted\)/g, repl: 'var(--theme-muted)' },
  { pattern: /var\(--(sd|fd|ad|login)-border\)/g, repl: 'var(--theme-border)' },
  { pattern: /var\(--(sd|fd|ad|login)-radius\)/g, repl: 'var(--radius-lg)' },
  { pattern: /var\(--(sd|fd|ad|login)-radius-sm\)/g, repl: 'var(--radius-sm)' },
  { pattern: /var\(--(sd|fd|ad|login)-sidebar-w\)/g, repl: 'var(--sidebar-w)' },
];

files.forEach(fname => {
  const fpath = path.join(componentsDir, fname);
  let content = fs.readFileSync(fpath, 'utf8');

  // Remove :root blocks
  content = content.replace(/:root\s*\{[^}]+\}/gm, '');
  
  // Remove light mode rules
  content = content.replace(/\[data-theme="light"\].*?\{[^}]+\}/gms, '');

  for (const {pattern, repl} of replacements) {
    content = content.replace(pattern, repl);
  }

  // Adjust un-variable'd colors (blue -> mint, dark blue -> navy)
  content = content.replace(/rgba\(66,153,225,([0-9.]+)\)/g, 'rgba(16, 185, 129, $1)');
  content = content.replace(/rgba\(26,54,93,([0-9.]+)\)/g, 'rgba(15, 23, 42, $1)');

  // Fonts
  content = content.replace(/font-family:\s*'Inter',\s*sans-serif;/g, 'font-family: var(--font-sans);');
  content = content.replace(/font-family:\s*inherit;/g, 'font-family: var(--font-sans);');

  // Titles -> Serif
  content = content.replace(/\.([a-z]+)-topbar-title\s*\{/g, '.$1-topbar-title { font-family: var(--font-serif);');
  content = content.replace(/\.([a-z]+)-section-title\s*\{/g, '.$1-section-title { font-family: var(--font-serif);');
  content = content.replace(/\.([a-z]+)-welcome-title\s*\{/g, '.$1-welcome-title { font-family: var(--font-serif);');

  fs.writeFileSync(fpath, content);
});

console.log('Done');
