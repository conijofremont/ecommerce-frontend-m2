// Array de 12 productos con propiedades extendidas (esRopa, cantidadDefault)
const productos = [
    { id: 1, nombre: 'Polera Algodón', precio: 15999, descripcion: 'Polera de Algodón Peruano, mangas cortas', imagen: 'images/producto1.jpg', esRopa: true, cantidadDefault: 1 },
    { id: 2, nombre: 'Jeans Ajustados', precio: 25999, descripcion: 'Pantalón denim elástico con corte moderno.', imagen: 'images/producto2.jpg', esRopa: true, cantidadDefault: 1 },
    { id: 3, nombre: 'Zapatillas Deportivas', precio: 45999, descripcion: 'Zapatillas cómodas para correr o caminar.', imagen: 'images/producto3.jpg', esRopa: true, cantidadDefault: 1 },
    { id: 4, nombre: 'Gorra Urbana', precio: 8999, descripcion: 'Gorra ajustable con diseño streetwear.', imagen: 'images/producto4.jpg', esRopa: false, cantidadDefault: 1 },
    { id: 5, nombre: 'Reloj Clásico', precio: 89999, descripcion: 'Reloj de pulsera con mecanismo suizo de alta precisión.', imagen: 'images/producto5.jpg', esRopa: false, cantidadDefault: 1 },
    { id: 6, nombre: 'Bolso de Mano', precio: 34999, descripcion: 'Bolso elegante para uso diario, con compartimentos múltiples.', imagen: 'images/producto6.jpg', esRopa: false, cantidadDefault: 1 },
    { id: 7, nombre: 'Auriculares Wireless', precio: 59999, descripcion: 'Auriculares con cancelación de ruido y batería de 20h.', imagen: 'images/producto7.jpg', esRopa: false, cantidadDefault: 1 },
    { id: 8, nombre: 'Mochila Viajera', precio: 49999, descripcion: 'Mochila resistente al agua con espacio para laptop.', imagen: 'images/producto8.jpg', esRopa: false, cantidadDefault: 1 },
    { id: 9, nombre: 'Poleron Oversize', precio: 28999, descripcion: 'Sudadera cómoda con capucha y estampado urbano.', imagen: 'images/producto9.jpg', esRopa: true, cantidadDefault: 1 },
    { id: 10, nombre: 'Billetera de Cuero', precio: 19999, descripcion: 'Cartera minimalista con ranuras para tarjetas.', imagen: 'images/producto10.jpg', esRopa: false, cantidadDefault: 1 },
    { id: 11, nombre: 'Zapatillas Casual', precio: 39999, descripcion: 'Zapatillas versátiles para ciudad y ocio.', imagen: 'images/producto11.jpg', esRopa: true, cantidadDefault: 1 },
    { id: 12, nombre: 'Bufanda de Lana', precio: 12999, descripcion: 'Bufanda suave y abrigada para invierno.', imagen: 'images/producto12.jpg', esRopa: true, cantidadDefault: 1 }
];

// Función para generar cards en Home
function generarGrilla() {
    const grilla = document.getElementById('grilla-productos');
    if (!grilla) {
        console.error('Error: No se encontró #grilla-productos en el HTML');
        return;
    }
    grilla.innerHTML = '';
    productos.forEach(producto => {
        const imgSrc = producto.imagen || 'images/placeholder.jpg'; // Fallback
        const card = `
            <article class="col-lg-3 col-md-6 mb-4">
                <div class="card h-100">
                    <img src="${imgSrc}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;" loading="lazy">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text flex-grow-1">$${producto.precio.toLocaleString()}</p>
                        <a href="detail.html?id=${producto.id}" class="btn btn-primary mt-auto" title="Ver detalles de ${producto.nombre}">Ver más</a>
                    </div>
                </div>
            </article>
        `;
        grilla.innerHTML += card;
    });
}

