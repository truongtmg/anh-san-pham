(async()=>{const L=(await (await fetch('https://raw.githubusercontent.com/truongtmg/anh-san-pham/main/banner-src/tmp-dl.json',{cache:'no-store'})).json()).filter(x=>new URL(x[1]).host==location.host);
const T=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;T[n]=c>>>0;}
const crc=d=>{let c=0xFFFFFFFF;for(let i=0;i<d.length;i++)c=T[(c^d[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0;};
const parts=[],cen=[];let off=0,cnt=0;const enc=new TextEncoder();const out=[];
for(const [nm0,u] of L){try{const r=await fetch(u);if(!r.ok){out.push(nm0+':'+r.status);continue;}const bl=await r.blob();const ext=(bl.type.split('/')[1]||'bin').replace('jpeg','jpg');const nm=nm0+'.'+ext;const d=new Uint8Array(await bl.arrayBuffer());const n=enc.encode(nm);const c=crc(d);
const h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint32(14,c,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,n.length,true);parts.push(new Uint8Array(h.buffer),n,d);
const ch=new DataView(new ArrayBuffer(46));ch.setUint32(0,0x02014b50,true);ch.setUint16(4,20,true);ch.setUint16(6,20,true);ch.setUint32(16,c,true);ch.setUint32(20,d.length,true);ch.setUint32(24,d.length,true);ch.setUint16(28,n.length,true);ch.setUint32(42,off,true);cen.push(new Uint8Array(ch.buffer),n);off+=30+n.length+d.length;cnt++;}catch(e){out.push(nm0+':ERR')}}
let cs=0;cen.forEach(x=>cs+=x.length);const e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,cnt,true);e.setUint16(10,cnt,true);e.setUint32(12,cs,true);e.setUint32(16,off,true);
if(cnt){const b=new Blob([...parts,...cen,new Uint8Array(e.buffer)],{type:'application/zip'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='dl_'+location.host.replace(/\./g,'_')+'.zip';document.body.appendChild(a);a.click();}
return (location.host+' ok '+cnt+'/'+L.length+' '+out.join(' ')).replace(/[?=&%]/g,'_')})()
