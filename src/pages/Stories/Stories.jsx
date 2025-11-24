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

        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({
          url: PDF_URL,
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

    // Kiểm tra cache cho các page khác
    if (pageCacheRef.current.has(pageNumber)) {
      const cachedCanvas = pageCacheRef.current.get(pageNumber)
      const currentCanvas = canvasRef.current
      const ctx = currentCanvas.getContext('2d')
      ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)
      ctx.drawImage(cachedCanvas, 0, 0)
      setPageLoading(false)
      return
    }

    async function renderPage() {
      try {
        setPageLoading(true)
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
        console.log(`Page ${pageNumber} rendered`)
      } catch (err) {
        console.error(`Error rendering page ${pageNumber}:`, err)
        setError(`Không thể tải trang ${pageNumber}: ${err.message}`)
        setPageLoading(false)
      }
    }

    renderPage()
  }, [pdfDoc, pageNumber])

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

            <div className="pdf-document-wrapper">
              <canvas 
                ref={canvasRef}
                className="pdf-page"
                style={{
                  display: (loading || pageLoading) ? 'none' : 'block',
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
