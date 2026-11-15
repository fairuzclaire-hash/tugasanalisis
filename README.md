# Tugasku - Sistem Pengumpulan Tugas

Website pengumpulan tugas kuliah menggunakan React.

## Credentials
- **NIM**: 240511102
- **Password**: Papoi123
- **Nama**: Fairuz Triharyadi

## Push ke GitHub

Jalankan command ini di PowerShell:

```powershell
cd d:\OneDrive\Desktop\tugasanalisis-clean
git init
git add .
git commit -m "Initial: React Tugasku"
git remote add origin https://github.com/fairuzclaire-hash/tugasanalisis.git
git branch -M main
git push -u origin main --force
```

## Deploy ke Vercel

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik **"Add New Project"**
4. Import repo: `fairuzclaire-hash/tugasanalisis`
5. Klik **"Deploy"** (pakai default settings)
6. Copy URL Vercel yang diberikan

## Files
- `index.html` - HTML utama dengan React CDN
- `tugas.css` - Stylesheet lengkap
- `tugas.js` - React app dengan semua fitur

## Fitur
✅ Login mahasiswa/dosen
✅ Typing animation
✅ Multiple file upload  
✅ Drag & drop
✅ Toast notifications
✅ Comments section
✅ LocalStorage + IndexedDB
