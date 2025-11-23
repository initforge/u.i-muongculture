import './Experience.css'

const Experience = () => {
  return (
    <div className="experience-page">
      <section className="section hero-section">
        <div className="container">
          <h1 className="page-title">Bảo tàng ảo</h1>
          <p className="hero-subtitle">
            Khám phá không gian văn hóa Mường qua trải nghiệm thực tế ảo
          </p>
        </div>
      </section>

      <section className="section content-section">
        <div className="container">
          <div className="experience-intro">
            <h2>Trải nghiệm bảo tàng ảo</h2>
            <p>
              Trải nghiệm độc đáo với không gian bảo tàng ảo, nơi bạn có thể tham quan và khám phá các hiện vật, kiến trúc và văn hóa Mường một cách sống động và chân thực nhất. Sử dụng công nghệ thực tế ảo, chúng tôi mang đến cho bạn cơ hội được đắm chìm trong không gian văn hóa Mường, dù bạn đang ở bất kỳ đâu trên thế giới.
            </p>
          </div>

          <div className="experience-embed">
            <div className="embed-container">
              <iframe
                src="https://www.artsteps.com/embed/690ea005946eb56bb0553f5a/560/315"
                title="Bảo tàng ảo Văn hóa Mường"
                className="experience-iframe"
                allow="fullscreen"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="experience-features">
            <h3>Tính năng trải nghiệm</h3>
            <ul className="features-list">
              <li>Tham quan không gian bảo tàng ảo chân thực</li>
              <li>Xem các hiện vật văn hóa từ nhiều góc độ</li>
              <li>Tìm hiểu về kiến trúc nhà sàn Mường</li>
              <li>Khám phá các hoạt động văn hóa truyền thống</li>
              <li>Tương tác với các yếu tố trong không gian ảo</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Experience

