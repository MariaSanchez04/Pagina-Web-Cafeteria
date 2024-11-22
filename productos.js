class Producto {
  constructor(id, nombre, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

const productos = [
  new Producto(1, "Espresso Clásico", 7000, "https://culturacafeina.com/wp-content/uploads/2020/07/espresso-con-mucha-crema-e1595993677453-1024x833.jpg"),
  new Producto(2, "Cappuccino", 9500, "https://ichef.bbci.co.uk/ace/ws/640/amz/worldservice/live/assets/images/2015/09/06/150906142439_capuchino_cafe_historia_624x351_getty.jpg.webp"),
  new Producto(3, "Latte Caramelo", 12300, "https://www.nescafe.com/cl/sites/default/files/2023-04/RecipeHero_CaramelLatte_1066x1066.jpg"),
  new Producto(4, "Mocha Chocolate", 15000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeB4k5t4N4gSqmbddKztfiTYjFHbPHSqo2Mw&s"),
  new Producto(5, "Tinto", 2000, "https://static.wixstatic.com/media/986fb9_7d54d46304f947d9bc73ae735fc70419~mv2.jpg/v1/fill/w_480,h_446,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/986fb9_7d54d46304f947d9bc73ae735fc70419~mv2.jpg"),
  new Producto(6, "Té Chai", 8000, "https://replantea.es/cdn/shop/articles/beneficios_del_te_chai_1080x.jpg?v=1647241238"),
  new Producto(7, "Latte Helado", 12000, "https://culturacafeina.com/wp-content/uploads/2020/07/bebida-fria-de-cafe-683x1024.jpg"),
  new Producto(8, "Espresso Frappuccino", 13000, "https://starbuckspr.com/wp-content/uploads/2022/12/Starbucks-Espresso-Frappuccino-768x768-1.jpg"),
  new Producto(9, "Chocolate Caliente", 10000, "https://images.mrcook.app/recipe-image/clpylwnrh00020cjt3skyd2ry")
];

function renderizarProductos() {
  const contenedorProductos = document.getElementById("productos");
  if (!contenedorProductos) return;

  productos.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");
    divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toLocaleString("es-CO")} COP</p>
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                <i class="fas fa-cart-plus"></i> Agregar al Carrito
            </button>
        `;
    contenedorProductos.appendChild(divProducto);
  });
}

function agregarAlCarrito(id) {
const producto = productos.find((p) => p.id === id);

if (producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar la notificación personalizada
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);

    actualizarContadorCarrito();
}
}

function mostrarNotificacion(mensaje) {
const contenedorNotificaciones = document.getElementById("notificaciones");

if (!contenedorNotificaciones) return;

// Crear el elemento de la notificación
const notificacion = document.createElement("div");
notificacion.classList.add("notificacion");
notificacion.textContent = mensaje;

// Añadir la notificación al contenedor
contenedorNotificaciones.appendChild(notificacion);

// Remover la notificación después de 4 segundos
setTimeout(() => {
    notificacion.remove();
}, 2000);
}


function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contadorCarrito = document.getElementById("contador-carrito");

  if (contadorCarrito) {
    contadorCarrito.textContent = carrito.length;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
  actualizarContadorCarrito();

  // Mostrar el nombre del usuario al cargar la página
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      const userNameElement = document.getElementById('user-name');
      if (userNameElement) {
          userNameElement.textContent = `Bienvenido, ${currentUser.name}`;
      }
  }
});