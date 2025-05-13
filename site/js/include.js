window.addEventListener("DOMContentLoaded", () => {
  const load = async (id, file) => {
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
    } catch (err) {
      console.error(`Error loading ${file}:`, err);
    }
  };

  load("header", "header.html").then(() => {
    const headerContainer = document.getElementById("header");
    const hamburger = headerContainer.querySelector(".hamburger");
    const navMenu = headerContainer.querySelector(".nav-menu");
    const overlay = document.querySelector(".overlay");

    if (hamburger && navMenu && overlay) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        overlay.classList.toggle("active");
      });

      headerContainer.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          overlay.classList.remove("active");
        });
      });

      overlay.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
      });
    }
  });

  load("footer", "footer.html").catch((err) => {
    console.error("Error loading footer:", err);
  });
});
