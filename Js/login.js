function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`;
    } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;
    }
}

function showSignup() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

function showLogin() {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

// Mostrar el formulario correcto según el parámetro de la URL 
window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");

    const loginSection = document.getElementById("login-section");
    const registerSection = document.getElementById("register-section");

    if (view === "register") {
        loginSection.style.display = "none";
        registerSection.style.display = "block";
    } else {
        loginSection.style.display = "block";
        registerSection.style.display = "none";
    }
});

// login.js (solo la parte de submit)
document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const pass = document.getElementById("signupPassword").value.trim();

  try {
    const res = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password: pass })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || 'Error creando cuenta');

    alert('Cuenta creada, inicia sesión');
    showLogin();
  } catch (err) {
    console.error(err);
    alert('Error de conexión con el servidor');
  }
});

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("Email").value.trim();
  const pass = document.getElementById("password").value.trim();

  try {
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || 'Error iniciando sesión');

    // Guardar token y user
    localStorage.setItem('novatech_token', data.token);
    localStorage.setItem('novatech_user', JSON.stringify(data.user));

    alert('Inicio de sesión exitoso');
    window.location.href = '/index.html'; // o la ruta que uses
  } catch (err) {
    console.error(err);
    alert('Error de conexión con el servidor');
  }
});
