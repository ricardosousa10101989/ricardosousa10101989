import getBaseUrl from 'utils/getBaseUrl';

const absoluteUrl = (url, req) => (url.startsWith('/')
  ? `${getBaseUrl(req)}${url}`
  : url
);

export default absoluteUrl;
