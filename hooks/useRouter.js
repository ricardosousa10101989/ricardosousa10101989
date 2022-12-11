import { useCallback, useEffect, useMemo } from 'react';
import { useRouter as useNextRouter } from 'next/router';
import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ prevPaths: [ '', '' ] });

const useRouter = () => {
  const [ prevPaths ] = useGlobalState('prevPaths');

  const router = useNextRouter();
  const { asPath, pathname, query } = router;

  const buildPathWithQuery = useCallback(
    path => {
      const str = Object.entries(query || {})
        .reduce((acc, [ key, val ]) => acc.replace(`[${key}]`, val), path || '');

      return str || '/';
    },
    [ query ],
  );

  const path = useMemo(
    () => buildPathWithQuery(pathname),
    [ buildPathWithQuery, pathname ],
  );

  useEffect(() => {
    if (prevPaths[1] !== asPath) {
      prevPaths.push(asPath);
      prevPaths.shift();
    }
  }, [ asPath, prevPaths ]);

  return {
    ...router,
    buildPathWithQuery,
    path,
    prevPath: prevPaths[0],
  };
};

export default useRouter;
