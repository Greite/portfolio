'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu';

type ThemeOption = {
  value: 'light' | 'dark' | 'system';
  label: string;
  Icon: typeof LuSun;
};

const options: ThemeOption[] = [
  { value: 'light', label: 'Thème clair', Icon: LuSun },
  { value: 'system', label: 'Thème système', Icon: LuMonitor },
  { value: 'dark', label: 'Thème sombre', Icon: LuMoon },
];

interface ThemeToggleProps {
  variant?: 'compact' | 'full';
}

/** Cross-fades themed colors for the duration of the switch only (see globals.css). */
function switchTheme(setTheme: (theme: string) => void, value: string) {
  const root = document.documentElement;
  root.classList.add('theme-transition');
  setTheme(value);
  window.setTimeout(() => root.classList.remove('theme-transition'), 350);
}

export default function ThemeToggle({ variant = 'compact' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={
          variant === 'compact'
            ? 'h-11 w-[132px] rounded-full border border-border'
            : 'h-12 w-full rounded-full border border-border'
        }
      />
    );
  }

  const current = theme ?? 'system';
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === current),
  );

  return (
    <div
      role="radiogroup"
      aria-label="Choix du thème"
      className={`relative inline-flex items-center rounded-full border border-border p-1 ${
        variant === 'full' ? 'w-full' : ''
      }`}
    >
      {/* Sliding indicator: one element moving between the options */}
      <span
        aria-hidden="true"
        className={`absolute left-1 top-1 h-9 rounded-full bg-accent transition-transform duration-200 ease-out-strong ${
          variant === 'full' ? 'w-[calc((100%-0.5rem)/3)]' : 'w-10'
        }`}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {options.map(({ value, label, Icon }) => {
        const isActive = current === value;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            onClick={() => switchTheme(setTheme, value)}
            className={`relative z-10 inline-flex h-9 min-h-9 items-center justify-center rounded-full text-sm font-medium transition-[color,scale] duration-200 ease-out-strong active:scale-[0.97] ${
              variant === 'full' ? 'flex-1' : 'w-10'
            } ${isActive ? 'text-accent-fg' : 'text-fg-secondary hover:text-fg'}`}
          >
            <Icon size={16} aria-hidden="true" />
            {variant === 'full' && <span className="ml-2">{label.replace('Thème ', '')}</span>}
          </button>
        );
      })}
    </div>
  );
}
