import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, width: '100%', backgroundColor: 'white' }}>
      {/* Top Banner */}
      <div className="header-top">
        <div className="header-top-container container">
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <div className="logo-wrapper">
                <div className="logo-icon-wrapper">
                  <svg className="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Cột chống nhà sàn */}
                    <line x1="8" y1="32" x2="8" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="32" y1="32" x2="32" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="20" y1="32" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    
                    {/* Sàn nhà */}
                    <rect x="6" y="20" width="28" height="3" fill="currentColor" opacity="0.3"/>
                    
                    {/* Mái nhà */}
                    <path d="M4 20 L20 8 L36 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    
                    {/* Cửa */}
                    <rect x="16" y="23" width="8" height="9" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1"/>
                    
                    {/* Hoa văn trang trí trên mái */}
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    <circle cx="28" cy="16" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <div className="logo-text-wrapper">
                  <div className="logo-line-top">
                    GIỮ HỒN <span className="logo-highlight">HÁT ĐÚM</span>
                  </div>
                  <div className="logo-line-bottom">
                    <span className="logo-main">TRONG KỶ NGUYÊN</span>
                    <span className="logo-accent">SỐ</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* ============================================
              HIDDEN SECTION - BANNER IMAGES
              ============================================
              Đã ẩn: 3 banner images ở header (banner1, banner2, banner3)
              Để hiện lại: Xóa style={{ display: 'none' }} ở dòng 66
              ============================================ */}
          <div className="header-banner-images" style={{ display: 'none' }}>
            <div className="banner-image-wrapper">
              <img 
                src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763866039/banner1_bcxmmx.jpg" 
                alt="Banner 1" 
                className="banner-image banner-1"
              />
              </div>
            <div className="banner-image-wrapper">
              <img 
                src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763866038/banner2_ejwy17.jpg" 
                alt="Banner 2" 
                className="banner-image banner-2"
              />
              </div>
            <div className="banner-image-wrapper">
              <img 
                src="https://res.cloudinary.com/dghawsj8e/image/upload/v1763866038/banner3_khnq5d.jpg" 
                alt="Banner 3" 
                className="banner-image banner-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="header-nav">
        <div className="header-nav-container container">
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li>
                <Link 
                  to="/" 
                  className={isActive('/') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  TRANG CHỦ
                </Link>
              </li>
              <li>
                <Link 
                  to="/nguon-goc" 
                  className={isActive('/nguon-goc') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  NGUỒN GỐC
                </Link>
              </li>
              <li>
                <Link 
                  to="/dac-trung" 
                  className={isActive('/dac-trung') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ĐẶC TRƯNG
                </Link>
              </li>
              <li>
                <Link 
                  to="/truyen" 
                  className={isActive('/truyen') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  TRUYỆN
                </Link>
              </li>
              <li>
                <Link 
                  to="/nhac-cu" 
                  className={isActive('/nhac-cu') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  NHẠC CỤ
                </Link>
              </li>
              <li>
                <Link 
                  to="/loi-hat" 
                  className={isActive('/loi-hat') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  LỜI HÁT
                </Link>
              </li>
              <li>
                <Link 
                  to="/trai-nghiem" 
                  className={isActive('/trai-nghiem') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  BẢO TÀNG ẢO
                </Link>
              </li>
            </ul>
          </nav>

          <button className="search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

