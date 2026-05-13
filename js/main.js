(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav-primary");
  var navLinks = document.querySelectorAll(".nav-primary a");

  function setHeaderScrolled() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 1080px)").matches) closeNav();
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1081px)").matches) closeNav();
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var category = fd.get("category") || "General inquiry";
      var name = fd.get("name") || "";
      var org = fd.get("organization") || "";
      var email = fd.get("email") || "";
      var phone = fd.get("phone") || "";
      var message = fd.get("message") || "";

      var to =
        category === "Strategic partnership"
          ? "partnerships@levarysgroup.com"
          : "projects@levarysgroup.com";

      var subject = encodeURIComponent(
        "[" + String(category) + "] Inquiry from " + String(name).trim()
      );
      var body = encodeURIComponent(
        "Category: " +
          category +
          "\n\nName: " +
          name +
          "\nOrganization: " +
          org +
          "\nEmail: " +
          email +
          "\nPhone: " +
          phone +
          "\n\nMessage:\n" +
          message
      );

      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    });
  }
})();
