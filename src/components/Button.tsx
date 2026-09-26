import React from 'react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      href,
      icon,
      iconPosition = 'right',
      fullWidth = false,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-bold uppercase tracking-[0.12em] rounded-[16px] transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none shrink-0';

    const variants = {
      primary:
        'gold-gradient-bg text-[#070A0F] font-extrabold gold-border-glow hover:brightness-110 hover:shadow-[0_0_25px_rgba(212,175,90,0.4)] active:scale-[0.98]',
      secondary:
        'bg-[#071B36]/70 border border-[#D4AF5A]/35 text-[#E8E8E5] hover:border-[#D4AF5A] hover:text-[#D4AF5A] hover:bg-[#071B36] active:scale-[0.98]',
      outline:
        'bg-transparent border border-[#D4AF5A]/40 text-[#E6C878] hover:border-[#D4AF5A] hover:bg-[#D4AF5A]/10 active:scale-[0.98]',
      ghost:
        'bg-transparent text-[#E8E8E5] hover:text-[#D4AF5A] hover:bg-white/5 active:scale-[0.98]',
      danger:
        'bg-red-950/80 border border-red-500/50 text-red-200 hover:bg-red-900 hover:text-white active:scale-[0.98]',
    };

    const sizes = {
      sm: 'h-8 px-3.5 text-[10px] sm:text-[11px] gap-1.5',
      md: 'h-10 px-5 text-xs gap-2',
      lg: 'h-12 px-7 text-xs sm:text-sm gap-2.5',
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    const content = (
      <>
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        type={type}
        className={combinedClassName}
        disabled={disabled}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
