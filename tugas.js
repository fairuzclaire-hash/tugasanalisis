// MongoDB Atlas Integration
const{useState,useEffect,useRef,Fragment}=React;
const h=(t,p,...c)=>{if(p&&typeof t=='string'){p={...p};if('class'in p){p.className=p.class;delete p.class}if('for'in p){p.htmlFor=p.for;delete p.for}}return React.createElement(t,p,...c)};
const html=htm.bind(h);

// API base URL - will be same domain when deployed to Vercel
const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

const P=16,CL=['#4f46e5','#0d9488','#e8590c','#d6336c','#1c7ed6','#b7791f'];
const AKUN={nim:'240511102',name:'Fairuz Triharyadi',pw:'Papoi123'};
const SOS=[{k:'in',n:'LinkedIn',u:'https://www.linkedin.com/in/username-kamu'},{k:'ig',n:'Instagram',u:'https://www.instagram.com/username_kamu'},{k:'tt',n:'TikTok',u:'https://www.tiktok.com/@username_kamu'}];
const APP_NAME='PayFlow';

const fmt=ts=>new Date(ts).toLocaleString('id-ID',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
const sz=b=>b>1e6?(b/1e6).toFixed(1)+' MB':Math.max(1,Math.round(b/1e3))+' KB';
const ago=ts=>{const m=Math.floor((Date.now()-ts)/6e4);return m<1?'baru saja':m<60?m+' menit lalu':m<1440?Math.floor(m/60)+' jam lalu':Math.floor(m/1440)+' hari lalu'};
const OKX=/\.(pdf|docx|pptx|xlsx|zip|jpe?g|png|txt)$/i;

const Check=()=>html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const Ico=({k})=>html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${k=='in'?html`<path d="M4 9h3v11H4zM5.5 4a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM10 9h2.9v1.6c.5-.9 1.6-1.8 3.3-1.8 3.2 0 3.8 2.1 3.8 4.9V20h-3v-5.6c0-1.3 0-3-1.800-3s-2.100 1.400-2.100 2.900V20h-3z"/>`:k=='ig'?html`<g fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/></g><circle cx="17.2" cy="6.8" r="1.2"/>`:html`<path d="M16.500 3c.3 2.300 1.700 3.800 4 4v3c-1.500 0-2.900-.5-4-1.3V15a6 6 0 11-6-6c.3 0 .7 0 1 .1v3.200a2.900 2.900 0 102 2.700V3z"/>`}</svg>`;

// API helpers
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// File to base64
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

function Typing({text}){const[n,setN]=useState(-1);
 useEffect(()=>{let iv;const t=setTimeout(()=>{iv=setInterval(()=>setN(x=>{if(x+1>=text.length)clearInterval(iv);return x+1}),32)},1900);return()=>{clearTimeout(t);clearInterval(iv)}},[text]);
 return html`<div class="bub" aria-label=${text}><span class="av">T</span>${n<0?html`<span class="dots"><span></span><span></span><span></span></span>`:html`<span>${text.slice(0,n)}${n<text.length&&html`<i class="cr"></i>`}</span>`}</div>`}

function Modal({children,onClose}){useEffect(()=>{const k=e=>e.key=='Escape'&&onClose();addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
 return html`<div class="ov" onClick=${e=>e.target==e.currentTarget&&onClose()}><div class="md" role="dialog" aria-modal="true">${children}</div></div>`}

function Login({onViewer,onDos,onMhs}){const[r,setR]=useState(null),[n,setN]=useState(''),[p,setP]=useState(''),[e,setE]=useState('');
 const go=()=>n.trim()!=AKUN.nim||p!=AKUN.pw?setE('NIM atau kata sandi salah. Periksa lagi lalu coba masuk kembali.'):onMhs();
 const key=ev=>ev.key=='Enter'&&go();
 return html`<div class="lg"><section class="art"><div class="logo"><b>P</b>${APP_NAME}</div><div><h1>Kumpulkan tugas tepat waktu, tanpa ribet.</h1>
 <div style=${{marginTop:18}}><${Typing} text="Ini website pengumpulan tugas. Pilih semester, ketuk pertemuan, dan tugasmu langsung terkirim ke dosen."/></div>
 <div class="stack"><div class="sheet s1"><i></i><i></i><i></i></div><div class="sheet s2"><i></i><i></i><i></i></div><div class="sheet s3"><i></i><i></i><i></i><span class="stamp">Terkumpul</span></div></div></div><span></span></section>
 <section class="pn"><h2>Selamat datang</h2><p>Pilih peran untuk melanjutkan.</p>
 <div class="roles"><button class="role" onClick=${onViewer}><b>Viewer</b><span>Lihat tugas tanpa bisa edit</span></button>
 <button class="role" onClick=${onDos}><b>Dosen Pengampu</b><span>Lihat dan download tugas mahasiswa</span></button>
 <button class="role" aria-pressed=${r=='m'} onClick=${()=>setR('m')}><b>Mahasiswa</b><span>Masuk dengan NIM dan kata sandi</span></button></div>
 ${r=='m'&&html`<div class="f"><label for="lN">NIM</label><input id="lN" autofocus inputmode="numeric" autocomplete="username" value=${n} onChange=${x=>setN(x.target.value)} onKeyDown=${key}/></div>
 <div class="f"><label for="lP">Kata sandi</label><input id="lP" type="password" autocomplete="current-password" value=${p} onChange=${x=>setP(x.target.value)} onKeyDown=${key}/></div>
 <div class="err" role="alert">${e}</div><button class="btn" style=${{width:'100%'}} onClick=${go}>Masuk</button>`}</section></div>`}

function PModal({mk,p,sub,stu,onClose,onSave,onDel}){
 const[files,setFiles]=useState([]),[note,setNote]=useState(sub?sub.note||'':''),[err,setErr]=useState(''),[on,setOn]=useState(false),[busy,setBusy]=useState(false),inp=useRef();
 const pickFiles=fl=>{setErr('');const arr=Array.from(fl);for(const f of arr){if(f.size>10485760){setErr('Ukuran berkas melebihi 10 MB. Kompres lalu coba lagi.');return}if(!OKX.test(f.name)){setErr('Format tidak didukung. Gunakan PDF, DOCX, PPTX, XLSX, ZIP, JPG, PNG, atau TXT.');return}}setFiles(prev=>[...prev,...arr])};
 const rmFile=idx=>setFiles(prev=>prev.filter((_,i)=>i!==idx));
 const save=async()=>{if(!sub&&files.length===0)return setErr('Pilih berkas tugas terlebih dahulu.');setBusy(true);const e=await onSave(files,note);if(e){setErr(e);setBusy(false)}};
 const preview=async(f)=>{const url=URL.createObjectURL(f);window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),3000)};
 const previewSub=(fileData)=>{if(fileData.data){const b64=fileData.data.split(',')[1];const bytes=atob(b64);const arr=new Uint8Array(bytes.length);for(let i=0;i<bytes.length;i++)arr[i]=bytes.charCodeAt(i);const blob=new Blob([arr],{type:fileData.type});const url=URL.createObjectURL(blob);window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),3000)}};
 const dlSub=(fileData)=>{if(fileData.data){const a=document.createElement('a');a.href=fileData.data;a.download=fileData.name;document.body.appendChild(a);a.click();a.remove()}};
 return html`<${Modal} onClose=${onClose}><div class="dh"><h2>Pertemuan ${p}</h2><p>${mk.n}, semester ${mk.s}</p></div><div class="db">
 ${sub&&sub.files&&sub.files.length>0?html`<div class="cur"><b>${sub.files.length} berkas terkumpul</b><br/><small>dikumpulkan ${fmt(sub.tanggal)}</small>${sub.note&&html`<br/>Catatan: ${sub.note}`}<div style=${{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>${sub.files.map((f,i)=>html`<div key=${i} style=${{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 10px',background:'#f9fafb',borderRadius:8,fontSize:13}}><span style=${{flex:1,minWidth:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>${f.name} (${sz(f.size)})</span><div style=${{display:'flex',gap:6}}><button onClick=${()=>previewSub(f)} title="Preview" style=${{border:'none',background:'#4338ca',color:'white',borderRadius:6,padding:'4px 10px',cursor:'pointer',fontSize:16}}>👁</button><button onClick=${()=>dlSub(f)} title="Download" style=${{border:'none',background:'#0d9488',color:'white',borderRadius:6,padding:'4px 10px',cursor:'pointer',fontSize:16}}>⬇</button></div></div>`)}</div></div>`:sub?html`<div class="cur">Berkas belum diupload</div>`:!stu&&html`<div class="cur">Belum ada tugas yang dikumpulkan untuk pertemuan ini.</div>`}
 ${stu&&html`<div class="f"><label>${sub?'Tambah berkas (opsional)':'Berkas tugas (bisa lebih dari 1)'}</label>
  ${files.length>0?html`<div style=${{display:'flex',flexDirection:'column',gap:8,marginBottom:10}}>${files.map((f,i)=>html`<div key=${i} class="file"><span>${f.name}, ${sz(f.size)}</span><button aria-label="Preview" onClick=${()=>preview(f)} style=${{marginLeft:8,fontSize:16}}>👁</button><button aria-label="Hapus" onClick=${()=>rmFile(i)}>×</button></div>`)}</div>`:null}
  <div class=${'drop'+(on?' on':'')} tabIndex="0" role="button" onClick=${()=>inp.current.click()} onKeyDown=${e=>(e.key=='Enter'||e.key==' ')&&(e.preventDefault(),inp.current.click())}
   onDragOver=${e=>{e.preventDefault();setOn(true)}} onDragLeave=${()=>setOn(false)} onDrop=${e=>{e.preventDefault();setOn(false);pickFiles(e.dataTransfer.files)}}><b>Pilih berkas</b> atau seret ke sini<br/><small>Bisa lebih dari 1 file · PDF, DOCX, PPTX, XLSX, ZIP, JPG, PNG, TXT · Max 10 MB/file</small></div>
  <input type="file" multiple hidden ref=${inp} accept=".pdf,.docx,.pptx,.xlsx,.zip,.jpg,.jpeg,.png,.txt" onChange=${e=>{pickFiles(e.target.files);e.target.value=''}}/></div>
 <div class="f"><label for="pk">Catatan untuk dosen (opsional)</label><textarea id="pk" rows="2" value=${note} onChange=${e=>setNote(e.target.value)}></textarea></div>`}
 <div class="err" role="alert">${err}</div></div>
 <div class="df" style=${{flexWrap:'wrap'}}>${stu&&sub&&html`<button class="btn r" style=${{marginRight:'auto'}} onClick=${onDel}>Hapus</button>`}<button class="btn g" onClick=${onClose}>Tutup</button>${stu&&html`<button class="btn" disabled=${busy} onClick=${save}>Simpan</button>`}</div><//>`}

function MkModal({sem,onClose,onAdd}){const[n,setN]=useState(''),[s,setS]=useState(sem),[e,setE]=useState('');
 return html`<${Modal} onClose=${onClose}><div class="dh"><h2>Tambah mata kuliah</h2><p>Langsung tersedia 16 pertemuan.</p></div><div class="db">
 <div class="f"><label for="mn">Nama mata kuliah</label><input id="mn" autofocus placeholder="Contoh: Struktur Data" value=${n} onChange=${x=>setN(x.target.value)}/></div>
 <div class="f"><label for="ms">Semester</label><select id="ms" value=${s} onChange=${x=>setS(+x.target.value)}>${[1,2,3,4,5,6,7,8].map(k=>html`<option key=${k} value=${k}>Semester ${k}</option>`)}</select></div><div class="err" role="alert">${e}</div></div>
 <div class="df"><button class="btn g" onClick=${onClose}>Batal</button><button class="btn" onClick=${()=>n.trim()?onAdd(n.trim(),s):setE('Nama mata kuliah wajib diisi.')}>Tambah</button></div><//>`}

function Comments({list,stu,onAdd,onDel}){const[name,setName]=useState(stu?AKUN.name:''),[text,setText]=useState(''),[e,setE]=useState(''),[cooldown,setCooldown]=useState(0);
 const badWords=[
   // Umum
   'anjing','babi','kontol','memek','jancok','bangsat','tai','asu','tolol','goblok','bodoh','idiot','bajingan','kampret','setan','ngentot','pepek','puki','jembut','perek','coli','colmek','kimak','eek','entot','pelacur','lonte','sundal','monyet','anjir','njir','bangke','silit','pantek','kntl','itil','ajg','mmk',
   // Sunda
   'titit','bego','yatim','peler','heunceut','somplak','bajigur','barudak','siah','bangkong','goreng','baheula',
   // Jawa
   'cok','jancuk','matamu','asu','bajingan','pekok','gembel','edan','gemblung','ndasmu','cangkem','sampah','kontl','jancok',
   // LGBT Flag emoji
   '🏳️‍🌈','🏳‍🌈'
 ];
 const normalize=str=>{
   let s=str.toLowerCase()
     .replace(/[^a-z]/g,'')
     .replace(/(.)\1+/g,'$1')
     .replace(/0/g,'o').replace(/1/g,'i').replace(/3/g,'e').replace(/4/g,'a').replace(/5/g,'s').replace(/7/g,'t').replace(/8/g,'b');
   return s;
 };
 const hasBadWord=str=>{
   const clean=normalize(str);
   const reversed=clean.split('').reverse().join('');
   return badWords.some(w=>{
     const cleanWord=normalize(w);
     return clean.includes(cleanWord)||reversed.includes(cleanWord)||clean.includes(cleanWord.split('').reverse().join(''));
   });
 };
 useEffect(()=>{if(cooldown>0){const t=setTimeout(()=>setCooldown(c=>c-1),1000);return()=>clearTimeout(t)}},[cooldown]);
 const send=()=>{
   if(cooldown>0)return setE(`Tunggu ${cooldown} detik sebelum mengirim komentar lagi.`);
   if(!name.trim()||!text.trim())return setE('Nama dan komentar wajib diisi.');
   if(hasBadWord(name)||hasBadWord(text))return setE('Komentar mengandung kata tidak pantas. Gunakan bahasa yang sopan.');
   onAdd(name.trim(),text.trim());setText('');setE('');setCooldown(30)
 };
 return html`<section class="cm"><h2>Komentar</h2><p class="cs">Tinggalkan pesan atau saran untuk website ini.</p>
 <div class="two"><div class="f"><label for="cn">Nama</label><input id="cn" maxLength="40" value=${name} onChange=${x=>setName(x.target.value)}/></div></div>
 <div class="f"><label for="ct">Komentar</label><textarea id="ct" rows="3" maxLength="400" value=${text} onChange=${x=>setText(x.target.value)}></textarea></div>
 <div style=${{display:'flex',gap:12,alignItems:'center'}}><button class="btn" onClick=${send}>Kirim komentar</button><span class="err" role="alert" style=${{margin:0}}>${e}</span></div>
 <div class="cl">${list.length?list.slice().sort((a,b)=>b.at-a.at).map(c=>html`<div class="ci" key=${c._id}><span class="av" style=${{background:CL[c.name.length%6]}}>${c.name[0].toUpperCase()}</span><div style=${{flex:1}}><b>${c.name}</b><small>${ago(c.at)}</small><p>${c.text}</p></div>${stu&&html`<button class="x" aria-label="Hapus komentar" onClick=${()=>confirm('Hapus komentar ini?')&&onDel(c._id)}>×</button>`}</div>`):html`<p class="cs">Belum ada komentar. Jadilah yang pertama.</p>`}</div></section>`}

function App(){
 const[session,setSession]=useState(null);
 const[subs,setSubs]=useState([]);
 const[comments,setComments]=useState([]);
 const[mk,setMk]=useState([
   {id:1,s:1,n:'Pengantar Teknologi Informasi',c:0},
   {id:2,s:1,n:'Matematika Dasar',c:1},
   {id:3,s:1,n:'Bahasa Inggris',c:2},
   {id:4,s:2,n:'Algoritma dan Pemrograman',c:3},
   {id:5,s:2,n:'Basis Data',c:4}
 ]);
 const[sem,setSem]=useState(1);
 const[modal,setModal]=useState(null);
 const[ts,setTs]=useState([]);
 const[loading,setLoading]=useState(true);

 // Load submissions, mata kuliah, and comments from MongoDB
 useEffect(()=>{
   const loadData=async()=>{
     try{
       const [subsData, mkData, commentsData]=await Promise.all([
         apiCall('/api/submissions'),
         apiCall('/api/matakuliah'),
         apiCall('/api/comments')
       ]);
       setSubs(subsData);
       if(mkData.length>0){
         setMk(mkData.map(m=>({id:m._id,s:m.s,n:m.n,c:m.c||0})));
       }
       setComments(commentsData);
     }catch(e){
       console.error('Failed to load data:',e);
     }finally{
       setLoading(false);
     }
   };
   loadData();
 },[]);

 const subOf=(m,p)=>subs.find(s=>s.mk==m&&s.p==p);
 const mkOf=i=>mk.find(m=>m.id==i);
 
 const notify=(title,body,kind='ok')=>{const id=Math.random();setTs(t=>[...t,{id,title,body,kind}]);setTimeout(()=>setTs(t=>t.filter(x=>x.id!=id)),4800)};
 const ok=(a,b)=>session&&session.role=='mhs'&&notify(a,b);
 
 const saveSub=async(m,p,files,note)=>{
   try{
     const filesData=[];
     for(const file of files){
       const data=await toBase64(file);
       filesData.push({name:file.name,size:file.size,type:file.type,data});
     }
     
     const ex=subOf(m,p);
     if(ex){
       // Update existing
       const updatedFiles=[...(ex.files||[]),...filesData];
       await apiCall('/api/submissions',{
         method:'POST',
         body:JSON.stringify({...ex,files:updatedFiles,note,mk:m,p,tanggal:new Date().toISOString()})
       });
     }else{
       // Create new
       await apiCall('/api/submissions',{
         method:'POST',
         body:JSON.stringify({mk:m,p,files:filesData,note,nim:AKUN.nim,nama:AKUN.name,tanggal:new Date().toISOString()})
       });
     }
     
     // Reload submissions
     const data=await apiCall('/api/submissions');
     setSubs(data);
     setModal(null);
     ok(ex?'Perubahan disimpan':'Tugas berhasil dikumpulkan',mkOf(m).n+', pertemuan '+p);
   }catch(e){
     return'Gagal menyimpan ke database. Coba lagi.';
   }
 };
 
 const del=async d=>{
   if(d.k=='sub'){
     try{
       await apiCall('/api/delete-submission',{method:'DELETE',body:JSON.stringify({id:d.id})});
       const data=await apiCall('/api/submissions');
       setSubs(data);
       ok('Pengumpulan dihapus','Berkas sudah dihapus dari pertemuan ini.');
     }catch(e){
       notify('Gagal menghapus','Coba lagi.','err');
     }
   }else{
     // Delete mata kuliah from MongoDB
     try{
       await apiCall('/api/matakuliah',{method:'DELETE',body:JSON.stringify({id:d.id})});
       const toDelete=subs.filter(x=>x.mk==d.id);
       for(const s of toDelete){
         try{await apiCall('/api/delete-submission',{method:'DELETE',body:JSON.stringify({id:s._id})})}catch(e){}
       }
       setMk(m=>m.filter(x=>x.id!=d.id));
       const data=await apiCall('/api/submissions');
       setSubs(data);
       ok('Mata kuliah dihapus','Beserta semua tugas di dalamnya.');
     }catch(e){
       notify('Gagal menghapus MK','Coba lagi.','err');
     }
   }
   setModal(null);
 };

 const addComment=async(name,text)=>{
   try{
     await apiCall('/api/comments',{method:'POST',body:JSON.stringify({name,text})});
     const data=await apiCall('/api/comments');
     setComments(data);
     ok('Komentar terkirim','Terima kasih sudah memberi masukan.');
   }catch(e){
     notify('Gagal mengirim komentar','Coba lagi.','err');
   }
 };

 const delComment=async(id)=>{
   try{
     await apiCall('/api/comments',{method:'DELETE',body:JSON.stringify({id})});
     const data=await apiCall('/api/comments');
     setComments(data);
   }catch(e){
     notify('Gagal menghapus komentar','Coba lagi.','err');
   }
 };
 
 const T=html`<div class="tsts" aria-live="polite">${ts.map(t=>html`<div class=${'ts '+t.kind} key=${t.id}><span class="ti">${t.kind=='err'?'!':html`<${Check}/>`}</span><div><b>${t.title}</b><span>${t.body}</span></div><i></i></div>`)}</div>`;
 
 if(loading)return html`<div style=${{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>Loading...</div>`;
 
 if(!session)return html`<${Fragment}><${Login} onViewer=${()=>setSession({role:'viewer'})} onDos=${()=>setSession({role:'dos'})} onMhs=${()=>{setSession({role:'mhs'});notify('Berhasil masuk','Selamat datang kembali, '+AKUN.name.split(' ')[0]+'.')}}/>${T}<//>`;
 
 const list=mk.filter(m=>m.s==sem);
 const cnt=k=>subs.filter(x=>{const m=mkOf(x.mk);return m&&m.s==k}).length;
 const viewer=session.role=='viewer';
 const stu=session.role=='mhs';
 const dosen=session.role=='dos';
 const roleLabel=viewer?'Viewer':dosen?'Dosen pengampu':AKUN.name;
 
 return html`<${Fragment}><header><div class="wrap bar"><div class="logo"><b>P</b>${APP_NAME}</div><div class="who"><span>${roleLabel}</span><button class="btn g sm" onClick=${()=>setSession(null)}>Keluar</button></div></div></header>
 <main class="wrap"><section class="top"><h1>${stu?'Halo, '+AKUN.name.split(' ')[0]:viewer?'Dashboard Viewer':'Dashboard Dosen'}</h1>
 <p>${subs.length} tugas sudah dikumpulkan. ${stu?'Pilih semester, lalu ketuk nomor pertemuan untuk mengumpulkan tugas.':viewer?'Lihat tugas yang sudah dikumpulkan mahasiswa.':'Pilih semester, lalu ketuk nomor pertemuan yang berwarna untuk melihat dan mengunduh tugas.'}</p>
 <${Typing} text="Ini website pengumpulan tugas. Kumpulkan, cek, dan unduh tugas kuliah dengan mudah, semua dalam satu halaman."/></section>
 <nav class="sems">${[1,2,3,4,5,6,7,8].map(k=>html`<button key=${k} class="sem" aria-pressed=${sem==k} onClick=${()=>setSem(k)}>Semester ${k}${cnt(k)?html` <em>${cnt(k)}</em>`:''}</button>`)}</nav>
 <div class="grid">${list.length?list.map((m,i)=>{const n=subs.filter(s=>s.mk==m.id).length;return html`<section key=${m.id} class="mk" style=${{['--c']:CL[m.c],['--i']:i}}><div class="mh"><div><h3>${m.n}</h3><span>Semester ${m.s}</span></div>${stu&&html`<button class="x" aria-label=${'Hapus '+m.n} onClick=${()=>confirm('Yakin ingin hapus mata kuliah ini?')&&del({k:'mk',id:m.id})}>×</button>`}</div><div class="ps">${Array.from({length:P},(_,i)=>{const p=i+1,s=subOf(m.id,p),on=!!s;return html`<button key=${p} class=${'p'+(on?' on':'')} aria-label=${'Pertemuan '+p+(on?' (sudah ada tugas)':'')} onClick=${()=>setModal({t:'p',mk:m,p})}>${p}${on&&html`<${Check}/>`}</button>`})}</div>${n?html`<small class="inf" style=${{display:'block',marginTop:8,color:'var(--mu)',fontSize:13}}>${n} tugas sudah dikumpulkan</small>`:null}</section>`}):html`<p class="empty"><b>Belum ada mata kuliah di semester ${sem}</b>${stu?'Klik tombol di bawah untuk menambahkan mata kuliah.':'Mata kuliah akan muncul setelah mahasiswa menambahkannya.'}</p>`}</div>
 ${stu&&html`<button class="btn" style=${{marginTop:24}} onClick=${()=>setModal({t:'mk',sem})}>+ Tambah mata kuliah</button>`}
 ${modal&&modal.t=='p'&&html`<${PModal} mk=${modal.mk} p=${modal.p} sub=${subOf(modal.mk.id,modal.p)} stu=${stu} onClose=${()=>setModal(null)} onSave=${(f,n)=>saveSub(modal.mk.id,modal.p,f,n)} onDel=${()=>confirm('Yakin ingin hapus?')&&del({k:'sub',id:subOf(modal.mk.id,modal.p)._id})}/>`}
 ${modal&&modal.t=='mk'&&html`<${MkModal} sem=${modal.sem} onClose=${()=>setModal(null)} onAdd=${async(n,s)=>{const newMk={s,n,c:Math.floor(Math.random()*CL.length)};try{const result=await apiCall('/api/matakuliah',{method:'POST',body:JSON.stringify(newMk)});setMk(m=>[...m,{id:result._id,s:result.s,n:result.n,c:result.c}]);setModal(null);notify('Mata kuliah ditambahkan',n)}catch(e){notify('Gagal menambah MK','Coba lagi.','err')}}}/>`}
 <${Comments} list=${comments} stu=${stu} onAdd=${addComment} onDel=${delComment}/>
 </main><footer><div class="wrap"><p>Website pengumpulan tugas kuliah oleh ${AKUN.name.split(' ')[0]}</p><div class="soc">${SOS.map(x=>html`<a key=${x.k} href=${x.u} target="_blank" rel="noopener" aria-label=${x.n}><${Ico} k=${x.k}/></a>`)}</div></div></footer>${T}<//>`;
}

ReactDOM.render(html`<${App}/>`,document.getElementById('root'));
