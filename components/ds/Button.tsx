import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/utils';

/** DS Button port — variants/sizes/hover behavior identical to the design system. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outlineDark' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center rounded-md font-sans font-semibold tracking-[.01em] transition-[background-color,color,transform,box-shadow] duration-[var(--duration-fast)] cursor-pointer border disabled:cursor-not-allowed disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)] disabled:border-transparent hover:-translate-y-px active:translate-y-0 active:scale-[.98] hover:no-underline';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white border-transparent hover:bg-primary-hover hover:text-white hover:shadow-sm',
  secondary: 'bg-card text-heading border-line-strong hover:bg-[var(--ink-50)] hover:text-heading',
  ghost: 'bg-transparent text-primary border-transparent hover:bg-primary-soft hover:text-primary',
  outlineDark:
    'bg-transparent text-white border-[rgba(255,255,255,.35)] hover:bg-[rgba(255,255,255,.08)] hover:text-white',
  danger: 'bg-[var(--color-danger)] text-white border-transparent hover:bg-[#B93636] hover:text-white',
};

const sizes: Record<ButtonSize, { cls: string; icon: number }> = {
  sm: { cls: 'px-[14px] py-[8px] text-[length:var(--text-body-sm-size)] gap-[6px]', icon: 16 },
  md: { cls: 'px-[20px] py-[11px] text-[length:var(--text-button-size)] gap-[8px]', icon: 18 },
  lg: { cls: 'px-[26px] py-[14px] text-[1rem] gap-[8px]', icon: 20 },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: string;
  iconRight?: string;
  href?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  href,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  const s = sizes[size];
  const cls = cn(base, variants[variant], s.cls, fullWidth && 'w-full', className);
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={s.icon} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.icon} />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
