import { useState, useEffect, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import './Stories.css'

// Cấu hình PDF.js worker - sử dụng từ public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

// PDF URL từ Vercel Blob Storage
const PDF_URL = 'https://erub5hkiytu5lnuq.public.blob.vercel-storage.com/Giai%20%C4%91i%E1%BB%87u%20v%C6%B0%E1%BB%A3t%20thung%20l%C5%A9ng.pdf'

const Stories = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const canvasRef = useRef(null)
  const pageCacheRef = useRef(new Map()) // Cache các page đã render
  const renderingRef = useRef(false) // Prevent multiple renders

  // Load PDF document và preload page đầu tiên
  useEffect(() => {
    if (!PDF_URL) {
      setError('PDF URL chưa được cấu hình.')
      setLoading(false)
      return
    }

    async function loadPdf() {
      try {
        setLoading(true)
        setPageLoading(true)
        setError(null)

        // Load PDF document với httpHeaders để tránh 403
        const loadingTask = pdfjsLib.getDocument({
          url: PDF_URL,
          httpHeaders: {
            'Accept': 'application/pdf',
          },
          withCredentials: false,
          cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        })

        const pdf = await loadingTask.promise
        setNumPages(pdf.numPages)
        setPdfDoc(pdf)
        
        console.log(`PDF loaded: ${pdf.numPages} pages`)

        // Preload page đầu tiên ngay khi document load xong
        if (canvasRef.current) {
          try {
            const page = await pdf.getPage(1)
            const viewport = page.getViewport({ scale: 1.0 })
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            
            const maxWidth = Math.min(900, window.innerWidth - 80)
            const scale = maxWidth / viewport.width
            const scaledViewport = page.getViewport({ scale })

            canvas.height = scaledViewport.height
            canvas.width = scaledViewport.width

            const renderContext = {
              canvasContext: context,
              viewport: scaledViewport,
            }

            await page.render(renderContext).promise

            // Cache page đầu tiên
            const cachedCanvas = document.createElement('canvas')
            cachedCanvas.width = canvas.width
            cachedCanvas.height = canvas.height
            const cachedCtx = cachedCanvas.getContext('2d')
            cachedCtx.drawImage(canvas, 0, 0)
            pageCacheRef.current.set(1, cachedCanvas)

            setLoading(false)
            setPageLoading(false)
            console.log('Page 1 preloaded and rendered')
          } catch (pageErr) {
            console.error('Error preloading page 1:', pageErr)
            setError(`Không thể tải trang đầu tiên: ${pageErr.message}`)
            setLoading(false)
            setPageLoading(false)
          }
        } else {
          setLoading(false)
          // Canvas chưa sẵn sàng, sẽ render trong useEffect khác
        }
      } catch (err) {
        console.error('Error loading PDF:', err)
        setError(`Không thể tải file PDF: ${err.message}`)
        setLoading(false)
        setPageLoading(false)
      }
    }

    loadPdf()
  }, [])

  // Render page khi chuyển trang (trừ page 1 đã preload)
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || !pageNumber) return
    
    // Page 1 đã được preload trong useEffect đầu tiên
    if (pageNumber === 1 && pageCacheRef.current.has(1)) {
      const cachedCanvas = pageCacheRef.current.get(1)
      const currentCanvas = canvasRef.current
      const ctx = currentCanvas.getContext('2d')
      ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)
      ctx.drawImage(cachedCanvas, 0, 0)
      setPageLoading(false)
      return
    }

    // Kiểm tra cache cho các page khác - hiển thị ngay lập tức
    if (pageCacheRef.current.has(pageNumber)) {
      const cachedCanvas = pageCacheRef.current.get(pageNumber)
      const currentCanvas = canvasRef.current
      const ctx = currentCanvas.getContext('2d')
      ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)
      ctx.drawImage(cachedCanvas, 0, 0)
      setPageLoading(false)
      renderingRef.current = false
      return
    }

    // Prevent multiple simultaneous renders
    if (renderingRef.current) return
    renderingRef.current = true

    async function renderPage() {
      try {
        // Không set pageLoading = true ngay, giữ canvas hiển thị
        // Chỉ hiển thị loading overlay nhẹ
        setError(null)

        // Get page
        const page = await pdfDoc.getPage(pageNumber)
        
        // Tính toán scale để fit width
        const viewport = page.getViewport({ scale: 1.0 })
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        const maxWidth = Math.min(900, window.innerWidth - 80)
        const scale = maxWidth / viewport.width
        const scaledViewport = page.getViewport({ scale })

        // Set canvas size
        canvas.height = scaledViewport.height
        canvas.width = scaledViewport.width

        // Render page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        }

        await page.render(renderContext).promise

        // Cache page đã render
        const cachedCanvas = document.createElement('canvas')
        cachedCanvas.width = canvas.width
        cachedCanvas.height = canvas.height
        const cachedCtx = cachedCanvas.getContext('2d')
        cachedCtx.drawImage(canvas, 0, 0)
        pageCacheRef.current.set(pageNumber, cachedCanvas)

        setPageLoading(false)
        renderingRef.current = false
        console.log(`Page ${pageNumber} rendered`)
      } catch (err) {
        console.error(`Error rendering page ${pageNumber}:`, err)
        setError(`Không thể tải trang ${pageNumber}: ${err.message}`)
        setPageLoading(false)
        renderingRef.current = false
      }
    }

    renderPage()
  }, [pdfDoc, pageNumber])

  // Preload các page xung quanh để chuyển trang nhanh hơn
  useEffect(() => {
    if (!pdfDoc || !numPages) return

    async function preloadAdjacentPages() {
      const pagesToPreload = []
      
      // Preload page trước và sau
      if (pageNumber > 1 && !pageCacheRef.current.has(pageNumber - 1)) {
        pagesToPreload.push(pageNumber - 1)
      }
      if (pageNumber < numPages && !pageCacheRef.current.has(pageNumber + 1)) {
        pagesToPreload.push(pageNumber + 1)
      }

      // Preload trong background
      for (const pageNum of pagesToPreload) {
        try {
          const page = await pdfDoc.getPage(pageNum)
          const viewport = page.getViewport({ scale: 1.0 })
          const maxWidth = Math.min(900, window.innerWidth - 80)
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

          await page.render(renderContext).promise

          // Cache page đã render
          const cachedCanvas = document.createElement('canvas')
          cachedCanvas.width = tempCanvas.width
          cachedCanvas.height = tempCanvas.height
          const cachedCtx = cachedCanvas.getContext('2d')
          cachedCtx.drawImage(tempCanvas, 0, 0)
          pageCacheRef.current.set(pageNum, cachedCanvas)

          console.log(`Page ${pageNum} preloaded`)
        } catch (err) {
          console.warn(`Failed to preload page ${pageNum}:`, err)
        }
      }
    }

    // Preload sau một chút để không ảnh hưởng đến page hiện tại
    const timeout = setTimeout(preloadAdjacentPages, 500)
    return () => clearTimeout(timeout)
  }, [pdfDoc, pageNumber, numPages])

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
            {(loading || pageLoading) && (
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>{loading ? 'Đang tải PDF...' : `Đang tải trang ${pageNumber}...`}</p>
              </div>
            )}

            {error && !loading && (
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

            <div className="pdf-document-wrapper" style={{ position: 'relative' }}>
              <canvas 
                ref={canvasRef}
                className="pdf-page"
                style={{
                  display: loading ? 'none' : 'block', // Chỉ ẩn khi đang load document, không ẩn khi chuyển trang
                  maxWidth: '100%',
                  height: 'auto',
                  opacity: pageLoading ? 0.7 : 1, // Làm mờ nhẹ khi đang load page mới
                  transition: 'opacity 0.2s',
                }}
              />
              {pageLoading && !loading && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}>
                  <div className="loading-spinner" style={{ 
                    width: '40px', 
                    height: '40px',
                    borderWidth: '3px',
                  }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stories
