interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2 className="heading-2 neon-text-pink mb-4">{title}</h2>
      {subtitle && <p className="body-large mx-auto max-w-2xl">{subtitle}</p>}
      <div className="gradient-divider mx-auto mt-6 max-w-xs" />
    </div>
  );
}
