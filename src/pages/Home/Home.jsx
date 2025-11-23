import Carousel from '../../components/Carousel/Carousel'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import { newsData } from '../../data/news'
import './Home.css'

const Home = () => {
  const carouselImages = [
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763866463/bao1_dh3dg5.jpg',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763866461/bao3_d3blch.jpg',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763866461/bao4_fb7kiv.jpg',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763866462/bao5_rgwx6y.jpg',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763866464/bao6_hptmwj.jpg',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763866467/bao7_ygoll5.jpg',
    'https://res.cloudinary.com/dghawsj8e/image/upload/v1763866465/bao9_j5fo6v.jpg'
  ]

  const researchNews = newsData.filter(news => news.category === 'research')
  const regularNews = newsData.filter(news => news.category === 'news')
  const pressNews = newsData.filter(news => news.category === 'press')

  return (
    <div className="home">
      {/* Hero Section with Profile and Video */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <div className="profile-section">
                <div className="profile-image-wrapper">
                  <img 
                    src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763866463/bao1_dh3dg5.jpg" 
                    alt="Profile" 
                    className="profile-image"
                  />
                </div>
              </div>
            </div>
            <div className="hero-right">
              <div className="video-section">
                <div className="video-wrapper">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/6Lpem8amhxk?si=i7a20FOHzhoBZvPR"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Carousel Section */}
      <section className="hero-carousel-section">
        <div className="container">
          <div className="carousel-section">
            <Carousel images={carouselImages} autoPlayInterval={5000} />
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

