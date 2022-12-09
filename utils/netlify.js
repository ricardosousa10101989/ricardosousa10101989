import isProd from 'utils/isProd';

const identity = (async () => {
  if (typeof window !== 'undefined' && isProd()) {
    const { hash, pathname } = window.location;

    if (
      hash.startsWith('#recovery_token=')
      || hash.startsWith('#invite_token=')
      || pathname.startsWith('/admin')
    ) {
      const netlifyIdentity = (await import('netlify-identity-widget')).default;

      window.netlifyIdentity = netlifyIdentity;

      if (!pathname.startsWith('/admin')) {
        // Direct users to the backoffice after verifying their email and logging in.
        netlifyIdentity.on('init', user => {
          if (!user) {
            netlifyIdentity.on('login', () => {
              window.location = '/admin/';
            });
          }
        });
      }

      netlifyIdentity.init();
      return netlifyIdentity;
    }
  }

  // Fake widget for localhost
  return {
    currentUser: () => ({}),
    gotrue: true,
    on: () => {},
    refresh: () => {},
  };
})();

const remote = async name => {
  const netlifyIdentity = await identity;
  const user = await netlifyIdentity.currentUser();

  // Assume the token exists at this point
  const token = user?.token?.access_token;
  const headers = {
    // eslint-disable-next-line prefer-template
    Authorization: 'Bearer ' + token,
    cache: 'no-cache',
    'Content-Type': 'application/json',
    mode: 'same-origin',
  };

  const { fetch, location } = window;
  const { origin } = location;

  const url = `${origin}/.netlify/functions/${name}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(response);
    return null;
  }

  return response.json();
};

const netlify = { identity, remote };

export default netlify;
