"use client"

import { useState, useEffect } from "react"

const SUBTITLES = [
  "Building AI-First Startups",
  "Creating AI-Enabled Startups",
  "Building Great UX with AI",
  "AI-First Product Development",
  "Enabling Innovation with AI",
  "Designing Exceptional AI Experiences",
]

export function useTypingEffect(isActive: boolean) {
  const [typedText, setTypedText] = useState("")
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (!isActive) return

    const currentSubtitle = SUBTITLES[currentSubtitleIndex]

    if (isTyping) {
      if (typedText.length < currentSubtitle.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentSubtitle.slice(0, typedText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (typedText.length > 0) {
        const timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setCurrentSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length)
        setIsTyping(true)
      }
    }
  }, [typedText, currentSubtitleIndex, isTyping, isActive])

  return typedText
}
