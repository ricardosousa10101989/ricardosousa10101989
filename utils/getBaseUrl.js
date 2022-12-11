const getBaseUrl = req => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  if (req?.headers?.host) {
    return `http${!req.headers.host.startsWith('localhost') ? 's' : ''}://${req.headers.host}`;
  }

  // Netlify Deployment via Github Actions
  if (process.env.PREFIX && ![ 'master', 'production' ].includes(process.env.PREFIX)) {
    return `https://${process.env.PREFIX}--${process.env.SITE_NAME}.netlify.app`;
  }

  // This will only work for the main domain, it will not work for deploy previews because
  // DEPLOY_PRIME_URL is not passed there; netlify-plugin-inline-functions-env does not seem to
  // work either.
  return process.env.URL;
};

export default getBaseUrl;
