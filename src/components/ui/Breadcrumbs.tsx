import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <Container size="wide">
      <nav aria-label="Breadcrumb" className="py-5">
        <ol className="flex flex-wrap items-center gap-1.5 font-sans text-[0.6875rem] text-taupe">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-stone">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.href} className="transition-colors hover:text-ink">
                      {crumb.name}
                    </Link>
                    <ChevronRight className="size-3" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </Container>
  );
}
