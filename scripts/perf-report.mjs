/**
 * Performance report helper — run after `npm run build`.
 * Prints a checklist against CWV targets. Fill real Lighthouse numbers from CI or Pagespeed.
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const NEXT = join(ROOT, ".next");

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else acc.push({ path: full, size: st.size });
  }
  return acc;
}

const staticDir = join(NEXT, "static");
const files = walk(staticDir);
const js = files.filter((f) => f.path.endsWith(".js")).sort((a, b) => b.size - a.size);
const css = files.filter((f) => f.path.endsWith(".css")).sort((a, b) => b.size - a.size);
const totalJs = js.reduce((s, f) => s + f.size, 0);
const totalCss = css.reduce((s, f) => s + f.size, 0);

console.log("\n=== India Treks — Performance Build Report ===\n");
console.log("Targets:");
console.log("  LCP < 1.2s | INP < 150ms | CLS < 0.02 | TTFB < 200ms | Lighthouse 98–100\n");
console.log("Bundle (from .next/static):");
console.log(`  Total JS:  ${formatKB(totalJs)}`);
console.log(`  Total CSS: ${formatKB(totalCss)}`);
if (js[0]) console.log(`  Largest JS chunk:  ${formatKB(js[0].size)} — ${js[0].path.replace(ROOT, ".")}`);
if (css[0]) console.log(`  Largest CSS chunk: ${formatKB(css[0].size)} — ${css[0].path.replace(ROOT, ".")}`);
console.log("\nTop JS chunks:");
js.slice(0, 8).forEach((f, i) => {
  console.log(`  ${i + 1}. ${formatKB(f.size)}  ${f.path.replace(ROOT + "\\", "").replace(ROOT + "/", "")}`);
});
console.log("\nArchitecture applied:");
console.log("  ✓ AVIF/WebP next/image, long cache TTL");
console.log("  ✓ Dynamic imports: gallery, FAQ, reviews, destinations, search modals");
console.log("  ✓ Virtualized trek lists (@tanstack/react-virtual)");
console.log("  ✓ Search debounce 300ms");
console.log("  ✓ Removed critical-path: Lenis, React Query, next-themes, GSAP, Framer");
console.log("  ✓ Fonts: Manrope preload only; Inter/display/brush deferred");
console.log("  ✓ loading.tsx / error.tsx / sitemap / robots");
console.log("  ✓ standalone output for VPS + compress + cache headers\n");
console.log("Measure in Chrome Lighthouse (mobile Fast 4G) and paste:");
console.log("  LCP / FCP / CLS / INP / TTFB / Performance score\n");
