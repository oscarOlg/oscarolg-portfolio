import Link from "next/link";

export const PORTFOLIO_CATEGORIES = [
  { key: "weddings",   label: "Bodas" },
  { key: "portraits",  label: "Retratos" },
  { key: "couples",    label: "Parejas y Grupales" },
  { key: "commercial", label: "Comercial" },
  { key: "editorial",  label: "Editorial" },
  { key: "maternity",  label: "Maternidad" },
] as const;

export type PortfolioCategoryKey = (typeof PORTFOLIO_CATEGORIES)[number]["key"];

interface PortfolioNavProps {
  /** Pass "all" for the main /portfolio page, or a category key for subcategory pages */
  activeCategory: "all" | PortfolioCategoryKey;
}

export default function PortfolioNav({ activeCategory }: PortfolioNavProps) {
  const linkClass = (active: boolean) =>
    `font-sans text-xs tracking-widest uppercase pb-1 border-b-2 transition-colors ${
      active
        ? "text-accent border-accent font-semibold"
        : "text-dominant border-transparent hover:text-accent hover:border-accent"
    }`;

  return (
    <nav
      className="sticky top-16 z-40 w-full bg-secondary/85 backdrop-blur-sm shadow-lg"
      aria-label="Filtrar por categoría"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10 px-6 md:px-12 py-4">
        <Link href="/portfolio" className={linkClass(activeCategory === "all")}>
          Todo
        </Link>
        {PORTFOLIO_CATEGORIES.map(({ key, label }) => (
          <Link
            key={key}
            href={`/portfolio?category=${key}`}
            className={linkClass(activeCategory === key)}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
