import Image from "next/image"
import type { ContentItem } from "@/types/presentation"

interface ContentSlideProps {
  title: string
  subtitle?: string
  content?: ContentItem[]
  image?: string
}

export function ContentSlide({ title, subtitle, content, image }: ContentSlideProps) {
  return (
    <div className={`flex ${image ? "flex-row" : "grid lg:grid-cols-2"} gap-12 items-center justify-center h-full`}>
      {image && (
        <div className="relative w-[60%] h-[70vh] flex items-center justify-center">
          <div className="relative w-fit h-fit max-w-full max-h-full rounded-2xl border-2 border-primary/30 shadow-2xl shadow-primary/20 overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={title} width={800} height={600} className="object-contain max-h-[70vh] w-auto" />
          </div>
        </div>
      )}

      <div className="space-y-8 flex-1">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-balance leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && <p className="text-lg text-muted-foreground text-pretty">{subtitle}</p>}
        </div>

        {content && content.length > 0 && (
          <div className="space-y-6">
            {content.map((item, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-xl font-semibold text-primary">{item.heading}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
