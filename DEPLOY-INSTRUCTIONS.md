# 🚀 Deploy Instructions - MongoDB Atlas Integration

## ✅ Yang Sudah Selesai

1. ✅ MongoDB Atlas cluster sudah dibuat (tugasfile)
2. ✅ Database user sudah dibuat (tugasuser)
3. ✅ IP whitelist sudah di-setup (0.0.0.0/0)
4. ✅ Connection string sudah didapat
5. ✅ File API sudah dibuat (api/mongodb.js, api/submissions.js, api/delete-submission.js)
6. ✅ Frontend sudah update pakai MongoDB (tugas-mongodb.js)
7. ✅ Package.json dan vercel.json sudah dibuat
8. ✅ Git commit sudah dibuat

## 📋 Langkah Selanjutnya (Lakukan Manual)

### **Step 1: Push ke GitHub**

Buka PowerShell atau Command Prompt, lalu jalankan:

```powershell
cd "d:\OneDrive\Desktop\tugasanalisis-clean"
git push origin main
```

Tunggu sampai selesai upload ke GitHub.

---

### **Step 2: Setup Environment Variable di Vercel**

1. **Buka Vercel Dashboard**
   - Pergi ke https://vercel.com/dashboard
   - Login jika belum

2. **Pilih Project tugasanalisis**
   - Klik project **tugasanalisis** dari daftar

3. **Masuk ke Settings**
   - Klik tab **Settings** di bagian atas

4. **Tambah Environment Variable**
   - Di sidebar kiri, klik **Environment Variables**
   - Klik tombol **Add New**

5. **Isi Variable:**
   - **Name**: ketik `MONGODB_URI` (tanpa spasi, huruf besar semua)
   - **Value**: Copy-paste ini:
     ```
     mongodb+srv://tugasuser:UNAHtZLt4zXSb2I2@tugasfile.7odp7zd.mongodb.net/tugasdb?retryWrites=true&w=majority
     ```
   - **Environments**: Centang SEMUA (Production, Preview, Development)

6. **Save**
   - Klik tombol **Save**

---

### **Step 3: Redeploy Project**

Setelah environment variable ditambahkan:

**Opsi A: Auto Deploy (Recommended)**
- Vercel akan auto-deploy karena ada push baru ke GitHub
- Tunggu 1-2 menit
- Cek di tab **Deployments** untuk melihat progress

**Opsi B: Manual Redeploy**
1. Klik tab **Deployments**
2. Pilih deployment terakhir
3. Klik tombol **...** (three dots) di kanan
4. Klik **Redeploy**
5. Klik **Redeploy** lagi untuk konfirmasi

---

### **Step 4: Test Website**

Setelah deployment selesai (ada centang hijau ✅):

1. **Buka** https://tugasanalisis.vercel.app/
2. **Login** sebagai mahasiswa:
   - NIM: `240511102`
   - Password: `Papoi123`
3. **Upload tugas** di semester 1 atau 2
4. **Logout** dan login lagi, atau **buka dari HP/device lain**
5. **Cek apakah tugas muncul** ✅

Kalau tugas muncul di device lain, **BERHASIL!** 🎉

---

## 🔍 Troubleshooting

### Jika upload tugas error:

1. **Cek Console Browser**
   - Tekan F12 di browser
   - Klik tab **Console**
   - Cek ada error apa

2. **Cek Function Logs di Vercel**
   - Pergi ke dashboard Vercel → Project tugasanalisis
   - Klik tab **Functions**
   - Klik function yang error
   - Lihat logs

3. **Cek Environment Variable**
   - Pastikan `MONGODB_URI` sudah di-save
   - Pastikan tidak ada spasi atau karakter aneh
   - Pastikan di-set untuk semua environment (Production, Preview, Development)

### Jika deployment gagal:

1. **Cek Deployment Logs**
   - Klik tab **Deployments**
   - Klik deployment yang failed
   - Baca error messagenya

2. **Kemungkinan Issue:**
   - Environment variable belum di-set → Set dulu
   - Package.json error → Cek file package.json valid JSON
   - API file error → Cek syntax di folder api/

---

## 📊 Database Info

- **Service**: MongoDB Atlas
- **Cluster**: tugasfile
- **Database**: tugasdb
- **Collection**: submissions (otomatis dibuat saat pertama insert)
- **Region**: Singapore
- **Tier**: Free (M0) - 512MB

---

## 🔐 Security

- ✅ File `.env` tidak di-push ke GitHub (sudah ada di .gitignore)
- ✅ Connection string disimpan sebagai environment variable di Vercel
- ✅ Password MongoDB tidak terekspos di frontend
- ✅ API routes menggunakan CORS headers untuk keamanan

---

## 📝 Notes

- Upload file akan **disimpan sebagai base64** di MongoDB collection `submissions`
- Max file size: **10 MB per file**
- Supported formats: PDF, DOCX, PPTX, XLSX, ZIP, JPG, PNG, TXT
- Data akan **sync otomatis** ke semua device karena tersimpan di cloud (MongoDB Atlas)

---

## ❓ Butuh Bantuan?

Kalau ada error atau stuck di salah satu step, kasih tau error message atau screenshot!
