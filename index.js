require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Menghubungkan ke Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Endpoint Root (Untuk mengecek API jalan atau tidak)
app.get('/', (req, res) => {
  res.json({ message: 'API Perpustakaan Berjalan Normal' });
});

// 1. GET: Ambil semua data peminjaman (bisa difilter dengan query, misal: ?status=Terlambat)
app.get('/loans', async (req, res) => {
  const { status } = req.query;
  let query = supabase.from('loans').select('*');
  
  if (status) {
    query = query.eq('status', status); // Filter berdasarkan status
  }

  const { data, error } = await query;
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ data });
});

// 2. POST: Tambah data peminjaman baru
app.post('/loans', async (req, res) => {
  const { book_title, member_name, borrow_date, status } = req.body;
  
  const { data, error } = await supabase
    .from('loans')
    .insert([{ book_title, member_name, borrow_date, status }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: 'Data berhasil ditambahkan', data });
});

// 3. PUT: Update data (misal untuk mengembalikan buku / ubah status)
app.put('/loans/:id', async (req, res) => {
  const { id } = req.params;
  const { return_date, status } = req.body;
  
  const { data, error } = await supabase
    .from('loans')
    .update({ return_date, status })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: 'Data berhasil diupdate', data });
});

// 4. DELETE: Hapus data peminjaman
app.delete('/loans/:id', async (req, res) => {
  const { id } = req.params;
  
  const { error } = await supabase
    .from('loans')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: 'Data berhasil dihapus' });
});

// Wajib untuk deploy ke Vercel
module.exports = app;

// Menjalankan server di lokal
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}