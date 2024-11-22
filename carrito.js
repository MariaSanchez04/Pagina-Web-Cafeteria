class Carrito {
    constructor() {
        // Recuperar productos del localStorage
        this.productos = JSON.parse(localStorage.getItem('carrito')) || [];
    }
    

    actualizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarrito = document.getElementById('total-carrito');

        if (!listaCarrito || !totalCarrito) return;

        // Limpiar lista actual
        listaCarrito.innerHTML = '';

        // Si no hay productos, mostrar mensaje
        if (this.productos.length === 0) {
            listaCarrito.innerHTML = '<p>No hay productos en el carrito</p>';
            totalCarrito.textContent = '0';
            return;
        }

        // Renderizar productos
        this.productos.forEach((producto, index) => {
            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('item-carrito');
            itemCarrito.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-carrito">
                <div class="detalle-producto">
                    <span>${producto.nombre}</span>
                    <span>$${producto.precio.toLocaleString('es-CO')} COP</span>
                    <button onclick="carrito.eliminarProducto(${index})">❌</button>
                </div>
            `;
            listaCarrito.appendChild(itemCarrito);
        });

        // Calcular y mostrar total
        const total = this.calcularTotal();
        totalCarrito.textContent = total.toLocaleString('es-CO');
    }

    agregarProductoAlCarrito(producto) {
        // Agregar producto al carrito
        this.productos.push(producto);
        
        // Actualizar localStorage
        localStorage.setItem('carrito', JSON.stringify(this.productos));
        
        // Mostrar notificación
        this.mostrarNotificacion(`${producto.nombre} agregado al carrito`);

        // Actualizar vista del carrito
        this.actualizarCarrito();
    }

    eliminarProducto(index) {
        // Eliminar producto del array
        this.productos.splice(index, 1);
        
        // Actualizar localStorage
        localStorage.setItem('carrito', JSON.stringify(this.productos));
        
        // Actualizar vista del carrito
        this.actualizarCarrito();
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    vaciarCarrito() {
        // Limpiar array de productos
        this.productos = [];
        
        // Limpiar localStorage
        localStorage.removeItem('carrito');
        
        // Actualizar vista
        this.actualizarCarrito();
    }

    finalizarCompra() {
        if (this.productos.length === 0) {
            // Mostrar alerta si el carrito está vacío
            this.mostrarAlerta('alerta-vacia');
            return;
        }

        // Verificar si el usuario está autenticado
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            // Mostrar alerta si no está autenticado con botón de redirección
            this.mostrarAlerta('alerta-login');
            return;
        }
        
        // Calcular total para el mensaje
        const total = this.calcularTotal();
        
        // Simular proceso de compra
        this.mostrarAlerta('alerta-compra');
        
        // Vaciar carrito
        this.vaciarCarrito();
    }

    mostrarAlerta(idAlerta) {
        const alerta = document.getElementById(idAlerta);
        if (alerta) {
            alerta.classList.add('show');

            // Si la alerta es de login, agrega el botón de redirección
            if (idAlerta === 'alerta-login') {
                const btnLogin = document.createElement('a');
                btnLogin.textContent = 'Iniciar Sesión';
                btnLogin.classList.add('btn-login');
                btnLogin.href = 'login.html'; // Redirige al login
                alerta.appendChild(btnLogin);
            }

            // Desaparece después de 3 segundos
            setTimeout(() => {
                alerta.classList.remove('show');
                // Eliminar el botón de login después de que la alerta desaparezca
                if (idAlerta === 'alerta-login') {
                    alerta.removeChild(btnLogin);
                }
            }, 3000);  
        }
    }

    mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.classList.add('notificacion');
        notificacion.innerHTML = `<span class="producto-nombre">${mensaje}</span>`;

        document.body.appendChild(notificacion);

        // Desaparece después de 1 segundo
        setTimeout(() => {
            notificacion.classList.add('hide');
        }, 1000);
    }

    cerrarAlerta() {
        const alertas = document.querySelectorAll('.alerta');
        alertas.forEach((alerta) => {
            alerta.classList.remove('show');
        });
    }
}

// Instanciar carrito
let carrito;

// Inicializar carrito
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia de carrito
    carrito = new Carrito();
    
    // Actualizar vista del carrito
    carrito.actualizarCarrito();

    // Configurar eventos de botones
    const btnComprar = document.getElementById('btn-comprar');
    const btnVaciar = document.getElementById('btn-vaciar');

    if (btnComprar) {
        btnComprar.addEventListener('click', () => carrito.finalizarCompra());
    }

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => carrito.vaciarCarrito());
    }

    // Suponiendo que hay productos y una función para agregar productos
    // Ejemplo: carrito.agregarProductoAlCarrito({ id, nombre, precio, imagen });
});
