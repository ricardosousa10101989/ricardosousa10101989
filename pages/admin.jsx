import { useEffect } from 'react';

import CustomLoginMessage from 'components/CustomLoginMessage/CustomLoginMessage';

// import netlify from 'utils/netlify';

const SELECTORS = {
  container: '.css-v758ki-AppMainContainer',
  control: '.ei073ck0',
  label: '.css-pcief1-FieldLabel-fieldLabel',
};

const Admin = ({ branch, localBackend }) => {
  useEffect(() => {
    document.documentElement.classList.add('in-cms');
    return () => document.documentElement.classList.remove('in-cms');
  }, []);

  useEffect(() => {
    const initCMS = async () => {
      const CMS = (await import('netlify-cms-app')).default;
      const { pt } = await import('netlify-cms-locales');
      const { origin } = window.location;

      // Some customizations
      pt.app.header.media = 'Media';
      pt.mediaLibrary.mediaLibrary.onDelete = 'Tem certeza de que deseja excluir a media selecionada?';
      pt.mediaLibrary.mediaLibraryModal.mediaAssets = 'Recursos de media';

      CMS.registerLocale('pt', pt);
      CMS.init({
        config: {
          backend: { branch },
          local_backend: localBackend,
        },
      });

      // Workaround Next.js's limitation to include the global styles in the preview window
      Array.from(document.styleSheets)
        .filter(stylesheet => !stylesheet.href || stylesheet.href.startsWith(origin))
        .map(stylesheet => Array.from(stylesheet.cssRules || [])
          .map(rule => rule.cssText || '')
          .join('\n'))
        .filter(style => style.includes('.main-styles__import'))
        .forEach(style => CMS.registerPreviewStyle(style, { raw: true }));
    };

    // We're leveraging Github auth, so we don't need Netlify Identity
    // (async () => {
    //   const netlifyIdentity = await netlify.identity;

    //   const refreshAndInit = async () => {
    //     await netlifyIdentity.refresh();
    //     initCMS();
    //   };

    //   const onInit = user => {
    //     netlifyIdentity.on('login', refreshAndInit);

    //     if (!user) {
    //       netlifyIdentity.open();
    //     }
    //     else {
    //       refreshAndInit();
    //     }
    //   };

    //   if (netlifyIdentity.gotrue) {
    //     onInit(netlifyIdentity.currentUser());
    //   }
    //   else {
    //     netlifyIdentity.on('init', onInit);
    //   }
    // })();

    initCMS();
  }, [ branch, localBackend ]);

  useEffect(() => {
    const findHiddenStrings = () => {
      document.querySelectorAll(SELECTORS.control).forEach(field => {
        field.querySelectorAll(SELECTORS.label).forEach(label => {
          if (label.textContent.trim() === '[hidden]') {
            field.hidden = true;
          }
        });
      });
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
    const { MutationObserver } = window;
    const observer = new MutationObserver(() => {
      findAppContainer();
      findHiddenStrings();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    findHiddenStrings();

    return () => {
      observer.disconnect();
      document.body.classList.remove('logged-in');
    };
  }, []);

  return (
    <CustomLoginMessage />
  );
};

export const getStaticProps = async ({ params }) => {
  const { execSync } = await import('child_process');

  let branch;

  try {
    // In local development we get the branch directly from git
    branch = execSync('git symbolic-ref --short -q HEAD').toString();
  }
  catch (ex) {
    // Ignore, proceeds with following if block
  }
  if (!branch) {
    // If we're deploying on Netlify, use $HEAD env var
    // Fallback to develop
    branch = process.env.HEAD || 'develop';
  }

  // Make sure there are no linebreaks in the string
  branch = branch.replace(/\r?\n|\r/g, '');

  const localBackend = process.env.NODE_ENV === 'development';

  return {
    props: {
      ...params,
      branch,
      localBackend,
    },
  };
};

export default Admin;
