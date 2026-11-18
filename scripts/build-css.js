const { compile } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');
const fs = require('fs');
const path = require('path');

async function build() {
  const root = path.resolve(__dirname, '..');
  const baseCss = `@import "tailwindcss";

:root {
  --background: #020617;
  --foreground: #f8fafc;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
}

/* Custom premium scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #020617;
}
::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

/* Atmospheric glow and gradient animations */
@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(1000%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-pulse-slow {
  animation: pulseSlow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-scanline {
  animation: scanline 8s linear infinite;
}

.animate-fadeIn {
  animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
`;

  console.log('Scanning candidates from project files...');
  const scanner = new Scanner({
    sources: [
      { base: path.join(root, 'app'), pattern: '**/*.{tsx,ts,jsx,js}', negated: false },
      { base: path.join(root, 'components'), pattern: '**/*.{tsx,ts,jsx,js}', negated: false },
    ],
  });

  const candidates = Array.from(scanner.scan());
  console.log(`Found ${candidates.length} unique utility candidates.`);

  console.log('Compiling Tailwind CSS v4...');
  const compiler = await compile(baseCss, {
    base: root,
    onDependency: () => {},
  });

  const compiled = compiler.build(candidates);
  console.log(`Generated CSS size: ${(compiled.length / 1024).toFixed(1)} KB.`);

  const outputPath = path.join(root, 'app', 'globals.css');
  fs.writeFileSync(outputPath, compiled, 'utf8');
  console.log('Successfully updated app/globals.css with full compiled utility classes.');
}

build().catch((err) => {
  console.error('Build CSS failed:', err);
  process.exit(1);
});
