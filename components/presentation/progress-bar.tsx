interface ProgressBarProps {
  currentSlide: number
  totalSlides: number
}

export function ProgressBar({ currentSlide, totalSlides }: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-muted z-50">
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
      />
    </div>
  )
}
