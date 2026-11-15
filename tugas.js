const{useState,useEffect,useRef,Fragment}=React;
const h=(t,p,...c)=>{if(p&&typeof t=='string'){p={...p};if('class'in p){p.className=p.class;delete p.class}if('for'in p){p.htmlFor=p.for;delete p.for}}return React.createElement(t,p,...c)};
const html=htm.bind(h);
const KEY='tugasku-v4',P=16,CL=['#4f46e5','#0d9488','#e8590c','#d6336c','#1c7ed6','#b7791f'];
/* GANTI: akun mahasiswa (hanya satu) */
const AKUN={nim:'240511102',name:'Fairuz Triharyadi',pw:'Papoi123'};
/* GANTI: tautan media sosial kamu */
const SOS=[{k:'in',n:'LinkedIn',u:'https://www.linkedin.com/in/username-kamu'},{k:'ig',n:'Instagram',u:'https://www.instagram.com/username_kamu'},{k:'tt',n:'TikTok',u:'https://www.tiktok.com/@username_kamu'}];
const DBP=new Promise((ok,no)=>{try{const r=indexedDB.open('tugasku',1);r.onupgradeneeded=()=>r.result.createObjectStore('f');r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)}catch(e){no(e)}});DBP.catch(()=>{});
const idb=async(m,fn)=>{const d=await DBP;return new Promise((ok,no)=>{const t=d.transaction('f',m),r=fn(t.objectStore('f'));t.oncomplete=()=>ok(r.result);t.onerror=()=>no(t.error)})};
const fput=(k,b)=>idb('readwrite',s=>s.put(b,k)),fget=k=>idb('readonly',s=>s.get(k)),fdel=k=>idb('readwrite',s=>s.delete(k));
const load=()=>{let s=null;try{s=JSON.parse(localStorage.getItem(KEY))}catch(e){}
 s=s||{session:null,mk:[{id:1,s:1,n:'Pengantar Teknologi Informasi',c:0},{id:2,s:1,n:'Matematika Dasar',c:1},{id:3,s:1,n:'Bahasa Inggris',c:2},{id:4,s:2,n:'Algoritma dan Pemrograman',c:3},{id:5,s:2,n:'Basis Data',c:4}],subs:[]};
 s.comments=s.comments||[];return s};
