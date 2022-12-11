import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ drawerMenu: false });

const useDrawerMenu = () => useGlobalState('drawerMenu');

export default useDrawerMenu;
