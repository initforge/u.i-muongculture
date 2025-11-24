import { useEffect, useRef } from 'react'
import { useAudio } from '../../contexts/AudioContext'
import Carousel from '../../components/Carousel/Carousel'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import { newsData } from '../../data/news'
import './Home.css'

const Home = () => {
  const audio = useAudio()
  const youtubePlayerRef = useRef(null)
  const resumeTimeoutRef = useRef(null)

  useEffect(() => {
    // Initialize YouTube IFrame API
    const initYouTubePlayer = () => {
      if (window.YT && window.YT.Player) {
        youtubePlayerRef.current = new window.YT.Player('youtube-player', {
          videoId: '6Lpem8amhxk',
          width: 560,
          height: 315,
          playerVars: {
            'playsinline': 1,
            'rel': 0,
            'modestbranding': 1
          },
          events: {
            onReady: (event) => {
              console.log('YouTube player ready')
            },
            onStateChange: (event) => {
              if (audio && audio instanceof HTMLAudioElement) {
                // State: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
                if (event.data === 1) {
                  // Video is playing - pause audio
                  audio.pause()
                  // Clear any existing resume timeout
                  if (resumeTimeoutRef.current) {
                    clearTimeout(resumeTimeoutRef.current)
                    resumeTimeoutRef.current = null
                  }
                } else if (event.data === 2 || event.data === 0) {
                  // Video is paused or ended - resume audio after 3s
                  if (resumeTimeoutRef.current) {
                    clearTimeout(resumeTimeoutRef.current)
                  }
                  resumeTimeoutRef.current = setTimeout(() => {
                    if (audio) {
                      audio.play().catch(err => {
                        console.log('Could not resume audio:', err)
                      })
                    }
                  }, 3000) // 3 seconds delay
                }
              }
            }
          }
        })
      } else {
        // If YT is not ready, wait for it
        setTimeout(initYouTubePlayer, 100)
      }
    }

    // Wait for YouTube IFrame API to load
    if (window.YT && window.YT.Player) {
      // API already loaded
      initYouTubePlayer()
    } else if (window.YT && window.YT.ready) {
      // API is loading, wait for it
      window.YT.ready(initYouTubePlayer)
    } else {
      // API not loaded yet, set callback
      window.onYouTubeIframeAPIReady = () => {
        initYouTubePlayer()
      }
    }

    // Cleanup function
    return () => {
      // Clear timeout
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
      // Destroy YouTube player
      if (youtubePlayerRef.current) {
        try {
          youtubePlayerRef.current.destroy()
        } catch (e) {
          console.log('Error destroying YouTube player:', e)
        }
      }
    }
  }, [audio])
  const carouselImages = [
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968048/anhchaytrangchu1_egcyqw.jpg',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968050/anhchaytrangchu2_imb6jc.png',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968053/anhchaytrangchu3_pdr3rw.png',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968051/anhchaytrangchu4_l98w48.png',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968044/anhchaytrangchu5_msen7w.png',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968043/anhchaytrangchu6_qwsxnx.png',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968044/anhchaytrangchu7_h3huzx.png',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968043/anhchaytrangchu8_xdp4gm.png',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968046/anhchaytrangchu9_iwkvfi.jpg',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763968047/anhchaytrangchu10_rwdext.jpg'
  ]

  const researchNews = newsData.filter(news => news.category === 'research')
  const regularNews = newsData.filter(news => news.category === 'news')
  const pressNews = newsData.filter(news => news.category === 'press')

  return (
    <div className="home">
      {/* Hero Section with Video and Carousel */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-media-grid">
          <div className="carousel-section">
            <Carousel images={carouselImages} autoPlayInterval={5000} />
            </div>
            <div className="video-section">
              <div className="video-wrapper">
                <div id="youtube-player"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Below carousel */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            <ServiceCard
              title="Tham quan bảo tàng online"
              image="https://res.cloudinary.com/dghawsj8e/image/upload/v1763866477/baotangmuong_lednhr.webp"
              link="/trai-nghiem"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              }
            />
            <ServiceCard
              title="Đọc truyện bảo tàng Mường"
              image="https://res.cloudinary.com/dghawsj8e/image/upload/v1763866478/truyengiandan_wcn8uo.png"
              link="/truyen"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6C4 5 5 4 6 4H18C19 4 20 5 20 6V18C20 19 19 20 18 20H6C5 20 4 19 4 18V6Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              }
            />
            <ServiceCard
              title="Nghe nhạc bảo tàng Mường"
              image="https://res.cloudinary.com/dghawsj8e/image/upload/v1763866477/nhacmuong_zj6qyq.jpg"
              link="/nhac-cu"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              }
            />
          </div>
        </div>
      </section>


      {/* News Section - 3 Columns */}
      <section id="tin-tuc" className="section news-section">
        <div className="container">
          <div className="news-columns">
            {/* Column 1: Nghiên cứu */}
            <div className="news-column">
              <h3 className="news-column-title">NGHIÊN CỨU</h3>
              <div className="news-column-list">
                {researchNews.map(news => (
                  <a 
                    key={news.id} 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="news-item-link"
                  >
                    <div className="news-item">
                      <div className="news-item-image">
                        <img src={news.image} alt={news.title} />
                      </div>
                      <div className="news-item-content">
                        <h4 className="news-item-title">{news.title}</h4>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Tin tức & Sự kiện */}
            <div className="news-column">
              <h3 className="news-column-title">TIN TỨC & SỰ KIỆN</h3>
              <div className="news-column-list">
                {regularNews.map(news => (
                  <a 
                    key={news.id} 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="news-item-link"
                  >
                    <div className="news-item">
                      <div className="news-item-image">
                        <img src={news.image} alt={news.title} />
                      </div>
                      <div className="news-item-content">
                        <h4 className="news-item-title">{news.title}</h4>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Báo chí viết về Mường */}
            <div className="news-column">
              <h3 className="news-column-title">BÁO CHÍ VIẾT VỀ MƯỜNG</h3>
              <div className="news-column-list">
                {pressNews.map(news => (
                  <a 
                    key={news.id} 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="news-item-link"
                  >
                    <div className="news-item">
                      <div className="news-item-image">
                        <img src={news.image} alt={news.title} />
                      </div>
                      <div className="news-item-content">
                        <h4 className="news-item-title">{news.title}</h4>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

