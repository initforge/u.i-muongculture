# Vận hành, rủi ro và hướng nâng cấp

Repo này vận hành đơn giản ở tầng deploy nhưng không đơn giản ở tầng trải nghiệm, vì phần lớn giá trị sản phẩm nằm trong media ngoài. Một build thành công chỉ chứng minh React bundle hợp lệ; nó không chứng minh YouTube, Canva, Artsteps, Cloudinary và audio đều đang phục vụ đúng nội dung.

## 1. Lệnh chạy

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

`vite.config.js` có hai điều chỉnh đáng chú ý:

- `server.fs.strict = false`: nới giới hạn file system khi dev server cần đọc file ngoài root.
- `chunkSizeWarningLimit = 1000`, `manualChunks = undefined`: giảm cảnh báo chunk lớn và giữ output đơn giản.

Hiện không có script `lint`, `test` hoặc `typecheck`.

## 2. Deploy

`vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Rewrite này là bắt buộc cho SPA routing. Nếu bỏ, reload trực tiếp `/hoi-dum`, `/nhac-cu` hoặc `/trai-nghiem` có thể 404 ở tầng Vercel.

## 3. Kiểm tra trước khi deploy

| Gate | Lý do |
|---|---|
| `npm run build` | Bắt lỗi syntax/import trong React/Vite. |
| Mở `/` | Kiểm tra carousel, YouTube, bài báo và layout header fixed. |
| Mở `/hoi-dum` | Kiểm tra quiz, nút bắt đầu, câu hỏi, âm thanh. |
| Mở `/trai-nghiem` | Kiểm tra Artsteps/WebGL iframe và cookie overlay. |
| Mở `/truyen` hoặc `/loi-hat` | Kiểm tra Canva embed không trắng quá lâu. |
| Kiểm tra console | Phân biệt lỗi app với lỗi iframe bên thứ ba. |

## 4. Rủi ro vận hành

### 4.1 Provider ngoài chết hoặc đổi chính sách

Cloudinary, YouTube, Canva, Artsteps và Pixabay đều nằm ngoài quyền kiểm soát của repo. Khi một provider đổi URL, chặn embed, thêm cookie gate hoặc giới hạn hotlink, trang vẫn build được nhưng trải nghiệm bị rỗng.

**Cách xử lý ngắn hạn:** thêm fallback text rõ ràng quanh iframe/media quan trọng.

**Cách xử lý dài hạn:** đưa asset cốt lõi về một tài khoản media được quản lý ổn định, lưu danh sách URL trong một file data riêng và thêm script kiểm tra HTTP định kỳ.

### 4.2 Autoplay audio

`App.jsx`, `Lyrics.jsx` và `HoiDum.jsx` đều liên quan đến audio. Browser hiện đại có autoplay policy, vì vậy audio có thể chỉ phát sau tương tác thật.

Đây không phải lỗi deploy. Nhưng nếu UI hứa hẹn "tự phát nhạc", trải nghiệm sẽ không ổn định giữa Chrome, Safari, mobile và desktop.

**Hướng tốt hơn:** hiển thị trạng thái "bật âm thanh" rõ ràng, giảm retry/log tự động, và chỉ phát sau user gesture.

### 4.3 Quiz dùng DOM global

`HoiDum.jsx` hiện gắn logic quiz lên `window` và thao tác DOM trực tiếp. Cách này chạy được nhưng yếu khi mở rộng.

Rủi ro:

- state không đi qua React;
- khó test;
- có thể xung đột global function;
- khó thêm animation, analytics hoặc lưu kết quả.

**Hướng nâng cấp:** chuyển quiz thành component state:

```text
quizData -> useState(currentQuestion, score, selectedAnswer)
render buttons from state
derive screen from state instead of document.getElementById
```

### 4.4 UI tĩnh tạo kỳ vọng sai

Footer có newsletter form, social link `#`, và header có nút search. Hiện source không có handler thật cho các chức năng này.

Nên chọn một trong hai hướng:

- triển khai thật: newsletter endpoint, search nội dung, social link thật;
- hoặc ẩn/đổi wording để người dùng không tưởng đây là chức năng đang hoạt động.

### 4.5 Dependency dư

`@vercel/blob` và `dotenv` có trong `package.json` nhưng không thấy import. Nếu không có kế hoạch dùng, nên xóa sau khi kiểm tra lại lịch sử deploy. Nếu có kế hoạch dùng cho CMS/media upload, cần ghi rõ trong roadmap thay vì để như stack hiện tại.

### 4.6 Lockfile lệch với manifest

Khi kiểm tra local, `npm install` có thể muốn viết lại `package-lock.json` vì lockfile còn dấu vết dependency PDF không có trong `package.json`. Build vẫn chạy sau khi cài dependency, nhưng đây là tín hiệu hygiene cần xử lý riêng trong một commit kỹ thuật, không nên trộn vào docs.

**Hướng xử lý:** quyết định dứt khoát có dùng PDF viewer hay không. Nếu không dùng, regenerate lockfile sạch; nếu có dùng, đưa dependency về lại `package.json` và thêm route/component thật.

## 5. Debug nhanh

| Triệu chứng | Kiểm tra |
|---|---|
| Reload route con bị 404 | Kiểm tra `vercel.json` rewrite. |
| Homepage mất ảnh | Mở URL Cloudinary trong browser, kiểm tra console network. |
| Video YouTube không hiện | Kiểm tra script `https://www.youtube.com/iframe_api` trong `index.html` và `videoId` trong `Home.jsx`. |
| Canva trắng | Mở URL Canva embed trực tiếp, kiểm tra cookie/CSP/network. |
| Artsteps không tải | Kiểm tra WebGL, cookie overlay, console iframe, polyfill/CDN bên thứ ba. |
| Quiz không bắt đầu | Kiểm tra console và các hàm `window.startGame`, `window.loadQuestion`. |
| Audio không phát | Kiểm tra autoplay policy; thử click/touch trước khi phát. |

## 6. Roadmap kỹ thuật

### Ưu tiên 1: Làm trải nghiệm thật hơn

- Bỏ hoặc triển khai search.
- Bỏ hoặc triển khai newsletter.
- Cập nhật social link thật.
- Thêm fallback cho Canva/Artsteps khi iframe không tải.

### Ưu tiên 2: Tách nội dung khỏi JSX

- Đưa bài viết/section text sang data file hoặc Markdown.
- Chuẩn hóa media registry: tên asset, provider, URL, nơi dùng.
- Thêm script kiểm tra link media.

### Ưu tiên 3: Refactor quiz

- Bỏ `window.*`.
- Dùng React state.
- Cho phép lưu điểm local hoặc export kết quả nếu có nhu cầu.

### Ưu tiên 4: Giảm nhiễu runtime

- Giảm console log audio trong production.
- Rà dependency dư.
- Thêm lint/test tối thiểu cho build hygiene.

## 7. Checklist khi đổi nội dung lớn

- [ ] Mở live/local trang bị ảnh hưởng.
- [ ] Kiểm tra tiếng Việt trong UI không bị lỗi encoding.
- [ ] Kiểm tra media chính tải được.
- [ ] Kiểm tra responsive ở mobile.
- [ ] Nếu thêm route, cập nhật header, docs và Vercel SPA behavior.
- [ ] Nếu thêm provider ngoài, ghi vào docs media model.
