# Recursos gratuitos (guías web)

Cada archivo `<slug>.json` de esta carpeta es una guía publicada en
`https://kiuna.cloud/recursos-gratuitos/<slug>`. La página de tarjetas
(`/recursos-gratuitos`) las lista solas, la más nueva primero (campo `date`).
No hay que tocar código para agregar una guía: solo crear su archivo.

## Publicar una guía nueva

1. Crear `content/recursos/<slug>.json` con el formato de abajo.
2. `node scripts/check-guides.mjs` → debe decir `✓`. Corregir cualquier error.
3. `npx tsc -b` (comprueba que el sitio compila).
4. `git add content/recursos/<slug>.json && git commit -m "Guía: <título>" && git push origin main`
5. GitHub avisa a EasyPanel (webhook) y kiuna.cloud se actualiza solo en 2-3 min.
6. Link para compartir: `https://kiuna.cloud/recursos-gratuitos/<slug>`

## Formato

```json
{
  "slug": "mi-guia",
  "title": "Título corto de la guía",
  "subtitle": "Una frase que dice qué consigue quien la lee.",
  "kind": "Guía paso a paso",
  "readingMinutes": 5,
  "date": "2026-11-03",
  "blocks": [ ... ]
}
```

- `slug`: igual al nombre del archivo; minúsculas, números y guiones. Es la URL: no cambiarlo después de compartirlo.
- `kind`: etiqueta corta de la tarjeta ("Guía práctica", "Guía paso a paso", "Recursos recomendados"…).
- `readingMinutes`: ~200 palabras por minuto.
- `date`: fecha de publicación (AAAA-MM-DD).
- En cualquier texto, `**así**` se muestra en negrita. No usar HTML.

## Bloques disponibles (`blocks`)

| type | Campos | Para qué |
|---|---|---|
| `heading` | `text` | Título de sección |
| `paragraph` | `text` | Párrafo normal |
| `tip` | `title` (opcional), `text` | Consejo o aviso destacado |
| `summary` | `title`, `items` | Resumen numerado al inicio ("Resumen en 30 segundos") |
| `list` | `items`, `ordered` (opcional, `true` = numerada) | Lista simple |
| `steps` | `items: [{ "title"?, "text" }]` | Paso a paso numerado |
| `table` | `head: [...]`, `rows: [[...], ...]` | Tabla (cada fila con tantas celdas como `head`) |
| `benefits` | `items` | Cuadrícula de beneficios cortos |
| `resource` | `badge`, `title`, `meta` (opcional), `text`, `links: [{ "label", "href" }]` | Tarjeta de herramienta, curso, repo o paso con enlaces |

Ejemplos completos: `guia-jarvis.json` (tarjetas `resource` por paso),
`ganar-dinero-con-ia.json` (tablas + tips + cursos),
`gemini-pro-gratis-estudiantes.json` (resumen, beneficios, `steps`).

Al final de cada guía la web añade sola un bloque con "Agendar diagnóstico" y
WhatsApp; no hace falta escribirlo en el JSON.
