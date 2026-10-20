'use client';

import type { Dictionary } from '@root/dictionaries/fr';
import { useState } from 'react';
import { LuCheck, LuCopy } from 'react-icons/lu';

const EMAIL = 'contact@gauthierpainteaux.fr';

interface CopyEmailProps {
  labels: Dictionary['common'];
  label?: string;
  iconSize?: number;
  className?: string;
}

/** Copies the email address; falls back to mailto: when the clipboard is unavailable. */
export default function CopyEmail({ labels, label = EMAIL, iconSize = 16, className }: CopyEmailProps) {
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
    <button type="button" onClick={copy} aria-label={`${labels.copyEmail} ${EMAIL}`} className={className}>
      <Icon size={iconSize} aria-hidden="true" className="text-accent" />
      {/* Both labels share one grid cell so the width never changes on toggle */}
      <span className="grid">
        <span className={`col-start-1 row-start-1 ${copied ? 'invisible' : ''}`}>{label}</span>
        <span aria-hidden="true" className={`col-start-1 row-start-1 ${copied ? '' : 'invisible'}`}>
          {labels.copied}
        </span>
      </span>
      <span role="status" className="sr-only">
        {copied ? labels.emailCopied : ''}
      </span>
    </button>
  );
}
