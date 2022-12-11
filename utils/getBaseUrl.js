const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // Netlify Deployment via Github Actions
  if (process.env.PREFIX) {
    return `https://${process.env.PREFIX}--${process.env.SITE_NAME}.netlify.app`;
  }

  // This will only work for the main domain, it will not work for deploy previews because
  // DEPLOY_PRIME_URL is not passed there; netlify-plugin-inline-functions-env does not seem to
  // work either.
  const primeUrl = process.env.DEPLOY_PRIME_URL;
  const url = process.env.URL;

  return primeUrl || url;
};

export default getBaseUrl;
