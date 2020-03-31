(() => {
  const SELECTORS = {
    // container: '.nc-app-container', // Netlify-cms 1.9.2
    // container: '.notif__container',
    container: '.css-v758ki-AppMainContainer',
  };

  const findAppContainer = () => {
    if (document.querySelector(SELECTORS.container)) {
      document.body.classList.add('logged-in');
    }
    else {
      document.body.classList.remove('logged-in');
    }
  };

  // Because it's a React app, its nodes are constantly re-rendered,
  // so we need to keep reapplying our listener.
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      findAppContainer();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  findAppContainer(document.body);
})();
