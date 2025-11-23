import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AudioContext } from './contexts/AudioContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home/Home'
import Origin from './pages/Origin/Origin'
import Characteristics from './pages/Characteristics/Characteristics'
import Stories from './pages/Stories/Stories'
import Instruments from './pages/Instruments/Instruments'
import Lyrics from './pages/Lyrics/Lyrics'
import Experience from './pages/Experience/Experience'

function AppContent() {
  const location = useLocation()
  const audioRef = useRef(null)
  const saveTimeIntervalRef = useRef(null)
  const audioUnlockedRef = useRef(false)
  const isHomePage = location.pathname === '/'

  // Initialize audio element immediately with aggressive preloading
  if (!audioRef.current) {
    audioRef.current = new Audio('https://res.cloudinary.com/dghawsj8e/video/upload/v1763891276/t%C6%B0_li%E1%BB%87u_trang_ch%E1%BB%A7_sxphue.mp3')
    audioRef.current.volume = 0.5 // Giảm 1 nửa âm lượng
    audioRef.current.loop = true
    audioRef.current.preload = 'auto'
    // Force start loading immediately
    audioRef.current.load()
    
    // Log audio loading progress
    audioRef.current.addEventListener('loadstart', () => {
      console.log('[Audio] Load started')
    })
    audioRef.current.addEventListener('loadeddata', () => {
      console.log('[Audio] Data loaded, readyState:', audioRef.current.readyState)
    })
    audioRef.current.addEventListener('canplay', () => {
      console.log('[Audio] Can play, readyState:', audioRef.current.readyState)
    })
    audioRef.current.addEventListener('canplaythrough', () => {
      console.log('[Audio] Can play through, readyState:', audioRef.current.readyState)
    })
  }

  // Unlock audio on first user interaction (required for autoplay on HTTPS)
  useEffect(() => {
    const unlockAudio = async () => {
      if (!audioUnlockedRef.current && audioRef.current) {
        try {
          console.log('[Audio] Attempting to unlock audio context')
          // Try to play and immediately pause to unlock audio context
          await audioRef.current.play()
          audioRef.current.pause()
          audioRef.current.currentTime = 0
          audioUnlockedRef.current = true
          console.log('[Audio] Audio context unlocked successfully')
          
          // If on home page, play again immediately
          if (location.pathname === '/') {
            const savedTime = localStorage.getItem('homeAudioTime')
            if (savedTime) {
              audioRef.current.currentTime = parseFloat(savedTime)
            } else {
              audioRef.current.currentTime = 0
            }
            try {
              await audioRef.current.play()
              console.log('[Audio] Audio playing after unlock')
            } catch (err) {
              console.log('[Audio] Failed to play after unlock:', err)
            }
          }
        } catch (error) {
          console.log('[Audio] Unlock failed, will retry on next interaction:', error)
        }
      }
    }

    // Listen for any user interaction
    const events = ['click', 'touchstart', 'keydown', 'scroll']
    const handlers = events.map(event => {
      const handler = () => {
        unlockAudio()
        // Remove listeners after first successful unlock
        events.forEach(e => {
          document.removeEventListener(e, handlers[events.indexOf(e)])
        })
      }
      document.addEventListener(event, handler, { once: true, passive: true })
      return handler
    })

    // Also try on page visibility change (when user switches back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden && location.pathname === '/' && audioUnlockedRef.current) {
        const audio = audioRef.current
        if (audio && audio.paused) {
          audio.play().catch(() => {})
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      events.forEach((event, index) => {
        document.removeEventListener(event, handlers[index])
      })
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [location.pathname])

  // Play audio on initial mount if on home page
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Check if we're on home page on initial load
    if (location.pathname === '/') {
      const savedTime = localStorage.getItem('homeAudioTime')
      
      const playAudio = async () => {
        if (savedTime) {
          audio.currentTime = parseFloat(savedTime)
        } else {
          audio.currentTime = 0
        }
        
        try {
          console.log('[Audio] Attempting to play, readyState:', audio.readyState, 'unlocked:', audioUnlockedRef.current)
          await audio.play()
          console.log('[Audio] Playing successfully')
        } catch (error) {
          console.log('[Audio] Play blocked:', error.message)
          // Audio blocked - will be unlocked on user interaction
        }
      }

      // Try to play with multiple strategies
      const tryPlay = () => {
        console.log('[Audio] Try play, readyState:', audio.readyState, 'paused:', audio.paused)
        if (audio.readyState >= 2) {
          if (audio.paused) {
            // Try to play even if not unlocked (some browsers allow it)
            playAudio()
          } else {
            console.log('[Audio] Already playing')
          }
        } else {
          console.log('[Audio] Waiting for audio to be ready')
          const handleReady = () => {
            console.log('[Audio] Audio ready, attempting to play')
            playAudio()
          }
          
          audio.addEventListener('canplay', handleReady, { once: true })
          audio.addEventListener('canplaythrough', handleReady, { once: true })
          audio.addEventListener('loadeddata', handleReady, { once: true })
        }
      }

      // Try immediately
      tryPlay()

      // Retry with shorter delays for faster response
      const timeouts = [
        setTimeout(() => {
          if (audio.paused && audio.readyState >= 2) {
            console.log('[Audio] Retry 1 (100ms)')
            playAudio()
          }
        }, 100),
        setTimeout(() => {
          if (audio.paused && audio.readyState >= 2) {
            console.log('[Audio] Retry 2 (300ms)')
            playAudio()
          }
        }, 300),
        setTimeout(() => {
          if (audio.paused && audio.readyState >= 2) {
            console.log('[Audio] Retry 3 (600ms)')
            playAudio()
          }
        }, 600),
        setTimeout(() => {
          if (audio.paused && audio.readyState >= 2) {
            console.log('[Audio] Retry 4 (1000ms)')
            playAudio()
          }
        }, 1000)
      ]

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout))
      }
    }
  }, [location.pathname]) // Run when pathname changes

  // Play audio when navigating to home page
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isHomePage) return

    const savedTime = localStorage.getItem('homeAudioTime')
    
    const playAudio = async () => {
      if (savedTime) {
        audio.currentTime = parseFloat(savedTime)
      } else {
        audio.currentTime = 0
      }
      
      try {
        console.log('[Audio] Navigate to home - attempting to play')
        await audio.play()
        console.log('[Audio] Navigate to home - playing successfully')
      } catch (error) {
        console.log('[Audio] Navigate to home - play blocked:', error.message)
      }
    }

    // Try to play regardless of unlock status (will be handled by browser)
    if (audio.readyState >= 2 && audio.paused) {
      playAudio()
    } else {
      const handleCanPlay = () => {
        if (audio.paused) {
          playAudio()
        }
      }
      audio.addEventListener('canplay', handleCanPlay, { once: true })
    }
  }, [isHomePage])

  // Handle audio playback based on current page
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isHomePage) {
      // On home page - ensure audio is playing and save time periodically
      if (!saveTimeIntervalRef.current) {
        saveTimeIntervalRef.current = setInterval(() => {
          if (audio && !audio.paused) {
            localStorage.setItem('homeAudioTime', audio.currentTime.toString())
          }
        }, 1000)
      }
    } else {
      // Not on home page - pause audio and save position
      if (!audio.paused) {
        localStorage.setItem('homeAudioTime', audio.currentTime.toString())
        audio.pause()
      }
      
      // Clear save interval when not on home page
      if (saveTimeIntervalRef.current) {
        clearInterval(saveTimeIntervalRef.current)
        saveTimeIntervalRef.current = null
      }
    }

    // Cleanup
    return () => {
      if (saveTimeIntervalRef.current) {
        clearInterval(saveTimeIntervalRef.current)
        saveTimeIntervalRef.current = null
      }
    }
  }, [isHomePage])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        if (!audioRef.current.paused) {
          localStorage.setItem('homeAudioTime', audioRef.current.currentTime.toString())
        }
      }
    }
  }, [])

  return (
    <AudioContext.Provider value={audioRef.current}>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nguon-goc" element={<Origin />} />
            <Route path="/dac-trung" element={<Characteristics />} />
            <Route path="/truyen" element={<Stories />} />
            <Route path="/nhac-cu" element={<Instruments />} />
            <Route path="/loi-hat" element={<Lyrics />} />
            <Route path="/trai-nghiem" element={<Experience />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AudioContext.Provider>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App

