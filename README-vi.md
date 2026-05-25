🇬🇧 [Read in English](README.md)

# Giữ hồn Hát Đúm trong kỷ nguyên số

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=111111)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

**Live:** [u-i-muongculture.vercel.app](https://u-i-muongculture.vercel.app/)

Đây là website trải nghiệm văn hóa Mường xoay quanh Hát Đúm: nguồn gốc, đặc trưng diễn xướng, nhạc cụ, lời hát, truyện kể, quiz tương tác và bảo tàng ảo. Giá trị chính của repo không nằm ở backend hay dữ liệu phức tạp, mà ở cách gom nhiều loại tư liệu số - ảnh, video, âm thanh, bài báo, Canva, Artsteps - thành một hành trình đọc/xem/nghe chạy được như một SPA tĩnh.

Điểm cần hiểu trước khi sửa: đây là một sản phẩm nội dung. Mọi thay đổi kỹ thuật đều phải bảo vệ ba thứ: tiếng Việt hiển thị đúng, media bên ngoài không làm vỡ trải nghiệm, và tuyến nội dung văn hóa vẫn mạch lạc khi người dùng đi qua từng trang.

## Preview

![Homepage](docs/assets/homepage.png)

![Hỏi Đúm](docs/assets/hoi-dum.png)

## Bề mặt sản phẩm

| Route | Vai trò |
|---|---|
| `/` | Trang chủ với carousel ảnh, video YouTube, 3 nhánh truy cập nhanh và cụm bài báo theo nhóm. |
| `/nguon-goc` | Giới thiệu Hát Đúm, đặc trưng diễn xướng và tri thức ngôn ngữ Mường. |
| `/dac-trung` | Tập trung vào âm nhạc, kỹ năng ứng tác lời hát và vai trò cộng đồng. |
| `/truyen` | Nhúng tư liệu Canva và liên kết Gemini cho phần truyện Hát Đúm. |
| `/nhac-cu` | Mô tả Sáo Ôi, Đàn nhị bằng văn bản, ảnh và video Cloudinary. |
| `/loi-hat` | Nhúng tư liệu Canva, kèm audio nền có điều khiển âm lượng. |
| `/hoi-dum` | Quiz 20 câu chạy client-side để người đọc tự kiểm tra hiểu biết. |
| `/trai-nghiem` | Nhúng bảo tàng ảo Artsteps/WebGL. |

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=111111) |
| Build | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| Routing | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white) |
| Media | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) ![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white) ![Canva](https://img.shields.io/badge/Canva-00C4CC?style=flat-square&logo=canva&logoColor=white) ![Artsteps](https://img.shields.io/badge/Artsteps_WebGL-4B5563?style=flat-square) |
| Deploy | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

`@vercel/blob` và `dotenv` đang có trong `package.json`, nhưng source hiện tại không import hoặc gọi chúng. Vì vậy README không trình bày chúng như stack đang hoạt động.

## Kiến trúc ngắn

```mermaid
flowchart LR
  Browser["Browser"]
  Vercel["Vercel static hosting"]
  App["React SPA"]
  Router["React Router"]
  Media["Cloudinary / YouTube / Canva / Artsteps"]
  Data["Static content arrays"]

  Browser --> Vercel --> App --> Router
  App --> Data
  App --> Media
```

Ứng dụng được deploy như static SPA: Vercel rewrite mọi route về `index.html`, React Router quyết định màn hình, còn media nằm ở các provider ngoài. Thiết kế này phù hợp với một website di sản vì không cần server để render nội dung, nhưng đổi lại độ ổn định phụ thuộc mạnh vào URL Cloudinary, YouTube, Canva và Artsteps.

## Chạy cục bộ

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Đọc sâu

- [Đặc tả kỹ thuật](docs/01-technical-specification.md)
- [Mô hình nội dung và media](docs/02-content-and-media-model.md)
- [Vận hành, rủi ro và hướng nâng cấp](docs/03-operations-and-risks.md)

## Trạng thái hiện tại

- Live homepage đã được kiểm tra bằng Playwright.
- Ảnh tài liệu nằm trong `docs/assets/`.
- Trang Bảo tàng ảo phụ thuộc Artsteps/WebGL; khi kiểm tra có cookie overlay và một số cảnh báo từ iframe bên thứ ba.
- Form newsletter, nút search và social link ở footer hiện chỉ là UI tĩnh, chưa có xử lý thật.
