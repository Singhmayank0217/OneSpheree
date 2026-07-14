'use client';
import Link from 'next/link';
import { services } from '@/data/services';
import { Icon } from '@/components/ds/Icon';

/** Services mega menu — dropdown panel under the nav. Opens via group hover/focus from Navbar. */
export function MegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div
      className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-2"
      role="region"
      aria-label="Services menu"
    >
      <div className="rounded-lg border border-line bg-card p-2 shadow-dropdown">
        <div className="grid grid-cols-2 gap-[4px]">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              onClick={onNavigate}
              className="group/item flex items-start gap-2 rounded-md p-2 transition-colors duration-[var(--duration-fast)] hover:bg-[var(--ink-50)] hover:no-underline"
            >
              <span className="mt-[2px] flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-primary">
                <Icon name={s.icon} size={18} />
              </span>
              <span className="flex flex-col gap-[2px]">
                <span className="flex items-center gap-1 text-[length:var(--text-nav-size)] font-semibold text-heading">
                  {s.name}
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="-translate-x-1 opacity-0 transition-all duration-[var(--duration-base)] group-hover/item:translate-x-0 group-hover/item:opacity-100"
                  />
                </span>
                <span className="text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-lh)] text-muted">
                  {s.summary}
                </span>
              </span>
            </Link>
          ))}
          <Link
            href="/services"
            onClick={onNavigate}
            className="group/all flex items-center justify-between rounded-md bg-brand-soft p-2 px-3 hover:no-underline"
          >
            <span className="text-[length:var(--text-nav-size)] font-semibold text-primary">
              All services
            </span>
            <Icon
              name="arrowRight"
              size={16}
              className="text-primary transition-transform duration-[var(--duration-base)] group-hover/all:translate-x-[3px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
