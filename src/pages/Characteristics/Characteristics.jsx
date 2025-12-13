import './Characteristics.css'

const Characteristics = () => {
  return (
    <div className="characteristics-page">
      {/* Section 1: Đặc trưng âm nhạc */}
      <section className="section music-characteristics">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">🎵</div>
            <h2 className="section-title">Đặc trưng âm nhạc</h2>
          </div>
          
          <div className="content-layout">
            <div className="content-text">
              <p>
                Có hai loại: hát có giai điệu và nhịp phách và hát chỉ có giai điệu và không có nhịp phách. Nhạc cụ chủ yếu là sáo ôi (sáo có 4 lỗ) và đàn nhị.
              </p>
            </div>
            
            <div className="instruments-preview">
              <div className="instrument-item">
                <img 
                  src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763871160/saooi_qlchya.jpg" 
                  alt="Sáo ôi" 
                />
                <p className="instrument-caption">Sáo ôi</p>
              </div>
              <div className="instrument-item">
                <img 
                  src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763871091/dannhi_pmkrri.jpg" 
                  alt="Đàn nhị" 
                />
                <p className="instrument-caption">Đàn nhị</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Kỹ năng tạo lời hát */}
      <section className="section lyrics-skill decorative-pattern">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">✍️</div>
            <h2 className="section-title">Kỹ năng tạo lời hát</h2>
          </div>

          <div className="content-layout reverse">
            <div className="content-text">
              <p>
                Lời hát Đúp (hát Đúm) đa phần không có sẵn, đều do nghệ nhân trong khi hát tức khắc sáng tạo ra để đối đáp với bạn hát. Đây là kỹ năng quan trọng nhất trong khi hát. Nó đòi hỏi trí thông minh, vốn liếng về tiếng nói, nhất là tiếng Mường cổ, sự sáng tạo đột xuất. Có một số nghệ nhân có thể hát Đúp liên tục trong hơn 10 tiếng đồng hồ mà không cạn lời, không cạn khả năng tạo lời hát như: Bùi Văn Lịch, Bùi Văn Nghi, Bùi Thị Lan, Đinh Thị Hiền...
              </p>
              <p>
                Trong việc đặt lời hát, quan trong nhất là việc đặt lời và gieo vần câu trên xuống câu dưới sao cho hợp lí, có thế lời hát mới nhuần nhuyễn, không lạc điệu, không bị ngắt quãng, thuyết phục người nghe.
              </p>
            </div>
            
            <div className="artisan-image">
              <img 
                src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763871165/dactrung1_csrcdo.jpg" 
                alt="Nghệ nhân Bùi Văn Lịch và Đinh Thị Hiền" 
              />
              <p className="image-caption">Nghệ nhân Bùi Văn Lịch và Đinh Thị Hiền</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vai trò của điệu hát Đúm */}
      <section className="section hat-dum-role">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">🎭</div>
            <h2 className="section-title">Vai trò của điệu hát Đúm</h2>
          </div>

          <div className="role-content">
            <div className="role-text">
              <p>
                Hát Đúm (hát Đúp) thường cuốn hút hàng nghìn người nghe tại chỗ, đi sâu vào tiềm thức của mỗi thế hệ. Bởi hát Đúp giúp giáo dục tình yêu quê hương đất nước, trân trọng giá trị nghệ thuật của con người ở mỗi vùng quê; hỗ trợ các thao tác lao động, làm bớt đi sự căng thẳng, mệt mỏi trong quá trình lao động, con người thêm hưng phấn, lao động được năng xuất đạt kết quả cao hơn; tạo nếp sống sinh hoạt văn hóa cộng đồng; ta thêm yêu cái đẹp, có tính thẩm mĩ cao.
              </p>
            </div>
            
            <div className="role-image">
              <img 
                src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763871162/dactrung2_ubrfcg.jpg" 
                alt="Vai trò của điệu hát Đúm" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Characteristics

