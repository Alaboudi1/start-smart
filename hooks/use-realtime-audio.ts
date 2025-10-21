import { useState, useRef, useCallback } from "react"

type ConnectionStatus = "idle" | "connecting" | "connected" | "disconnected" | "error"

interface UseRealtimeAudioReturn {
  status: ConnectionStatus
  isListening: boolean
  isSpeaking: boolean
  audioLevel: number
  isMuted: boolean
  connect: () => Promise<void>
  disconnect: () => void
  toggleMute: () => void
  error: string | null
}

export function useRealtimeAudio(systemPrompt?: string): UseRealtimeAudioReturn {
  const [status, setStatus] = useState<ConnectionStatus>("idle")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const dataChannelRef = useRef<RTCDataChannel | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const toggleMute = useCallback(() => {
    if (audioStreamRef.current) {
      const newMutedState = !isMuted
      audioStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !newMutedState
      })
      setIsMuted(newMutedState)
      console.log("Microphone manually", newMutedState ? "muted" : "unmuted")
    }
  }, [isMuted])

  const disconnect = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop())
      audioStreamRef.current = null
    }

    if (dataChannelRef.current) {
      dataChannelRef.current.close()
      dataChannelRef.current = null
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }

    setStatus("disconnected")
    setIsListening(false)
    setIsSpeaking(false)
    setAudioLevel(0)
    setIsMuted(false)
  }, [])

  const connect = useCallback(async () => {
    try {
      setStatus("connecting")
      setError(null)

      console.log("Starting connection to realtime API...")

      // Get session token from API
      const response = await fetch("/api/realtime-session", {
        method: "POST",
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        console.error("Session creation failed:", errorData)
        throw new Error(errorData.error || "Failed to create session")
      }

      const data = await response.json()
      console.log("Session created successfully")

      if (!data.client_secret?.value) {
        throw new Error("No client secret received from server")
      }

      const { client_secret } = data

      // Get user microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioStreamRef.current = stream

      // Create peer connection with ICE servers for better connectivity
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      })
      peerConnectionRef.current = pc

      // Handle ICE connection state changes
      pc.addEventListener("iceconnectionstatechange", () => {
        console.log("ICE connection state:", pc.iceConnectionState)
        if (pc.iceConnectionState === "failed" || pc.iceConnectionState === "disconnected") {
          setError("Connection lost. Please try again.")
          setStatus("error")
        }
      })

      // Handle connection state changes
      pc.addEventListener("connectionstatechange", () => {
        console.log("Connection state:", pc.connectionState)
        if (pc.connectionState === "failed") {
          setError("Connection failed. Please check your network.")
          setStatus("error")
        }
      })

      // Add audio track
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream)
      })

      // Create data channel for session config
      const dc = pc.createDataChannel("oai-events")
      dataChannelRef.current = dc

      dc.addEventListener("open", () => {
        console.log("Data channel opened")
        try {
          const sessionUpdate = {
            type: "session.update",
            session: {
              modalities: ["text", "audio"],
              instructions: `
              ${systemPrompt}
              Dr Abdulaziz has told a story of the man who made soup — first with firewood, then with the discovery of an electric oven, he was able to make 4x more soup. But all the sudden, the sales has declined until he made less than Firewood era.
              When asked to reflect on what happened, summarize the story.
              Then, explain how the man optimized his old way of making soup with the new tool (the electric oven) but didn’t change his mindset or innovate beyond that. His competitors, however, reimagined what soup could be with the new tool, creating entirely new flavors and experiences that delighted customers.
              Finally, conclude with the moral of the story about the difference between optimizing old methods versus embracing true innovation.

              DO NOT mention AI until the DR. Abdulaziz prompt you to map this story to AI era.
              ----
              This is like companies that use AI to make existing products faster or cheaper — they are AI-enabled.
              His competitors didn’t just use the same tool — they reimagined what soup could be. They designed entirely new flavors, experiences, and ways of delighting people. That’s AI-first thinking.
              The moral: adopting AI isn’t enough — transformation comes when AI becomes the foundation of your innovation, not just a feature you plug in.
              End with a strong statement:
              “AI-enabled makes your old soup faster. AI-first redefines what soup can be.”
              ` .trim(),
              voice: "shimmer",
              input_audio_format: "pcm16",
              output_audio_format: "pcm16",
              turn_detection: {
                type: "server_vad",
              },
            },
          }
          console.log("Sending session update:", sessionUpdate)
          dc.send(JSON.stringify(sessionUpdate))
          setStatus("connected")
          setIsListening(true)
          console.log("Session configured successfully")
        } catch (err) {
          console.error("Error configuring session:", err)
          setError("Failed to configure session")
          setStatus("error")
        }
      })

      dc.addEventListener("error", (event) => {
        console.error("Data channel error:", event)
        setError("Data channel error occurred")
        setStatus("error")
      })

      dc.addEventListener("close", () => {
        console.log("Data channel closed")
        if (status === "connected") {
          setStatus("disconnected")
        }
      })

      dc.addEventListener("message", (event) => {
        try {
          const message = JSON.parse(event.data)
          console.log("Received message:", message.type, message)

          if (message.type === "response.audio.delta") {
            setIsSpeaking(true)
            // Auto-mute microphone while AI is speaking to prevent feedback
            if (audioStreamRef.current && !isMuted) {
              audioStreamRef.current.getAudioTracks().forEach((track) => {
                track.enabled = false
              })
              setIsMuted(true)
              console.log("Auto-muted microphone (AI speaking)")
            }
          } else if (message.type === "response.audio.done") {
            setIsSpeaking(false)
            // Auto-unmute microphone when AI is done speaking (if not manually muted)
            if (audioStreamRef.current && isMuted) {
              audioStreamRef.current.getAudioTracks().forEach((track) => {
                track.enabled = true
              })
              setIsMuted(false)
              console.log("Auto-unmuted microphone (AI finished)")
            }
          } else if (message.type === "input_audio_buffer.speech_started") {
            setIsListening(true)
          } else if (message.type === "input_audio_buffer.speech_stopped") {
            setIsListening(false)
          } else if (message.type === "input_audio_buffer.committed") {
            console.log("Audio committed, server VAD will auto-create response...")
          } else if (message.type === "response.created") {
            console.log("Response created:", message.response)
          } else if (message.type === "response.done") {
            console.log("Response done:", message.response)

            // Check response status
            if (message.response?.status === "failed") {
              console.error("Response failed! Details:", message.response.status_details)
              setError(`Response failed: ${JSON.stringify(message.response.status_details)}`)
            }

            // Check if response has audio output
            const hasAudio = message.response?.output?.some((item: any) =>
              item.content?.some((c: any) => c.type === "audio")
            )
            console.log("Response has audio:", hasAudio)
          } else if (message.type === "error") {
            console.error("Server error:", message.error)
            setError(`Server error: ${message.error?.message || "Unknown error"}`)
            setStatus("error")
          } else if (message.type === "session.created" || message.type === "session.updated") {
            console.log("Session ready:", message)
          } else if (message.type === "response.output_item.added") {
            console.log("Output item added:", message.item)
          } else if (message.type === "response.content_part.added") {
            console.log("Content part added:", message.part)
          } else if (message.type === "response.audio_transcript.delta") {
            console.log("Audio transcript:", message.delta)
          }
        } catch (err) {
          console.error("Error parsing message:", err)
        }
      })

      // Handle incoming audio
      pc.addEventListener("track", async (event) => {
        console.log("Received remote audio track")
        const remoteAudio = new Audio()
        remoteAudio.srcObject = event.streams[0]
        remoteAudio.autoplay = true

        try {
          await remoteAudio.play()
          console.log("Remote audio playing")
        } catch (err) {
          console.error("Error playing remote audio:", err)
          setError("Could not play audio. Please check your audio settings.")
        }
      })

      // Create and set offer
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      // Send offer to OpenAI
      const sdpResponse = await fetch("https://api.openai.com/v1/realtime", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${client_secret.value}`,
          "Content-Type": "application/sdp",
        },
        body: offer.sdp,
      })

      if (!sdpResponse.ok) {
        throw new Error("Failed to connect to OpenAI")
      }

      const answerSdp = await sdpResponse.text()
      await pc.setRemoteDescription({
        type: "answer",
        sdp: answerSdp,
      })

      // Audio level monitoring
      const audioContext = new AudioContext()

      // Resume AudioContext if suspended (required by browser autoplay policies)
      if (audioContext.state === "suspended") {
        await audioContext.resume()
        console.log("AudioContext resumed")
      }

      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)
      analyser.fftSize = 256
      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length
        setAudioLevel(average / 255)
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
      }
      updateAudioLevel()
    } catch (err) {
      console.error("Connection error:", err)

      // Provide more specific error messages
      let errorMessage = "Connection failed"
      if (err instanceof Error) {
        if (err.message.includes("getUserMedia")) {
          errorMessage = "Microphone access denied. Please allow microphone access and try again."
        } else if (err.message.includes("Failed to create session")) {
          errorMessage = "Could not create session. Please check your API key configuration."
        } else if (err.message.includes("Failed to connect to OpenAI")) {
          errorMessage = "Could not connect to OpenAI. Please check your internet connection."
        } else {
          errorMessage = err.message
        }
      }

      setError(errorMessage)
      setStatus("error")
      disconnect()
    }
  }, [systemPrompt, disconnect])

  return {
    status,
    isListening,
    isSpeaking,
    audioLevel,
    isMuted,
    connect,
    disconnect,
    toggleMute,
    error,
  }
}
