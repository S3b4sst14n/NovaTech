async function includeHTML() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  try {
    if (header) {
      const resHeader = await fetch("../components/header.html");
      if (!resHeader.ok) throw new Error("No se pudo cargar header");
      header.innerHTML = await resHeader.text();
    }

    if (footer) {
      const resFooter = await fetch("../components/footer.html");
      if (!resFooter.ok) throw new Error("No se pudo cargar footer");
      footer.innerHTML = await resFooter.text();
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", includeHTML);
