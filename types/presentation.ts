export interface Slide {
  type: "title" | "content" | "section" | "discussion"
  title: string
  subtitle?: string
  author?: string
  authorSubtitle?: string
  date?: string
  tagline?: string
  section?: string
  image?: string
  video?: string
  content?: Array<{
    heading: string
    text: string
  }>
  discussionPrompt?: string
  voiceId?: string
}

export interface PresentationData {
  slides: Slide[]
}

export interface ContentItem {
  heading: string
  text: string
}
