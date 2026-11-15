# 🔧 Supabase Setup - Langkah Terakhir

## ⚠️ PENTING: Ambil Anon Key yang Benar

File `supabase.js` sudah dibuat tapi masih perlu **anon key** yang benar.

### Cara Ambil Anon Key:

1. Buka Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project **tugasanalisis**
3. Di sidebar klik **Settings** (icon ⚙️)
4. Klik **API**
5. Di bagian **Project API keys**, cari baris yang label-nya **`anon`** atau **`public`**
6. Copy key panjang yang mulai dengan `eyJ...`

### Update File supabase.js:

1. Buka file: `d:\OneDrive\Desktop\tugasanalisis-clean\supabase.js`
2. Di baris 2, ganti:
   ```javascript
   const SUPABASE_ANON_KEY = 'GANTI_DENGAN_ANON_KEY_KAMU';
   ```
   Dengan:
   ```javascript
   const SUPABASE_ANON_KEY = 'eyJ...'; // Paste anon key kamu
   ```
3. Save file

---

## 📋 Struktur Files Sekarang

```
tugasanalisis-clean/
├── index.html          ✅ Updated (load Supabase library)
├── tugas.css           ✅ 
├── tugas.js            ⏳ Need update (pakai Supabase API)
├── supabase.js         ✅ Created (helper functions)
├── README.md
└── .gitignore
```

---

## 🚀 Next Steps (Setelah Update Anon Key)

1. **Update tugas.js** - Kiro akan update untuk pakai Supabase
2. **Test Local** - Buka index.html di browser
3. **Push ke GitHub** - `git add . && git commit -m "Add Supabase integration"`
4. **Deploy ke Vercel** - Auto deploy setelah push

---

## ✅ Checklist

- [x] Supabase project created
- [x] Database tables created (submissions, submission_files, mata_kuliah)
- [x] Storage bucket 'tugas-files' created (public)
- [x] File supabase.js created
- [x] index.html updated
- [ ] **GET ANON KEY** ← **SEKARANG INI**
- [ ] Update supabase.js dengan anon key
- [ ] Update tugas.js untuk pakai Supabase
- [ ] Test & Deploy

---

## 🔑 Credentials Info

- **Project URL**: `https://wlxxcsakhrbazpbzuppk.supabase.co` ✅
- **Anon Key**: `⏳ PERLU DIAMBIL DARI DASHBOARD`

**Screenshot lokasi anon key:**
Settings → API → Project API keys → Cari baris "anon" → Copy key

---

Setelah dapat anon key-nya, kasih tau saya, nanti saya:
1. Update supabase.js dengan key yang benar
2. Update tugas.js untuk full integration
3. Buat file .gitignore untuk security
