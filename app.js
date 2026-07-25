document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.signup-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Subscribed!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1800);
    });
  }
});
