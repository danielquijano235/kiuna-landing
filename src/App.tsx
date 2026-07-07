import {
  CSSProperties,
  FormEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Interest =
  | "Consultoria IA"
  | "Automatizacion"
  | "Agentes IA"
  | "Pagina web"
  | "Kiuna Academy";

const capabilities = [
  {
    id: "01",
    title: "Automatizacion operativa",
    copy:
      "Disenamos flujos para reducir tareas manuales, ordenar seguimiento comercial y acelerar operaciones internas sin llenar el negocio de friccion nueva.",
  },
  {
    id: "02",
    title: "Agentes IA y atencion",
    copy:
      "Creamos agentes que responden, califican, enrutan y asisten al equipo en canales donde el tiempo de respuesta cambia el resultado.",
  },
  {
    id: "03",
    title: "Webs y funnels con conversion",
    copy:
      "Construimos paginas web y sistemas de captacion que sostienen la marca, explican mejor la oferta y convierten interes en reunion.",
  },
  {
    id: "04",
    title: "Consultoria aplicada",
    copy:
      "Aterrizamos donde conviene usar IA, que automatizar primero y como hacerlo sin romper la operacion ni sumar complejidad vacia.",
  },
];

const outcomes = [
  {
    title: "Negocios con flujo de entrada",
    copy:
      "Si llegan mensajes, formularios o leads y el equipo no alcanza a responder con consistencia, ahi la IA ya tiene un trabajo claro.",
  },
  {
    title: "Equipos con tareas repetidas",
    copy:
      "Cuando el negocio depende de copiar, mover, revisar o perseguir informacion todo el tiempo, automatizar deja de ser lujo y pasa a ser capacidad.",
  },
  {
    title: "Marcas que necesitan presencia mejor",
    copy:
      "Si la oferta es buena pero la web no la sostiene, el problema ya no es de trafico: es de claridad, confianza y conversion.",
  },
];

const steps = [
  {
    id: "01",
    title: "Diagnostico",
    copy:
      "Revisamos puntos de fuga, tiempos de respuesta, embudos y tareas que hoy consumen energia humana.",
  },
  {
    id: "02",
    title: "Arquitectura",
    copy:
      "Definimos que automatizar, que debe seguir humano y donde la IA agrega valor sin volver todo opaco o fragil.",
  },
  {
    id: "03",
    title: "Implementacion",
    copy:
      "Construimos la solucion, conectamos sistemas y dejamos una experiencia que se vea premium y funcione con sentido de negocio.",
  },
  {
    id: "04",
    title: "Iteracion",
    copy:
      "Medimos, ajustamos y mejoramos la capa construida para que el sistema gane precision con el uso real.",
  },
];

const heroSignals = [
  "Automatizacion operativa",
  "Agentes con criterio",
  "Webs con conversion",
];

const heroFlow = [
  "Lead detectado",
  "IA clasifica",
  "Sistema enruta",
  "Equipo cierra",
];

const heroBars = [68, 92, 54, 84, 74, 96];

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  kind: "burst" | "spark";
  hue: "cyan" | "amber" | "silver";
};

