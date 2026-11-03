import { Fragment, ReactNode, useEffect, useState } from "react";
import { BOOKING, WHATSAPP_URL, WhatsAppIcon, newTab } from "./App";
import { Block, RESOURCES_PATH, Resource, findResource, resources } from "./guides";

// Convierte **texto** en <strong>texto</strong>.
function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

function ResourcesHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`topbar${menuOpen ? " topbar-open" : ""}`}>
      <a className="brand" href="/" aria-label="Ir al inicio de Kiuna AI">
        <span className="brand-mark" />
        <span className="brand-text">KIUNA AI</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="nav">
        <a href="/">Inicio</a>
        <a href="/#verticales">Servicios</a>
        <a href={RESOURCES_PATH} aria-current="page">
          Recursos
        </a>
        <a href="/#contacto">Contacto</a>
      </nav>

      <a className="button button-quiet" href={BOOKING.diagnostico} {...newTab}>
        Agendar llamada
      </a>
    </header>
  );
}

function ResourcesFooter() {
  return (
    <footer className="footer">
      <p>KIUNA AI</p>
      <p>Guías prácticas de IA, gratis y sin relleno.</p>
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

function ResourceList() {
  useEffect(() => {
    document.title = "Recursos gratuitos | Kiuna AI";
  }, []);

  return (
    <main className="resources section">
      <div className="resources-head">
        <h1>Recursos gratuitos</h1>
        <p>
          Guías prácticas para usar IA en tu trabajo y tu negocio. Ábrelas aquí
          mismo, sin descargar nada.
        </p>
      </div>

      <ul className="resource-grid">
        {resources.map((resource) => (
          <li key={resource.slug}>
            <a className="resource-card" href={`${RESOURCES_PATH}/${resource.slug}`}>
              <span className="resource-card-kind">
                {resource.kind} · {resource.readingMinutes} min
              </span>
              <h2>{resource.title}</h2>
              <p>{resource.subtitle}</p>
              <span className="resource-card-cta">Leer guía →</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "paragraph":
      return <p>{rich(block.text)}</p>;
    case "tip":
      return (
        <aside className="guide-tip">
          {block.title && <strong>{block.title}</strong>}
          <p>{rich(block.text)}</p>
        </aside>
      );
    case "summary":
      return (
        <div className="guide-summary">
          <strong>{block.title}</strong>
          <ol>
            {block.items.map((item) => (
              <li key={item}>{rich(item)}</li>
            ))}
          </ol>
        </div>
      );
    case "list": {
      const items = block.items.map((item) => <li key={item}>{rich(item)}</li>);
      return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
    }
    case "steps":
      return (
        <ol className="guide-steps">
          {block.items.map((item) => (
            <li key={item.text}>
              {item.title && <strong>{item.title}</strong>}
              <span>{rich(item.text)}</span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="guide-table">
          <table>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) => (
                    <td key={index}>{rich(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "benefits":
      return (
        <ul className="guide-benefits">
          {block.items.map((item) => (
            <li key={item}>{rich(item)}</li>
          ))}
        </ul>
      );
    case "resource":
      return (
        <article className="guide-resource">
          <span className="guide-resource-badge">{block.badge}</span>
          <h3>{block.title}</h3>
          {block.meta && <p className="guide-resource-meta">{block.meta}</p>}
          <p>{rich(block.text)}</p>
          {block.links.length > 0 && (
            <div className="guide-resource-links">
              {block.links.map((link) => (
                <a key={link.href} href={link.href} {...newTab}>
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </article>
      );
  }
}

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copia este enlace:", window.location.href);
    }
  };

  return (
    <button className="button button-ghost" type="button" onClick={copy}>
      {copied ? "Enlace copiado" : "Copiar enlace"}
    </button>
  );
}

function ResourceDetail({ resource }: { resource: Resource }) {
  useEffect(() => {
    document.title = `${resource.title} | Kiuna AI`;
  }, [resource]);

  return (
    <main className="guide section">
      <a className="guide-back" href={RESOURCES_PATH}>
        ← Todos los recursos
      </a>

      <header className="guide-head">
        <span className="resource-card-kind">
          {resource.kind} · {resource.readingMinutes} min de lectura
        </span>
        <h1>{resource.title}</h1>
        <p>{resource.subtitle}</p>
        <ShareButton />
      </header>

      <div className="guide-body">
        {resource.blocks.map((block, index) => (
          <BlockView block={block} key={index} />
        ))}
      </div>

      <aside className="guide-cta">
        <h2>¿Quieres aplicarlo en tu negocio?</h2>
        <p>
          Si te trabas en algo o quieres que lo construyamos contigo, agenda un
          diagnóstico gratis o escríbenos por WhatsApp.
        </p>
        <div className="guide-cta-actions">
          <a className="button button-solid" href={BOOKING.diagnostico} {...newTab}>
            Agendar diagnóstico
          </a>
          <a className="button button-ghost guide-whatsapp" href={WHATSAPP_URL} {...newTab}>
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </aside>
    </main>
  );
}

function NotFound() {
  useEffect(() => {
    document.title = "Recurso no encontrado | Kiuna AI";
  }, []);

  return (
    <main className="resources section">
      <div className="resources-head">
        <h1>No encontramos esa guía</h1>
        <p>Puede que el enlace haya cambiado. Aquí están todas las guías disponibles.</p>
        <a className="button button-solid" href={RESOURCES_PATH}>
          Ver recursos gratuitos
        </a>
      </div>
    </main>
  );
}

export default function Resources({ path }: { path: string }) {
  const slug = path.slice(RESOURCES_PATH.length).replace(/^\/+|\/+$/g, "");
  const resource = slug ? findResource(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="app-shell resources-shell">
      <ResourcesHeader />
      {!slug ? <ResourceList /> : resource ? <ResourceDetail resource={resource} /> : <NotFound />}
      <ResourcesFooter />
    </div>
  );
}
