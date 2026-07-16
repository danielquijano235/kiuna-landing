import {
  CSSProperties,
  FormEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Interest =
  | "Growth AI"
  | "AI Agency"
  | "AI Coaching"
  | "Kiuna Academy";

type Vertical = {
  id: string;
  name: string;
  tagline: string;
  copy: string;
  bullets: string[];
  interest: Interest;
};

const verticals: Vertical[] = [
  {
    id: "01",
    name: "Growth AI",
    tagline: "Escala tu facturación con IA",
    copy:
      "Ayudamos a negocios a crecer sus ingresos con inteligencia artificial aplicada a ventas, marketing y adquisición. Estrategia y ejecución enfocadas en mover el número que importa.",
    bullets: [
      "Sistemas de captación y calificación de leads",
      "IA aplicada a ventas y seguimiento comercial",
      "Growth medible, orientado a facturación",
    ],
    interest: "Growth AI",
  },
  {
    id: "02",
    name: "AI Agency",
    tagline: "Automatizaciones, agentes y chatbots",
    copy:
      "Construimos la capa técnica del negocio: automatizamos procesos, creamos agentes IA y chatbots, e integramos sistemas para operar más rápido y con menos fricción.",
    bullets: [
      "Automatización de procesos y tareas repetitivas",
      "Agentes IA y chatbots para atención y ventas",
      "Integraciones y webs con conversión",
    ],
    interest: "AI Agency",
  },
  {
    id: "03",
    name: "AI Coaching",
    tagline: "Llamadas 1:1 para aplicar IA",
    copy:
      "Asesoría personalizada uno a uno para tomar decisiones claras sobre IA. Definimos qué implementar primero, cómo hacerlo y resolvemos tus dudas en llamadas enfocadas.",
    bullets: [
      "Sesiones 1:1 enfocadas en tu negocio",
      "Ruta clara de qué automatizar primero",
      "Acompañamiento práctico y directo, sin relleno",
    ],
    interest: "AI Coaching",
  },
];

type Differentiator = {
  id: string;
  label: string;
  copy: string;
};

const differentiators: Differentiator[] = [
  {
    id: "01",
    label: "Sin relleno",
    copy: "Cada elemento que construimos responde a un objetivo de negocio concreto. No incorporamos funciones ni reportes que no generen impacto medible.",
  },
  {
    id: "02",
    label: "Construimos y acompañamos",
    copy: "El trabajo no termina en la entrega. Acompañamos la implementación junto a tu equipo hasta que el sistema opere de forma estable y autónoma.",
  },
  {
    id: "03",
    label: "Medible desde el día uno",
    copy: "Cada sistema se diseña con indicadores de negocio definidos desde el inicio, de modo que su rendimiento pueda evaluarse en cualquier momento.",
  },
  {
    id: "04",
    label: "Implementación rápida",
    copy: "Las primeras entregas se concretan en semanas, no en trimestres. Priorizamos las soluciones de mayor impacto sobre la búsqueda de la perfección.",
  },
];

const steps = [
  {
    id: "01",
    title: "Diagnóstico",
    copy:
      "Revisamos puntos de fuga, tiempos de respuesta, embudos y tareas que hoy consumen energía humana.",
  },
  {
    id: "02",
    title: "Arquitectura",
    copy:
      "Definimos qué automatizar, qué debe seguir humano y dónde la IA agrega valor sin volver todo opaco o frágil.",
  },
  {
    id: "03",
    title: "Implementación",
    copy:
      "Construimos la solución, conectamos sistemas y dejamos una experiencia que se vea premium y funcione con sentido de negocio.",
  },
  {
    id: "04",
    title: "Iteración",
    copy:
      "Medimos, ajustamos y mejoramos la capa construida para que el sistema gane precisión con el uso real.",
  },
];

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

type FormStatus = "idle" | "sending" | "success" | "error";

export default function App() {
  const [interest, setInterest] = useState<Interest>("Growth AI");
  const [status, setStatus] = useState<FormStatus>("idle");
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
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const honeypot = String(formData.get("botcheck") ?? "").trim();
    if (honeypot) {
      setStatus("success");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: `Solicitud desde la web | ${interest} | ${name}`,
          from_name: "Kiuna AI — Formulario de contacto",
          name,
          email,
          company: company || "No indicada",
          interest,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
        setInterest("Growth AI");
      } else {
        throw new Error(result.message || "Error desconocido de Web3Forms");
      }
    } catch (error) {
      console.error("No se pudo enviar el formulario.", error);
      setStatus("error");
    }
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
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav">
          <a href="#por-que-kiuna" onClick={() => setMenuOpen(false)}>
            Por qué Kiuna
          </a>
          <a href="#verticales" onClick={() => setMenuOpen(false)}>
            Verticales
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
          onClick={() => jumpToContact("Growth AI")}
        >
          Agendar llamada
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
            alt="Escena oscura de un centro operativo futurista con paneles de automatización e interfaces flotantes."
          />
          <div className="hero-overlay" />

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                {verticals.map((vertical) => vertical.name).join(" · ")}
              </p>
              <h1 className="hero-title">
                Tres formas de crecer tu negocio con IA.
              </h1>
              <p className="hero-text">
                Kiuna AI es una empresa de inteligencia artificial que trabaja
                sobre tres pilares: más ingresos, más eficiencia y decisiones
                más claras. Elige por dónde empezar.
              </p>
            </div>

            <div className="hero-stage" aria-hidden="true">
              <div className="stage-grid" />
              <div className="stage-beam stage-beam-a" />
              <div className="stage-beam stage-beam-b" />

              <div className="stage-stack">
                <div className="stage-card stage-card-verticals">
                  <ul className="stage-vertical-list">
                    {verticals.map((vertical) => (
                      <li className="stage-vertical-item" key={vertical.id}>
                        <span className="stage-vertical-index">
                          {vertical.id}
                        </span>
                        <div className="stage-vertical-copy">
                          <strong>{vertical.name}</strong>
                          <p>{vertical.tagline}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="hero-cta">
              <div className="hero-actions">
                <button
                  className="button button-solid"
                  type="button"
                  onClick={() => jumpToContact("Growth AI")}
                >
                  Agendar diagnóstico
                </button>
              </div>
              <p className="hero-cta-note">
                Cuéntanos tu caso y te respondemos en menos de 24h hábiles
                para coordinar tu llamada de diagnóstico.
              </p>
            </div>
          </div>

        </section>

        <section className="differentiators section" id="por-que-kiuna">
          <div className="section-head">
            <div className="section-kicker">Por qué Kiuna</div>
            <h2>Construimos inteligencia artificial pensada para durar.</h2>
          </div>

          <ul className="differentiator-list">
            {differentiators.map((item) => (
              <li className="differentiator-item" key={item.id}>
                <span className="differentiator-index">{item.id}</span>
                <div className="differentiator-copy">
                  <strong>{item.label}</strong>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="verticals section" id="verticales">
          <div className="section-head">
            <div className="section-kicker">Verticales</div>
            <h2>Tres formas en que Kiuna impulsa tu negocio con IA.</h2>
          </div>

          <div className="vertical-grid">
            {verticals.map((vertical) => (
              <article className="vertical-card" key={vertical.id}>
                <span className="vertical-index">{vertical.id}</span>
                <h3 className="vertical-name">{vertical.name}</h3>
                <p className="vertical-tagline">{vertical.tagline}</p>
                <p className="vertical-copy">{vertical.copy}</p>
                <ul className="vertical-bullets">
                  {vertical.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <button
                  className="button button-ghost vertical-cta"
                  type="button"
                  onClick={() => jumpToContact(vertical.interest)}
                >
                  Hablar de {vertical.name}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="proceso">
          <div className="section-head">
            <div className="section-kicker">Proceso</div>
            <h2>
              Trabajamos como quien diseña una capa operativa, no solo una demo.
            </h2>
            <p>
              Diagnóstico, arquitectura, implementación e iteración: el mismo
              método, adaptado al alcance exacto que tu negocio necesite hoy.
            </p>
          </div>

          <div className="process-track">
            <div className="process-line" aria-hidden="true" />
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
              Aprende IA desde lo práctico, aunque no vengas del mundo técnico.
            </h2>
            <p>
              Estamos preparando una comunidad para personas que quieren usar IA
              en su trabajo, sus proyectos o su vida diaria, y quieran
              profundizar más allá de lo que ven en redes. Sin relleno, sin
              tecnicismos innecesarios y con ejemplos que puedas aplicar de
              inmediato.
            </p>
          </div>

          <div className="community-panel">
            <p className="community-label">Lista de espera</p>
            <p className="community-lede">
              Entra a la lista para recibir acceso temprano a clases, guías y
              retos prácticos de IA.
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

        <section className="proof">
          <div className="proof-grid">
            <div className="proof-stat">
              <span className="proof-number">+50</span>
              <p className="proof-label">
                negocios automatizados con sistemas de IA
              </p>
            </div>
            <div className="proof-stat">
              <span className="proof-number">+$100M</span>
              <p className="proof-label">
                en ingresos adicionales generados para negocios con Growth AI
              </p>
            </div>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="contact-copy">
            <div className="section-kicker">Contacto</div>
            <h2>Hablemos del sistema que más impacto puede tener en tu negocio.</h2>
            <p>
              Cuéntalo en pocas líneas y te respondemos con una ruta concreta:
              qué automatizar primero, qué construir y cómo medir si vale la
              pena.
            </p>

            <div className="contact-points">
              <div>
                <span>Correo directo</span>
                <a href="mailto:hola@kiuna.ai">hola@kiuna.ai</a>
              </div>
              <div>
                <span>Ideal para</span>
                <p>Negocios que quieren resultados medibles, no una demo bonita.</p>
              </div>
              <div>
                <span>Siguiente paso</span>
                <p>
                  Te escribimos en menos de 24h hábiles para coordinar tu
                  llamada de diagnóstico.
                </p>
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
              Interés principal
              <select
                name="interest"
                value={interest}
                onChange={(event) => setInterest(event.target.value as Interest)}
              >
                <option value="Growth AI">Growth AI</option>
                <option value="AI Agency">AI Agency</option>
                <option value="AI Coaching">AI Coaching</option>
                <option value="Kiuna Academy">Kiuna Academy</option>
              </select>
            </label>

            <label className="full-width">
              ¿Qué quieres resolver?
              <textarea
                name="message"
                rows={5}
                placeholder="Ej: recibo muchos leads por WhatsApp y el equipo tarda en responder; quiero calificar, hacer seguimiento y agendar mejor."
                required
              />
            </label>

            <input
              type="checkbox"
              name="botcheck"
              className="visually-hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="form-actions full-width">
              <button
                className="button button-solid"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Enviando…" : "Enviar solicitud"}
              </button>

              {status === "idle" && (
                <p className="form-note">
                  Te respondemos en menos de 24h hábiles para coordinar tu
                  llamada de diagnóstico.
                </p>
              )}
              {status === "sending" && (
                <p className="form-note">Enviando tu solicitud…</p>
              )}
              {status === "success" && (
                <p className="form-note form-note-success">
                  Listo. Recibimos tu solicitud y te escribimos dentro de las
                  próximas 24h hábiles para coordinar tu llamada.
                </p>
              )}
              {status === "error" && (
                <div className="form-note form-note-error">
                  <p>
                    No pudimos enviar el formulario. Intenta de nuevo en un
                    momento.
                  </p>
                  <a href="mailto:hola@kiuna.ai">
                    ¿Falló? Escríbenos directo a hola@kiuna.ai
                  </a>
                </div>
              )}
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>KIUNA AI</p>
        <p>Sistemas de IA, automatización y experiencia digital para negocios en crecimiento.</p>
        <p>
          &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
