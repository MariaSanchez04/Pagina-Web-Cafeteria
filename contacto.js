document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;

            // Validación básica
            if (!nombre || !email || !mensaje) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }

            // Simular envío de formulario
            const datosFormulario = {
                nombre,
                email,
                telefono,
                mensaje,
                fecha: new Date().toLocaleString()
            };

            // En un escenario real, aquí se enviaría al backend
            console.log('Mensaje enviado:', datosFormulario);

            // Limpiar formulario
            contactForm.reset();

            // Mostrar confirmación
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
        });
    }
});