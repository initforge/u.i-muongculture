import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import './Stories.css'

// Cấu hình PDF.js worker - sử dụng từ public folder
// Worker file đã được copy vào public/pdf.worker.min.mjs (version 5.4.296 từ react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

// PDF URL từ Vercel Blob Storage
const PDF_URL = 'https://erub5hkiytu5lnuq.public.blob.vercel-storage.com/Giai%20%C4%91i%E1%BB%87u%20v%C6%B0%E1%BB%A3t%20thung%20l%C5%A9ng.pdf'

const Stories = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setLoading(false)
    setError(null)
  }

  function onDocumentLoadError(error) {
    console.error('PDF load error:', error)
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack
    })
    setError(`Không thể tải file PDF: ${error?.message || 'Lỗi không xác định'}. Vui lòng kiểm tra lại link hoặc thử lại sau.`)
    setLoading(false)
  }

  function onPageLoadSuccess() {
    setPageLoading(false)
    setError(null)
  }

  function onPageLoadError(error) {
    console.error('Page load error:', error)
    setPageLoading(false)
    setError(`Không thể tải trang ${pageNumber}: ${error?.message || 'Lỗi không xác định'}`)
  }

  function goToPrevPage() {
    if (pageNumber > 1) {
      setPageLoading(true)
      setPageNumber(page => Math.max(1, page - 1))
    }
  }

  function goToNextPage() {
    if (pageNumber < (numPages || 1)) {
      setPageLoading(true)
      setPageNumber(page => Math.min(numPages || 1, page + 1))
    }
  }

  // Sử dụng trực tiếp URL từ Vercel Blob Storage
  // Với file lớn (190MB), dùng trực tiếp URL sẽ tốt hơn blob URL
  useEffect(() => {
    
    if (!PDF_URL) {
      setError('PDF URL chưa được cấu hình. Vui lòng upload file và cập nhật PDF_URL trong Stories.jsx')
      setLoading(false)
      return
    }

    // Test xem URL có accessible không
    async function testUrl() {
      try {
        const testResponse = await fetch(PDF_URL, {
          method: 'HEAD',
          mode: 'cors',
        })
        
        if (!testResponse.ok) {
          throw new Error(`URL không accessible: ${testResponse.status}`)
        }
        
        console.log('PDF URL is accessible:', {
          status: testResponse.status,
          contentType: testResponse.headers.get('content-type'),
          contentLength: testResponse.headers.get('content-length')
        })
        
        // Set URL trực tiếp - react-pdf sẽ tự động fetch
        setPdfUrl(PDF_URL)
      } catch (err) {
        console.error('Error testing PDF URL:', err)
        setError(`Không thể truy cập file PDF: ${err.message}. Vui lòng kiểm tra lại link.`)
        setLoading(false)
      }
    }

    testUrl()
  }, [])

  return (
    <div className="stories-page">
      <section className="section content-section">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">📖</div>
            <h2 className="section-title">Truyện Hát Đúm</h2>
          </div>

          <div className="story-intro">
            <p>
              Đắm chìm trong những câu chuyện cổ tích và truyền thuyết của người Mường, nơi mỗi câu chuyện đều mang trong mình những bài học sâu sắc về cuộc sống, tình yêu, và giá trị nhân văn. Những câu chuyện này được truyền từ đời này sang đời khác, góp phần bảo tồn và phát huy giá trị văn hóa truyền thống của dân tộc Mường.
            </p>
          </div>

          {!pdfUrl ? (
            <div className="pdf-placeholder">
              <p>Đang tải PDF...</p>
            </div>
          ) : (
            <div className="pdf-viewer-container">
              {(loading || pageLoading) && (
                <div className="pdf-loading">
                  <div className="loading-spinner"></div>
                  <p>{loading ? 'Đang tải truyện...' : `Đang tải trang ${pageNumber}...`}</p>
                </div>
              )}

              {error && !pageLoading && (
                <div className="pdf-error">
                  <p>{error}</p>
                </div>
              )}
              
              <div className="pdf-controls">
                <button 
                  onClick={goToPrevPage} 
                  disabled={pageNumber <= 1 || loading}
                  className="pdf-nav-btn pdf-nav-prev"
                  aria-label="Trang trước"
                >
                  ←
                </button>
                
                <span className="pdf-page-info">
                  {numPages ? `Trang ${pageNumber} / ${numPages}` : 'Đang tải...'}
                </span>
                
                <button 
                  onClick={goToNextPage} 
                  disabled={pageNumber >= (numPages || 1) || loading}
                  className="pdf-nav-btn pdf-nav-next"
                  aria-label="Trang sau"
                >
                  →
                </button>
              </div>

              <div className="pdf-document-wrapper">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  options={{
                    cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                    cMapPacked: true,
                    standardFontDataUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
                  }}
                  loading={
                    <div className="pdf-loading">
                      <div className="loading-spinner"></div>
                    </div>
                  }
                >
                  <Page 
                    key={`page-${pageNumber}`}
                    pageNumber={pageNumber} 
                    className="pdf-page"
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    onLoadSuccess={onPageLoadSuccess}
                    onLoadError={onPageLoadError}
                    loading={
                      <div className="pdf-loading">
                        <div className="loading-spinner"></div>
                        <p>Đang tải trang {pageNumber}...</p>
                      </div>
                    }
                    width={Math.min(900, window.innerWidth - 80)}
                  />
                </Document>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Stories
