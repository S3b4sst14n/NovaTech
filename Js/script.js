
function initMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
    menuToggle.classList.toggle("open");
  });
}

// Form submission using EmailJS //
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const nombre = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('message').value;

        const serviceID = 'service_qtnb1aq';
        const templateID = 'template_uyksvpl';
        const publicKey = 'D4ILizNNnYQCGVQpK';

        const data = {
            service_id: serviceID,
            template_id: templateID,
            user_id: publicKey,
            template_params: { nombre, email, mensaje }
        };

        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('¡Mensaje enviado correctamente!');
                form.reset();
            } else {
                alert('Error al enviar el mensaje.');
            }
        } catch (error) {
            alert('Error de conexión.');
        }
    });
});