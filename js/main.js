// The First Chapter — общий скрипт для всех страниц
document.addEventListener("DOMContentLoaded", () => {
  // Мобильное меню
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
    });
  }

  // Активный пункт меню
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });

  // Год в подвале
  document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

  // Появление блоков при скролле
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Фильтр каталога
  const filters = document.querySelectorAll(".filter");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      document.querySelectorAll("[data-category]").forEach((card) => {
        const match = cat === "all" || card.dataset.category.split(" ").includes(cat);
        card.classList.toggle("hidden", !match);
      });
    });
  });

  // Модальное окно заказа
  const modal = document.getElementById("order-modal");
  if (modal) {
    const productSelect = modal.querySelector("#order-product");
    const openModal = (product) => {
      if (product && productSelect) productSelect.value = product;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    };
    document.querySelectorAll("[data-order]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(btn.dataset.order);
      });
    });
    modal.querySelector(".modal__close").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  // Валидация форм (отправка имитируется — сервера нет)
  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach((input) => {
        const field = input.closest(".field");
        let ok = input.value.trim() !== "";
        if (ok && input.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        if (ok && input.type === "tel") ok = input.value.replace(/\D/g, "").length >= 10;
        field.classList.toggle("error", !ok);
        if (!ok) valid = false;
      });
      if (!valid) return;

      const success = form.querySelector(".form-success");
      form.reset();
      if (success) {
        success.classList.add("show");
        setTimeout(() => success.classList.remove("show"), 6000);
      }
    });

    form.querySelectorAll("input, select, textarea").forEach((input) => {
      input.addEventListener("input", () => input.closest(".field")?.classList.remove("error"));
    });
  });
});