// Función para mostrar detalle de producto (actualizada con tallas dinámicas)
function mostrarDetalle() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const producto = productos.find(p => p.id === id);
    const contenedor = document.getElementById('detalle-producto');
    const tallaSection = document.getElementById('talla-section');
    const cantidadInput = document.getElementById('cantidad-input');
    if (!producto || !contenedor) {
        if (contenedor) contenedor.innerHTML = '<p class="text-center">Producto no encontrado. <a href="index.html">Volver al Home</a></p>';
        return;
    }
    document.getElementById('img-producto').src = producto.imagen || 'images/placeholder.jpg';
    document.getElementById('img-producto').alt = producto.nombre;
    document.getElementById('nombre-producto').textContent = producto.nombre;
    document.getElementById('precio-producto').textContent = `$${producto.precio.toLocaleString()}`;
    document.getElementById('descripcion-producto').textContent = producto.descripcion;
    if (cantidadInput) cantidadInput.value = producto.cantidadDefault || 1;

    if (tallaSection) {
        tallaSection.style.display = producto.esRopa ? 'block' : 'none';
        
        // Poblar select dinámicamente según tipo de producto
        const tallaSelect = document.getElementById('talla-select');
        if (tallaSelect) {
            tallaSelect.innerHTML = '<option value="">Selecciona talla</option>'; // Limpia opciones
            
            if (producto.nombre.includes('Zapatillas')) {
                // Tallas para zapatillas (35-43)
                for (let talla = 35; talla <= 43; talla++) {
                    const option = document.createElement('option');
                    option.value = talla;
                    option.textContent = talla;
                    tallaSelect.appendChild(option);
                }
            } else {
                // Tallas de ropa
                const tallasAlfa = ['S', 'M', 'L', 'XL'];
                tallasAlfa.forEach(talla => {
                    const option = document.createElement('option');
                    option.value = talla;
                    option.textContent = talla;
                    tallaSelect.appendChild(option);
                });
            }
        }
    }
}

// Función para agregar al carrito (con cantidad)
function agregarAlCarrito() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    const tallaSelect = document.getElementById('talla-select');
    const cantidadInput = document.getElementById('cantidad-input');
    if (producto.esRopa && (!tallaSelect || tallaSelect.value === '')) {
        alert('Selecciona una talla antes de agregar al carrito.');
        return;
    }
    const talla = tallaSelect ? tallaSelect.value : '';
    const cantidad = parseInt(cantidadInput ? cantidadInput.value : 1) || 1;
    if (cantidad < 1 || cantidad > 10) {
        alert('Cantidad debe ser entre 1 y 10.');
        return;
    }
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito.push({ id, talla, cantidad });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert(`¡${cantidad} x ${producto.nombre} ${talla ? `(Talla: ${talla})` : ''} agregado al carrito!`);
}

// Función para actualizar contador (total items, no suma)
function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        // Suma cantidades si múltiples
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}

// Función para mostrar lista del carrito (con subtotales)
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const lista = document.getElementById('lista-items');
    const totalSpan = document.getElementById('contador-total'); // Asumiendo es para suma total
    if (!lista) return;

    if (carrito.length === 0) {
        lista.innerHTML = '<li class="list-group-item text-center">Tu carrito está vacío. ¡Agrega productos desde Home!</li>';
        if (totalSpan) totalSpan.textContent = '$0';
        return;
    }

    lista.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            const subtotal = producto.precio * item.cantidad;
            total += subtotal;
            const itemLista = document.createElement('li');
            itemLista.className = 'list-group-item d-flex justify-content-between align-items-center';
            itemLista.innerHTML = `
                <div>
                    <h6>${producto.nombre} ${item.talla ? `(Talla: ${item.talla})` : ''} x ${item.cantidad}</h6>
                    <p class="mb-0">$${producto.precio.toLocaleString()} c/u = $${subtotal.toLocaleString()}</p>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removerDelCarrito(${index})">Remover</button>
            `;
            lista.appendChild(itemLista);
        }
    });
    if (totalSpan) totalSpan.textContent = `$${total.toLocaleString()}`;
}

