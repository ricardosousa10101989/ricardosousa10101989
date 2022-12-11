import analytics from 'content/analytics.yml';

const useGTag = () => ({
  tagId: analytics.ga,
});

export default useGTag;
