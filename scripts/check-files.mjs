import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const sharp=require('sharp'),ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const issues=[];let transparent=0;const images=walk(ROOT).filter(f=>f.endsWith('.png')&&!f.includes('/manual/'));
for(const f of images){const meta=await sharp(f).metadata();if(f.includes('/plantillas/')){const svg=fs.readFileSync(f.replace('.png','.svg'),'utf8'),m=svg.match(/width="(\d+)" height="(\d+)"/);if(meta.width!==+m[1]||meta.height!==+m[2])issues.push('wrong dimensions '+f)}else{const s=await sharp(f).stats();if(!meta.hasAlpha||s.channels[3].min!==0||s.channels[3].max!==255)issues.push('invalid transparency '+f);else transparent++}}
const logos=walk(path.join(ROOT,'logos')).filter(f=>f.endsWith('.svg'));
for(const f of logos){const s=fs.readFileSync(f,'utf8');if(/<text|<image|@font-face/.test(s))issues.push('logo not outlined '+f);if((s.match(/data-block=/g)||[]).length!==11)issues.push('logo blocks '+f)}
const shapes=JSON.parse(fs.readFileSync(path.join(ROOT,'agentes/formas.json')));for(const [k,f] of Object.entries(shapes))if(f.celdas.length!==11||new Set(f.celdas.map(c=>c.join(','))).size!==11||f.azules.length!==2)issues.push('bad shape '+k);
const result={images:images.length,transparentPNGs:transparent,outlinedLogos:logos.length,masterShapes:Object.keys(shapes).length,templates:images.filter(f=>f.includes('/plantillas/')).length,issues};
fs.writeFileSync(path.join(ROOT,'referencias/verificacion-archivos.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));if(issues.length)process.exitCode=1;