const fmt=ts=>new Date(ts).toLocaleString('id-ID',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
const sz=b=>b>1e6?(b/1e6).toFixed(1)+' MB':Math.max(1,Math.round(b/1e3))+' KB';
const ago=ts=>{const m=Math.floor((Date.now()-ts)/6e4);return m<1?'baru saja':m<60?m+' menit lalu':m<1440?Math.floor(m/60)+' jam lalu':Math.floor(m/1440)+' hari lalu'};
const OKX=/\.(pdf|docx|pptx|xlsx|zip|jpe?g|png|txt)$/i;
const Check=()=>html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const Ico=({k})=>html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${k=='in'?html`<path d="M4 9h3v11H4zM5.5 4a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM10 9h2.9v1.6c.5-.9 1.6-1.8 3.3-1.8 3.2 0 3.8 2.1 3.8 4.9V20h-3v-5.6c0-1.3 0-3-1.800-3s-2.100 1.400-2.100 2.900V20h-3z"/>`:k=='ig'?html`<g fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/></g><circle cx="17.2" cy="6.8" r="1.2"/>`:html`<path d="M16.500 3c.3 2.300 1.700 3.800 4 4v3c-1.500 0-2.900-.5-4-1.3V15a6 6 0 11-6-6c.3 0 .7 0 1 .1v3.200a2.900 2.900 0 102 2.700V3z"/>`}</svg>`;

function Typing({text}){const[n,setN]=useState(-1);
 useEffect(()=>{let iv;const t=setTimeout(()=>{iv=setInterval(()=>setN(x=>{if(x+1>=text.length)clearInterval(iv);return x+1}),32)},1900);return()=>{clearTimeout(t);clearInterval(iv)}},[text]);
 return html`<div class="bub" aria-label=${text}><span class="av">T</span>${n<0?html`<span class="dots"><span></span><span></span><span></span></span>`:html`<span>${text.slice(0,n)}${n<text.length&&html`<i class="cr"></i>`}</span>`}</div>`}

function Modal({children,onClose}){useEffect(()=>{const k=e=>e.key=='Escape'&&onClose();addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
 return html`<div class="ov" onClick=${e=>e.target==e.currentTarget&&onClose()}><div class="md" role="dialog" aria-modal="true">${children}</div></div>`}

function Login({onDos,onMhs}){const[r,setR]=useState(null),[n,setN]=useState(''),[p,setP]=useState(''),[e,setE]=useState('');
 const go=()=>n.trim()!=AKUN.nim||p!=AKUN.pw?setE('NIM atau kata sandi salah. Periksa lagi lalu coba masuk kembali.'):onMhs();
 const key=ev=>ev.key=='Enter'&&go();
 return html`<div class="lg"><section class="art"><div class="logo"><b>T</b>Tugasku</div><div><h1>Kumpulkan tugas tepat waktu, tanpa ribet.</h1>
 <div style=${{marginTop:18}}><${Typing} text="Ini website tugas. Pilih semester, ketuk pertemuan, dan tugasmu langsung terkirim ke dosen."/></div>
 <div class="stack"><div class="sheet s1"><i></i><i></i><i></i></div><div class="sheet s2"><i></i><i></i><i></i></div><div class="sheet s3"><i></i><i></i><i></i><span class="stamp">Terkumpul</span></div></div></div><span></span></section>
 <section class="pn"><h2>Selamat datang</h2><p>Pilih peran untuk melanjutkan.</p>
 <div class="roles"><button class="role" onClick=${onDos}><b>Dosen</b><span>Langsung masuk, tanpa kata sandi</span></button>
 <button class="role" aria-pressed=${r=='m'} onClick=${()=>setR('m')}><b>Mahasiswa</b><span>Masuk dengan NIM dan kata sandi</span></button></div>
 ${r=='m'&&html`<div class="f"><label for="lN">NIM</label><input id="lN" autofocus inputmode="numeric" autocomplete="username" value=${n} onChange=${x=>setN(x.target.value)} onKeyDown=${key}/></div>
 <div class="f"><label for="lP">Kata sandi</label><input id="lP" type="password" autocomplete="current-password" value=${p} onChange=${x=>setP(x.target.value)} onKeyDown=${key}/></div>
 <div class="err" role="alert">${e}</div><button class="btn" style=${{width:'100%'}} onClick=${go}>Masuk</button>`}</section></div>`}

function PModal({mk,p,sub,stu,onClose,onSave,onDel,onDl}){
 const[files,setFiles]=useState([]),[note,setNote]=useState(sub?sub.note||'':''),[err,setErr]=useState(''),[on,setOn]=useState(false),[busy,setBusy]=useState(false),inp=useRef();
 const pickFiles=fl=>{setErr('');const arr=Array.from(fl);for(const f of arr){if(f.size>10485760){setErr('Ukuran berkas melebihi 10 MB. Kompres lalu coba lagi.');return}if(!OKX.test(f.name)){setErr('Format tidak didukung. Gunakan PDF, DOCX, PPTX, XLSX, ZIP, JPG, PNG, atau TXT.');return}}setFiles(prev=>[...prev,...arr])};
 const rmFile=idx=>setFiles(prev=>prev.filter((_,i)=>i!==idx));
 const save=async()=>{if(!sub&&files.length===0)return setErr('Pilih berkas tugas terlebih dahulu.');setBusy(true);const e=await onSave(files,note);if(e){setErr(e);setBusy(false)}};
 const preview=async(f)=>{const url=URL.createObjectURL(f);window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),3000)};
 const previewSub=async(fileData)=>{try{const b=await fget(fileData.id);if(!b)throw 0;const url=URL.createObjectURL(b);window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),3000)}catch(e){alert('Gagal membuka file')}};
 const dlSub=async(fileData)=>{try{const b=await fget(fileData.id);if(!b)throw 0;const url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=fileData.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500)}catch(e){alert('Gagal mengunduh file')}};
 return html`<${Modal} onClose=${onClose}><div class="dh"><h2>Pertemuan ${p}</h2><p>${mk.n}, semester ${mk.s}</p></div><div class="db">
 ${sub&&sub.files&&sub.files.length>0?html`<div class="cur"><b>${sub.files.length} berkas terkumpul</b><br/><small>dikumpulkan ${fmt(sub.at)}</small>${sub.note&&html`<br/>Catatan: ${sub.note}`}<div style=${{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>${sub.files.map(f=>html`<div key=${f.id} style=${{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 10px',background:'#f9fafb',borderRadius:8,fontSize:13}}><span style=${{flex:1,minWidth:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>${f.name} (${sz(f.size)})</span><div style=${{display:'flex',gap:6}}><button onClick=${()=>previewSub(f)} title="Preview" style=${{border:'none',background:'#4338ca',color:'white',borderRadius:6,padding:'4px 10px',cursor:'pointer',fontSize:16}}>👁</button><button onClick=${()=>dlSub(f)} title="Download" style=${{border:'none',background:'#0d9488',color:'white',borderRadius:6,padding:'4px 10px',cursor:'pointer',fontSize:16}}>⬇</button></div></div>`)}</div></div>`:sub?html`<div class="cur">Berkas belum diupload</div>`:!stu&&html`<div class="cur">Belum ada tugas yang dikumpulkan untuk pertemuan ini.</div>`}
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

function Comments({list,stu,onAdd,onDel}){const[name,setName]=useState(stu?AKUN.name:''),[text,setText]=useState(''),[e,setE]=useState('');
 const send=()=>{if(!name.trim()||!text.trim())return setE('Nama dan komentar wajib diisi.');onAdd(name.trim(),text.trim());setText('');setE('')};
 return html`<section class="cm"><h2>Komentar</h2><p class="cs">Tinggalkan pesan atau saran untuk website ini.</p>
 <div class="two"><div class="f"><label for="cn">Nama</label><input id="cn" maxLength="40" value=${name} onChange=${x=>setName(x.target.value)}/></div></div>
 <div class="f"><label for="ct">Komentar</label><textarea id="ct" rows="3" maxLength="400" value=${text} onChange=${x=>setText(x.target.value)}></textarea></div>
 <div style=${{display:'flex',gap:12,alignItems:'center'}}><button class="btn" onClick=${send}>Kirim komentar</button><span class="err" role="alert" style=${{margin:0}}>${e}</span></div>
 <div class="cl">${list.length?list.slice().sort((a,b)=>b.at-a.at).map(c=>html`<div class="ci" key=${c.id}><span class="av" style=${{background:CL[c.name.length%6]}}>${c.name[0].toUpperCase()}</span><div style=${{flex:1}}><b>${c.name}</b><small>${ago(c.at)}</small><p>${c.text}</p></div>${stu&&html`<button class="x" aria-label="Hapus komentar" onClick=${()=>onDel(c.id)}>×</button>`}</div>`):html`<p class="cs">Belum ada komentar. Jadilah yang pertama.</p>`}</div></section>`}

function App(){
 const[S,setS]=useState(load),[sem,setSem]=useState(1),[modal,setModal]=useState(null),[ts,setTs]=useState([]);
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}},[S]);
 const stu=!!S.session&&S.session.role=='mhs',subOf=(m,p)=>S.subs.find(s=>s.mk==m&&s.p==p),mkOf=i=>S.mk.find(m=>m.id==i);
 const notify=(title,body,kind='ok')=>{const id=Math.random();setTs(t=>[...t,{id,title,body,kind}]);setTimeout(()=>setTs(t=>t.filter(x=>x.id!=id)),4800)};
 const ok=(a,b)=>stu&&notify(a,b);
 const saveSub=async(m,p,files,note)=>{const ex=subOf(m,p),id=ex?ex.id:Date.now();
  const savedFiles=ex&&ex.files?[...ex.files]:[];
  if(files&&files.length>0){
   for(const file of files){
    const fid=Date.now()+Math.random().toString(36).slice(2);
    try{await fput(fid,file)}catch(e){return'Berkas gagal disimpan di browser ini. Coba berkas yang lebih kecil.'}
    savedFiles.push({id:fid,name:file.name,size:file.size,type:file.type})
   }
  }
  setS(s=>({...s,subs:ex?s.subs.map(x=>x.id==id?{...x,note,files:savedFiles,at:Date.now()}:x):[...s.subs,{id,mk:m,p,files:savedFiles,at:Date.now(),note}]}));
  setModal(null);ok(ex?'Perubahan disimpan':'Tugas berhasil dikumpulkan',mkOf(m).n+', pertemuan '+p)};
 const del=async d=>{if(d.k=='sub'){const s=S.subs.find(x=>x.id==d.id);if(s&&s.files){for(const f of s.files)await fdel(f.id).catch(()=>{})}setS(s=>({...s,subs:s.subs.filter(x=>x.id!=d.id)}));ok('Pengumpulan dihapus','Berkas sudah dihapus dari pertemuan ini.')}
  else{for(const x of S.subs.filter(x=>x.mk==d.id)){if(x.files)for(const f of x.files)await fdel(f.id).catch(()=>{})}setS(s=>({...s,subs:s.subs.filter(x=>x.mk!=d.id),mk:s.mk.filter(x=>x.id!=d.id)}));ok('Mata kuliah dihapus','Beserta semua tugas di dalamnya.')}setModal(null)};
 const T=html`<div class="tsts" aria-live="polite">${ts.map(t=>html`<div class=${'ts '+t.kind} key=${t.id}><span class="ti">${t.kind=='err'?'!':html`<${Check}/>`}</span><div><b>${t.title}</b><span>${t.body}</span></div><i></i></div>`)}</div>`;
 if(!S.session)return html`<${Fragment}><${Login} onDos=${()=>setS(s=>({...s,session:{role:'dos'}}))} onMhs=${()=>{setS(s=>({...s,session:{role:'mhs'}}));notify('Berhasil masuk','Selamat datang kembali, '+AKUN.name.split(' ')[0]+'.')}}/>${T}<//>`;
 const list=S.mk.filter(m=>m.s==sem),cnt=k=>S.subs.filter(x=>{const m=mkOf(x.mk);return m&&m.s==k}).length;
 return html`<${Fragment}><header><div class="wrap bar"><div class="logo"><b>T</b>Tugasku</div><div class="who"><span>${stu?AKUN.name:'Dosen pengampu'}</span><button class="btn g sm" onClick=${()=>setS(s=>({...s,session:null}))}>Keluar</button></div></div></header>
 <main class="wrap"><section class="top"><h1>${stu?'Halo, '+AKUN.name.split(' ')[0]:'Dashboard dosen'}</h1>
 <p>${S.subs.length} tugas sudah dikumpulkan. ${stu?'Pilih semester, lalu ketuk nomor pertemuan untuk mengumpulkan tugas.':'Pilih semester, lalu ketuk nomor pertemuan yang berwarna untuk melihat dan mengunduh tugas.'}</p>
 <${Typing} text="Ini website tugas. Kumpulkan, cek, dan unduh tugas kuliah dengan mudah, semua dalam satu halaman."/></section>
 <nav class="sems" aria-label="Semester">${[1,2,3,4,5,6,7,8].map(k=>html`<button key=${k} class="sem" aria-pressed=${k==sem} onClick=${()=>setSem(k)}>Semester ${k}${cnt(k)>0&&html`<em>${cnt(k)}</em>`}</button>`)}</nav>
 <div class="grid">${list.map((m,i)=>{const n=S.subs.filter(x=>x.mk==m.id).length;return html`<article class="mk" key=${m.id} style=${{'--c':CL[m.c%6],'--i':i}}><div class="mh"><div><h3>${m.n}</h3><span>${n} dari ${P} pertemuan terkumpul</span></div>${stu&&html`<button class="x" aria-label=${'Hapus mata kuliah '+m.n} onClick=${()=>setModal({t:'del',k:'mk',id:m.id,txt:'Mata kuliah '+m.n+' beserta semua tugas di dalamnya akan dihapus.'})}>×</button>`}</div>
 <i class="pb"><u style=${{width:n/P*100+'%'}}></u></i><div class="ps">${Array.from({length:P},(_,j)=>j+1).map(p=>html`<button key=${p} class=${'p'+(subOf(m.id,p)?' on':'')} aria-label=${'Pertemuan '+p+(subOf(m.id,p)?', terkumpul':'')} onClick=${()=>setModal({t:'p',m:m.id,p})}>${p}</button>`)}</div></article>`})}
 ${stu&&html`<button class="mk add" style=${{'--i':list.length}} onClick=${()=>setModal({t:'mk'})}>+ Tambah mata kuliah</button>`}</div>
 ${!list.length&&!stu&&html`<div class="empty" style=${{marginBottom:40}}><b>Belum ada mata kuliah di semester ini</b>Mata kuliah akan muncul setelah ditambahkan mahasiswa.</div>`}
 <${Comments} list=${S.comments} stu=${stu} onAdd=${(name,text)=>{setS(s=>({...s,comments:[...s.comments,{id:Date.now(),name,text,at:Date.now()}]}));ok('Komentar terkirim','Terima kasih sudah memberi masukan.')}} onDel=${id=>setS(s=>({...s,comments:s.comments.filter(c=>c.id!=id)}))}/></main>
 <footer><div class="wrap fo"><div><b>Tugasku</b><small>Dibuat dengan React untuk pengumpulan tugas kuliah.</small></div><div class="soc">${SOS.map(o=>html`<a key=${o.k} href=${o.u} target="_blank" rel="noopener noreferrer" aria-label=${o.n} title=${o.n}><${Ico} k=${o.k}/></a>`)}</div></div></footer>
 ${modal&&modal.t=='p'&&html`<${PModal} mk=${mkOf(modal.m)} p=${modal.p} sub=${subOf(modal.m,modal.p)} stu=${stu} onClose=${()=>setModal(null)} onSave=${(fs,n)=>saveSub(modal.m,modal.p,fs,n)} onDel=${()=>{const s=subOf(modal.m,modal.p);setModal({t:'del',k:'sub',id:s.id,txt:'Berkas pada pertemuan '+modal.p+' akan dihapus.'})}}/>`}
 ${modal&&modal.t=='mk'&&html`<${MkModal} sem=${sem} onClose=${()=>setModal(null)} onAdd=${(n,s)=>{setS(x=>({...x,mk:[...x.mk,{id:Date.now(),s,n,c:x.mk.length%6}]}));setSem(s);setModal(null);ok('Mata kuliah ditambahkan',n+', semester '+s)}}/>`}
 ${modal&&modal.t=='del'&&html`<${Modal} onClose=${()=>setModal(null)}><div class="dh"><h2>Hapus?</h2><p>${modal.txt}</p></div><div class="df" style=${{paddingTop:20}}><button class="btn g" onClick=${()=>setModal(null)}>Batal</button><button class="btn r" onClick=${()=>del(modal)}>Ya, hapus</button></div><//>`}
 ${T}<//>`}
ReactDOM.createRoot(document.getElementById('root')).render(html`<${App}/>`);
