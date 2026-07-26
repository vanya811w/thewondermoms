document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.signup-form');
  const tabs = document.querySelectorAll('.article-tab');
  const articles = document.querySelectorAll('.article-section');

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

  function setActiveArticle(id) {
    tabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.article === id);
    });
    articles.forEach((article) => {
      article.classList.toggle('active', article.id === id);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setActiveArticle(tab.dataset.article);
      const target = document.getElementById(tab.dataset.article);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (tabs.length > 0) {
    setActiveArticle(tabs[0].dataset.article);
  }
});
