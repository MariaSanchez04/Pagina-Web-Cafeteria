document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const telefono = document.getElementById("telefono").value;
      const mensaje = document.getElementById("mensaje").value;

      if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }

      const datosFormulario = {
        nombre,
        email,
        telefono,
        mensaje,
        fecha: new Date().toLocaleString(),
      };

      console.log("Mensaje enviado:", datosFormulario);

      contactForm.reset();

      alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
    });
  }
});
