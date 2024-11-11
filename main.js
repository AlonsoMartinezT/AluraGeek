// Función para cargar y renderizar los productos desde db.json
function renderizarProductos(productos) {
    // Seleccionamos el contenedor donde se van a mostrar los productos
    const contenedorProductos = document.getElementById("productos-container");

    // Limpiamos el contenedor antes de agregar los nuevos productos
    contenedorProductos.innerHTML = '';

    // Recorremos todos los productos y los mostramos en la interfaz
    productos.forEach(producto => {
        // Creamos un contenedor para cada producto
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        // Creamos el HTML para cada producto
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <h3 class="producto-nombre">${producto.nombre}</h3>
            <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
            <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>
        `;

        // Agregamos el producto al contenedor principal
        contenedorProductos.appendChild(productoDiv);
    });

    // Agregar evento de eliminar a cada botón de eliminar
    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            const idProducto = event.target.getAttribute('data-id');
            eliminarProducto(idProducto);
        });
    });
}

// Array global para almacenar productos temporalmente
let productos = [];

// Cargar los productos desde db.json y renderizarlos al cargar la página
function cargarProductos() {
    fetch('./db.json')
        .then(response => response.json())
        .then(data => {
            // Guardamos los productos en el array global
            productos = data.productos;
            // Renderizamos los productos en la vista
            renderizarProductos(productos);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

// Función para agregar un producto
function agregarProducto(nombre, precio, imagen) {
    // Creamos un nuevo producto
    const nuevoProducto = {
        id: (productos.length + 1).toString(),  // Generar un nuevo id secuencial
        nombre: nombre,
        precio: parseFloat(precio),
        imagen: imagen
    };

    // Agregamos el nuevo producto al array de productos
    productos.push(nuevoProducto);

    // Actualizamos la vista
    renderizarProductos(productos);
}

// Función para eliminar un producto por su ID
function eliminarProducto(id) {
    // Filtramos el producto a eliminar
    productos = productos.filter(producto => producto.id !== id);
    
    // Actualizamos la vista después de eliminar el producto
    renderizarProductos(productos);
}

// Manejar el evento de agregar producto
document.getElementById('submit').addEventListener('click', function() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').files[0];

    // Validación básica
    if (!nombre || !precio || !imagen) {
        alert('Por favor, complete todos los campos');
        return;
    }

    // Crear un objeto URL para la imagen seleccionada (simulando la subida de archivos)
    const imagenURL = URL.createObjectURL(imagen);

    // Llamamos a la función para agregar el producto
    agregarProducto(nombre, precio, imagenURL);

    // Limpiar los campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('imagen').value = '';
});

// Llamamos a cargar los productos al cargar la página
window.addEventListener('DOMContentLoaded', cargarProductos);
