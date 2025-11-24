import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import './Stories.css'

// Cấu hình PDF.js worker - sử dụng từ public folder
// Worker file đã được copy vào public/pdf.worker.min.mjs
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

// PDF URL từ Vercel Blob Storage
const PDF_URL = 'https://erub5hkiytu5lnuq.public.blob.vercel-storage.com/Giai%20%C4%91i%E1%BB%87u%20v%C6%B0%E1%BB%A3t%20thung%20l%C5%A9ng.pdf'

const Stories = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setLoading(false)
    setError(null)
  }

  function onDocumentLoadError(error) {
    console.error('PDF load error:', error)
    setError('Không thể tải file PDF. Vui lòng kiểm tra lại link.')
    setLoading(false)
  }

  function goToPrevPage() {
    setPageNumber(page => Math.max(1, page - 1))
  }

  function goToNextPage() {
    setPageNumber(page => Math.min(numPages || 1, page + 1))
  }

  // Fetch PDF từ Vercel Blob và convert sang blob URL để tránh CORS issues
  useEffect(() => {
    if (!PDF_URL) {
      setError('PDF URL chưa được cấu hình. Vui lòng upload file và cập nhật PDF_URL trong Stories.jsx')
      setLoading(false)
      return
    }

    let blobUrl = null
    let isMounted = true

    async function loadPdf() {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch PDF từ Vercel Blob Storage
        // Public blob URL không cần token, nhưng cần mode: 'cors' để tránh CORS issues
        const response = await fetch(PDF_URL, {
          method: 'GET',
          mode: 'cors', // Cho phép CORS
          cache: 'default', // Cache để tăng tốc độ load
          headers: {
            'Accept': 'application/pdf',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Convert response sang blob
        const blob = await response.blob()
        
        // Tạo blob URL từ blob
        blobUrl = URL.createObjectURL(blob)
        
        if (isMounted) {
          setPdfUrl(blobUrl)
        } else {
          // Nếu component đã unmount, cleanup ngay
          URL.revokeObjectURL(blobUrl)
        }
      } catch (err) {
        console.error('Error loading PDF:', err)
        if (isMounted) {
          setError(`Không thể tải file PDF: ${err.message}. Vui lòng kiểm tra lại link hoặc kết nối mạng.`)
          setLoading(false)
        }
      }
    }

    loadPdf()

    // Cleanup function để revoke blob URL khi component unmount
    return () => {
      isMounted = false
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
      }
    }
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
              {loading && (
                <div className="pdf-loading">
                  <div className="loading-spinner"></div>
                  <p>Đang tải truyện...</p>
                </div>
              )}

              {error && (
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
                  loading={
                    <div className="pdf-loading">
                      <div className="loading-spinner"></div>
                    </div>
                  }
                >
                  <Page 
                    pageNumber={pageNumber} 
                    className="pdf-page"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
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
