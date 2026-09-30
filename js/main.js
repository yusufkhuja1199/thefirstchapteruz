// The First Chapter — umumiy skript
// Arizalar Netlify Forms'ga yuboriladi. Netlify sahifalari GitHub Pages'ga yo'naltirilgan,
// shuning uchun arizalar yo'naltirishdan istisno qilingan /ariza.html manziliga boradi (_redirects).
const FORMS_ENDPOINT = "https://thefirstchapteruz.netlify.app/ariza.html";

document.addEventListener("DOMContentLoaded", () => {
  // Mobil menyu
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
    });
  }

  // Menyuda joriy sahifa
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });

  // Pastki qismdagi yil
  document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

  // Skroll qilganda bloklarning paydo bo'lishi
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

  // Katalog filtri
  const filters = document.querySelectorAll(".filter");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      const cat = btn.dataset.filter;
      document.querySelectorAll("[data-category]").forEach((card) => {
        const match = cat === "all" || card.dataset.category.split(" ").includes(cat);
        card.classList.toggle("hidden", !match);
      });
    });
  });

  // Buyurtma oynasi
  const modal = document.getElementById("order-modal");
  if (modal) {
    const productSelect = modal.querySelector("#order-product");
    let lastFocus = null;
    const openModal = (product, trigger) => {
      if (productSelect) productSelect.value = product || "";
      lastFocus = trigger;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      modal.querySelector("input:not([type=hidden]):not([name=bot-field])")?.focus();
    };
    const closeModal = () => {
      if (!modal.classList.contains("open")) return;
      modal.classList.remove("open");
      document.body.style.overflow = "";
      lastFocus?.focus();
    };
    document.querySelectorAll("[data-order]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(btn.dataset.order, btn);
      });
    });
    modal.querySelector(".modal__close").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  // Formalar: tekshirish va Netlify Forms'ga yuborish
  document.querySelectorAll("form[data-validate]").forEach((form) => {
    const success = form.querySelector(".form-success");
    const failure = form.querySelector(".form-error");
    const submitBtn = form.querySelector("[type=submit]");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach((input) => {
        const field = input.closest(".field");
        let ok = input.value.trim() !== "";
        if (ok && input.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        if (ok && input.type === "tel") ok = input.value.replace(/\D/g, "").length >= 9;
        field.classList.toggle("error", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        form.querySelector(".field.error input, .field.error textarea")?.focus();
        return;
      }

      // Tanlangan ro'yxat qiymati o'rniga ko'rinadigan matnni yuboramiz ("classic" emas, "Klassik quti")
      const data = new URLSearchParams(new FormData(form));
      form.querySelectorAll("select[name]").forEach((sel) => {
        data.set(sel.name, sel.selectedOptions[0]?.text || "");
      });
      data.set("til", document.documentElement.lang);
      data.set("sahifa", location.href);

      success?.classList.remove("show");
      failure?.classList.remove("show");
      submitBtn.disabled = true;

      try {
        const sameSite = location.hostname === new URL(FORMS_ENDPOINT).hostname;
        const res = await fetch(sameSite ? new URL(FORMS_ENDPOINT).pathname : FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data.toString(),
          // Boshqa domendan (GitHub Pages) javobni o'qib bo'lmaydi, lekin ariza yetib boradi
          mode: sameSite ? "same-origin" : "no-cors",
        });
        if (sameSite && !res.ok) throw new Error(res.status);
        form.reset();
        success?.classList.add("show");
      } catch (err) {
        failure?.classList.add("show");
      } finally {
        submitBtn.disabled = false;
      }
    });

    form.querySelectorAll("input, select, textarea").forEach((input) => {
      input.addEventListener("input", () => input.closest(".field")?.classList.remove("error"));
    });
  });
});
