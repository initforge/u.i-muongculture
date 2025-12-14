import { useEffect, useRef, useState } from 'react'
import './HoiDum.css'

const HoiDum = () => {
  const audioRef = useRef(null)
  const [volume, setVolume] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0
      audio.muted = true
      audio.loop = true
      
      // Try to play audio (muted by default)
      const playAudio = async () => {
        try {
          await audio.play()
        } catch (error) {
          console.log('Audio autoplay blocked')
        }
      }

      if (audio.readyState >= 2) {
        playAudio()
      } else {
        audio.addEventListener('canplay', playAudio, { once: true })
      }
    }
  }, [])

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      audioRef.current.muted = newVolume === 0
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Unmute - restore previous volume or set to 0.5
        const newVolume = volume > 0 ? volume : 0.5
        audioRef.current.volume = newVolume
        audioRef.current.muted = false
        setVolume(newVolume)
        setIsMuted(false)
      } else {
        // Mute
        audioRef.current.muted = true
        setIsMuted(true)
      }
    }
  }

  return (
    <div className="hoidum-page">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/dghawsj8e/video/upload/v1764466899/Nh%E1%BA%A1c_S%C3%81O_b%C3%A0i_h%C3%A1t_mp3cut.net_zlv1gi.m4a"
        preload="auto"
      />

      <section className="section content-section">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">💬</div>
            <h2 className="section-title">Hỏi đúm</h2>
          </div>

          <div className="hoidum-intro">
            <p>
              Hỏi đúm là một phần quan trọng trong văn hóa Hát Đúm, nơi mọi người có thể đặt câu hỏi và tìm hiểu sâu hơn về truyền thống, lịch sử và ý nghĩa của loại hình nghệ thuật này.
            </p>
            <p>
              Thông qua phần hỏi đúm, chúng ta có thể khám phá những câu chuyện, bài học và giá trị văn hóa được truyền từ đời này sang đời khác trong cộng đồng người Mường.
            </p>
          </div>

          <div className="hoidum-embed">
            <div className="canva-embed-wrapper">
              <iframe
                loading="lazy"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  border: 'none',
                  padding: 0,
                  margin: 0
                }}
                src="https://www.canva.com/design/DAG7fOxjcK4/_uQsCrbyIttNsMO1ypmdwA/view?embed"
                allowFullScreen="allowfullscreen"
                allow="fullscreen"
                title="Hỏi đúm - Khám phá Hát Đúm"
              ></iframe>
            </div>
            <a
              href="https://www.canva.com/design/DAG7fOxjcK4/_uQsCrbyIttNsMO1ypmdwA/view?utm_content=DAG7fOxjcK4&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener"
              className="canva-link"
            >
              Bản sao của Quiz Game "Tìm hiểu Hát đúm người Mường" - Thiết kế & Lập trình Web Full-stack
            </a>
            <div className="audio-controls">
              <button 
                className="audio-toggle-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
              >
                {isMuted ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.62 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.03C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="currentColor"/>
                  </svg>
                )}
              </button>
              <div className="volume-control">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  aria-label="Điều chỉnh âm lượng"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HoiDum
