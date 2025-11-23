import { createContext, useContext } from 'react'

export const AudioContext = createContext(null)

export const useAudio = () => {
  const context = useContext(AudioContext)
  // Return null if context is not available instead of throwing error
  // This allows the component to handle the case gracefully
  return context
}

