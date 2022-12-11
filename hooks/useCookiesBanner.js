import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ cookiesBanner: null });

const useCookiesBanner = () => useGlobalState('cookiesBanner');

export default useCookiesBanner;
