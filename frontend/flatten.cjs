const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.css'));

files.forEach(fname => {
  const fpath = path.join(componentsDir, fname);
  let content = fs.readFileSync(fpath, 'utf8');

  // 1. Remove backdrop-filters
  content = content.replace(/backdrop-filter:\s*blur\([^)]+\);/g, '');
  content = content.replace(/-webkit-backdrop-filter:\s*blur\([^)]+\);/g, '');

  // 2. Remove box-shadow from cards and buttons to make it flat
  content = content.replace(/box-shadow:\s*0\s*4px\s*16px[^;]+;/g, '');
  content = content.replace(/box-shadow:\s*0\s*6px\s*20px[^;]+;/g, '');

  // 3. Change linear-gradient on buttons to solid color
  content = content.replace(/background:\s*linear-gradient\(135deg,\s*var\(--theme-secondary\),\s*var\(--theme-accent\)\);/g, 'background: var(--theme-accent);');
  content = content.replace(/background:\s*linear-gradient\(135deg,\s*#[0-9A-Fa-f]+,\s*var\(--theme-green\)\);/g, 'background: var(--theme-green);');

  // 4. Change text gradients to solid colors
  content = content.replace(/background:\s*linear-gradient\(90deg,\s*#fff,\s*var\(--theme-accent\)\);/g, 'color: var(--theme-text);');
  content = content.replace(/-webkit-background-clip:\s*text;/g, '');
  content = content.replace(/-webkit-text-fill-color:\s*transparent;/g, '');
  content = content.replace(/background-clip:\s*text;/g, '');
  content = content.replace(/color:\s*transparent;/g, ''); // For login page title

  // 5. Change banner gradients to flat subtle background
  content = content.replace(/background:\s*linear-gradient\(135deg,\s*rgba\([^,]+,[^,]+,[^,]+,[^)]+\),\s*rgba\([^,]+,[^,]+,[^,]+,[^)]+\)\);/g, 'background: var(--theme-card);');

  // 6. Increase card padding
  content = content.replace(/padding:\s*1\.25rem;/g, 'padding: 1.5rem;');

  // 7. Make roots solid background again
  content = content.replace(/background:\s*transparent;/g, 'background: var(--theme-bg);');

  fs.writeFileSync(fpath, content);
});
console.log("Flatten complete.");
