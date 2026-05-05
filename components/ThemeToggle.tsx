'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu'

type ThemeOption = {
  value: 'light' | 'dark' | 'system'
  label: string
  Icon: typeof LuSun
}

const options: ThemeOption[] = [
  { value: 'light', label: 'Thème clair', Icon: LuSun },
  { value: 'system', label: 'Thème système', Icon: LuMonitor },
  { value: 'dark', label: 'Thème sombre', Icon: LuMoon },
]

interface ThemeToggleProps {
  variant?: 'compact' | 'full'
}

export default function ThemeToggle({ variant = 'compact' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    )
  }

  const current = theme ?? 'system'

  return (
    <div
      role="radiogroup"
      aria-label="Choix du thème"
      className={`inline-flex items-center rounded-full border border-border p-1 ${
        variant === 'full' ? 'w-full justify-between' : ''
      }`}
    >
      {options.map(({ value, label, Icon }) => {
        const isActive = current === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={`inline-flex h-9 min-h-9 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors ${
              variant === 'full' ? 'flex-1' : ''
            } ${isActive ? 'bg-accent text-accent-fg' : 'text-fg-secondary hover:text-fg'}`}
          >
            <Icon size={16} aria-hidden="true" />
            {variant === 'full' && <span className="ml-2">{label.replace('Thème ', '')}</span>}
          </button>
        )
      })}
    </div>
  )
}
