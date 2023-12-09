const mobileMenu = document.querySelector('.nav');
const mobileMenuBtn = document.querySelector('.btn__mobile-menu');

const toggleMenu = () => {
  const isMenuOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  mobileMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');
  mobileMenuBtn.classList.toggle('icon-close');
  document.body.classList.toggle('no-scroll');
};

const closeMenu = (e) => {
  if (e.target.classList.contains('nav__link')) toggleMenu();
};

export const handleMenuToggle = () => {
  mobileMenuBtn.addEventListener('click', toggleMenu);
  mobileMenu.addEventListener('click', closeMenu);
};
