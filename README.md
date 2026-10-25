# UshayPro · Pack de marca y marketing

Versión 2.1 · 25 de octubre de 2026 · Proveedores + Estado.

**Empieza abriendo `index.html`.** Es el catálogo visual del pack y funciona con archivos locales. El manual incluido conserva sus 28 páginas.

## Qué contiene

| Carpeta / archivo | Para qué sirve |
|---|---|
| `manual/` | Manual PDF de 28 páginas, fuente HTML/CSS editable y portada |
| `logos/` | 20 SVG trazados y 20 PNG transparentes; UshayPro y Estado |
| `agentes/` | 13 formas, 4 variantes por forma, SVG/PNG y muestra de movimiento |
| `plantillas/` | 6 composiciones; 10 SVG editables y 10 PNG, incluido un carrusel de 5 láminas |
| `fuentes/` | Archivo, IBM Plex Mono e Inter; archivos locales y licencias |
| `mensajes.md` | Mensajes y textos base para campañas |
| `tokens.json` | Colores, familias tipográficas y reglas de geometría |
| `referencias/` | Decisiones, contrastes y validación del pack |
| `scripts/` | Fuentes de generación y comandos para reconstruir el pack |
| `manifest.json` | Inventario con tamaño y SHA-256 de cada archivo |

## Uso rápido

1. Elige público: proveedores o Estado.
2. Usa el logo adecuado al fondo. `claro` = tinta sobre fondo claro; `oscuro` = blanco con azul para fondo oscuro. Ambos archivos tienen fondo transparente.
3. Para editar un mensaje, abre un SVG de `plantillas/` en tu editor vectorial. Instala Archivo desde `fuentes/` si el editor no interpreta la fuente incrustada.
4. Para colocar el logo o un glifo sin editar, usa el SVG o el PNG. Los logos están trazados y no requieren fuentes.
5. Conserva el contexto de demostración y revisa que el mensaje corresponda al alcance disponible antes de publicar.

## Decisiones de marca

- U de 11 bloques; dos acentos azules `#1A73E8`; tinta `#0E1116` y papel `#F6F5F2`.
- Una marca para ambos públicos. Estado añade descriptor, sin símbolo ni paleta independientes.
- Archivo en marketing; IBM Plex Mono en datos breves. Inter se conserva como referencia del kit de aplicación.
- El modelo de agentes es provisional e ilustrativo: responsabilidad describe al agente; skill describe una tarea. El glifo puede cambiar con la skill que se representa. La estructura no define el catálogo final ni implica un modelo de lenguaje separado por agente.
- Las 13 formas expresan funciones, tareas y estados. No equivalen a 13 agentes comerciales independientes.

## Edición y reconstrucción

El manual incluido conserva 28 páginas. Las páginas fuente se redactan en `scripts/build.mjs`; las plantillas se generan en `scripts/build-pack.mjs`. Geometrías en `scripts/formas-maestras.json` y `agentes/formas.json`.

Para regenerar con Node.js, Playwright y Sharp instalados: `npm install` y `npm run build`. El navegador Chromium de Playwright debe estar instalado (`npx playwright install chromium`). Para reconstruir los trazados del logotipo desde las fuentes se requieren Python con `fonttools` y `brotli`, y `python scripts/prepare-fonts.py`.

El pack no incluye una integración Figma/Canva ni un video renderizado. Las plantillas son archivos SVG editables; la portada de story es una pieza estática. `agentes/movimiento.html` muestra transformaciones de los bloques sin ejecutar tareas de IA.

UshayPro es un proyecto independiente, sin afiliación ni respaldo del SERCOP. Las fuentes tipográficas conservan sus licencias SIL OFL. La versión 2.1 está preparada para revisión y publicación; esta nota no afirma que ya se haya publicado.
