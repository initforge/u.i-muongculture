import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GIỮ HỒN HÁT ĐÚM</h3>
            <h3>TRONG KỶ NGUYÊN SỐ</h3>
            <div className="contact-info">
              <p><strong>Địa chỉ:</strong> Xóm Trăng Tà - Xã Toàn Thắng - Tỉnh Phú Thọ</p>
              <p><strong>Điện thoại:</strong> 0394134227</p>
              <p><strong>Email:</strong> dinhcongda131@gmail.com</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Đăng ký nhận thông tin</h4>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">Đăng ký</button>
            </form>
            <div className="social-links">
              <h4>Kết nối với chúng tôi:</h4>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="YouTube">YT</a>
                <a href="#" aria-label="Instagram">IG</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2024 Muong.vn. All right reserved.</p>
          <p>Web Design: VCSS.VN</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

