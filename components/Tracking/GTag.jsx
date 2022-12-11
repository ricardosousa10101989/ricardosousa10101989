import { useEffect } from 'react';
import Script from 'next/script';

import useConsent from 'hooks/useConsent';
import useGTag from 'hooks/useGTag';
import useRouter from 'hooks/useRouter';

const TrackingGTag = () => {
  const [ consent ] = useConsent('analytics');
  const { tagId } = useGTag();
  const { events } = useRouter();

  useEffect(() => {
    const handleRouteChanged = location => {
      const { gtag } = window;
      if (gtag && tagId) {
        tagId.split(',').forEach(id => {
          gtag('config', id, { page_path: location });
        });
      }
    };

    events.on('routeChangeStart', handleRouteChanged);

    return () => {
      events.off('routeChangeStart', handleRouteChanged);
    };
  }, [ events, tagId ]);

  return !!tagId && consent && (
    <>
      <Script
        async
        id="gtag-src"
        src={ `https://www.googletagmanager.com/gtag/js${tagId ? `?id=${tagId.split(',')[0]}` : ''}` }
      />

      <Script id="gtag-datalayer">
        { 'window.dataLayer = window.dataLayer || [];\
        function gtag(){dataLayer.push(arguments);}\
        gtag(\'js\', new Date());' }
      </Script>

      { tagId.split(',').map(id => (
        <Script
          key={ `gtag-${id}` }
          id={ `gtag-${id}` }
        >
          { `gtag('config', '${id}');` }
        </Script>
      )) }
    </>
  );
};

export default TrackingGTag;
