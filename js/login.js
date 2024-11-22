// Manejo de inicio de sesión
document.querySelector('.form-login').addEventListener('submit', function (event) {
    event.preventDefault();

    const loginForm = document.querySelector('.form-login');
    const errorAlert = loginForm.querySelector('.alerta-error');
    const userEmail = loginForm.querySelector('input[placeholder="Correo Electronico"]').value.trim();
    const userPassword = loginForm.querySelector('input[placeholder="Contraseña"]').value;

    // Limpiar el mensaje de error previo
    errorAlert.style.display = "none";

    if (!userEmail || !userPassword) {
        errorAlert.textContent = "Todos los campos son obligatorios";
        errorAlert.style.display = "block";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === userEmail && user.password === userPassword);

    if (user) {
        // Mostrar el mensaje de éxito
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

        // Añadir mensaje de éxito al body
        document.body.appendChild(mensajeExito);

        // Guardar el estado del usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Redirigir al usuario al carrito
        setTimeout(() => {
            window.location.href = 'carrito.html';
        }, 1000); // Espera un segundo antes de redirigir
    } else {
        errorAlert.textContent = "Correo o contraseña incorrectos";
        errorAlert.style.display = "block";
    }
});

// Mostrar el nombre del usuario al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = `Hola, ${currentUser.name}`;
        }
    }

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            try {
                // Eliminar usuario del localStorage
                localStorage.removeItem("currentUser");

                // Opcional: Limpiar cualquier otra información de sesión
                localStorage.removeItem("userToken");
                sessionStorage.clear();

                // Crear y mostrar el mensaje de cierre de sesión con éxito
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

                // Añadir mensaje de éxito al body
                document.body.appendChild(mensajeExito);

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
