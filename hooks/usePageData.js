import { useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({
  pageData: null,
});

let prefetchedPageData = null;

const usePageData = prefetched => {
  const [ pageData, setPageData ] = useGlobalState('pageData');

  if (prefetched) {
    prefetchedPageData = prefetched;
  }

  useEffect(() => {
    if (prefetched) {
      setPageData(prefetched);
    }
  }, [ prefetched, setPageData ]);

  return pageData || prefetchedPageData;
};

export default usePageData;
