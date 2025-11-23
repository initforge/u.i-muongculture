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
    <header className="header">
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
                  <div className="logo-line-top">GIỮ HỒN HÁT ĐÚM</div>
                  <div className="logo-line-bottom">
                    <span className="logo-main">TRONG KỶ NGUYÊN</span>
                    <span className="logo-accent">SỐ</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="header-top-right">
            <div className="cultural-illustrations">
              {/* Nguồn gốc - Cây/rễ */}
              <div className="illustration-item" title="Nguồn gốc">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V8M12 8C10 8 8 10 8 12C8 14 10 16 12 16C14 16 16 14 16 12C16 10 14 8 12 8Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M8 12L4 16M16 12L20 16" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 16V22" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              {/* Đặc trưng - Cồng chiêng */}
              <div className="illustration-item" title="Đặc trưng">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 4V2M12 22V20" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              {/* Truyện - Sách */}
              <div className="illustration-item" title="Truyện">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6C4 5 5 4 6 4H18C19 4 20 5 20 6V18C20 19 19 20 18 20H6C5 20 4 19 4 18V6Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="8" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="8" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              {/* Nhạc cụ - Sáo */}
              <div className="illustration-item" title="Nhạc cụ">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="8" y1="4" x2="8" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="16" r="1.5" fill="currentColor"/>
                  <path d="M8 4L16 8" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              {/* Lời hát - Pattern văn hóa */}
              <div className="illustration-item" title="Lời hát">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
              </div>
              {/* Trải nghiệm - 3D/Cube */}
              <div className="illustration-item" title="Trải nghiệm">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
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
                  TRẢI NGHIỆM
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

