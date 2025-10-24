document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("header").innerHTML = data;
      initMenu();
    });

  fetch("/components/footer.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("footer").innerHTML = data;
    });
});


