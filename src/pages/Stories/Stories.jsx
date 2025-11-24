import { useState, useEffect, useRef } from 'react'
import { pdfjs } from 'react-pdf'
import './Stories.css'

// Cấu hình PDF.js worker - sử dụng từ public folder (version 5.4.296 từ react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

// PDF URL từ Vercel Blob Storage
const PDF_URL = 'https://erub5hkiytu5lnuq.public.blob.vercel-storage.com/Giai%20%C4%91i%E1%BB%87u%20v%C6%B0%E1%BB%A3t%20thung%20l%C5%A9ng.pdf'

const Stories = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const canvasRef = useRef(null)
  const pageCacheRef = useRef(new Map()) // Cache tất cả các page đã render

  // Load PDF document và render TẤT CẢ các page ngay một lần
  useEffect(() => {
    if (!PDF_URL) {
      setError('PDF URL chưa được cấu hình.')
      setLoading(false)
      return
    }

    async function loadAndRenderAllPages() {
      try {
        setLoading(true)
        setError(null)
        setLoadingProgress(0)

        // Bước 1: Fetch PDF và convert sang blob URL để tránh 403
        let pdfBlobUrl = null
        try {
          console.log('Fetching PDF from Vercel Blob Storage...')
          const response = await fetch(PDF_URL, {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            headers: {
              'Accept': 'application/pdf',
            },
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          const blob = await response.blob()
          pdfBlobUrl = URL.createObjectURL(blob)
          console.log('PDF fetched successfully, blob URL created')
        } catch (fetchErr) {
          console.error('Error fetching PDF:', fetchErr)
          throw new Error(`Không thể tải file PDF từ server: ${fetchErr.message}`)
        }

        // Bước 2: Load PDF document từ blob URL
        const loadingTask = pdfjs.getDocument({
          url: pdfBlobUrl,
          cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        })

        const pdf = await loadingTask.promise
        const totalPages = pdf.numPages
        setNumPages(totalPages)
        setPdfDoc(pdf)
        
        console.log(`PDF loaded: ${totalPages} pages`)

        // Bước 2: Render TẤT CẢ các page và cache lại
        const maxWidth = Math.min(900, window.innerWidth - 80)
        
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          try {
            // Get page
            const page = await pdf.getPage(pageNum)
            const viewport = page.getViewport({ scale: 1.0 })
            const scale = maxWidth / viewport.width
            const scaledViewport = page.getViewport({ scale })

            // Tạo canvas tạm để render
            const tempCanvas = document.createElement('canvas')
            tempCanvas.width = scaledViewport.width
            tempCanvas.height = scaledViewport.height
            const tempCtx = tempCanvas.getContext('2d')

            const renderContext = {
              canvasContext: tempCtx,
              viewport: scaledViewport,
            }

            // Render page
            await page.render(renderContext).promise

            // Cache page đã render
            const cachedCanvas = document.createElement('canvas')
            cachedCanvas.width = tempCanvas.width
            cachedCanvas.height = tempCanvas.height
            const cachedCtx = cachedCanvas.getContext('2d')
            cachedCtx.drawImage(tempCanvas, 0, 0)
            pageCacheRef.current.set(pageNum, cachedCanvas)

            // Cập nhật progress
            const progress = Math.round((pageNum / totalPages) * 100)
            setLoadingProgress(progress)

            console.log(`Page ${pageNum}/${totalPages} rendered (${progress}%)`)

            // Nếu là page đầu tiên, hiển thị ngay lập tức
            if (pageNum === 1 && canvasRef.current) {
              const currentCanvas = canvasRef.current
              currentCanvas.width = cachedCanvas.width
              currentCanvas.height = cachedCanvas.height
              const ctx = currentCanvas.getContext('2d')
              ctx.drawImage(cachedCanvas, 0, 0)
              setLoading(false) // Hiển thị page 1 ngay, các page khác load trong background
            }
          } catch (pageErr) {
            console.error(`Error rendering page ${pageNum}:`, pageErr)
            // Tiếp tục render các page khác, không dừng lại
          }
        }

        // Tất cả page đã được render và cache
        setLoading(false)
        setLoadingProgress(100)
        console.log(`All ${totalPages} pages loaded and cached`)

        // Cleanup blob URL sau khi load xong (giữ lại để dùng)
        // Không revoke ngay vì có thể cần dùng lại

      } catch (err) {
        console.error('Error loading PDF:', err)
        setError(`Không thể tải file PDF: ${err.message}`)
        setLoading(false)
      }
    }

    loadAndRenderAllPages()
  }, [])

  // Hiển thị page từ cache khi chuyển trang
  useEffect(() => {
    if (!canvasRef.current || !pageNumber) return

    // Kiểm tra cache - tất cả page đã được cache
    if (pageCacheRef.current.has(pageNumber)) {
      const cachedCanvas = pageCacheRef.current.get(pageNumber)
      const currentCanvas = canvasRef.current
      const ctx = currentCanvas.getContext('2d')
      
      // Set canvas size
      currentCanvas.width = cachedCanvas.width
      currentCanvas.height = cachedCanvas.height
      
      // Draw từ cache
      ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)
      ctx.drawImage(cachedCanvas, 0, 0)
      
      console.log(`Page ${pageNumber} displayed from cache`)
    } else {
      // Nếu chưa có trong cache (không nên xảy ra nếu load đúng)
      console.warn(`Page ${pageNumber} not in cache yet`)
    }
  }, [pageNumber])

  function goToPrevPage() {
    if (pageNumber > 1) {
      setPageNumber(page => page - 1)
    }
  }

  function goToNextPage() {
    if (pageNumber < (numPages || 1)) {
      setPageNumber(page => page + 1)
    }
  }

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

          <div className="pdf-viewer-container">
            {loading && (
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>Đang tải PDF... {loadingProgress > 0 && `${loadingProgress}%`}</p>
                {loadingProgress > 0 && (
                  <div style={{
                    width: '300px',
                    height: '4px',
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    borderRadius: '2px',
                    marginTop: '1rem',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${loadingProgress}%`,
                      height: '100%',
                      backgroundColor: 'var(--color-primary)',
                      transition: 'width 0.3s',
                    }}></div>
                  </div>
                )}
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
              <canvas 
                ref={canvasRef}
                className="pdf-page"
                style={{
                  display: loading ? 'none' : 'block',
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stories
