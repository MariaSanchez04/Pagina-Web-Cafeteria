const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      containerFormRegister = document.querySelector(".register"),
      containerFormLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", (e) => {
  containerFormRegister.classList.add("hide");
  containerFormLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", (e) => {
  containerFormLogin.classList.add("hide");
  containerFormRegister.classList.remove("hide");
});

// Verificar si el usuario está logueado antes de comprar
document.getElementById("btn-comprar").addEventListener("click", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    // Si no está logueado, redirigir al login
    window.location.href = "login.html";
  } else {
    alert("¡Gracias por tu compra!");
    localStorage.removeItem("carrito"); // Limpiar el carrito después de la compra
  }
});



