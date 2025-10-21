interface SectionSlideProps {
  section?: string
  title: string
  subtitle?: string
}

export function SectionSlide({ section, title, subtitle }: SectionSlideProps) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        {section && <div className="text-accent text-lg font-medium uppercase tracking-wider">{section}</div>}
        <h2 className="text-5xl md:text-6xl font-bold text-balance leading-tight">{title}</h2>
        {subtitle && <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  )
}
