# NCQ Technologies — Laboratorio 1

Sitio web estático corporativo para **NCQ Technologies**, empresa costarricense de software fundada en 2005. El proyecto presenta sus soluciones tecnológicas (QuPOS, Factun y Ubitec), sus áreas de especialización y un formulario de contacto funcional en el frontend.

---

## Descripción del proyecto

El sitio está compuesto por **dos páginas HTML** enlazadas entre sí:

| Página | Archivo | Propósito |
|---|---|---|
| Inicio | `index.html` | Landing con hero, acerca de, áreas de especialización (tarjetas flip), contacto y footer |
| Contacto | `Contact/contact.html` | Formulario de solicitud con persistencia local y mensaje de éxito |

No hay backend ni framework: es **HTML + CSS + JavaScript vanilla**, pensado como laboratorio de maquetación, diseño responsive y interactividad en el cliente.

---

## Tecnologías utilizadas

- **HTML5** semántico (`header`, `main`, `article`, `section`, `nav`, `footer`, `address`)
- **CSS3** (Flexbox, Grid, transforms 3D, media queries)
- **JavaScript ES6+** (DOM API, `localStorage`, `sessionStorage`)

---

## Páginas y secciones

### `index.html`

1. **Header sticky** — Logo + navegación ancla (`#about-us`, `#areas-expertise`, `#contact`)
2. **Hero (`.main-content`)** — Imagen de fondo con gradiente, pill de productos y titular
3. **Acerca de nosotros (`.about-us`)** — Texto corporativo con línea decorativa turquoise
4. **Áreas de especialización (`.areas-expertise`)** — Tarjetas con efecto **flip 3D** al hover (`rotateY(180deg)`)
5. **Contacto (`.contact`)** — Datos de contacto en tarjetas + botón al formulario
6. **Footer** — Marca, navegación, contacto con `<address>` y copyright

### `Contact/contact.html`

1. **Header** — Misma estructura que el index (rutas relativas con `../`)
2. **Hero (`.contact-hero`)** — Título y descripción del formulario
3. **Formulario (`.form-card`)** — Nombre, apellidos, correo, teléfono, producto de interés
4. **Banner de retorno** — Aviso si el usuario ya envió el formulario antes
5. **Mensaje de éxito** — Pantalla post-envío con botón para volver
6. **Footer** — Igual al del index

---

## JavaScript

### `js/nav.js` (compartido por ambas páginas)

Controla el **menú** en viewports móviles.

| Función | Descripción |
|---|---|
| Toggle del menú | Al hacer click en `.menu-toggle`, añade/quita la clase `nav-open` en `.header` |
| Accesibilidad | Actualiza `aria-expanded` y `aria-label` ("Abrir menú" / "Cerrar menú") |
| Cierre automático | Cierra el menú al pulsar cualquier enlace del nav |
| Resize | Si la ventana supera 768px, cierra el menú (evita menú abierto en desktop) |

**Flujo:**

Cargado en:
- `index.html` → `<script src="js/nav.js"></script>`
- `contact.html` → `<script src="../js/nav.js"></script>`

---

### `Contact/js/contact.js`

Lógica del **formulario de contacto** con almacenamiento en el navegador.

| Clave | Almacenamiento | Propósito |
|---|---|---|
| `ncq_contact_info` | `localStorage` | Datos del último envío exitoso (persiste entre sesiones) |
| `ncq_form_draft` | `sessionStorage` | Borrador mientras el usuario escribe (solo la sesión actual) |

**Funciones principales:**

- `getFieldValues()` — Lee y recorta los valores de los 5 campos del formulario
- `fillFields(data, ids)` — Rellena campos desde un objeto guardado
- `saveDraft()` — Guarda borrador en `sessionStorage` en cada `input`/`change`
- **Al cargar la página:**
  - Si hay borrador en sesión → lo restaura
  - Si hay datos previos en localStorage (sin borrador) → rellena campos y muestra banner de bienvenida
- **Al enviar (`submit`):**
  - `preventDefault()` — no hay backend; simula envío en cliente
  - Guarda en `localStorage`, limpia borrador, oculta formulario y muestra mensaje de éxito personalizado
- **Botón "Volver al formulario":** resetea el formulario y vuelve a la vista inicial

---

## CSS — Arquitectura y diseño

### Enfoque general

- **Un archivo CSS por página:** `styles.css` (index) y `Contact/contact.css` (contacto)
- Estilos de **header, footer y menú hamburguesa duplicados** en ambos archivos (mismo diseño, rutas de imágenes distintas)
- Reset global con `* { margin: 0; padding: 0; box-sizing: border-box; }`
- Tipografía: `'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`

### Paleta de colores

| Uso | Valor |
|---|---|
| Fondo principal | `#070b16` |
| Texto | `#fff` / `rgba(255,255,255, 0.35–0.85)` |
| Acento | `turquoise` |
| Botones primarios | `linear-gradient(90deg, #59b0ff, #0380FF)` |
| Tarjetas / bordes | `rgba(255,255,255, 0.05–0.14)` |

### Layout

| Técnica | Dónde se usa |
|---|---|
| **Flexbox** | Header, secciones centradas, contact-info, footer-bottom, nav |
| **Grid** | Footer (3 columnas), formulario (`.form-row` 2 columnas) |
| **Sticky header** | `position: sticky; top: 0; z-index: 1000` |
| **Contenedor max-width** | `.header-inner`, `.footer-inner` → `1200px` centrado con `margin: 0 auto` |
| **Scroll suave** | `html { scroll-behavior: smooth; }` para anclas del nav |

### Efectos destacados

- **Hero:** `background-image` con gradiente oscuro + `imgs/main_image.png`
- **Tarjetas flip:** `perspective: 1000px`, `transform-style: preserve-3d`, `backface-visibility: hidden`
- **Pills / badges:** `border-radius: 50px`, fondo semitransparente
- **Línea decorativa (`.line`):** `100px × 1px`, color `turquoise`
- **Menú → X:** `transform: translateY() + rotate()` en las 3 barras cuando `.header.nav-open`

---

### Breakpoint móvil — `max-width: 768px`

Aplica en **`styles.css`** y **`contact.css`**.

| Componente | Comportamiento en mobile |
|---|---|
| Header | Fondo sólido `#070b16`, logo 64×64px |
| Nav | Oculto por defecto (`max-height: 0`, `opacity: 0`); se despliega con `.nav-open` |
| Menú | Visible (`display: flex`); animación ☰ → X |
| Hero index | Padding reducido, `height: auto`, título con `clamp(1.6rem, 7vw, 2.2rem)` |
| Secciones index | `height: auto` + padding (sin alturas fijas en vh) |
| Tarjetas expertise | Columna vertical, ancho 100% max 320px |
| Contact items | Ancho 100% |
| Footer | Grid de 3 columnas → 1 columna |
| Formulario contacto | `.form-row` de 2 columnas → 1 columna; padding reducido |

### Breakpoint pantallas grandes — `min-width: 2560px`

Pensado para monitores 2K/4K.

| Ajuste | Valor |
|---|---|
| `.header-inner`, `.footer-inner` | `max-width: 1800px` |
| `.main-content` | `height: 50vh` |
| `.about-us` | `height: 30vh` |
| `.areas-expertise` | `height: 60vh` |

### Viewport meta (ambas páginas)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">