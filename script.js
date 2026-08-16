/* barulagi — interactions */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- jam WIB di header ---------- */
  var clock = document.getElementById("clock");
  if (clock) {
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var tick = function () {
      var now = new Date();
      var wib = new Date(now.getTime() + (7 * 60 - now.getTimezoneOffset()) * 60000);
      clock.textContent =
        pad(wib.getUTCHours()) + ":" + pad(wib.getUTCMinutes()) + " WIB";
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- reveal saat scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- tilt halus pada kartu karya ---------- */
  var cards = document.querySelectorAll("[data-tilt]");
  if (!reduceMotion && cards.length && "matchMedia" in window) {
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (py * -4).toFixed(2) + "deg) rotateY(" + (px * 5).toFixed(2) + "deg)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- rotasi acak kecil pada stamp ---------- */
  var stamps = document.querySelectorAll(".stamp");
  stamps.forEach(function (s) {
    s.style.transform = "rotate(" + (Math.random() * 6 - 3).toFixed(1) + "deg)";
  });
})();
