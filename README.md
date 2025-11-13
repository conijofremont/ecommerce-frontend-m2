# E-commerce Frontend MVP - Módulo 2

## Descripción
Proyecto MVP de una tienda en línea ficticia con frontend responsive. Usa HTML5 semántico, Bootstrap 5 para layout y estilos, y JavaScript básico para interacciones (DOM, eventos, localStorage para carrito simulado).  
**Tema**: Productos de ropa y accesorios - **RUAJ Hanot**.

---

## Funcionalidades
- **Home**: Grilla de **12 productos** con cards Bootstrap (generadas dinámicamente con JS).
- **Detalle de producto**: Imagen, precio, descripción, **selección de talla** (S-XL o 35-43 según producto) y botón "Agregar al Carrito".
- **Carrito simulado**: Lista de items agregados, **subtotales por producto**, contador en navbar (persiste con localStorage), botones "Remover" y "Vaciar".
- **Navegación**: Navbar responsive con enlaces a Home, Carrito y Contacto.
- **Responsive**: Móvil (≤420px: cards/lista en columna) y desktop (≥1024px: grilla de 4 columnas).
- **Accesibilidad**: Etiquetas semánticas, `aria-label`, foco visible en botones/enlaces.
- **Extras implementados**:
  - Login simulado (requerido para finalizar compra)
  - Costo de envío ($5.000) o retiro gratis
  - Asistente virtual flotante (opcional)
  - Redes sociales en footer con `aria-label`

---

## Instalación y Uso
1. Clona el repositorio:  
   ```bash
   git clone https://github.com/conijofremont/ecommerce-frontend-m2.git

2. Abre index.html en un navegador (Chrome/Edge recomendado).
Explora: agrega productos, inicia sesión, prueba el carrito y el asistente.

Credenciales de prueba:
Email: test@test.com
Contraseña: 123

## Tecnologías
- HTML5: Estructura semántica (header, main, section, article, footer).
- Bootstrap 5: Grid, cards, navbar, utilities (responsive y mobile-first).
- JavaScript: querySelector, eventos (click), arrays/objetos, localStorage para carrito.
- CSS Custom: Mejoras en accesibilidad (foco, contraste) y estilos del chatbot.

## Commit,Descripción
feat: estructura inicial,HTML semántico + Bootstrap
feat: grilla de 12 productos,JS dinámico con forEach
feat: detalle con tallas,Select dinámico por tipo de producto
feat: carrito con subtotales,"localStorage, reduce, costo de envío"
feat: login simulado,Validación básica con test@test.com
feat: chatbot flotante,"abrir/cerrar/abrir, respuestas automáticas"
style: accesibilidad,"aria, focus-visible, alt"

* Notas

- Imágenes: Reales en carpeta images/ (no placeholders).
- Pruebas: Responsive en DevTools (F12).
- GitHub Pages: Demo en vivo disponible.

## Enlace al repositorio público:
https://github.com/conijofremont/ecommerce-frontend-m2
Demo en vivo:
https://conijofremont.github.io/ecommerce-frontend-m2/

¡Gracias por revisar!
Constanza Jofre Montecinos 
Bootcamp Talento Digital – Módulo 2