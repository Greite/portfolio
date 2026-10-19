'use client';

import { useState } from 'react';
import { LuCheck, LuCopy } from 'react-icons/lu';

interface CopyButtonProps {
  text: string;
  /** Nom de ce qui est copié, pour le lecteur d'écran (« compose.yml », « Adresse du plugin »…). */
  subject: string;
}

export default function CopyButton({ text, subject }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const Icon = copied ? LuCheck : LuCopy;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copier ${subject}`}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-fg-secondary transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
    >
      <Icon size={14} aria-hidden="true" className="text-accent" />
      <span className="grid">
        <span className={`col-start-1 row-start-1 ${copied ? 'invisible' : ''}`}>Copier</span>
        <span aria-hidden="true" className={`col-start-1 row-start-1 ${copied ? '' : 'invisible'}`}>
          Copié !
        </span>
      </span>
      <span role="status" className="sr-only">
        {copied ? `Copié : ${subject}` : ''}
      </span>
    </button>
  );
}