export default function App() {
  const [interest, setInterest] = useState<Interest>("Consultoria IA");
  const [note, setNote] = useState(
    "El mensaje se abre en tu cliente de correo con el resumen listo."
  );
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const bubbleId = useRef(0);
  const bubbleTimers = useRef<number[]>([]);
  const lastSparkAt = useRef(0);

  useEffect(() => {
    return () => {
      bubbleTimers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const summary = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Empresa: ${company || "No indicada"}`,
      `Interes: ${interest}`,
      "",
      message,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
    } catch (error) {
      console.error("No se pudo copiar el resumen.", error);
    }

    const subject = encodeURIComponent(
      `Solicitud desde la web | ${interest} | ${name}`
    );
    const body = encodeURIComponent(
      [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Empresa: ${company || "No indicada"}`,
        `Interes: ${interest}`,
        "",
        "Objetivo o necesidad:",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:hola@kiuna.ai?subject=${subject}&body=${body}`;
    setNote(
      "Listo. Abrimos tu correo y dejamos el resumen copiado por si quieres pegarlo en otro canal."
    );
  };

  const jumpToContact = (nextInterest: Interest) => {
    setInterest(nextInterest);
    setMenuOpen(false);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const handleHeroPointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "0");
    event.currentTarget.style.setProperty("--pointer-y", "0");
  };

  const handleShellPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    const now = window.performance.now();

    event.currentTarget.style.setProperty("--bubble-drift-x", `${(x * 18).toFixed(1)}px`);
    event.currentTarget.style.setProperty("--bubble-drift-y", `${(y * 14).toFixed(1)}px`);

    if (now - lastSparkAt.current < 92) {
      return;
    }

    lastSparkAt.current = now;

    const palette: Bubble["hue"][] = ["cyan", "silver", "amber"];
    const sparks = Array.from({ length: 1 }, (_, index) => ({
      id: bubbleId.current++,
      x: event.clientX + (Math.random() - 0.5) * 10,
      y: event.clientY + (Math.random() - 0.5) * 10,
      size: 4 + Math.random() * 6,
      delay: index * 16,
      duration: 420 + Math.random() * 240,
      kind: "spark" as const,
      hue: palette[(bubbleId.current + index) % palette.length],
    }));
    const ids = new Set(sparks.map((bubble) => bubble.id));

    setBubbles((current) => [...current, ...sparks].slice(-120));

    const timer = window.setTimeout(() => {
      setBubbles((current) => current.filter((bubble) => !ids.has(bubble.id)));
    }, 980);

    bubbleTimers.current.push(timer);
  };

  const handleShellPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const palette: Bubble["hue"][] = ["cyan", "silver", "amber"];
    const burst = Array.from({ length: 11 }, (_, index) => ({
      id: bubbleId.current++,
      x: event.clientX,
      y: event.clientY,
      size: 12 + Math.random() * 34,
      delay: index * 18,
      duration: 980 + Math.random() * 720,
      kind: "burst" as const,
      hue: palette[index % palette.length],
    }));
    const ids = new Set(burst.map((bubble) => bubble.id));

    setBubbles((current) => [...current, ...burst].slice(-80));

    const timer = window.setTimeout(() => {
      setBubbles((current) => current.filter((bubble) => !ids.has(bubble.id)));
    }, 1900);

    bubbleTimers.current.push(timer);
  };

  return (
    <div
      className="app-shell"
      onPointerMove={handleShellPointerMove}
      onPointerDown={handleShellPointerDown}
    >
      <div className="site-chrome" aria-hidden="true" />
      <div className="bubble-layer" aria-hidden="true">
        {bubbles.map((bubble) => (
          <span
            className={`click-bubble click-bubble-${bubble.hue} click-bubble-${bubble.kind}`}
            key={bubble.id}
            style={
              {
                "--bubble-x": `${bubble.x}px`,
                "--bubble-y": `${bubble.y}px`,
                "--bubble-size": `${bubble.size}px`,
                "--bubble-delay": `${bubble.delay}ms`,
                "--bubble-duration": `${bubble.duration}ms`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <header className={`topbar${menuOpen ? " topbar-open" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Ir al inicio de Kiuna AI">
          <span className="brand-mark" />
          <span className="brand-text">KIUNA AI</span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav">
          <a href="#capacidades" onClick={() => setMenuOpen(false)}>
            Capacidades
          </a>
          <a href="#proceso" onClick={() => setMenuOpen(false)}>
            Proceso
          </a>
          <a href="#comunidad" onClick={() => setMenuOpen(false)}>
            Comunidad
          </a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>
            Contacto
          </a>
        </nav>

        <button
          className="button button-quiet"
          type="button"
          onClick={() => jumpToContact("Consultoria IA")}
        >
          Agendar consultoria
        </button>
      </header>

      <main>
        <section
          className="hero"
          id="inicio"
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={handleHeroPointerLeave}
        >
          <img
            className="hero-visual"
            src="/assets/kiuna-hero.png"
            alt="Escena oscura de un centro operativo futurista con paneles de automatizacion e interfaces flotantes."
          />
          <div className="hero-overlay" />

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                Automatizacion, agentes IA y experiencias web para negocios con
                flujo real
              </p>
              <h1 className="hero-title">
                Automatiza lo repetitivo y convierte mas oportunidades.
              </h1>
              <p className="hero-text">
                Kiuna AI ayuda a negocios que reciben volumen, repiten tareas o
                necesitan responder mejor. Disenamos automatizaciones, agentes y
                webs que trabajan como una capa viva del negocio.
              </p>
              <div className="hero-pills" aria-label="Capas principales">
                {heroSignals.map((signal) => (
                  <span className="hero-pill" key={signal}>
                    {signal}
                  </span>
                ))}
              </div>
              <div className="hero-actions">
                <button
                  className="button button-solid"
                  type="button"
                  onClick={() => jumpToContact("Consultoria IA")}
                >
                  Agendar diagnostico
                </button>
                <a className="button button-ghost" href="#capacidades">
                  Ver soluciones
                </a>
              </div>
              <p className="hero-cta-note">
                Revisamos tu operacion y detectamos donde la IA puede ahorrar
                tiempo o generar mas oportunidades.
              </p>
            </div>

            <div className="hero-stage" aria-hidden="true">
              <div className="stage-grid" />
              <div className="stage-beam stage-beam-a" />
              <div className="stage-beam stage-beam-b" />

              <div className="stage-stack">
                <article className="stage-card stage-card-flow">
                  <div className="stage-card-head">
                    <p>Live orchestration</p>
                    <span>Active</span>
                  </div>
                  <div className="stage-flow">
                    {heroFlow.map((item, index) => (
                      <div className="flow-node" key={item}>
                        <span className="flow-step">{`0${index + 1}`}</span>
                        <strong>{item}</strong>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="stage-card stage-card-bars">
                  <div className="stage-card-head">
                    <p>System pressure</p>
                    <span>Realtime</span>
                  </div>
                  <div className="metric-bars">
                    {heroBars.map((height, index) => (
                      <span
                        className="metric-bar"
                        key={`${height}-${index}`}
                        style={
                          {
                            "--bar-height": `${height}%`,
                            "--bar-delay": `${index * 140}ms`,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </div>
                </article>

                <article className="stage-card stage-card-notes">
                  <div className="stage-card-head">
                    <p>Kiuna layer</p>
                    <span>Build + consulting</span>
                  </div>
                  <ul className="stage-notes">
                    <li>Automatiza seguimiento y tareas de alta repeticion.</li>
                    <li>Responde antes sin perder criterio operativo.</li>
                    <li>Convierte trafico en reuniones y oportunidades reales.</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>

        </section>

        <section className="intro section">
          <div className="section-headline">
            <h2>Soluciones de IA disenadas para operar, escalar y convertir.</h2>
            <p>
              Kiuna AI implementa automatizaciones, agentes inteligentes y
              experiencias digitales que fortalecen procesos comerciales y
              operativos. Cada solucion se construye con foco en eficiencia,
              trazabilidad y resultados medibles para el negocio.
            </p>
          </div>
        </section>

        <section className="capabilities section" id="capacidades">
          <div className="section-label">
            <span />
            <p>Capacidades</p>
          </div>

          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability" key={capability.id}>
                <p className="capability-index">{capability.id}</p>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="outcomes section">
          <div className="section-label">
            <span />
            <p>Donde entramos</p>
          </div>

          <div className="outcome-grid">
            {outcomes.map((outcome) => (
              <article className="outcome" key={outcome.title}>
                <h3>{outcome.title}</h3>
                <p>{outcome.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="proceso">
          <div className="section-head">
            <div className="section-kicker">Proceso</div>
            <h2>
              Trabajamos como quien disena una capa operativa, no solo una demo.
            </h2>
          </div>

          <div className="process-track">
            {steps.map((step) => (
              <article className="step" key={step.id}>
                <span className="step-number">{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="community section" id="comunidad">
          <div className="community-copy">
            <div className="section-kicker">Kiuna Academy</div>
            <h2>
              Aprende IA desde lo practico, aunque no vengas del mundo tecnico.
            </h2>
            <p>
              Estamos preparando una comunidad para personas que quieren usar IA
              en su trabajo, sus proyectos o su vida diaria. Sin humo, sin
              tecnicismos innecesarios y con ejemplos que puedas aplicar.
            </p>
          </div>

          <div className="community-panel">
            <p className="community-label">Lista de espera</p>
            <p className="community-lede">
              Entra a la lista para recibir acceso temprano a clases, guias y
              retos practicos de IA.
            </p>
            <button
              className="button button-solid button-wide"
              type="button"
              onClick={() => jumpToContact("Kiuna Academy")}
            >
              Unirme a Kiuna Academy
            </button>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="contact-copy">
            <div className="section-kicker">Contacto</div>
            <h2>Hablemos del sistema que mas impacto puede tener en tu negocio.</h2>
            <p>
              Cuentalo en pocas lineas y te respondemos con una ruta concreta:
              que automatizar primero, que construir y como medir si vale la
              pena.
            </p>

            <div className="contact-points">
              <div>
                <span>Correo directo</span>
                <a href="mailto:hola@kiuna.ai">hola@kiuna.ai</a>
              </div>
              <div>
                <span>Ideal para</span>
                <p>Automatizacion, agentes IA, webs y consultoria.</p>
              </div>
              <div>
                <span>Siguiente paso</span>
                <p>Diagnostico breve para detectar oportunidades reales.</p>
              </div>
            </div>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Nombre
              <input type="text" name="name" placeholder="Nombre y apellido" required />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="correo@empresa.com"
                required
              />
            </label>

            <label>
              Empresa
              <input type="text" name="company" placeholder="Empresa o proyecto" />
            </label>

            <label>
              Interes principal
              <select
                name="interest"
                value={interest}
                onChange={(event) => setInterest(event.target.value as Interest)}
              >
                <option value="Consultoria IA">Consultoria IA</option>
                <option value="Automatizacion">Automatizacion</option>
                <option value="Agentes IA">Agentes IA</option>
                <option value="Pagina web">Pagina web</option>
                <option value="Kiuna Academy">Kiuna Academy</option>
              </select>
            </label>

            <label className="full-width">
              Que quieres resolver?
              <textarea
                name="message"
                rows={5}
                placeholder="Ej: recibo muchos leads por WhatsApp y el equipo tarda en responder; quiero calificar, hacer seguimiento y agendar mejor."
                required
              />
            </label>

            <div className="form-actions full-width">
              <button className="button button-solid" type="submit">
                Enviar solicitud
              </button>
              <p className="form-note">{note}</p>
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>KIUNA AI</p>
        <p>Sistemas de IA, automatizacion y experiencia digital para negocio.</p>
        <p>
          &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
