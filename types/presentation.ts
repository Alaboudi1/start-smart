export interface Slide {
  type: "title" | "content" | "section"
  title: string
  subtitle?: string
  author?: string
  date?: string
  tagline?: string
  section?: string
  image?: string
  content?: Array<{
    heading: string
    text: string
  }>
}

export interface PresentationData {
  slides: Slide[]
}

export interface ContentItem {
  heading: string
  text: string
}
