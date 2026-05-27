type Props = { size?: number; title?: string; className?: string };

export default function Logo({ size = 36, title = 'Gauthier Painteaux', className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 64"
      width={(size * 100) / 64}
      height={size}
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <text
        x="50"
        y="48"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontSize="56"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="-3.5"
        fill="currentColor"
      >
        gp
      </text>
      <circle cx="84" cy="46" r="3" fill="var(--accent)" />
    </svg>
  );
}
