// Recursos gratuitos de Kiuna AI.
// Cada guía es un archivo en content/recursos/<slug>.json y aparece sola en
// kiuna.cloud/recursos-gratuitos (más nueva primero, según `date`).
// Formato completo y reglas: content/recursos/README.md

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
  date: string;
  blocks: Block[];
};

const files = import.meta.glob<Resource>("../content/recursos/*.json", {
  eager: true,
  import: "default",
});

export const resources: Resource[] = Object.values(files).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const RESOURCES_PATH = "/recursos-gratuitos";

export function findResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}
