/* ==========================================================================
   The Wonder Moms — Main Application JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNewsletterForm();
  initProductFilters();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   Newsletter Signup Form
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.querySelector('.signup-form');
  if (!form) return;

  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('button');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const valid = validateEmail(email);

    if (!valid) {
      showFormError(emailInput, 'Please enter a valid email address');
      return;
    }

    // Show success state
    emailInput.classList.remove('input-error');
    emailInput.value = '';
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribed!';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2500);
  });

  // Clear error on input
  emailInput.addEventListener('input', () => {
    emailInput.classList.remove('input-error');
  });
}

function validateEmail(email) {
  // RFC 5322 simplified regex for common email formats
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(input, message) {
  input.classList.add('input-error');
  input.setAttribute('aria-invalid', 'true');

  // Remove existing error message if any
  const existing = input.parentElement.querySelector('.form-error');
  if (existing) existing.remove();

  const error = document.createElement('span');
  error.className = 'form-error';
  error.textContent = message;
  error.setAttribute('role', 'alert');
  input.insertAdjacentElement('afterend', error);
}

/* --------------------------------------------------------------------------
   Product Filter
   -------------------------------------------------------------------------- */
function initProductFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.product-card');
  if (!pills.length || !cards.length) return;

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      // Toggle active pill
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const category = pill.textContent.trim();

      cards.forEach((card) => {
        if (category === 'All') {
          card.style.display = '';
          return;
        }
        const cardCategory = card.getAttribute('data-category');
        card.style.display = cardCategory === category ? '' : 'none';
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Smooth Scroll for hash anchor links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
