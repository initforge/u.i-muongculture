import { useEffect, useRef, useState } from 'react'
import './HoiDum.css'

const HoiDum = () => {
  const audioRef = useRef(null)
  const [volume, setVolume] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0
      audio.muted = true
      audio.loop = true
      
      // Try to play audio (muted by default)
      const playAudio = async () => {
        try {
          await audio.play()
        } catch (error) {
          console.log('Audio autoplay blocked')
        }
      }

      if (audio.readyState >= 2) {
        playAudio()
      } else {
        audio.addEventListener('canplay', playAudio, { once: true })
      }
    }

    // Quiz data
    const quizData = [
      {
        question: "Hát đúm là hình thức ca hát giao duyên của dân tộc nào?",
        options: ["Người Tày", "Người Mường", "Người Thái", "Người Nùng"],
        correct: 1,
        hint: "Đây là dân tộc sinh sống chủ yếu ở vùng Hòa Bình, Phú Thọ.",
        rationale: "Hát đúm là hình thức ca hát giao duyên truyền thống đặc sắc của người Mường, thể hiện văn hóa tình yêu và giao lưu xã hội.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=400&fit=crop"
      },
      {
        question: "Hát đúm thường được thể hiện vào dịp nào?",
        options: ["Lễ cưới", "Lễ hội mùa xuân", "Lễ tang", "Tết Trung thu"],
        correct: 1,
        hint: "Đây là thời điểm thanh niên nam nữ gặp gỡ, giao lưu.",
        rationale: "Hát đúm thường diễn ra trong các lễ hội mùa xuân, là dịp để thanh niên nam nữ làm quen, giao duyên.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop"
      },
      {
        question: "Nội dung chính của hát đúm là gì?",
        options: ["Lao động sản xuất", "Giao duyên, tình yêu", "Chiến tranh", "Tôn giáo tín ngưỡng"],
        correct: 1,
        hint: "Đây là hoạt động giúp nam nữ thanh niên tìm hiểu nhau.",
        rationale: "Hát đúm chủ yếu thể hiện nội dung về tình cảm nam nữ, sự giao duyên và khao khát tình yêu của tuổi trẻ.",
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop"
      },
      {
        question: "Hình thức biểu diễn của hát đúm là?",
        options: ["Hát đơn ca", "Hát song ca nam nữ đối đáp", "Hát tập thể", "Hát kèm múa"],
        correct: 1,
        hint: "Hai người cùng hát và trả lời lẫn nhau.",
        rationale: "Hát đúm là hình thức song ca đối đáp giữa nam và nữ, thể hiện sự trao đổi tình cảm qua lời ca.",
        image: "https://images.unsplash.com/photo-1578398247854-5b83b6661f3c?w=800&h=400&fit=crop"
      },
      {
        question: "Nhạc cụ thường đi kèm với hát đúm là gì?",
        options: ["Đàn bầu", "Sáo trúc", "Trống", "Đàn tính"],
        correct: 1,
        hint: "Nhạc cụ làm từ tre, thổi bằng miệng.",
        rationale: "Sáo trúc là nhạc cụ truyền thống thường đệm cho hát đúm, tạo nên âm thanh du dương đặc trưng.",
        image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800&h=400&fit=crop"
      },
      {
        question: "Hát đúm có ý nghĩa gì trong đời sống người Mường?",
        options: ["Giải trí", "Giáo dục", "Giao lưu văn hóa và tìm hiểu bạn đời", "Thờ cúng"],
        correct: 2,
        hint: "Nó giúp giới trẻ tìm hiểu và kết nối với nhau.",
        rationale: "Hát đúm không chỉ là giải trí mà còn là phương tiện giao lưu văn hóa và giúp thanh niên tìm hiểu bạn đời.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop"
      },
      {
        question: "Địa điểm thường diễn ra hát đúm là?",
        options: ["Trong nhà", "Dưới ánh trăng ngoài sân", "Trong đình làng", "Trên núi"],
        correct: 1,
        hint: "Nơi lãng mạn, có ánh sáng tự nhiên vào buổi tối.",
        rationale: "Hát đúm thường diễn ra dưới ánh trăng ngoài sân, tạo không gian lãng mạn và thơ mộng.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
      },
      {
        question: "Tuổi của người tham gia hát đúm thường là?",
        options: ["Trẻ em", "Thanh niên chưa lập gia đình", "Người trung niên", "Người già"],
        correct: 1,
        hint: "Đây là lứa tuổi đang tìm hiểu về tình yêu.",
        rationale: "Hát đúm chủ yếu dành cho thanh niên nam nữ chưa lập gia đình, là hoạt động giao duyên.",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=400&fit=crop"
      },
      {
        question: "Đặc điểm của lời ca trong hát đúm là?",
        options: ["Phức tạp, khó hiểu", "Giản dị, chân thành, dễ nhớ", "Trừu tượng", "Dài dòng"],
        correct: 1,
        hint: "Lời ca phải dễ hát, dễ thuộc để mọi người tham gia.",
        rationale: "Lời ca hát đúm giản dị, chân thành và dễ nhớ, phù hợp với đời sống và tâm tư của người Mường.",
        image: "https://images.unsplash.com/photo-1563492065567-7a0e1c57f3e8?w=800&h=400&fit=crop"
      },
      {
        question: "Hát đúm được UNESCO công nhận là di sản văn hóa phi vật thể vào năm nào?",
        options: ["2010", "2015", "2019", "Chưa được công nhận"],
        correct: 3,
        hint: "Hiện tại vẫn đang trong quá trình bảo tồn.",
        rationale: "Hát đúm chưa được UNESCO công nhận chính thức, nhưng đang được nỗ lực bảo tồn và phát huy.",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=400&fit=crop"
      },
      {
        question: "Tỉnh nào sau đây có truyền thống hát đúm mạnh mẽ nhất?",
        options: ["Hà Nội", "Hòa Bình", "Hải Phòng", "Đà Nẵng"],
        correct: 1,
        hint: "Đây là vùng đất có đông người Mường sinh sống.",
        rationale: "Hòa Bình là nơi có cộng đồng người Mường đông đảo và truyền thống hát đúm được bảo tồn tốt nhất.",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop"
      },
      {
        question: "Điệu hát trong hát đúm thường có đặc điểm gì?",
        options: ["Nhanh, mạnh mẽ", "Chậm, du dương, ngọt ngào", "Gấp gáp, vội vàng", "Trầm buồn"],
        correct: 1,
        hint: "Phù hợp với không khí tình cảm, lãng mạn.",
        rationale: "Điệu hát đúm thường chậm rãi, du dương và ngọt ngào, thể hiện tình cảm sâu sắc.",
        image: "https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?w=800&h=400&fit=crop"
      },
      {
        question: "Vai trò của người nam trong hát đúm là?",
        options: ["Chỉ nghe", "Chủ động tỏ tình, gợi chuyện", "Im lặng", "Hát một mình"],
        correct: 1,
        hint: "Người nam thường bắt đầu câu chuyện.",
        rationale: "Trong hát đúm, nam giới thường chủ động khởi xướng, tỏ tình và dẫn dắt câu chuyện.",
        image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&h=400&fit=crop"
      },
      {
        question: "Vai trò của người nữ trong hát đúm là?",
        options: ["Không tham gia", "Đáp lại, thể hiện tình cảm khéo léo", "Hát to", "Chỉ múa"],
        correct: 1,
        hint: "Người nữ trả lời và bày tỏ tình cảm một cách tinh tế.",
        rationale: "Người nữ trong hát đúm đáp lại nam giới một cách khéo léo, thể hiện tình cảm tinh tế và duyên dáng.",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&h=400&fit=crop"
      },
      {
        question: "Ngôn ngữ sử dụng trong hát đúm là?",
        options: ["Tiếng Việt", "Tiếng Mường", "Tiếng Anh", "Tiếng Pháp"],
        correct: 1,
        hint: "Ngôn ngữ của dân tộc Mường.",
        rationale: "Hát đúm được thể hiện bằng tiếng Mường, ngôn ngữ bản địa của dân tộc này.",
        image: "https://images.unsplash.com/photo-1551601651-05e2bb4a3c9f?w=800&h=400&fit=crop"
      },
      {
        question: "Trang phục truyền thống khi hát đúm thường có màu gì nổi bật?",
        options: ["Xanh lá", "Chàm đậm, đỏ tươi", "Vàng", "Trắng"],
        correct: 1,
        hint: "Màu sắc đặc trưng của áo truyền thống người Mường.",
        rationale: "Trang phục hát đúm thường có màu chàm đậm và đỏ tươi, đặc trưng của người Mường.",
        image: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?w=800&h=400&fit=crop"
      },
      {
        question: "Hát đúm giúp lưu giữ điều gì cho thế hệ sau?",
        options: ["Công nghệ", "Ngôn ngữ và văn hóa truyền thống", "Kiến trúc", "Ẩm thực"],
        correct: 1,
        hint: "Những giá trị tinh thần và bản sắc dân tộc.",
        rationale: "Hát đúm là phương tiện quan trọng để truyền tải và lưu giữ ngôn ngữ, văn hóa truyền thống cho thế hệ sau.",
        image: "https://images.unsplash.com/photo-1601514423423-c0878dc31a95?w=800&h=400&fit=crop"
      },
      {
        question: "Hiện nay, hát đúm đang đối mặt với thách thức gì?",
        options: ["Quá phổ biến", "Nguy cơ mai một do ít người trẻ biết hát", "Bị cấm", "Không có thách thức"],
        correct: 1,
        hint: "Giới trẻ ngày nay ít quan tâm đến văn hóa truyền thống.",
        rationale: "Hát đúm đang đối mặt với nguy cơ mai một vì ít người trẻ quan tâm và tiếp nối truyền thống này.",
        image: "https://images.unsplash.com/photo-1591768575254-deda8f55ad4a?w=800&h=400&fit=crop"
      },
      {
        question: "Để bảo tồn hát đúm, cần làm gì?",
        options: ["Bỏ quên", "Dạy cho thế hệ trẻ, tổ chức lễ hội", "Cấm biểu diễn", "Thay đổi hoàn toàn"],
        correct: 1,
        hint: "Cần truyền đạt và tạo điều kiện cho các thế hệ tham gia.",
        rationale: "Bảo tồn hát đúm cần dạy cho thế hệ trẻ, tổ chức các lễ hội và tạo điều kiện cho cộng đồng duy trì truyền thống.",
        image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=800&h=400&fit=crop"
      },
      {
        question: "Giá trị cốt lõi mà hát đúm truyền tải là gì?",
        options: ["Giàu có", "Tình yêu chân thành và văn hóa cộng đồng", "Quyền lực", "Chiến tranh"],
        correct: 1,
        hint: "Giá trị về tình cảm con người và sự gắn kết.",
        rationale: "Hát đúm truyền tải giá trị về tình yêu chân thành, sự tôn trọng lẫn nhau và văn hóa cộng đồng đoàn kết.",
        image: "https://images.unsplash.com/photo-1571123292832-2261a2ad6d69?w=800&h=400&fit=crop"
      }
    ]

    // Game state
    let currentQuestion = 0
    let score = 0
    let answered = false

    // Audio elements
    const bgMusic = document.getElementById('bgMusic')
    const correctSound = document.getElementById('correctSound')
    const incorrectSound = document.getElementById('incorrectSound')

    // Game functions
    window.showScreen = (screenId) => {
      document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active')
      })
      const screen = document.getElementById(screenId)
      if (screen) screen.classList.add('active')
    }

    window.startGame = () => {
      currentQuestion = 0
      score = 0
      answered = false

      bgMusic?.play().catch(() => {})
      window.showScreen('questionScreen')
      window.loadQuestion()
    }

    window.loadQuestion = () => {
      if (currentQuestion >= quizData.length) {
        window.endGame()
        return
      }

      answered = false
      const question = quizData[currentQuestion]

      const progressText = document.getElementById('progressText')
      const scoreText = document.getElementById('scoreText')
      if (progressText) progressText.textContent = `Câu hỏi ${currentQuestion + 1} / ${quizData.length}`
      if (scoreText) scoreText.textContent = `Điểm: ${score}`

      const imgElement = document.getElementById('questionImage')
      if (imgElement) {
        imgElement.style.display = 'block'
        imgElement.src = question.image
      }

      const questionText = document.getElementById('questionText')
      if (questionText) questionText.textContent = question.question

      const hintText = document.getElementById('hintText')
      if (hintText) {
        hintText.textContent = question.hint
        hintText.classList.remove('visible')
      }

      const answersGrid = document.getElementById('answersGrid')
      if (answersGrid) {
        answersGrid.innerHTML = ''
        question.options.forEach((option, index) => {
          const button = document.createElement('button')
          button.className = 'btn-answer'
          button.textContent = `${String.fromCharCode(65 + index)}. ${option}`
          button.onclick = () => window.selectAnswer(index)
          answersGrid.appendChild(button)
        })
      }

      const rationaleSection = document.getElementById('rationaleSection')
      const nextButton = document.getElementById('nextButton')
      if (rationaleSection) rationaleSection.classList.remove('visible')
      if (nextButton) nextButton.classList.remove('visible')
    }

    window.showHint = () => {
      const hintText = document.getElementById('hintText')
      if (hintText) hintText.classList.toggle('visible')
    }

    window.selectAnswer = (selectedIndex) => {
      if (answered) return

      answered = true
      const question = quizData[currentQuestion]
      const buttons = document.querySelectorAll('.btn-answer')

      buttons.forEach((button, index) => {
        button.disabled = true
        if (index === question.correct) {
          button.classList.add('correct')
        }
        if (index === selectedIndex && index !== question.correct) {
          button.classList.add('incorrect')
        }
      })

      if (selectedIndex === question.correct) {
        score++
        correctSound?.play().catch(() => {})
        const scoreText = document.getElementById('scoreText')
        if (scoreText) scoreText.textContent = `Điểm: ${score}`
      } else {
        incorrectSound?.play().catch(() => {})
      }

      const rationaleText = document.getElementById('rationaleText')
      const rationaleSection = document.getElementById('rationaleSection')
      const nextButton = document.getElementById('nextButton')
      if (rationaleText) rationaleText.textContent = question.rationale
      if (rationaleSection) rationaleSection.classList.add('visible')
      if (nextButton) nextButton.classList.add('visible')
    }

    window.nextQuestion = () => {
      currentQuestion++
      window.loadQuestion()
    }

    window.endGame = () => {
      window.showScreen('endScreen')

      const finalScore = document.getElementById('finalScore')
      if (finalScore) finalScore.textContent = `${score} / ${quizData.length} câu đúng`

      let message = ''
      const percentage = (score / quizData.length) * 100

      if (percentage >= 90) {
        message = '🎉 Xuất sắc! Bạn là một chuyên gia văn hóa Mường thực thụ! Kiến thức của bạn về hát đúm thật ấn tượng!'
      } else if (percentage >= 70) {
        message = '👏 Rất tốt! Bạn đã nắm vững nhiều kiến thức về hát đúm người Mường. Tiếp tục tìm hiểu để trở thành chuyên gia nhé!'
      } else if (percentage >= 50) {
        message = '😊 Khá tốt! Bạn đã có hiểu biết cơ bản về hát đúm. Hãy tìm hiểu thêm để khám phá nhiều điều thú vị hơn về văn hóa Mường!'
      } else {
        message = '💪 Đừng nản lòng! Hãy chơi lại và khám phá thêm về nét đẹp văn hóa hát đúm người Mường. Mỗi lần chơi là một cơ hội học hỏi mới!'
      }

      const resultMessage = document.getElementById('resultMessage')
      if (resultMessage) resultMessage.textContent = message
    }

    window.restartGame = () => {
      window.startGame()
    }

    // Store quiz data globally
    window.quizData = quizData

    // Initialize - show start screen
    window.showScreen('startScreen')
  }, [])

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      audioRef.current.muted = newVolume === 0
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        const newVolume = volume > 0 ? volume : 0.5
        audioRef.current.volume = newVolume
        audioRef.current.muted = false
        setVolume(newVolume)
        setIsMuted(false)
      } else {
        audioRef.current.muted = true
        setIsMuted(true)
      }
    }
  }

  return (
    <div className="hoidum-page">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/dghawsj8e/video/upload/v1764466899/Nh%E1%BA%A1c_S%C3%81O_b%C3%A0i_h%C3%A1t_mp3cut.net_zlv1gi.m4a"
        preload="auto"
      />

      <section className="section content-section">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">💬</div>
            <h2 className="section-title">Hỏi đúm</h2>
          </div>

          <div className="hoidum-intro">
            <p>
              Hỏi đúm là một phần quan trọng trong văn hóa Hát Đúm, nơi mọi người có thể đặt câu hỏi và tìm hiểu sâu hơn về truyền thống, lịch sử và ý nghĩa của loại hình nghệ thuật này.
            </p>
            <p>
              Thông qua phần hỏi đúm, chúng ta có thể khám phá những câu chuyện, bài học và giá trị văn hóa được truyền từ đời này sang đời khác trong cộng đồng người Mường.
            </p>
          </div>

          <div className="hoidum-embed">
            <div className="game-embed-wrapper">
              <div className="game-wrapper">
                <div className="game-container">
                  {/* Start Screen */}
                  <div id="startScreen" className="screen active">
                    <div className="pattern-border">
                      <h1 className="game-title" id="gameTitle">TÌM HIỂU HÁT ĐÚM NGƯỜI MƯỜNG</h1>
                      <p className="game-description" id="welcomeDescription">
                        Chào mừng bạn đến với hội xuân! Hãy cùng khám phá nét đẹp văn hóa hát giao duyên độc đáo của người Mường qua 20 câu hỏi thú vị.
                      </p>
                      <button className="btn-primary" id="startButton" onClick={() => window.startGame?.()}>
                        BẮT ĐẦU CHƠI
                      </button>
                    </div>
                  </div>

                  {/* Question Screen */}
                  <div id="questionScreen" className="screen">
                    <div className="pattern-border">
                      <div className="question-header">
                        <div className="progress-text" id="progressText">Câu hỏi 1 / 20</div>
                        <div className="score-text" id="scoreText">Điểm: 0</div>
                      </div>
                      <img
                        id="questionImage"
                        className="question-image"
                        src=""
                        alt="Câu hỏi"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <div className="question-text" id="questionText"></div>
                      <div className="hint-section">
                        <button className="btn-hint" id="hintButton" onClick={() => window.showHint?.()}>
                          Gợi ý
                        </button>
                        <div className="hint-text" id="hintText"></div>
                      </div>
                      <div className="answers-grid" id="answersGrid"></div>
                      <div className="rationale-section" id="rationaleSection">
                        <div className="rationale-title">💡 Giải thích:</div>
                        <div className="rationale-text" id="rationaleText"></div>
                      </div>
                      <button className="btn-next" id="nextButton" onClick={() => window.nextQuestion?.()}>
                        Câu tiếp theo
                      </button>
                    </div>
                  </div>

                  {/* End Screen */}
                  <div id="endScreen" className="screen">
                    <div className="pattern-border">
                      <h2 className="result-title" id="resultTitle">KẾT QUẢ HỘI THI</h2>
                      <div className="final-score" id="finalScore">0 / 20 câu đúng</div>
                      <p className="result-message" id="resultMessage"></p>
                      <button className="btn-primary" id="restartButton" onClick={() => window.restartGame?.()}>
                        CHƠI LẠI
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="audio-controls">
              <button 
                className="audio-toggle-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
              >
                {isMuted ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.62 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.03C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="currentColor"/>
                  </svg>
                )}
              </button>
              <div className="volume-control">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  aria-label="Điều chỉnh âm lượng"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Elements for Game */}
      <audio id="bgMusic" loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_4dd080c467.mp3" type="audio/mpeg" />
      </audio>
      <audio id="correctSound">
        <source src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3" type="audio/mpeg" />
      </audio>
      <audio id="incorrectSound">
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c3f5d4651e.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default HoiDum
