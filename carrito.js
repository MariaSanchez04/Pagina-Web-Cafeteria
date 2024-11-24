class Carrito {
  constructor() {
    this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
  }

    actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    if (!listaCarrito || !totalCarrito) return;

    listaCarrito.innerHTML = "";

    if (this.productos.length === 0) {
      listaCarrito.innerHTML = "<p>No hay productos en el carrito</p>";
      totalCarrito.textContent = "0";
      return;
    }

    this.productos.forEach((producto, index) => {
      const itemCarrito = document.createElement("div");
      itemCarrito.classList.add("item-carrito");
      itemCarrito.innerHTML = `
                <img src="${producto.imagen}" alt="${
        producto.nombre
      }" class="img-carrito">
                <div class="detalle-producto">
                    <span>${producto.nombre}</span>
                    <span>$${producto.precio.toLocaleString("es-CO")} COP</span>
                    <button onclick="carrito.eliminarProducto(${index})">❌</button>
                </div>
            `;
      listaCarrito.appendChild(itemCarrito);
    });

    const total = this.calcularTotal();
    totalCarrito.textContent = total.toLocaleString("es-CO");
  }

  agregarProductoAlCarrito(producto) {
    this.productos.push(producto);

    localStorage.setItem("carrito", JSON.stringify(this.productos));

    this.mostrarNotificacion(`${producto.nombre} agregado al carrito`);

    this.actualizarCarrito();
  }

  eliminarProducto(index) {
    this.productos.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(this.productos));

    this.actualizarCarrito();
  }

  calcularTotal() {
    return this.productos.reduce(
      (total, producto) => total + producto.precio,
      0
    );
  }

  vaciarCarrito() {
    this.productos = [];

    localStorage.removeItem("carrito");

    this.actualizarCarrito();
  }

  finalizarCompra() {
    if (this.productos.length === 0) {
      this.mostrarAlerta("alerta-vacia");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      this.mostrarAlerta("alerta-login");
      return;
    }

    const total = this.calcularTotal();

    this.mostrarAlerta("alerta-compra");

    this.vaciarCarrito();
  }

  mostrarAlerta(idAlerta) {
    const alerta = document.getElementById(idAlerta);
    if (alerta) {
      alerta.classList.add("show");

      if (idAlerta === "alerta-login") {
        const btnLogin = document.createElement("a");
        btnLogin.textContent = "Iniciar Sesión";
        btnLogin.classList.add("btn-login");
        btnLogin.href = "login.html";
        alerta.appendChild(btnLogin);
      }

      setTimeout(() => {
        alerta.classList.remove("show");
        if (idAlerta === "alerta-login") {
          alerta.removeChild(btnLogin);
        }
      }, 3000);
    }
  }

  mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion");
    notificacion.innerHTML = `<span class="producto-nombre">${mensaje}</span>`;

    document.body.appendChild(notificacion);

    setTimeout(() => {
      notificacion.classList.add("hide");
    }, 1000);
  }

  cerrarAlerta() {
    const alertas = document.querySelectorAll(".alerta");
    alertas.forEach((alerta) => {
      alerta.classList.remove("show");
    });
  }
}

let carrito;

document.addEventListener("DOMContentLoaded", () => {
  carrito = new Carrito();

  carrito.actualizarCarrito();

  const btnComprar = document.getElementById("btn-comprar");
  const btnVaciar = document.getElementById("btn-vaciar");

  if (btnComprar) {
    btnComprar.addEventListener("click", () => carrito.finalizarCompra());
  }

  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => carrito.vaciarCarrito());
  }
});
