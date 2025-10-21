interface SectionSlideProps {
  section?: string
  title: string
  subtitle?: string
}

export function SectionSlide({ section, title, subtitle }: SectionSlideProps) {
  return (
    <div className="text-center flex items-center justify-center h-full">
      <div className="space-y-16 max-w-6xl px-8">
        {section && <div className="text-accent text-2xl md:text-3xl font-medium uppercase tracking-wider">{section}</div>}
        <h2
          className="text-4xl md:text-5xl font-bold leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && <p className="text-3xl md:text-4xl text-muted-foreground text-pretty max-w-4xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  )
}
