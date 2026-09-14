'use client';

import { useState } from 'react';
import { LuCheck, LuCopy } from 'react-icons/lu';

const EMAIL = 'contact@gauthierpainteaux.fr';

interface CopyEmailProps {
  label?: string;
  iconSize?: number;
  className?: string;
}

/** Copies the email address; falls back to mailto: when the clipboard is unavailable. */
export default function CopyEmail({ label = EMAIL, iconSize = 16, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const Icon = copied ? LuCheck : LuCopy;

  return (
    <button type="button" onClick={copy} aria-label={`Copier l'adresse ${EMAIL}`} className={className}>
      <Icon size={iconSize} aria-hidden="true" className="text-accent" />
      <span>{copied ? 'Copié !' : label}</span>
      <span role="status" className="sr-only">
        {copied ? 'Adresse email copiée' : ''}
      </span>
    </button>
  );
}
