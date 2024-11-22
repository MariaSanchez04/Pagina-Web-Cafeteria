document.querySelector('.form-register').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const userName = document.querySelector('input[name="userName"]').value.trim();
    const userEmail = document.querySelector('input[name="userEmail"]').value.trim();
    const userPassword = document.querySelector('input[name="userPassword"]').value;

    const errorAlert = document.querySelector('.alerta-error');
    const successAlert = document.querySelector('.alerta-exito');

    // Limpiar mensajes de error previos
    errorAlert.style.display = "none";
    successAlert.style.display = "none";

    // Verificar si los campos están vacíos
    if (!userName || !userEmail || !userPassword) {
        errorAlert.textContent = "Todos los campos son obligatorios";
        errorAlert.style.display = "block";
        return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(userEmail)) {
        errorAlert.textContent = "Por favor, ingresa un correo válido";
        errorAlert.style.display = "block";
        return;
    }


    if (userPassword.length < 8) {
        errorAlert.textContent = "La contraseña debe tener al menos 8 caracteres";
        errorAlert.style.display = "block";
        return;
    }

    // Verificar si el correo ya está registrado
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === userEmail);

    if (userExists) {
        errorAlert.textContent = "El correo ya está registrado";
        errorAlert.style.display = "block";
        return;
    }

    // Guardar nuevo usuario
    users.push({ name: userName, email: userEmail, password: userPassword });
    localStorage.setItem('users', JSON.stringify(users));

    // Mostrar mensaje de éxito
    successAlert.textContent = "Te registraste correctamente";
    successAlert.style.display = "block";

    // Limpiar el formulario
    this.reset();

    // Redirigir al login
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
});
