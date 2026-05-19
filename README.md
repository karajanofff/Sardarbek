# internet-kitob-dokoni

Sardor-Ekitob.uz - elektron va audio kitoblar uchun zamonaviy internet kitob do'koni. Loyiha React + Vite frontend va Express + JSON file database backenddan iborat.

## Texnologiyalar

- Frontend: React.js, Vite, React Router DOM, Axios, Tailwind CSS, Lucide React
- Backend: Node.js, Express.js, JSON file database, JWT authentication, bcryptjs, CORS
- Ma'lumotlar: `backend/data/*.json`

## File structure

```text
internet-kitob-dokoni/
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/axios.js
│       ├── data/categories.js
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── assets/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── data/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── utils/fileDB.js
└── README.md
```

## Backendni ishga tushirish

```bash
cd backend
npm install
npm run dev
```

Backend default port: `http://localhost:5000`

## Frontendni ishga tushirish

```bash
cd frontend
npm install
npm run dev
```

Frontend default port: `http://localhost:5173`

## Admin login

- Email: `admin@gmail.com`
- Password: `admin123`

Server birinchi ishga tushganda admin parolni bcrypt hashga aylantirib `users.json` ichida saqlaydi.

## API endpointlar

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

Books:
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

Orders:
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/my`
- `PUT /api/orders/:id/status`

News:
- `GET /api/news`
- `GET /api/news/:id`
- `POST /api/news`
- `PUT /api/news/:id`
- `DELETE /api/news/:id`

Admin:
- `GET /api/admin/stats`
- `GET /api/admin/users`

## Test qilish tartibi

1. Backendni ishga tushiring: `cd backend && npm install && npm run dev`
2. Frontendni ishga tushiring: `cd frontend && npm install && npm run dev`
3. Brauzerda `http://localhost:5173` ni oching.
4. Kitoblarni ko'ring, qidiruv va filterlarni sinang.
5. Kitobni savatga qo'shing va checkout qiling.
6. Login/register oqimini tekshiring.
7. Admin sifatida kiring va `/admin` sahifasida dashboard, kitoblar, buyurtmalar, foydalanuvchilar bo'limlarini tekshiring.
