import analytics from 'content/analytics.yml';

const useFPixel = () => ({
  eventIds: analytics.fpe,
  pixelId: analytics.fp,
});

export default useFPixel;
