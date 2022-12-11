import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ lightbox: null });

const useLightbox = () => useGlobalState('lightbox');

export default useLightbox;