// Función para remover del carrito por index
function removerDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    mostrarCarrito();
}

// Función para vaciar carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarContador();
    mostrarCarrito();
}

// Guardar método de envío al cambiar radio
function guardarEnvio() {
    const seleccionado = document.querySelector('input[name="envio"]:checked');
    if (seleccionado) {
        localStorage.setItem('metodo-envio', seleccionado.value);
    }
}

// Función para finalizar compra (con total real + envío)
function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. ¡Agrega productos primero!');
        return;
    }
    // Chequeo básico de login (de ayer)
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión para finalizar la compra.');
        window.location.href = 'login.html';
        return;
    }
    const metodo = localStorage.getItem('metodo-envio') || 'retiro';
    let total = carrito.reduce((sum, item) => {
        const producto = productos.find(p => p.id === item.id);
        return sum + (producto ? producto.precio * item.cantidad : 0);
    }, 0);
    const costoEnvio = metodo === 'despacho' ? 5000 : 0;
    total += costoEnvio;
    const textoEnvio = metodo === 'despacho' ? `despacho a domicilio (+$${costoEnvio.toLocaleString()})` : 'retiro en tienda (Gratis)';
    alert(`¡Compra finalizada! Total: $${total.toLocaleString()} con ${textoEnvio}. Gracias por tu pedido.`);
    // Limpia
    localStorage.removeItem('carrito');
    localStorage.removeItem('metodo-envio');
    actualizarContador();
    mostrarCarrito();
    // Redirige a home
    window.location.href = 'index.html';
}

// Llama todo al cargar (DOMContentLoaded para speed)
document.addEventListener('DOMContentLoaded', function() {
    actualizarContador();
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        generarGrilla();
    }
    if (window.location.pathname.includes('detail.html')) {
        mostrarDetalle();
        const agregarBtn = document.getElementById('agregar-btn');
        if (agregarBtn) {
            agregarBtn.addEventListener('click', agregarAlCarrito);
        }
    }
    if (window.location.pathname.includes('cart.html')) {
        mostrarCarrito();
        const vaciarBtn = document.getElementById('vaciar-btn');
        if (vaciarBtn) {
            vaciarBtn.addEventListener('click', vaciarCarrito);
        }
        const finalizarBtn = document.getElementById('finalizar-btn');
        if (finalizarBtn) {
            finalizarBtn.addEventListener('click', finalizarCompra);
        }
        // Eventos para radio buttons de envío
        const radios = document.querySelectorAll('input[name="envio"]');
        radios.forEach(radio => radio.addEventListener('change', guardarEnvio));
        // Carga método guardado
        const metodoGuardado = localStorage.getItem('metodo-envio');
        if (metodoGuardado) {
            const radio = document.getElementById(metodoGuardado);
            if (radio) radio.checked = true;
        }
    }
    // Manejo de login (nuevo)
    if (window.location.pathname.includes('login.html')) {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                if (!email || !password) {
                    alert('Completa email y contraseña.');
                    return;
                }
                try {
                    // Simulación mock: En prod, fetch('/api/login') a backend
                    // Por ahora, "loguea" si email es test@test.com y pass 123
                    if (email === 'test@test.com' && password === '123') {
                        const token = 'fake-jwt-token-' + Date.now(); // Token mock
                        localStorage.setItem('token', token);
                        localStorage.setItem('userEmail', email); // Opcional: guarda email para perfil
                        alert('¡Login exitoso! Redirigiendo...');
                        window.location.href = 'cart.html'; // Vuelve al carrito
                    } else {
                        alert('Credenciales inválidas. Prueba: test@test.com / 123');
                    }
                } catch (error) {
                    console.error('Fallo en login:', error);
                    alert('Error de conexión. Intenta de nuevo.');
                }
            });
        }
        // Actualiza contador al cargar
        actualizarContador();
    }
});