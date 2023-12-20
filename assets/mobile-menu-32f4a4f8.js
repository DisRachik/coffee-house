(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const main = "";
const mobileMenu = document.querySelector(".nav");
const mobileMenuBtn = document.querySelector(".btn__mobile-menu");
const toggleMenu = () => {
  const isMenuOpen = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", !isMenuOpen);
  mobileMenu.classList.toggle("is-open");
  mobileMenuBtn.classList.toggle("icon-close");
  document.body.classList.toggle("no-scroll");
};
const closeMenu = (e) => {
  const isBurgerActive = window.innerWidth <= 768 || document.body.clientWidth <= 768;
  if (e.target.classList.contains("nav__link") && isBurgerActive)
    toggleMenu();
};
const handleMenuToggle = () => {
  mobileMenuBtn.addEventListener("click", toggleMenu);
  mobileMenu.addEventListener("click", closeMenu);
  window.matchMedia("(max-width: 768px)").addEventListener("change", (e) => {
    if (e.matches)
      return;
    mobileMenuBtn.setAttribute("aria-expanded", false);
    mobileMenu.classList.remove("is-open");
    mobileMenuBtn.classList.remove("icon-close");
    document.body.classList.remove("no-scroll");
  });
};
export {
  handleMenuToggle as h
};
