document.addEventListener("DOMContentLoaded", () => {
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
