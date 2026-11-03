// Recursos gratuitos de Kiuna AI.
// Para agregar una guía: copia un objeto de la lista `resources`, cambia el `slug`
// (será la URL: kiuna.cloud/recursos-gratuitos/<slug>) y escribe sus bloques.
// En los textos, **así** se marca negrita.

export type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "tip"; title?: string; text: string }
  | { type: "summary"; title: string; items: string[] }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "steps"; items: { title?: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "benefits"; items: string[] }
  | {
      type: "resource";
      badge: string;
      title: string;
      meta?: string;
      text: string;
      links: { label: string; href: string }[];
    };

export type Resource = {
  slug: string;
  title: string;
  subtitle: string;
  kind: string;
  readingMinutes: number;
  blocks: Block[];
};

export const resources: Resource[] = [
  {
    slug: "guia-jarvis",
    title: "Guía Jarvis",
    subtitle:
      "9 pasos para construir tu propio asistente de IA personal, de punta a punta.",
    kind: "Guía práctica",
    readingMinutes: 7,
    blocks: [
      { type: "heading", text: "De qué se trata" },
      {
        type: "paragraph",
        text: 'Un "Jarvis" no es un chatbot más: es un asistente de IA personal que vive prendido, conoce tu negocio, se conecta a tus herramientas, recuerda quién eres y actúa por vos — desde texto, voz o WhatsApp. No hace falta programar nada desde cero: hoy existen piezas open-source que ya resuelven cada parte del problema. Estos son los 9 pasos para ensamblarlas, en orden, de la infraestructura al toque final.',
      },
      { type: "heading", text: "Los 9 pasos" },
      {
        type: "resource",
        badge: "Paso 1",
        title: "Dale una casa",
        meta: "Infraestructura donde vive 24/7",
        text: 'Tu Jarvis necesita estar siempre encendido, no solo cuando abrís tu laptop. Las 3 opciones más comunes: reciclar un computador viejo que ya no uses, comprar una Mac mini (bajo consumo eléctrico, suficiente potencia para correr un agente sin parar) o alquilar un servidor en la nube tipo VPS si no querés tener hardware físico en casa. Sin este paso, el agente "muere" cada vez que apagás tu equipo — y no puede recordarte nada ni actuar mientras dormís.',
        links: [],
      },
      {
        type: "resource",
        badge: "Paso 2",
        title: "Elegí el modelo",
        meta: 'El "cerebro" que razona y decide',
        text: 'Puede ser Claude, ChatGPT, Gemini o Grok — podés usar cualquiera, todos se conectan por API. Esta decisión no es permanente: el harness del paso 3 habla con el modelo a través de una API key, así que podés cambiarlo después sin rehacer el resto del sistema. Lo que importa al elegir no es solo "qué tan inteligente es", sino qué tan bien sigue instrucciones largas y usa herramientas (tool calling), porque de eso depende que ejecute tareas reales y no solo converse.',
        links: [],
      },
      {
        type: "resource",
        badge: "Paso 3",
        title: "Instalá un harness agéntico",
        meta: "Convierte el modelo en un agente que actúa",
        text: 'Un modelo de IA solo, por sí mismo, únicamente devuelve texto. El harness es la capa de software que le da un bucle real de "percibir → decidir → ejecutar": le da acceso a herramientas, le permite encadenar varios pasos sin que vos intervengas en cada uno, y lo deja correr en segundo plano en la casa que armaste en el paso 1. Hermes Agent es un harness open-source pensado justo para esto — corre en tu propio servidor, es agnóstico al modelo que elijas y no manda tus datos a la nube de nadie.',
        links: [{ label: "hermes-agent.org", href: "https://hermes-agent.org/" }],
      },
      {
        type: "resource",
        badge: "Paso 4",
        title: "Enseñale quién sos",
        meta: "El contexto que lo saca de lo genérico",
        text: 'Armá un documento (o memoria "core", según el harness) con quién sos, a qué te dedicás, cómo funciona tu negocio, tu tono de comunicación y tus reglas no negociables. Ese contexto se inyecta en cada conversación, así que el agente deja de sonar a chatbot genérico y empieza a responder y decidir como lo harías vos — es la diferencia entre "una IA cualquiera" y "tu Jarvis".',
        links: [],
      },
      {
        type: "resource",
        badge: "Paso 5",
        title: "Conectalo con tus herramientas",
        meta: "Que actúe donde ya trabajás",
        text: "Tu Gmail, tu calendario o tu Notion. Estas conexiones normalmente se hacen vía MCP (Model Context Protocol), el estándar que usan los harnesses modernos para dar acceso a servicios externos con permisos y API keys propias de cada uno. Con esto tu agente deja de vivir en una ventana de chat aislada: puede leer un correo, agendar una reunión o actualizar una base de datos de Notion sin que se lo pidas manualmente cada vez.",
        links: [],
      },
      {
        type: "resource",
        badge: "Paso 6",
        title: "Dale memoria persistente",
        meta: "Que no se le borre todo al reiniciar",
        text: "Sin memoria persistente, cada conversación empieza de cero — el agente olvida decisiones, preferencias y datos apenas se reinicia. Letta es un framework open-source diseñado justo para esto: guarda el estado del agente (memoria, decisiones, aprendizajes) en una base de datos real, así sobrevive a reinicios y va acumulando contexto sobre vos con el tiempo, en vez de repetir las mismas preguntas cada sesión.",
        links: [{ label: "letta.com", href: "https://www.letta.com/" }],
      },
      {
        type: "resource",
        badge: "Paso 7",
        title: "Dale skills para tareas específicas",
        meta: "De genérico a experto en lo tuyo",
        text: "Una skill es un paquete de instrucciones, ejemplos y pasos ya probados para una tarea concreta y repetible, que el agente puede invocar cuando la necesita en vez de improvisar desde cero cada vez. Por ejemplo: una skill que redacte contratos con tu formato y cláusulas estándar, u otra que analice el contenido de redes de tu competencia y te resuma patrones y oportunidades. Cuantas más skills bien armadas tenga, menos supervisión necesita para hacer bien el trabajo específico de tu negocio.",
        links: [],
      },
      {
        type: "resource",
        badge: "Paso 8",
        title: "Dale canales y voz",
        meta: "Que puedas hablarle desde donde ya estás",
        text: 'Conectá tu agente a canales como WhatsApp e Instagram para escribirle sin abrir una app aparte, y sumale voz: ElevenLabs genera audio realista a partir de texto (ideal para que el agente "hable" con su propia voz), y el modo de voz de Hermes Agent permite conversaciones habladas de ida y vuelta directamente con el harness. Con esto tu Jarvis deja de ser un chat de texto y se vuelve algo con lo que realmente conversás.',
        links: [
          { label: "elevenlabs.io", href: "https://elevenlabs.io/" },
          {
            label: "Voice Mode de Hermes",
            href: "https://hermes-agent.nousresearch.com/docs/user-guide/features/voice-mode",
          },
        ],
      },
      {
        type: "resource",
        badge: "Paso 9 · Toque final",
        title: "Armá una interfaz",
        meta: "La cara visible de todo lo anterior",
        text: "Con Claude Code podés programar un dashboard o panel de control a medida para gestionar y monitorear tu agente; con Claude Design podés diseñar esa misma interfaz de forma visual, sin escribir código, a partir de una descripción o de tu sistema de diseño. Cualquiera de las dos rutas, conectada a la voz de Hermes del paso anterior, es lo que cierra el círculo: una interfaz propia, con voz, para hablarle a tu Jarvis como le hablarías a un asistente real.",
        links: [
          {
            label: "claude.com/product/claude-code",
            href: "https://claude.com/product/claude-code",
          },
          {
            label: "Claude Design",
            href: "https://www.anthropic.com/news/claude-design-anthropic-labs",
          },
        ],
      },
    ],
  },
  {
    slug: "ganar-dinero-con-ia",
    title: "3 formas de ganar tus primeros $300 con IA",
    subtitle:
      "Qué vender, a quién ofrecérselo y cómo cobrar — con los cursos que recomiendo para cada ruta.",
    kind: "Recursos recomendados",
    readingMinutes: 6,
    blocks: [
      { type: "heading", text: "Por qué estas 3 formas" },
      {
        type: "paragraph",
        text: "Me escribes preguntando cómo empezar a generar ingresos con IA, así que reuní 3 rutas reales que hoy están pagando bien — y no hace falta saber programar para ninguna. Esta guía no es solo una lista de videos: por cada forma te explico **qué servicio ofrecer, a quién y cómo llegar a tus primeros $300**. Los cursos son el paso para aprender la habilidad; el negocio está en cómo lo vendes.",
      },
      { type: "heading", text: "1. Videos UGC para marcas con avatares de IA" },
      {
        type: "paragraph",
        text: '**Qué ofreces y a quién.** Marcas de e-commerce, apps, suplementos y cosmética pagan por videos estilo "testimonio" o "unboxing" sin contratar actores ni grabar en cámara. Con HeyGen creas un avatar de IA que graba el anuncio por ti. Busca a estas marcas en Instagram/TikTok (las que ya hacen ads con creadores) y en marketplaces de UGC como Billo o Insense, donde negocios pequeños buscan creadores todo el tiempo.',
      },
      { type: "paragraph", text: "**Cómo llegar a $300.**" },
      {
        type: "table",
        head: ["Paquete", "Precio sugerido", "Para $300 necesitas"],
        rows: [
          ["1 video UGC individual", "$40 – $60", "5 a 8 videos"],
          ["Pack de 3 videos para una marca", "$150 – $200", "2 marcas"],
        ],
      },
      {
        type: "tip",
        title: "Tip de venta",
        text: "Graba 2-3 videos de muestra con un producto genérico (no de un cliente real) y úsalos como portafolio al escribirle en frío a marcas pequeñas. Ver un ejemplo terminado convence mucho más que explicar el servicio por texto.",
      },
      {
        type: "resource",
        badge: "Tutorial · Inglés · HeyGen",
        title: "HeyGen Tutorial 2025: How to Create AI Avatar Videos (Step-by-Step)",
        meta: "Punto de partida para crear tu primer avatar",
        text: "Guía paso a paso para crear videos con avatares de IA en HeyGen: desde generar el avatar hasta exportar el video listo para entregar a una marca como UGC.",
        links: [{ label: "Ver en YouTube", href: "https://www.youtube.com/watch?v=w7GouidmzIs" }],
      },
      {
        type: "heading",
        text: "2. Videos con IA para empresas (publicidad, producto, lo que pidan)",
      },
      {
        type: "paragraph",
        text: '**Qué ofreces y a quién.** No todo se trata de avatares: negocios locales, infoproductores y pequeñas marcas necesitan un video bien hecho con IA para anunciar un producto, explicar un servicio o promocionar una oferta — sin presupuesto para una productora. Tu cliente típico es el dueño de un negocio pequeño que ya te sigue o al que puedes escribirle directo, o un cliente conseguido en Fiverr/Upwork buscando "AI video ads".',
      },
      { type: "paragraph", text: "**Cómo llegar a $300.**" },
      {
        type: "table",
        head: ["Paquete", "Precio sugerido", "Para $300 necesitas"],
        rows: [
          ["Video publicitario corto (15-30s)", "$80 – $120", "3 videos"],
          ["Video de producto/demo más elaborado", "$150 – $300", "1 a 2 videos"],
        ],
      },
      {
        type: "tip",
        title: "Tip de venta",
        text: 'Ofrece el primer video con "si no te gusta el resultado, no pagas" a un solo negocio conocido. Ese video terminado se convierte en tu ejemplo para cobrar el precio completo a los siguientes clientes.',
      },
      {
        type: "resource",
        badge: "Tutorial · Español",
        title: "Cómo Hacer Videos Publicitarios Nivel PRO con IA (GRATIS)",
        meta: "Para tu primer video publicitario vendible",
        text: "Recorre el proceso completo para armar un video publicitario de nivel profesional usando herramientas de IA, sin necesidad de equipo de grabación ni experiencia previa en edición.",
        links: [{ label: "Ver en YouTube", href: "https://www.youtube.com/watch?v=Df2aSUDXdSU" }],
      },
      {
        type: "resource",
        badge: "Curso · Español",
        title: "CURSO GRATIS de IA para VÍDEO",
        meta: "Para ampliar tu caja de herramientas",
        text: "Curso gratuito que cubre distintas herramientas de IA para producir video: útil para diversificar el tipo de piezas que puedes ofrecerle a una empresa además del anuncio clásico.",
        links: [{ label: "Ver en YouTube", href: "https://www.youtube.com/watch?v=-i-B5aiR9no" }],
      },
      { type: "heading", text: "3. Agentes de IA" },
      {
        type: "paragraph",
        text: "**Qué ofreces y a quién.** Negocios con volumen de mensajes o leads (clínicas, inmobiliarias, tiendas online, gimnasios) pagan por automatizar tareas repetitivas: responder preguntas frecuentes por WhatsApp/Instagram, calificar leads o agendar citas. Este es el servicio de IA con el ticket más alto de los tres. Encuentra clientes en tu propia red (negocios que conoces que responden mensajes a mano) o en grupos de Facebook de emprendedores locales.",
      },
      { type: "paragraph", text: "**Cómo llegar a $300.**" },
      {
        type: "table",
        head: ["Paquete", "Precio sugerido", "Para $300 necesitas"],
        rows: [
          ["Agente simple (FAQ o agendado)", "$150 – $300", "1 agente"],
          ["Mantenimiento mensual tras la entrega", "$50 – $100/mes", "Ingreso recurrente extra"],
        ],
      },
      {
        type: "tip",
        title: "Tip de venta",
        text: 'Arma un agente de demostración con un caso genérico (ej. "recepción de una clínica") en n8n y grábate una demo corta mostrándolo funcionar. Envía esa demo por WhatsApp a 5-10 negocios que conozcas antes de cobrar por el primero.',
      },
      {
        type: "resource",
        badge: "Curso · Español · n8n",
        title: "Curso Completo de N8N: Cómo Crear y Vender Automatizaciones IA",
        meta: "Para construir tu primer agente vendible",
        text: "Curso completo de n8n enfocado no solo en construir automatizaciones con IA, sino en cómo empaquetarlas y venderlas a un cliente real.",
        links: [{ label: "Ver en YouTube", href: "https://www.youtube.com/watch?v=7Z-vRvIUqNs" }],
      },
      {
        type: "resource",
        badge: "Curso · Inglés · 4 horas",
        title: "How To Build & Sell AI Agents From Scratch (4 Hour Free Course)",
        meta: "Para llevarlo a nivel profesional",
        text: "Curso extenso y gratuito sobre cómo construir agentes de IA desde cero y convertirlos en un servicio que puedas vender a negocios, incluso sin experiencia técnica previa.",
        links: [{ label: "Ver en YouTube", href: "https://www.youtube.com/watch?v=ZwMqpzyj5zA" }],
      },
      { type: "heading", text: "Cómo aprovecharla" },
      {
        type: "list",
        ordered: true,
        items: [
          "Elige una de las 3 formas según lo que más te llame — no intentes las tres a la vez.",
          "Sigue el curso recomendado hasta producir tu primera pieza (video o agente) de muestra.",
          "Usa esa muestra para conseguir tu primer cliente pagado siguiendo el tip de venta de esa sección; tu meta son los primeros $300, no la perfección.",
        ],
      },
    ],
  },
  {
    slug: "gemini-pro-gratis-estudiantes",
    title: "Gemini gratis 1 año para estudiantes",
    subtitle:
      "Cómo activar el plan pagado de Google (AI Pro / AI Plus) sin costo, siendo estudiante universitario.",
    kind: "Guía paso a paso",
    readingMinutes: 4,
    blocks: [
      {
        type: "summary",
        title: "Resumen en 30 segundos",
        items: [
          "Entra a **gemini.google.com/students** con tu Gmail personal.",
          "Verifica que eres estudiante y agrega una tarjeta (**no te cobran ahora**).",
          "Listo: **1 año gratis** del plan pagado. Pon un recordatorio al mes 11 para decidir si sigues.",
        ],
      },
      { type: "heading", text: "Qué es esto y quién califica" },
      {
        type: "paragraph",
        text: 'Me escribes preguntando por el "Gemini gratis para estudiantes", así que aquí lo tienes claro y en orden. La buena noticia: **sí, casi cualquier estudiante universitario del mundo puede activar el plan pagado de Gemini gratis por 12 meses** — el mismo que normalmente cuesta unos $20 al mes.',
      },
      { type: "paragraph", text: "El único detalle es que **el plan se llama distinto según tu país**:" },
      {
        type: "table",
        head: ["Tu país", "Cómo se llama el plan"],
        rows: [
          ["Estados Unidos y España", "**Google AI Pro**"],
          ["La mayoría de Latinoamérica", "**Google AI Plus**"],
        ],
      },
      {
        type: "paragraph",
        text: "Son prácticamente el mismo beneficio. Para calificar solo necesitas ser **estudiante universitario, mayor de 18 años, con matrícula activa**.",
      },
      {
        type: "tip",
        title: "Importante",
        text: "La oferta tiene una **fecha límite para reclamarla** que cambia según el país. No la dejes para después — actívala apenas puedas.",
      },
      { type: "heading", text: "Qué incluye el plan" },
      {
        type: "benefits",
        items: [
          "Mucho más uso de **Gemini** (el modelo más potente)",
          "**Deep Research** para investigar a fondo",
          "Generación de **video e imágenes**",
          "**NotebookLM** para estudiar tus apuntes",
          "**2 TB** de almacenamiento en Google",
          "Todo **gratis por 12 meses**",
        ],
      },
      { type: "heading", text: "Lo que necesitas antes de empezar" },
      {
        type: "list",
        items: [
          "Ser **estudiante universitario**, mayor de 18 años, con matrícula activa.",
          "Una **cuenta personal de Google** (tu Gmail de siempre).",
          "Un **método de pago válido** (tarjeta). No te cobran ahora, pero Google lo pide para activar el año gratis.",
          "Tu **correo institucional o comprobante de matrícula**, por si te lo piden al verificar.",
        ],
      },
      { type: "heading", text: "Paso a paso para activarlo" },
      {
        type: "steps",
        items: [
          { text: "Entra a **gemini.google.com/students** e inicia sesión con tu cuenta personal de Google." },
          { text: "Toca la opción para **reclamar la oferta de estudiante**." },
          {
            text: "**Verifica que eres estudiante** con SheerID: elige tu universidad y, si te lo pide, sube el comprobante de matrícula o usa tu correo institucional.",
          },
          { text: "**Agrega un método de pago** para activar el año gratis (repito: no te cobran ahora)." },
          { text: "Confirma y listo: ya tienes el plan activo **sin costo por 12 meses**." },
        ],
      },
      {
        type: "resource",
        badge: "Página oficial · Google",
        title: "Gemini para estudiantes — reclama tu año gratis",
        meta: "El único enlace en el que debes hacer todo el proceso",
        text: "Aquí verificas que eres estudiante y activas el plan pagado de Gemini (AI Pro o AI Plus según tu país) sin costo por 12 meses. Ábrelo con tu cuenta personal de Google.",
        links: [{ label: "gemini.google.com/students", href: "https://gemini.google.com/students" }],
      },
      { type: "heading", text: "Avisos importantes (para no pagar sin querer)" },
      {
        type: "tip",
        title: "Se cobra solo al terminar el año",
        text: "Cuando pasen los 12 meses, Google cobra el plan automáticamente (~$20/mes) si no lo cancelas antes. Ponte un **recordatorio un mes antes** para decidir si sigues o cancelas — así nunca te llega un cobro sorpresa.",
      },
      {
        type: "tip",
        title: "Reclámalo a tiempo",
        text: "La fecha límite para activar la oferta depende de tu país; revísala en la misma página oficial y no lo dejes para el último día.",
      },
      {
        type: "tip",
        title: "Si SheerID no encuentra tu universidad",
        text: "Usa tu correo institucional o sube el comprobante de matrícula que te pida — con eso suele resolverse la verificación.",
      },
      { type: "heading", text: "Cómo aprovecharla" },
      {
        type: "list",
        ordered: true,
        items: [
          "Actívalo hoy siguiendo el paso a paso; te toma pocos minutos.",
          "Agenda el recordatorio para el mes 11, así decides con calma si continúas.",
          "Empieza a usarlo para tus estudios y proyectos — para eso lo activaste.",
        ],
      },
    ],
  },
];

export const RESOURCES_PATH = "/recursos-gratuitos";

export function findResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}
