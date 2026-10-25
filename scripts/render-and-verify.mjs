import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright'),sharp=require('sharp');
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const QA=path.join(process.env.TMPDIR||'/tmp','ushaypro-brand-review');fs.mkdirSync(QA,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chromium'});
try{
 const page=await browser.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const folder of ['logos','agentes/svg']){
  for(const name of fs.readdirSync(path.join(ROOT,folder)).filter(n=>n.endsWith('.svg'))){
   const dest=folder==='logos'?path.join(ROOT,folder,name.replace('.svg','.png')):path.join(ROOT,'agentes/png',name.replace('.svg','.png'));
   fs.mkdirSync(path.dirname(dest),{recursive:true});
   await sharp(path.join(ROOT,folder,name)).resize({width:1200}).png().toFile(dest);
  }
 }
 for(const name of fs.readdirSync(path.join(ROOT,'plantillas')).filter(n=>n.endsWith('.svg'))){
  const f=path.join(ROOT,'plantillas',name);const svg=fs.readFileSync(f,'utf8'),m=svg.match(/width="(\d+)" height="(\d+)"/);const width=+m[1],height=+m[2];
  await page.setViewportSize({width,height});await page.setContent('<!doctype html><html><body style="margin:0"><img style="display:block" width="'+width+'" height="'+height+'" src="data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64')+'"></body></html>');await page.waitForFunction(()=>document.images[0].complete);
  await page.screenshot({path:f.replace('.svg','.png'),fullPage:true});console.log('Template '+name);
 }
 console.log('Exported logos, glyphs and templates');
 await page.setViewportSize({width:1200,height:1100});await page.emulateMedia({media:'print'});await page.goto(pathToFileURL(path.join(ROOT,'manual/ushaypro-manual-marca-v2.html')).href);await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
 const metrics=await page.evaluate(()=>[...document.querySelectorAll('.page')].map((el,i)=>{
  const r=el.getBoundingClientRect(),foot=el.querySelector('footer').getBoundingClientRect();let bottom=r.top;
  const bad=[];for(const n of el.querySelectorAll('.content p,.content h1,.content h2,.content h3,.content td,.content li,.content img,.content .thumb,.content .panel,.content .mini-ad,.content .agent-card')){const nr=n.getBoundingClientRect();bottom=Math.max(bottom,nr.bottom);if(nr.bottom>foot.top-8||nr.right>r.right-20||nr.left<r.left+20)bad.push({tag:n.tagName,text:n.textContent.slice(0,65),bottom:Math.round(nr.bottom-r.top),limit:Math.round(foot.top-r.top)})}
  for(const box of el.querySelectorAll('.mini-ad,.thumb,.panel')){const br=box.getBoundingClientRect();for(const child of box.querySelectorAll('p,.title,.ad-foot,h3')){const cr=child.getBoundingClientRect();if(cr.bottom>br.bottom+1)bad.push({text:child.textContent.slice(0,65),issue:'internal container clipping'})}}
  return {page:i+1,title:el.getAttribute('aria-label'),bottom:Math.round(bottom-r.top),footer:Math.round(foot.top-r.top),bad};
 }));
 fs.writeFileSync(path.join(QA,'layout.json'),JSON.stringify(metrics,null,2));
 for(let i=0;i<28;i++)await page.locator('.page').nth(i).screenshot({path:path.join(QA,`page-${String(i+1).padStart(2,'0')}.png`)});
 await page.locator('.page').first().screenshot({path:path.join(ROOT,'manual/portada.png')});
 await page.pdf({path:path.join(ROOT,'manual/ushaypro-manual-marca-v2.pdf'),width:'8.5in',height:'11in',printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false,tagged:true});
 console.log(JSON.stringify({pages:metrics.length,layoutIssues:metrics.filter(m=>m.bad.length),errors}));
 // Motion verifies identity and color conservation after selecting each shape.
 await page.emulateMedia({media:'screen'});await page.goto(pathToFileURL(path.join(ROOT,'agentes/movimiento.html')).href);await page.evaluate(()=>document.fonts.ready);
 const motion=[];for(const key of Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT,'agentes/formas.json'),'utf8')))){await page.locator(`[data-shape="${key}"]`).click();await page.waitForTimeout(850);motion.push(await page.evaluate(()=>({shape:window.brandMotion.current,blocks:document.querySelectorAll('#morph rect').length,blue:[...document.querySelectorAll('#morph rect')].filter(r=>r.getAttribute('fill')==='#1A73E8').length,pressed:document.querySelectorAll('[data-shape][aria-pressed="true"]').length})))}
 await page.locator('#play').click();await page.waitForTimeout(2300);const playing=await page.evaluate(()=>window.brandMotion.playing);await page.locator('#play').click();const paused=await page.evaluate(()=>!window.brandMotion.playing);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(150);await page.locator('[data-shape="dialogo"]').click();const reduced=await page.evaluate(()=>({disabled:document.querySelector('#play').disabled,transition:getComputedStyle(document.querySelector('#morph rect')).transitionDuration,blocks:document.querySelectorAll('#morph rect').length}));
 await page.screenshot({path:path.join(QA,'motion-desktop.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(QA,'motion-mobile.png'),fullPage:true});
 const motionWidth=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
 await page.goto(pathToFileURL(path.join(ROOT,'index.html')).href);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(QA,'catalog-mobile.png'),fullPage:true});const catalogWidth=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
 await page.setViewportSize({width:1440,height:1100});await page.screenshot({path:path.join(QA,'catalog-desktop.png'),fullPage:true});
 const images=await page.evaluate(()=>[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
 const result={date:'2026-10-25',manualPages:metrics.length,layoutIssues:metrics.filter(m=>m.bad.length),javascriptErrors:errors,motion,playback:{playing,paused},reduced,motionWidth,catalogWidth,brokenImages:images};
 fs.writeFileSync(path.join(ROOT,'referencias/verificacion-automatica.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify({motion,playing,paused,reduced,motionWidth,catalogWidth,brokenImages:images}));
 if(result.layoutIssues.length||errors.length||images.length||!playing||!paused||!reduced.disabled||reduced.transition!=='0s'||motionWidth.width!==motionWidth.scrollWidth||catalogWidth.width!==catalogWidth.scrollWidth||motion.some(m=>m.blocks!==11||m.blue!==2||m.pressed!==1))throw Error('Artifact verification failed; see referencias/verificacion-automatica.json');
}finally{await browser.close()}
