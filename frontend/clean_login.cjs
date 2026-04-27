const fs = require('fs');
const path = require('path');
const fpath = path.join(__dirname, 'src/components/LoginPage.css');
let content = fs.readFileSync(fpath, 'utf8');

// Remove all bg-orb classes and bg-grid
content = content.replace(/\.login-bg\s*\{[^}]+\}/g, '');
content = content.replace(/\.bg-orb\s*\{[^}]+\}/g, '');
content = content.replace(/\.bg-orb-1\s*\{[^}]+\}/g, '');
content = content.replace(/\.bg-orb-2\s*\{[^}]+\}/g, '');
content = content.replace(/\.bg-orb-3\s*\{[^}]+\}/g, '');
content = content.replace(/\.bg-grid\s*\{[^}]+\}/g, '');

// Fix login-aside background
content = content.replace(/background:\s*linear-gradient\([^)]+\)/g, 'background: var(--theme-sidebar)');

// Fix login card background
content = content.replace(/background:\s*rgba\(15,\s*23,\s*42,\s*0\.85\);/g, 'background: var(--theme-card);');

// Fix buttons
content = content.replace(/background:\s*linear-gradient\(135deg,\s*#1A365D,\s*#2B6CB0\);/g, 'background: var(--theme-accent);');
content = content.replace(/background:\s*linear-gradient\(135deg,\s*#16a34a,\s*#15803d\);/g, 'background: var(--theme-green);');

// logo-ring and card-logo
content = content.replace(/background:\s*linear-gradient\(135deg,\s*#1A365D,\s*#2B6CB0\);/g, 'background: var(--theme-accent);');

// active role btn
content = content.replace(/background:\s*linear-gradient\(135deg,\s*#1A365D,\s*#2B6CB0\);/g, 'background: var(--theme-accent);');
content = content.replace(/background:\s*linear-gradient\(135deg,\s*#1A365D,\s*#2D5282\);/g, 'background: var(--theme-accent-hover);');

fs.writeFileSync(fpath, content);
console.log("Login cleaned");
