import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?e.name==='node_modules'?[]:walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk(ROOT).filter(f=>!['manifest.json'].includes(path.basename(f))&&!f.endsWith('.DS_Store')).sort();
const missing=[];for(const file of files.filter(f=>f.endsWith('.html')&&!f.includes('referencias/'))){const html=fs.readFileSync(file,'utf8');for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const ref=m[1];if(/^(https?:|data:|#|mailto:)/.test(ref))continue;const target=path.resolve(path.dirname(file),decodeURIComponent(ref.split('#')[0]));if(target!==path.join(ROOT,'manifest.json')&&!fs.existsSync(target))missing.push({file:path.relative(ROOT,file),target:ref})}}
if(missing.length)throw Error('Broken local links: '+JSON.stringify(missing));
const result={brand:'UshayPro',version:'2.1',date:'2026-10-25',audiences:['Proveedores','Estado'],files:files.map(f=>({path:path.relative(ROOT,f),bytes:fs.statSync(f).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')}))};
fs.writeFileSync(path.join(ROOT,'manifest.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({files:files.length,bytes:result.files.reduce((a,f)=>a+f.bytes,0),brokenLinks:missing.length}));
