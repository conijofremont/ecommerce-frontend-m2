// Array de productos ficticios (objetos)
const productos = [
    {
        id: 1,
        nombre: 'Camiseta Cómoda',
        precio: 15999,
        descripcion: 'Camiseta de algodón suave, perfecta para el día a día.',
        imagen: 'https://via.placeholder.com/300x300/007bff/ffffff?text=Camiseta'
    },
    {
        id: 2,
        nombre: 'Jeans Ajustados',
        precio: 25999,
        descripcion: 'Pantalón denim elástico con corte moderno.',
        imagen: 'https://via.placeholder.com/300x300/28a745/ffffff?text=Jeans'
    },
    {
        id: 3,
        nombre: 'Sneakers Deportivas',
        precio: 45999,
        descripcion: 'Zapatillas cómodas para correr o caminar.',
        imagen: 'https://via.placeholder.com/300x300/dc3545/ffffff?text=Sneakers'
    },
    {
        id: 4,
        nombre: 'Gorra Urbana',
        precio: 8999,
        descripcion: 'Gorra ajustable con diseño streetwear.',
        imagen: 'https://via.placeholder.com/300x300/ffc107/000000?text=Gorra'
    }
];

// Función para generar cards en Home (usa DOM y querySelector)
function generarGrilla() {
    const grilla = document.getElementById('grilla-productos');
    grilla.innerHTML = ''; // Limpia
    productos.forEach(producto => {
        const card = `
            <article class="col-lg-3 col-md-6 mb-4"> <!-- Responsive: 4 col desktop, 2 tablet, 1 móvil -->
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

// Llama al cargar la página
document.addEventListener('DOMContentLoaded', generarGrilla);