import type { PresentationData } from "@/types/presentation"

// This is your editable content - modify this to change your presentation
export const presentationData: PresentationData = {
  slides: [
    {
      type: "title",
      title: "Building Smarter Startups with AI",
      subtitle: "Building Tomorrow's Startup Ecosystem",
      author: "Abdulaziz Alaboudi",
      authorSubtitle: "AI & SW & Entrepreneurship",
      date: "October 2025",
    },
    {
      type: "section",
      section: "A Story of Transformation",
      title: "The Electronic Oven Revolution",
      subtitle: "An imaginary tale of how a revolutionary leap completely transformed an entire industry.",
    },
    {
      type: "content",
      title: "Few Ingredients <span style='color: oklch(0.6 0.15 50)'>Yet</span> Delicious Soup",
      image: "/images/story-1.png",
    },
    {
      type: "content",
      title: "Demand Exceeded Supply <span style='color: oklch(0.6 0.15 50)'>-</span> Sold Out in Hours",
      image: "/images/story-2.png",
    },
    {
      type: "content",
      title: "Gathering Firewood <span style='color: oklch(0.6 0.15 50)'>-</span> The Bottleneck",
      image: "/images/story-3.png",
    },
    {
      type: "content",
      title: "The Electronic Oven Revolution",
      image: "/images/story-4.png",
    },
    {
      type: "content",
      title: "Faster Production <span style='color: oklch(0.6 0.15 50)'>-</span> More Soup",
      image: "/images/story-6.png",
    },
    {
      type: "content",
      title: "Declining in Success",
      image: "/images/story-7.png",
    },
    {
      type: "content",
      title: "Worst than Firewood",
      image: "/images/story-8.png",
    },
    {
      type: "section",
      section: "Reflection",
      title: "What Happened?",
      subtitle: "Understanding the transformation and its impact on the entire industry.",
    },
    {
      type: "discussion",
      title: "Let's Discuss",
      subtitle: "Share your thoughts on this transformation story",
      discussionPrompt:  "أنت مساعد ذكي للدكتور عبدالعزيز العبودي. الدكتور عبدالعزيز يقدم محاضرة عن دور الذكاء الاصطناعي في بناء شركات ناشئة ناجحة. راح يسألك أسئلة متنوعة حول هذا الموضوع، فابدأ دايم بتحية الدكتور، ورد باللهجة السعودية بشكل طبيعي. ما في مانع تستخدم كلمات إنجليزية للمصطلحات التقنية وقت الحاجة."
    },
    {
      type: "section",
      title: "<span style='color: var(--primary)'>AI-First</span>\nAI drives the value, UX, and architecture\n\n<span style='color: var(--primary)'>AI-Enabled</span>\nAI enhances existing products for efficiency"
    },
    {
      type: "section",
      title: "<span style='color: var(--primary)'>AI-enabled is the bridge.\nAI-first is the destination.</span>",
      subtitle: "— Dr. Abdulaziz Alaboudi"
    },
    {
      type: "content",
      title: "The Evolution of GitHub Copilot",
      subtitle: "From Code Suggestions to AI Pair Programming",
      image: "/images/github-copilot.jpg",
    },
    {
      type: "content",
      title: "Code Suggestions",
      video: "/images/nes-video.mp4",
    },
    {
      type: "content",
      title: "Agent Mode",
      video: "/images/Agent mode and new models in GitHub Copilot Chat Visual Studio Code - GitHub (1080p, h264, youtube)-2 (online-video-cutter.com).mp4",
    },
    {
      type: "content",
      title: "Github Copilot Market Snehare",
      image: "/images/copilot-marketshare.png",
    },
    {
      type: "section",
      title: "How to Build AI-Enabled Products?\n\nHow to Build AI-First Products?",
    },
    {
      type: "content",
      title: "Exercise",
      image: "/images/balckboard.png",
    }
  ],
}
