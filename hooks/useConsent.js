import { useMemo } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

import cookieConsent from 'utils/cookieConsent';

const { setGlobalState, useGlobalState } = createGlobalState({
  consent: cookieConsent.read(),
});

cookieConsent.listen(newConsent => setGlobalState('consent', newConsent));

const useConsent = consentType => {
  const [ consent ] = useGlobalState('consent');

  return useMemo(() => [
    consentType
      ? (consent?.[consentType] || false)
      : (consent || null),

    value => {
      cookieConsent.save(
        consentType
          ? {
            ...consent,
            [consentType]: value,
          }
          : {
            ...consent,
            ...value,
          },
      );
    },
  ], [ consent, consentType ]);
};

export default useConsent;
