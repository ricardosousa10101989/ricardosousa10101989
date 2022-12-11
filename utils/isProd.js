const isProd = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const { hostname, protocol } = window.location;

  if (protocol !== 'https:') {
    return false;
  }

  if (hostname === 'localhost') {
    return false;
  }

  if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname)) {
    return false;
  }

  if (hostname.includes('netlify')) {
    return false;
  }

  return true;
};

export default isProd;
