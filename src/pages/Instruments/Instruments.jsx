import './Instruments.css'

const Instruments = () => {
  return (
    <div className="instruments-page">
      <section className="section hero-section">
        <div className="container">
          <h1 className="page-title">Nhạc cụ truyền thống Mường</h1>
        </div>
      </section>

      {/* Sáo Ôi Section */}
      <section className="section instrument-section">
        <div className="container">
          <div className="instrument-header">
            <div className="instrument-icon">🎵</div>
            <h2 className="instrument-title">Sáo Ôi</h2>
          </div>

          <div className="instrument-content">
            <div className="instrument-description">
              <p>
                Sáo Ôi (hay còn gọi là "Kháo Ôi", ống Ôi) là một loại sáo dọc có 4 lỗ, 2 lỗ có khoảng cách thưa, 2 lỗ cách nhau dày hơn được tạo nên từ một ống nứa tép.
              </p>
              <p>
                Để làm một cây sáo Ôi, phải công phu, tỉ mỉ ngay từ lúc chọn cây nứa như ý.
              </p>
              <p>
                Đặc trưng của sáo ôi là 4 lỗ, nhưng lại có 5 hàng âm là: đồ, mi, pha, son, si. Cũng có người gọi đó là 5 cao độ: nốt Hò, nốt Sự, nốt Sang, nốt Xê, nốt Cống. Sáo Ôi không thổi ra âm thật của cây sáo mà sử dụng hệ thống bồi âm. Lỗ chính giữa được khoan phía dưới ống (dùng ngón cái để bấm), 3 lỗ còn lại nằm phía trên ống, 1 lỗ để thông hơi ở trên đốt.
              </p>
            </div>

            <div className="instrument-diagram">
              <div className="diagram-container">
                <div className="diagram">
                  <div className="diagram-flute">
                    <div className="flute-body"></div>
                    <div className="flute-hole hole-1" title="Đầu dùng để thổi"></div>
                    <div className="flute-hole hole-2"></div>
                    <div className="flute-hole hole-3"></div>
                    <div className="flute-hole hole-4" title="Lỗ bịt ngón cái"></div>
                    <div className="flute-hole hole-5" title="Lỗ bịt ngón út"></div>
                    <div className="flute-joint" title="Đốt"></div>
                    <div className="flute-cover" title="Lá chuối (băng dính) bịt"></div>
                  </div>
                  <div className="diagram-labels">
                    <div className="label label-top">Đầu dùng để thổi</div>
                    <div className="label label-length-top">7 cm</div>
                    <div className="label label-length-side">70 cm</div>
                    <div className="label label-joint">Đốt</div>
                    <div className="label label-cover">Lá chuối (băng dính) bịt</div>
                    <div className="label label-thumb">Lỗ bịt ngón cái</div>
                    <div className="label label-pinky">Lỗ bịt ngón út</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="instrument-media">
              <div className="instrument-image">
                <img 
                  src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763872022/nhaccu1_yakrwk.jpg" 
                  alt="Sáo Ôi" 
                />
              </div>
              <div className="instrument-video">
                <video controls className="video-player">
                  <source src="https://res.cloudinary.com/dghawsj8e/video/upload/v1763871945/nhaccu1_tqkcth.mp4" type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
                <p className="video-caption">Tiếng sáo gọi bạn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Đàn nhị Section */}
      <section className="section instrument-section decorative-pattern">
        <div className="container">
          <div className="instrument-header">
            <div className="instrument-icon">🎻</div>
            <h2 className="instrument-title">Đàn nhị</h2>
          </div>

          <div className="instrument-content">
            <div className="instrument-description">
              <p>
                Đàn nhị ( đàn cò) Việt Nam là nhạc cụ thuộc bộ dây có cung vĩ, do đàn có 2 dây nên gọi là đàn nhị (二). Đàn xuất hiện ở Việt Nam khoảng thế kỷ 10. Ngoài người Kinh, nhiều người dân tộc thiểu số Việt Nam cũng sử dụng rộng rãi nhạc cụ này (Tày, Nùng, Thái, Mường, Dao, Giấy, H'Mông v.v.).
              </p>
              <p>
                Một cây đàn nhị của người Mường (còn gọi là cò ke)
              </p>
              <p>
                Loại đàn nhị thông dụng hiện nay có những bộ phận chính như sau:
              </p>
              
              <div className="parts-list">
                <ol>
                  <li>
                    <strong>Bát nhị</strong> (còn gọi là ống nhị): là bộ phận tăng âm (bầu vang) rỗng ruột, hình hoa muống, làm bằng gỗ cứng. Bát nhị có 2 đầu, đầu này bịt da rắn hay kỳ đà; còn đầu kia xòe ra không bịt gì cả. Ngựa đàn nằm ở khoảng giữa mặt da.
                  </li>
                  <li>
                    <strong>Dọc nhị</strong> (còn gọi là cần nhị, cán nhị): dáng thẳng đứng; đầu hơi ngả về phía sau, gốc cắm xuyên qua lưng bát nhị, gần phía mặt da.
                  </li>
                  <li>
                    <strong>Trục dây</strong>: trục trên và trục dưới đều gắn xuyên qua đầu dọc nhị nằm cùng hướng với bát nhị.
                  </li>
                  <li>
                    <strong>Dây nhị</strong>: Trước đây dây đàn được làm bằng sợi tơ se; ngày nay làm bằng nilon hoặc kim loại. Dây kim loại cho âm thanh chuẩn hơn nhưng không ngọt ngào bằng dây tơ hay dây nilon. Dây đàn chỉnh theo quãng 4 đúng, quãng 5 đúng, quãng 7 thứ… nhưng phổ biến nhất là quãng 5 đúng.
                  </li>
                  <li>
                    <strong>Cử nhị</strong> (hay khuyết nhị): là một sợi dây tơ se neo 2 dây đàn vào gần sát dọc nhị, nơi dưới hai trục dây. Có khi cử nhị là một khung áo buộc gần sát dọc nhị, hai dây đàn xỏ qua hai lỗ khung này. Cử nhị là bộ phận để điều chỉnh cao độ âm thanh. Nếu bạn kéo cử nhị xuống, 2 dây đàn sẽ ngắt quãng hơn, tạo ra âm thanh cao hơn. nếu bạn đẩy cử nhị lên khi đàn 2 dây sẽ phát ra âm thanh trầm hơn vì quãng dây dài hơn. Tuy nhiên để lên dây đàn người ta còn vặn trục dây nữa.
                  </li>
                  <li>
                    <strong>Cung vĩ</strong>: làm bằng cành tre, cành lớp hay gỗ có mắc lông đuôi ngựa. Những lông đuôi ngựa nằm giữa hai dây đàn để kéo đẩy, cọ xát vào dây đàn tạo ra âm thanh. Do những lông đuôi ngựa kẹt hai dây đàn nên ta không thể tách rời cung vĩ khỏi thân đàn.
                  </li>
                </ol>
              </div>
            </div>

            <div className="instrument-diagram">
              <div className="dan-nhi-diagram">
                <div className="dan-nhi-parts">
                  <div className="part part-truc-day" title="Trục dây">Trục dây</div>
                  <div className="part part-cung-vi" title="Cung vĩ">Cung vĩ</div>
                  <div className="part part-cu-nhi" title="Cử nhị">Cử nhị</div>
                  <div className="part part-can-nhi" title="Cần nhị">Cần nhị</div>
                  <div className="part part-bat-nhi" title="Bát nhị">Bát nhị</div>
                </div>
              </div>
            </div>

            <div className="instrument-media">
              <div className="instrument-image">
                <img 
                  src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763872067/nhaccu2_zacxvx.jpg" 
                  alt="Đàn nhị" 
                />
              </div>
              <div className="instrument-video">
                <video controls className="video-player">
                  <source src="https://res.cloudinary.com/dghawsj8e/video/upload/v1763871969/nhaccu2_mw2o4w.mp4" type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Instruments

