class Producto {
  constructor(id, nombre, precio, imagen, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
  }
}

const productos = [
  new Producto(1, "Espresso Clásico", 7000, "./img/espresso.jpg", "jasjK"),
  new Producto(
    2,
    "Cappuccino",
    9500,
    "./img/capuchino.jpg",
    "Mezcla perfecta de espresso con leche vaporizada y espuma suave"
  ),
  new Producto(
    3,
    "Latte Caramelo",
    12300,
    "./img/lattecaramel.jpg",
    "Delicioso latte con sirope de caramelo y crema batida"
  ),
  new Producto(
    4,
    "Mocha Chocolate",
    15000,
    "./img/mocha.jpg",
    "Combinación de espresso, chocolate y leche con topping de cacao"
  ),
  new Producto(
    5,
    "Tinto",
    2000,
    "./img/tinto.jpg",
    "Café negro colombiano tradicional"
  ),
  new Producto(
    6,
    "Té Chai",
    8000,
    "./img/techai.jpg",
    "Té especiado con leche y una mezcla única de especias aromáticas"
  ),
  new Producto(
    7,
    "Latte Helado",
    12000,
    "./img/latte.jpg",
    "Café espresso con leche fría y hielo, perfecto para días calurosos"
  ),
  new Producto(
    8,
    "Espresso Frappuccino",
    13000,
    "./img/espressofrappuccino.jpg",
    "Bebida helada cremosa mezclada con café y hielo"
  ),
  new Producto(
    9,
    "Chocolate Caliente",
    10000,
    "./img/chocolatecaliente.jpg",
    "Chocolate caliente cremoso con marshmallows opcionales"
  ),
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
      <p class="descripcion">${producto.descripcion}</p>
      <p class="precio">$${producto.precio.toLocaleString("es-CO")} COP</p>
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
      descripcion: producto.descripcion,
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
    actualizarContadorCarrito();
  }
}

function mostrarNotificacion(mensaje) {
  const contenedorNotificaciones = document.getElementById("notificaciones");

  if (!contenedorNotificaciones) return;

  const notificacion = document.createElement("div");
  notificacion.classList.add("notificacion");
  notificacion.textContent = mensaje;

  contenedorNotificaciones.appendChild(notificacion);

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

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    const userNameElement = document.getElementById("user-name");
    if (userNameElement) {
      userNameElement.textContent = `Bienvenido, ${currentUser.name}`;
    }
  }
});
