## Gracias Profe – Mini app de agradecimientos

Una mini aplicación para crear mensajes de agradecimiento personalizados para docentes y generar un snippet de “código” con estética de IDE/terminal. Permite copiar el código y descargar una imagen del snippet para compartir en redes o enviar por mensaje.

### Demo local

```bash
npm install
npm run dev
```

Abre la URL que te muestre Vite (por defecto `http://localhost:5173`).

### Características

- **Formulario**: nombre del/la profe y mensaje multilinea.
- **Vista previa**: estilo **VS Code** o **Terminal**, con tipografía monoespaciada.
- **Copiar código**: usa la Clipboard API con fallback.
- **Descargar imagen**: exporta la vista previa con `html2canvas`.
- **Responsive**: en pantallas grandes, formulario y preview quedan alineados lado a lado;
  el preview permanece visible con posición sticky.

### Stack

- **Frontend**: React + Vite
- **Estilos**: CSS
- **Exportación a imagen**: `html2canvas`

### Scripts

```bash
# desarrollo con recarga en caliente
npm run dev

# build de producción
npm run build

# vista previa del build
npm run preview
```

### Cómo usar

1. Escribe el **nombre del profe**.
2. Redacta tu **mensaje de agradecimiento** (puede ser multilínea).
3. Elige el **estilo** de visualización (VS Code o Terminal).
4. Usa los botones:
   - **Copiar código**: copia el snippet al portapapeles.
   - **Descargar imagen**: guarda la vista previa como PNG.

### Notas sobre la exportación

- La imagen se genera con **fondo transparente** desde `html2canvas` y un **scale** alto para mejor nitidez en pantallas de alta densidad.
- Algunos navegadores pueden restringir la Clipboard API; hay un fallback basado en `document.execCommand('copy')`.

### Estructura relevante

- `src/App.jsx`: UI y lógica del formulario, preview y acciones de copiar/descargar.
- `src/App.css`: estilos del layout y del “shell” tipo VS Code/Terminal.
- `public/gracias-profe.svg`: favicon temático del proyecto.

### Personalización rápida

- Cambia colores, tipografías o bordes en `src/App.css`.
- Ajusta el formato del snippet en `src/App.jsx` (función que construye `snippetText`).

### Licencia

Este proyecto se distribuye bajo la licencia MIT. Si lo usas para un evento escolar, ¡etiquétanos y comparte el cariño! 💙
