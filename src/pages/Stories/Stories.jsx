import './Stories.css'

const Stories = () => {
  return (
    <div className="stories-page">
      <section className="section hero-section">
        <div className="container">
          <h1 className="page-title">Truyện Mường</h1>
          <p className="hero-subtitle">
            Khám phá những câu chuyện truyền thống đầy ý nghĩa của dân tộc Mường
          </p>
        </div>
      </section>

      <section className="section content-section">
        <div className="container">
          <div className="story-intro">
            <h2>Truyện Mường</h2>
            <p>
              Khám phá những câu chuyện truyền thống đầy ý nghĩa của dân tộc Mường, nơi mỗi câu chuyện đều mang trong mình những bài học sâu sắc về cuộc sống, tình yêu, và giá trị nhân văn. Những câu chuyện này được truyền từ đời này sang đời khác, góp phần bảo tồn và phát huy giá trị văn hóa truyền thống của dân tộc Mường.
            </p>
          </div>

          <div className="story-embed">
            <div className="embed-container">
              <iframe
                src="https://gemini.google.com/share/f9e9248c32de"
                title="Gemini Storybook - Truyện Mường"
                className="story-iframe"
                allow="fullscreen"
                allowFullScreen
              ></iframe>
            </div>
            <div className="embed-fallback">
              <p>Nếu không thể xem trực tiếp, vui lòng truy cập:</p>
              <a 
                href="https://gemini.google.com/share/f9e9248c32de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Mở truyện trên Gemini
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stories

