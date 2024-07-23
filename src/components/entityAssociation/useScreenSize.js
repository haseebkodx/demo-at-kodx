import { useEffect, useState } from 'react';

const getScreenSize = () => {
  const width = window.innerWidth;
  if (width < 431) return 'mb';
  else if (width < 1231) return 'lg';
  else return 'xl';
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize);

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;
