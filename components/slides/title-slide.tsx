interface TitleSlideProps {
  title: string
  author?: string
  date?: string
  tagline?: string
  typedText: string
}

export function TitleSlide({ title, author, date, tagline, typedText }: TitleSlideProps) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-balance leading-tight md:text-6xl">
          Building Smarter Startups with{" "}
          <span className="text-7xl font-extrabold text-primary animate-moving-border">AI</span>
        </h1>
        <div className="text-xl md:text-2xl text-muted-foreground min-h-[2em] flex items-center justify-center">
          {typedText}
          <span className="ml-1 animate-pulse">|</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-lg font-medium text-primary">{author}</div>
        <div className="text-muted-foreground">{date}</div>
      </div>

      {tagline && <div className="text-accent text-lg">{tagline}</div>}
    </div>
  )
}
