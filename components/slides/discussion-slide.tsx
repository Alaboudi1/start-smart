"use client"

import { useEffect } from "react"
import { Mic, MicOff, Radio, Volume2, VolumeX } from "lucide-react"
import { useRealtimeAudio } from "@/hooks/use-realtime-audio"
import { Button } from "@/components/ui/button"

interface DiscussionSlideProps {
  title: string
  subtitle?: string
  discussionPrompt?: string
}

export function DiscussionSlide({ title, subtitle, discussionPrompt }: DiscussionSlideProps) {
  const { status, isListening, isSpeaking, audioLevel, isMuted, connect, disconnect, toggleMute, error } = useRealtimeAudio(discussionPrompt)

  useEffect(() => {
    return () => {
      if (status === "connected") {
        disconnect()
      }
    }
  }, [status, disconnect])

  const handleToggle = () => {
    if (status === "idle" || status === "disconnected" || status === "error") {
      connect()
    } else if (status === "connected") {
      disconnect()
    }
  }

  const isActive = status === "connected"
  const pulseIntensity = audioLevel * 100

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-12 relative">
      {/* Floating particles */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 2 === 0 ? "bg-primary/40" : "bg-accent/40"
              } animate-float-${(i % 3) + 1}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Title Section */}
      <div className="text-center space-y-4 z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-balance leading-tight animate-fade-in-up">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-muted-foreground text-pretty animate-fade-in-up animate-delay-200">
            {subtitle}
          </p>
        )}
      </div>

      {/* Futuristic Audio Orb */}
      <div className="relative flex items-center justify-center z-10">
        {/* Outer pulsing rings */}
        {isActive && (
          <>
            <div
              className="absolute w-80 h-80 rounded-full border-2 border-primary/20 animate-pulse-slow"
              style={{
                transform: `scale(${1 + pulseIntensity / 100})`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute w-72 h-72 rounded-full border-2 border-accent/20 animate-pulse-slow"
              style={{
                animationDelay: "0.5s",
                transform: `scale(${1 + pulseIntensity / 150})`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute w-64 h-64 rounded-full border border-primary/30 animate-pulse-slow"
              style={{
                animationDelay: "1s",
                transform: `scale(${1 + pulseIntensity / 200})`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </>
        )}

        {/* Central orb */}
        <div
          className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${
            isActive
              ? "bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl shadow-primary/50"
              : "bg-card/50 border-2 border-border"
          }`}
          style={{
            boxShadow: isActive ? `0 0 ${60 + pulseIntensity}px rgba(var(--primary), 0.5)` : undefined,
          }}
        >
          {/* Inner glow */}
          {isActive && (
            <div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl"
              style={{
                opacity: 0.3 + audioLevel * 0.7,
              }}
            />
          )}

          {/* Microphone button */}
          <Button
            onClick={handleToggle}
            disabled={status === "connecting"}
            size="icon"
            className={`relative z-10 w-28 h-28 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-card hover:bg-card/80 border-2 border-primary"
            }`}
          >
            {status === "connecting" ? (
              <Radio className="w-12 h-12 animate-spin" />
            ) : isActive ? (
              <MicOff className="w-12 h-12" />
            ) : (
              <Mic className="w-12 h-12" />
            )}
          </Button>
        </div>

        {/* Waveform visualization */}
        {isActive && audioLevel > 0.1 && (
          <div className="absolute bottom-[-80px] flex gap-2 items-end h-16">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-primary to-accent rounded-full transition-all duration-75"
                style={{
                  height: `${Math.random() * audioLevel * 100 + 10}%`,
                  opacity: 0.3 + audioLevel * 0.7,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Status Display */}
      <div className="text-center space-y-4 z-10">
        <div className="flex items-center justify-center gap-3">
          {status === "connected" && (
            <>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30">
                <div className={`w-2 h-2 rounded-full ${isListening ? "bg-primary animate-pulse" : "bg-muted"}`} />
                <span className="text-sm font-mono">{isListening ? "Listening" : isSpeaking ? "Muted" : "Idle"}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-accent/30">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-accent animate-pulse" : "bg-muted"}`} />
                <span className="text-sm font-mono">{isSpeaking ? "Speaking" : "Silent"}</span>
              </div>
            </>
          )}
          {status === "connecting" && (
            <div className="px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30">
              <span className="text-sm font-mono text-primary">Connecting...</span>
            </div>
          )}
          {status === "idle" && (
            <div className="px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border">
              <span className="text-sm font-mono text-muted-foreground">Click microphone to start</span>
            </div>
          )}
        </div>

        {error && (
          <div className="px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Manual Mute Button */}
        {status === "connected" && (
          <Button
            onClick={toggleMute}
            size="sm"
            variant={isMuted ? "destructive" : "outline"}
            className="gap-2"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {isMuted ? "Unmute Microphone" : "Mute Microphone"}
          </Button>
        )}
      </div>

      {/* Circuit decoration */}
      <div className="absolute top-20 left-20 w-32 h-32 opacity-10 pointer-events-none">
        <div className="absolute inset-0 border border-primary/50" style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 50% 50%, 50% 100%, 0 100%)" }} />
      </div>
      <div className="absolute bottom-20 right-20 w-32 h-32 opacity-10 pointer-events-none rotate-180">
        <div className="absolute inset-0 border border-accent/50" style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 50% 50%, 50% 100%, 0 100%)" }} />
      </div>
    </div>
  )
}
