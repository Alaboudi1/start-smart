"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationControlsProps {
  currentSlide: number
  totalSlides: number
  isAnimating: boolean
  onNext: () => void
  onPrev: () => void
}

export function NavigationControls({
  currentSlide,
  totalSlides,
  isAnimating,
  onNext,
  onPrev,
}: NavigationControlsProps) {
  return (
    <>
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-40">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          disabled={currentSlide === 0 || isAnimating}
          className="w-12 h-12 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:bg-card/80 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1 || isAnimating}
          className="w-12 h-12 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:bg-card/80 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute bottom-8 right-8 z-40">
        <div className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full text-sm font-mono">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-40">
        <div className="text-xs text-muted-foreground font-mono">Use ← → or Space to navigate</div>
      </div>
    </>
  )
}
