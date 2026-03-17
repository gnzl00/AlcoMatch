# AlcoMatch

Documentacion del proyecto web de AlcoMatch (landing page estatica).

## Estado actual

- Tipo: sitio web estatico (sin backend propio).
- Objetivo: presentar la app AlcoMatch y captar mensajes mediante formulario.
- Ultima actualizacion de esta documentacion: 17 de marzo de 2026.

## Funcionalidades incluidas

- Header con navegacion a secciones internas.
- Seccion hero con CTA "Descargar App".
- Seccion "Sobre nosotros".
- Seccion de caracteristicas.
- Formulario de contacto conectado a Formspree.
- Validacion de formulario en cliente con Bootstrap.

## Stack tecnico

- HTML5
- CSS3
- JavaScript vanilla
- Bootstrap 5.3.2 (via CDN)
- Formspree (envio de formulario)

## Estructura del repositorio

```text
AlcoMatch/
- index.html
- CSS/
  - styles.css
- JS/
  - script.js
- media/
  - Logo AlcoMatch.png
- HTML/                # actualmente sin archivos
- gitignore.txt
```

## Ejecutar en local

Importante: `index.html` referencia CSS y JS con rutas absolutas (`/CSS/...`, `/JS/...`), por lo que conviene servir el proyecto con un servidor local desde la raiz.

1. Abre una terminal en la carpeta del proyecto.
2. Inicia un servidor local. Ejemplos:
   - `python -m http.server 5500`
   - `npx serve .`
3. Abre en el navegador:
   - `http://localhost:5500`

## Configuracion del formulario de contacto

El formulario envia los datos a Formspree mediante:

- Archivo: `index.html`
- Atributo actual: `action="https://formspree.io/f/xaneaane"`

Si cambias de endpoint o cuenta, actualiza ese valor.

## Notas tecnicas y mejoras recomendadas

- En `JS/script.js` se intenta registrar un listener sobre `#formContacto`, pero el formulario en `index.html` no tiene ese `id`. Esto puede generar error en consola.
- Hay caracteres acentuados/emojis con codificacion inconsistente en el HTML/JS. Se recomienda guardar archivos en UTF-8 para evitar texto corrupto.
- `gitignore.txt` parece pensado como `.gitignore`. Si la intencion es que Git lo use automaticamente, renombrarlo a `.gitignore`.

## Proximos pasos sugeridos

- Corregir el `id` del formulario o el selector en `script.js`.
- Unificar estilos personalizados con Bootstrap para reducir reglas duplicadas.
- Anadir una licencia y guia de contribucion si el proyecto va a abrirse a colaboradores.
