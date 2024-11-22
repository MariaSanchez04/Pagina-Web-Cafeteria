document.addEventListener('DOMContentLoaded', function () {
    // Recuperar los datos del usuario desde localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Verificar si hay un usuario logueado
    if (currentUser && currentUser.nombre) {
        // Mostrar el nombre del usuario en el elemento con el id 'user-name'
        document.getElementById('user-name').textContent = `Hola, ${currentUser.nombre}`;
    }

    // Manejo de cierre de sesión
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            try {
                // Eliminar usuario del localStorage
                localStorage.removeItem("currentUser");

                // Limpiar cualquier otra información de sesión
                localStorage.removeItem("userToken");
                sessionStorage.clear();

                // Redirigir al usuario a la página de inicio de sesión después de 2 segundos
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
                alert("Hubo un problema al cerrar la sesión. Por favor, inténtelo de nuevo.");
            }
        });
    } else {
        console.warn("Botón de logout no encontrado");
    }
});
