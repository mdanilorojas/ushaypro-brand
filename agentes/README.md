# Agentes, skills y formas

Modelo provisional para comunicar funciones. La agrupación es ilustrativa; la estructura y adscripción finales siguen abiertas.

- **Agente** = responsabilidad de trabajo.
- **Skill** = tarea que el agente realiza o acompaña.
- El glifo puede cambiar con la skill representada. Un glifo no crea otro agente.
- Los agentes podrían compartir un modelo base; esta organización no presupone un LLM separado por agente.

Abre `movimiento.html` para explorar las formas y el recorrido animado. Funciona localmente y respeta la preferencia de movimiento reducido.

- `formas.json`: geometría consolidada de 13 formas.
- `catalogo.json`: catálogo de muestra, mensajes, alcance y ejemplos de ambos públicos.
- `svg/`: 52 originales (13 formas × 4 variantes).
- `png/`: 52 PNG transparentes de 1200 × 1200 px.

Variantes: `claro` (tinta y azul), `oscuro` (blanco y azul), `negro` (una tinta), `blanco` (una tinta).

## Proveedores

| Agente provisional | Skills ilustrativas | Formas de referencia |
|---|---|---|
| Agente de Oportunidades | Buscar, filtrar y priorizar procesos | lupa, balanza |
| Agente de Ofertas | Leer pliegos, detectar errores, organizar memoria y documentos, preparar y revisar ofertas | lupa, balanza, carpeta, expediente, rúbrica |
| Agente de Seguimiento | Gestionar plazos, consultas y convalidaciones; adscripción de otras tareas abierta | diálogo, alerta, informe |

## Estado

| Agente provisional | Skills ilustrativas | Formas de referencia |
|---|---|---|
| Agente de Pliegos | Trabajar necesidad y antecedentes, reunir documentos, redactar y revisar pliegos | lupa, carpeta, expediente, pliego, rúbrica |
| Agente de Evaluación | Revisar participantes y requisitos, calificar, preparar matriz e informe | lupa, balanza, rúbrica, métricas, informe |

Documentos, métricas, informes, preguntas, respuestas, seguimiento y fiscalización son capacidades transversales. Su adscripción a agentes queda por definir; no se presentan por defecto como agentes adicionales.

Las 13 formas disponibles incluyen la U de origen y formas auxiliares de función, documento, estado o acción. Esta colección visual no cierra el catálogo ni prueba disponibilidad comercial. En todo flujo institucional, la revisión, decisión y aprobación corresponden al equipo responsable.

## Geometría y movimiento

Cada forma tiene exactamente 11 celdas únicas y dos índices azules. La U vive sobre retícula 5 × 5 con las esquinas inferiores metidas. La caja se centra y se escala conservando las proporciones.

Al transformar, los bloques permanecen y se asignan por mínima distancia con conservación de color. Duración base 640 ms más un escalonamiento de 13 ms por bloque. El ejemplo no anima cambios de color ni ejecuta tareas de IA. Con movimiento reducido se muestra el destino directamente y se deshabilita la reproducción automática.

El hueco opcional del expediente es una anotación de interacción humana; no se exporta como un bloque lleno adicional en el glifo maestro.
