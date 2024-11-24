document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && currentUser.nombre) {
    document.getElementById(
      "user-name"
    ).textContent = `Hola, ${currentUser.nombre}`;
  }

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", function () {
      try {
        localStorage.removeItem("currentUser");

        localStorage.removeItem("userToken");
        sessionStorage.clear();

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
