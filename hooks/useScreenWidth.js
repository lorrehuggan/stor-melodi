import React, { useState, useEffect } from 'react';

function useScreenSize(screen) {
  const [smallScreen, setSmallScreen] = useState(false);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (window.innerWidth <= screen) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [width, screen]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
  });

  return { smallScreen };
}

export default useScreenSize;
