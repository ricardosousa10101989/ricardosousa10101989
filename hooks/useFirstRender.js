import { useEffect, useState } from 'react';

const useFirstRender = () => {
  const [ firstRender, setFirstRender ] = useState(false);

  useEffect(() => setFirstRender(true), []);

  return firstRender;
};

export default useFirstRender;
