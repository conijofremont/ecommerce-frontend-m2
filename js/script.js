// Array de 12 productos tangibles ficticios (grilla más completa)
const productos = [
    { id: 1, nombre: 'Polera Algodón', precio: 15999, descripcion: 'Polera de Algodón Peruano, mangas cortas', imagen: 'images/producto1.jpg' },
    { id: 2, nombre: 'Jeans Ajustados', precio: 25999, descripcion: 'Pantalón denim elástico con corte moderno.', imagen: 'images/producto2.jpg' },
    { id: 3, nombre: 'Zapatillas Deportivas', precio: 45999, descripcion: 'Zapatillas cómodas para correr o caminar.', imagen: 'images/producto3.jpg' },
    { id: 4, nombre: 'Gorra Urbana', precio: 8999, descripcion: 'Gorra ajustable con diseño streetwear.', imagen: 'images/producto4.jpg' },
    { id: 5, nombre: 'Reloj Clásico', precio: 89999, descripcion: 'Reloj de pulsera con mecanismo suizo de alta precisión.', imagen: 'images/producto5.jpg' },
    { id: 6, nombre: 'Bolso de Mano', precio: 34999, descripcion: 'Bolso elegante para uso diario, con compartimentos múltiples.', imagen: 'images/producto6.jpg' },
    { id: 7, nombre: 'Auriculares Wireless', precio: 59999, descripcion: 'Auriculares con cancelación de ruido y batería de 20h.', imagen: 'images/producto7.jpg' },
    { id: 8, nombre: 'Mochila Viajera', precio: 49999, descripcion: 'Mochila resistente al agua con espacio para laptop.', imagen: 'images/producto8.jpg' },
    { id: 9, nombre: 'Poleron Oversize', precio: 28999, descripcion: 'Sudadera cómoda con capucha y estampado urbano.', imagen: 'images/producto9.jpg' },
    { id: 10, nombre: 'Billetera de Cuero', precio: 19999, descripcion: 'Cartera minimalista con ranuras para tarjetas.', imagen: 'images/producto10.jpg' },
    { id: 11, nombre: 'Zapatillas Casual', precio: 39999, descripcion: 'Zapatillas versátiles para ciudad y ocio.', imagen: 'images/producto11.jpg' },
    { id: 12, nombre: 'Bufanda de Lana', precio: 12999, descripcion: 'Bufanda suave y abrigada para invierno.', imagen: 'images/producto12.jpg' }
];

// Función para generar cards en Home (con check para null)
function generarGrilla() {
    const grilla = document.getElementById('grilla-productos');
    if (!grilla) {
        console.error('Error: No se encontró #grilla-productos en el HTML');
        return; // Sale si no existe
    }
    grilla.innerHTML = ''; // Limpia
    productos.forEach(producto => {
        const card = `
            <article class="col-lg-3 col-md-6 mb-4">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
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

// Función para mostrar detalle de producto (corrigió 'preco' a 'precio')
function mostrarDetalle() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const producto = productos.find(p => p.id === id);
    const contenedor = document.getElementById('detalle-producto');
    if (!producto || !contenedor) {
        contenedor.innerHTML = '<p class="text-center">Producto no encontrado.</p>';
        return;
    }
    document.getElementById('img-producto').src = producto.imagen;
    document.getElementById('img-producto').alt = producto.nombre;
    document.getElementById('nombre-producto').textContent = producto.nombre;
    document.getElementById('precio-producto').textContent = `$${producto.precio.toLocaleString()}`;
    document.getElementById('descripcion-producto').textContent = producto.descripcion;
}

// Función para agregar al carrito
function agregarAlCarrito() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito.push(id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert('¡Producto agregado al carrito!');
}

// Función para actualizar contador
function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

// Función para mostrar lista del carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const lista = document.getElementById('lista-items');
    const totalSpan = document.getElementById('contador-total');
    if (!lista) return; // Check null

    if (carrito.length === 0) {
        lista.innerHTML = '<li class="list-group-item text-center">Tu carrito está vacío. ¡Agrega productos desde Home!</li>';
        if (totalSpan) totalSpan.textContent = 0;
        return;
    }

    lista.innerHTML = '';
    let total = 0;
    carrito.forEach(id => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <div>
                    <h6>${producto.nombre}</h6>
                    <p class="mb-0">$${producto.precio.toLocaleString()}</p>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removerDelCarrito(${id})">Remover</button>
            `;
            lista.appendChild(item);
            total++;
        }
    });
    if (totalSpan) totalSpan.textContent = total;
}

// Función para remover del carrito
function removerDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito = carrito.filter(itemId => itemId !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    mostrarCarrito(); // Refresca la lista
}

// Función para vaciar carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarContador();
    mostrarCarrito();
}

// Llama todo al cargar (mejor timing con window.onload para evitar null)
window.addEventListener('load', function() {
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
    }
});