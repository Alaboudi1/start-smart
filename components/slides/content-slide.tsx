import Image from "next/image"
import type { ContentItem } from "@/types/presentation"

interface ContentSlideProps {
  title: string
  subtitle?: string
  content?: ContentItem[]
  image?: string
  video?: string
}

export function ContentSlide({ title, subtitle, content, image, video }: ContentSlideProps) {
  const hasContent = content && content.length > 0;
  const isImageOnly = (image || video) && !hasContent;
  const hasMedia = image || video;

  return (
    <div className={`flex ${hasMedia ? (isImageOnly ? "flex-col" : "flex-row") : "grid lg:grid-cols-2"} ${isImageOnly ? "gap-6" : "gap-8"} items-center justify-center h-full px-12 ${isImageOnly ? "py-12" : "py-8"}`}>
      <div className={`space-y-4 ${isImageOnly ? "w-full text-center" : "flex-1"} ${isImageOnly ? "order-1" : ""}`}>
        <div className="space-y-3">
          <h2
            className="text-5xl md:text-6xl font-bold text-balance leading-tight text-primary"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subtitle && <p className="text-3xl md:text-4xl text-foreground font-medium">{subtitle}</p>}
        </div>

        {hasContent && (
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

      {hasMedia && (
        <div className={`relative ${isImageOnly ? "w-full order-2" : "w-[60%] h-[70vh]"} flex items-center justify-center`}>
          <div className="relative w-fit h-fit max-w-full rounded-2xl border-2 border-primary overflow-hidden">
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className={`object-contain ${isImageOnly ? "max-h-[65vh]" : "max-h-[70vh]"} w-auto`}
              />
            ) : (
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={1200}
                height={800}
                className={`object-contain ${isImageOnly ? "max-h-[65vh]" : "max-h-[70vh]"} w-auto`}
                priority
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
