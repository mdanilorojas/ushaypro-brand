import json, pathlib
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
ROOT=pathlib.Path(__file__).resolve().parents[1]
font=TTFont(ROOT/'fuentes/archivo-latin.woff2')
result={}
for weight,label in [(400,'regular'),(600,'semibold'),(700,'bold')]:
    f=instantiateVariableFont(font,{'wght':weight},inplace=False)
    f.flavor=None
    style={'regular':'Regular','semibold':'SemiBold','bold':'Bold'}[label]
    for nid,value in [(1,'Archivo'),(2,style),(4,'Archivo '+style),(6,'Archivo-'+style),(16,'Archivo'),(17,style)]:
        f['name'].setName(value,nid,3,1,0x409)
        f['name'].setName(value,nid,1,0,0)
    f.save(ROOT/f'fuentes/Archivo-{label}.ttf')
    glyphs=f.getGlyphSet(); cmap=f.getBestCmap(); units=f['head'].unitsPerEm
    texts={}
    for text in ['Ushay','Pro','Estado']:
        x=0; paths=[]
        for char in text:
            gname=cmap[ord(char)]; pen=SVGPathPen(glyphs); glyphs[gname].draw(pen)
            paths.append({'d':pen.getCommands(),'x':x})
            x+=f['hmtx'][gname][0]
        texts[text]={'paths':paths,'width':x,'units':units}
    result[str(weight)]=texts
(ROOT/'scripts/wordmark-paths.json').write_text(json.dumps(result))
print('Archivo static TTF and outlined wordmark data ready')

plex=TTFont(ROOT/'fuentes/plex-mono-latin.woff2')
plex.flavor=None
plex.save(ROOT/'fuentes/IBM-Plex-Mono-Regular.ttf')
