document.addEventListener("DOMContentLoaded", () => {

  // Cargar HEADER
  fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("header").innerHTML = data;
      initMenu();
      buildDynamicNav(); // ejecutar navbar dinámico
    });

  // Cargar FOOTER
  fetch("/components/footer.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("footer").innerHTML = data;
    });
});

// nav dinamico
function buildDynamicNav() {
  const menu = document.querySelector(".menu");
  if (!menu) return;

  const token = localStorage.getItem("token");
  const btnInicio = document.getElementById("btnInicio");
  if (btnInicio) {
    if (token) {
      btnInicio.href = "/Pages/tienda.html"; // Usuario logueado, ir a tienda
    } else {
      btnInicio.href = "/index.html"; // Usuario no logueado, ir a inicio normal
    }
  }

  // Eliminar duplicados si se recarga
  const oldItem = document.querySelector(".dynamic-item");
  if (oldItem) oldItem.remove();

  // Crear item nuevo
  const li = document.createElement("li");
  li.classList.add("dynamic-item", "login-button");

  const a = document.createElement("a");
  a.classList.add("btn", "login-btn");
  if (token) {
    // Usuario logueado → Cerrar sesión
    a.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión`;
    a.href = "#";

    a.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("isLogged");
      window.location.href = "/Index.html";
    });

  } else {
    // Usuario no logueado → Iniciar sesión
    a.innerHTML = `<i class="fa-solid fa-user"></i> Acceder`;
    a.href = "/Pages/login.html";
  }

  li.appendChild(a);
  menu.appendChild(li);
}

