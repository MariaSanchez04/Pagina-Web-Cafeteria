document
  .querySelector(".form-login")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const loginForm = document.querySelector(".form-login");
    const errorAlert = loginForm.querySelector(".alerta-error");
    const userEmail = loginForm
      .querySelector('input[placeholder="Correo Electronico"]')
      .value.trim();
    const userPassword = loginForm.querySelector(
      'input[placeholder="Contraseña"]'
    ).value;

    errorAlert.style.display = "none";

    if (!userEmail || !userPassword) {
      errorAlert.textContent = "Todos los campos son obligatorios";
      errorAlert.style.display = "block";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === userEmail && user.password === userPassword
    );

    if (user) {
      const mensajeExito = document.createElement("div");
      mensajeExito.textContent = "¡Inicio de sesión exitoso!";
      mensajeExito.style.backgroundColor = "green";
      mensajeExito.style.color = "white";
      mensajeExito.style.padding = "10px";
      mensajeExito.style.textAlign = "center";
      mensajeExito.style.fontSize = "16px";
      mensajeExito.style.position = "fixed";
      mensajeExito.style.top = "20px";
      mensajeExito.style.left = "50%";
      mensajeExito.style.transform = "translateX(-50%)";
      mensajeExito.style.zIndex = "1000";
      mensajeExito.style.borderRadius = "5px";

      document.body.appendChild(mensajeExito);

      localStorage.setItem("currentUser", JSON.stringify(user));

      setTimeout(() => {
        window.location.href = "carrito.html";
      }, 1000);
    } else {
      errorAlert.textContent = "Correo o contraseña incorrectos";
      errorAlert.style.display = "block";
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    const userNameElement = document.getElementById("user-name");
    if (userNameElement) {
      userNameElement.textContent = `Hola, ${currentUser.name}`;
    }
  }

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", function () {
      try {
        localStorage.removeItem("currentUser");

        localStorage.removeItem("userToken");
        sessionStorage.clear();

        const mensajeExito = document.createElement("div");
        mensajeExito.textContent = "¡Sesión cerrada con éxito!";
        mensajeExito.style.backgroundColor = "green";
        mensajeExito.style.color = "white";
        mensajeExito.style.padding = "10px";
        mensajeExito.style.textAlign = "center";
        mensajeExito.style.fontSize = "16px";
        mensajeExito.style.position = "fixed";
        mensajeExito.style.top = "10px";
        mensajeExito.style.left = "50%";
        mensajeExito.style.transform = "translateX(-50%)";
        mensajeExito.style.zIndex = "1000";
        mensajeExito.style.borderRadius = "5px";

        document.body.appendChild(mensajeExito);

        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert(
          "Hubo un problema al cerrar la sesión. Por favor, inténtelo de nuevo."
        );
      }
    });
  } else {
    console.warn("Botón de logout no encontrado");
  }
});
