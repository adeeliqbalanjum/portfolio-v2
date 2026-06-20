import fs from 'node:fs';

const file = 'app/globals.css';
const interImport = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');";
const interTightImport = "@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800;900&display=swap');";

let css = fs.readFileSync(file, 'utf8');

// Remove misplaced/duplicate font imports from the body of the CSS file.
css = css
  .replaceAll(`${interTightImport}\r\n`, '')
  .replaceAll(`${interTightImport}\n`, '')
  .replaceAll(interTightImport, '')
  .replaceAll(`${interImport}\r\n`, '')
  .replaceAll(`${interImport}\n`, '')
  .replaceAll(interImport, '')
  .trimStart();

// Put all CSS @import rules at the very top, before normal CSS rules.
css = `${interImport}\n${interTightImport}\n\n${css}`;

fs.writeFileSync(file, css);
