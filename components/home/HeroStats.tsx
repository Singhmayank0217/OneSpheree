import { Counter } from '@/components/animations/Counter';
import { heroStats } from '@/data/stats';

/** Hero proof numbers — DS StatCard (dark) composition with animated counters. */
export function HeroStats({ countDelay = 0 }: { countDelay?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[rgba(255,255,255,.12)] pt-4 text-left md:grid-cols-4">
      {heroStats.map((stat) => (
        <li key={stat.label}>
          <span className="block font-display text-[2.5rem] font-extrabold leading-none text-white">
            <Counter value={stat.value} suffix={stat.suffix} delay={countDelay} />
          </span>
          <span className="mt-[6px] block text-[length:var(--text-body-sm-size)] text-ondark-muted">
            {stat.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
