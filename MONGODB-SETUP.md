# MongoDB Atlas Setup Guide

## ✅ Setup Selesai

Semua file sudah dibuat! Sekarang tinggal push ke GitHub dan setup environment variable di Vercel.

## 📁 File yang Dibuat

1. **`api/mongodb.js`** - MongoDB connection helper
2. **`api/submissions.js`** - API untuk GET dan POST tugas
3. **`api/delete-submission.js`** - API untuk DELETE tugas
4. **`tugas-mongodb.js`** - Frontend React yang pakai MongoDB API
5. **`package.json`** - Dependencies (mongodb driver)
6. **`vercel.json`** - Vercel serverless functions config
7. **`.env`** - Local environment variables (JANGAN push ke GitHub!)

## 🚀 Langkah Deploy ke Vercel

### 1. Push ke GitHub

```bash
cd "d:\OneDrive\Desktop\tugasanalisis-clean"
git add .
git commit -m "Add MongoDB integration"
git push origin main
```

### 2. Setup Environment Variable di Vercel

1. Buka https://vercel.com/dashboard
2. Klik project **tugasanalisis**
3. Klik tab **Settings**
4. Klik **Environment Variables** di sidebar
5. Tambahkan variable baru:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://tugasuser:UNAHtZLt4zXSb2I2@tugasfile.7odp7zd.mongodb.net/tugasdb?retryWrites=true&w=majority`
   - **Environment**: Centang semua (Production, Preview, Development)
6. Klik **Save**

### 3. Redeploy

Setelah environment variable ditambahkan:
1. Klik tab **Deployments**
2. Klik **Redeploy** di deployment terakhir
3. Atau push commit baru ke GitHub (auto deploy)

## 🧪 Testing

Setelah deploy selesai:
1. Buka https://tugasanalisis.vercel.app/
2. Login sebagai mahasiswa (NIM: 240511102, Password: Papoi123)
3. Upload tugas
4. Cek dari device lain - tugas harus muncul!

## 🔐 Security Note

File `.env` sudah di-ignore di `.gitignore` jadi tidak akan ke-push ke GitHub. Password MongoDB aman!

## 📊 Database Info

- **Database Name**: tugasdb
- **Collection**: submissions
- **Connection**: MongoDB Atlas (Cloud)
- **Region**: Singapore

## ⚡ API Endpoints

- `GET /api/submissions` - Get all submissions
- `POST /api/submissions` - Create/update submission
- `DELETE /api/delete-submission` - Delete submission by ID
