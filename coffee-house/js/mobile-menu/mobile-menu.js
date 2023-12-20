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
  const isBurgerActive = window.innerWidth <= 768 || document.body.clientWidth <= 768;
  if (e.target.classList.contains('nav__link') && isBurgerActive) toggleMenu();
};

export const handleMenuToggle = () => {
  mobileMenuBtn.addEventListener('click', toggleMenu);
  mobileMenu.addEventListener('click', closeMenu);

  window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) return;

    mobileMenuBtn.setAttribute('aria-expanded', false);
    mobileMenu.classList.remove('is-open');
    mobileMenuBtn.classList.remove('icon-close');
    document.body.classList.remove('no-scroll');
  });
};
