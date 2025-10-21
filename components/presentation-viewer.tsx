"use client"

import { useState, useEffect } from "react"
import { presentationData } from "@/lib/presentation-data"
import { TitleSlide } from "@/components/slides/title-slide"
import { SectionSlide } from "@/components/slides/section-slide"
import { ContentSlide } from "@/components/slides/content-slide"
import { BackgroundAnimation } from "@/components/presentation/background-animation"
import { LogosHeader } from "@/components/presentation/logos-header"
import { NavigationControls } from "@/components/presentation/navigation-controls"
import { ProgressBar } from "@/components/presentation/progress-bar"
import { useTypingEffect } from "@/hooks/use-typing-effect"

export default function PresentationViewer() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const totalSlides = presentationData.slides.length
  const slide = presentationData.slides[currentSlide]

  const typedText = useTypingEffect(currentSlide === 0)

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1 && !isAnimating) {
      setIsAnimating(true)
      setCurrentSlide(currentSlide + 1)
      setTimeout(() => setIsAnimating(false), 800)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setIsAnimating(true)
      setCurrentSlide(currentSlide - 1)
      setTimeout(() => setIsAnimating(false), 800)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide, isAnimating])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <BackgroundAnimation />

      <ProgressBar currentSlide={currentSlide} totalSlides={totalSlides} />

      <LogosHeader />

      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isAnimating={isAnimating}
        onNext={nextSlide}
        onPrev={prevSlide}
      />

      <div className="flex items-center justify-center min-h-screen p-8 relative z-10">
        <div className="max-w-6xl w-full">
          {slide.type === "title" && (
            <TitleSlide
              title={slide.title}
              author={slide.author}
              date={slide.date}
              tagline={slide.tagline}
              typedText={typedText}
            />
          )}

          {slide.type === "content" && (
            <ContentSlide title={slide.title} subtitle={slide.subtitle} content={slide.content} image={slide.image} />
          )}

          {slide.type === "section" && (
            <SectionSlide section={slide.section} title={slide.title} subtitle={slide.subtitle} />
          )}
        </div>
      </div>
    </div>
  )
}
