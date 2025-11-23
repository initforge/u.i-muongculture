import './Origin.css'

const Origin = () => {
  return (
    <div className="origin-page">
      <section className="section hero-section">
        <div className="container">
          <h1 className="page-title">Nguồn gốc</h1>
        </div>
      </section>

      {/* Section 1: Giới thiệu chung */}
      <section className="section content-section">
        <div className="container">
          <div className="content-intro">
            <h2 className="section-title">Giới thiệu chung</h2>
            <div className="intro-content">
              <p>
                Hát Đúp nhiều nơi gọi là hát Đúm là loại hình của Dân ca Mường do nhân dân lao động sáng tạo ra, tự diễn xướng để phục vụ đời sống tinh thần của mình. Hát Đúp ở đây là hát đối đáp nam-nữ tìm hiểu giao duyên với nhau hoặc nữ giới, nam giới hát đối đáp với nhau để mua vui; chủ yếu hát trong nhà, song nhiều nơi hát lúc đi lao động, sản xuất, ngoài đồng, ngoài bãi, có thể hát từ đồi này sang đồi kia, từ bờ suối bên này sang bờ suối bên kia, hay trên mái nhà xuống dưới sân...
              </p>
              <p>
                Đặc điểm của hát Đúp là hát theo khổ thơ trên 6, dưới 8, khá giống với thể thơ lục bát của tiếng Việt có giai điệu, có nhịp điệu, có tiết tấu... dễ học, dễ thuộc và dễ đặt lời mới.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Đặc trưng diễn xướng */}
      <section className="section content-section decorative-pattern">
        <div className="container">
          <h2 className="section-title">Đặc trưng diễn xướng</h2>
          <div className="content-grid">
            <div className="content-text">
              <p>
                Việc trình diễn hát dân ca Mường nghe bên ngoài thấy đơn giản vậy song bên trong ẩn chứa những kỹ năng và bí quyết và đặc biệt là vốn sống, vốn am hiểu cuộc sống của người hát rất sâu, rất rộng về các vấn đề của văn hóa, đời sống mới có thể diễn xướng nhuần nhuyễn và truyền cảm đến người nghe.
              </p>
            </div>
            <div className="content-image">
              <img 
                src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763870148/nguongoc_txh55m.png" 
                alt="Đặc trưng diễn xướng" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Tri thức về ngôn ngữ Mường */}
      <section className="section content-section">
        <div className="container">
          <h2 className="section-title">Tri thức về ngôn ngữ Mường</h2>
          <div className="content-grid reverse">
            <div className="content-text">
              <p>
                Hát Đúp (hát Đúm) ngoài các bài hát có sẵn (các bài Thường Áng) được lưu truyền trong dân gian còn lại đa việc hát luôn phải ứng tác - ứng khẩu - sáng tạo lời hát (ca từ) hát tức khắc một cách nhuần nhuyễn sao cho kịp khớp với lối giai điệu, nhịp điệu có sẵn để đối đáp tại chỗ. Nghệ nhân hát phải sưu tầm, học hỏi và lưu giữ một khối lượng lớn ngôn ngữ Mường bao gồm cả tiếng Mường cổ và tiếng Mường đương đại. Bản chất của lối hát Đúp thực chất là cuộc là thơ tức thì để đối đáp lại với bạn hát. Như vậy nghệ nhân nắm và lưu giữ rất nhiều tri thức về ngôn ngữ Mường.
              </p>
            </div>
            <div className="content-image">
              <img 
                src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763870147/nguongoc2_itkogq.jpg" 
                alt="Tri thức về ngôn ngữ Mường" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Origin

