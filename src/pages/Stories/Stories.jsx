import './Stories.css'

const Stories = () => {
  return (
    <div className="stories-page">
      <section className="section content-section">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">📖</div>
            <h2 className="section-title">Truyện Hát Đúm</h2>
          </div>

          {/* ============================================
              HIDDEN SECTION - Story Intro & Gemini Link
              ============================================
              Đã ẩn: 
              - Phần giới thiệu câu chuyện (story-intro)
              - Canva embed iframe
              - Link liên kết tới Gemini (https://gemini.google.com/share/50adaef67187)
              Để hiện lại: Xóa style={{ display: 'none' }} ở dòng 13 và 19
              ============================================ */}
          <div className="story-intro" style={{ display: 'none' }}>
            <p>
              Đắm chìm trong những câu chuyện cổ tích và truyền thuyết của người Mường, nơi mỗi câu chuyện đều mang trong mình những bài học sâu sắc về cuộc sống, tình yêu, và giá trị nhân văn. Những câu chuyện này được truyền từ đời này sang đời khác, góp phần bảo tồn và phát huy giá trị văn hóa truyền thống của dân tộc Mường.
            </p>
          </div>

          <div className="stories-embed" style={{ display: 'none' }}>
            <div className="canva-embed-wrapper">
              <iframe
                loading="lazy"
                src="https://www.canva.com/design/DAG5l5l2Hxo/wyU-b8dlbyNHVuV3D3t-zg/view?embed"
                title="Canva Design - Truyện Hát Đúm"
                className="canva-iframe"
                allowFullScreen
                allow="fullscreen"
              ></iframe>
            </div>
            <div className="stories-actions">
              <a
                href="https://gemini.google.com/share/50adaef67187"
                target="_blank"
                rel="noopener noreferrer"
                className="gemini-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 13V19A2 2 0 0 1 16 21H5A2 2 0 0 1 3 19V8A2 2 0 0 1 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Mở Gemini
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stories
