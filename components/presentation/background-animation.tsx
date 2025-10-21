export function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute top-16 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent animate-data-stream"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-24 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent/25 to-transparent animate-data-stream"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className="absolute top-32 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/35 to-transparent animate-data-stream"
        style={{ animationDelay: "0.4s" }}
      />
      <div
        className="absolute top-40 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent/20 to-transparent animate-data-stream"
        style={{ animationDelay: "0.6s" }}
      />
      <div
        className="absolute top-48 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent animate-data-stream"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="absolute top-56 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent/25 to-transparent animate-data-stream"
        style={{ animationDelay: "1.0s" }}
      />
      <div
        className="absolute top-64 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent animate-data-stream"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="absolute top-72 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent/20 to-transparent animate-data-stream"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary/25 to-transparent animate-data-stream"
        style={{ animationDelay: "1.6s" }}
      />
      <div
        className="absolute bottom-72 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent/30 to-transparent animate-data-stream"
        style={{ animationDelay: "1.8s" }}
      />
      <div
        className="absolute bottom-64 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/35 to-transparent animate-data-stream"
        style={{ animationDelay: "2.0s" }}
      />
      <div
        className="absolute bottom-56 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent/25 to-transparent animate-data-stream"
        style={{ animationDelay: "2.2s" }}
      />
      <div
        className="absolute bottom-48 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent animate-data-stream"
        style={{ animationDelay: "2.4s" }}
      />
      <div
        className="absolute bottom-40 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent/30 to-transparent animate-data-stream"
        style={{ animationDelay: "2.6s" }}
      />
      <div
        className="absolute bottom-32 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent animate-data-stream"
        style={{ animationDelay: "2.8s" }}
      />
      <div
        className="absolute bottom-24 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent/25 to-transparent animate-data-stream"
        style={{ animationDelay: "3.0s" }}
      />
      <div
        className="absolute bottom-16 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent animate-data-stream"
        style={{ animationDelay: "3.2s" }}
      />

      <div
        className="absolute inset-0 opacity-10 animate-circuit-pulse"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--primary), 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--primary), 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="absolute inset-0 opacity-30 animate-gradient-shift"
        style={{
          background:
            "linear-gradient(45deg, transparent 0%, rgba(var(--primary), 0.08) 25%, transparent 50%, rgba(var(--accent), 0.08) 75%, transparent 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className={`absolute left-0 ${i % 2 === 0 ? "w-2" : "w-1"} h-0.5 ${
            i % 2 === 0 ? "bg-primary/35" : "bg-accent/30"
          } rounded-full animate-data-particle`}
          style={{
            top: `${20 + i * 40}px`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
}
