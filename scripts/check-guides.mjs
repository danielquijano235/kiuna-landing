// Valida todas las guías de content/recursos/*.json antes de publicar.
// Uso: node scripts/check-guides.mjs   (sale con código 1 si hay errores)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "content", "recursos");
const BLOCKS = {
  heading: ["text"],
  paragraph: ["text"],
  tip: ["text"],
  summary: ["title", "items"],
  list: ["items"],
  steps: ["items"],
  table: ["head", "rows"],
  benefits: ["items"],
  resource: ["badge", "title", "text", "links"],
};

const errors = [];
const slugs = new Set();
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const where = `content/recursos/${file}`;
  let g;
  try {
    g = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  } catch (e) {
    errors.push(`${where}: JSON inválido (${e.message})`);
    continue;
  }
  const expected = file.replace(/\.json$/, "");
  if (g.slug !== expected) errors.push(`${where}: "slug" debe ser "${expected}" (igual al nombre del archivo)`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.slug ?? "")) errors.push(`${where}: "slug" solo minúsculas, números y guiones`);
  if (slugs.has(g.slug)) errors.push(`${where}: slug repetido`);
  slugs.add(g.slug);
  for (const key of ["title", "subtitle", "kind"]) {
    if (typeof g[key] !== "string" || !g[key].trim()) errors.push(`${where}: falta "${key}"`);
  }
  if (!Number.isInteger(g.readingMinutes) || g.readingMinutes < 1) errors.push(`${where}: "readingMinutes" debe ser un entero ≥ 1`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(g.date ?? "")) errors.push(`${where}: "date" debe ser AAAA-MM-DD`);
  if (!Array.isArray(g.blocks) || g.blocks.length === 0) {
    errors.push(`${where}: "blocks" vacío`);
    continue;
  }
  g.blocks.forEach((b, i) => {
    const need = BLOCKS[b?.type];
    if (!need) return errors.push(`${where}: bloque ${i} con type desconocido "${b?.type}"`);
    for (const key of need) if (b[key] === undefined) errors.push(`${where}: bloque ${i} (${b.type}) sin "${key}"`);
    if (b.type === "resource") {
      for (const l of b.links ?? []) if (!/^https?:\/\//.test(l.href ?? "")) errors.push(`${where}: bloque ${i} enlace sin http(s): ${l.href}`);
    }
    if (b.type === "table") {
      for (const row of b.rows ?? []) if (row.length !== b.head.length) errors.push(`${where}: bloque ${i} fila con ${row.length} celdas, se esperaban ${b.head.length}`);
    }
  });
}

if (errors.length) {
  console.error(`✗ ${errors.length} error(es):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`✓ ${files.length} guía(s) válidas: ${[...slugs].join(", ")}`);
