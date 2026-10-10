# REST API Pencatatan Peminjaman Buku Perpustakaan

API sederhana untuk layanan pencatatan peminjaman buku perpustakaan 

## Teknologi yang Digunakan
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Struktur Data / Schema (Tabel `loans`)
- `id` (UUID, Primary Key)
- `book_title` (Text)
- `member_name` (Text)
- `borrow_date` (Date)
- `return_date` (Date, Nullable)
- `status` (Text) - Nilai: 'Dipinjam', 'Dikembalikan', 'Terlambat'

## Contoh Request dan Response

### 1. GET `/loans` (Melihat Semua Data)
*Filter Query opsional:* `GET /loans?status=Terlambat`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "abc-123-uuid",
      "book_title": "Pemrograman Node.js",
      "member_name": "Christopher Justin",
      "borrow_date": "2026-10-01",
      "return_date": null,
      "status": "Terlambat"
    }
  ]
}

2. POST /loans (Tambah Data)
Request Body:
{
  "book_title": "Struktur Data",
  "member_name": "Christopher Justin",
  "borrow_date": "2026-10-10",
  "status": "Dipinjam"
}

3. PUT /loans/:id (Update Data)
Request Body:
{
  "return_date": "2026-10-15",
  "status": "Dikembalikan"
}

4. DELETE /loans/:id (Hapus Data)
Response (200 OK):
{
  "message": "Data berhasil dihapus"
}

Panduan Menjalankan Lokal
Clone repository: git clone <link-repo-anda>

Install dependencies: npm install

Buat file .env dan masukkan SUPABASE_URL serta SUPABASE_KEY.

Jalankan server: node index.js

Link Base URL Deployment Vercel