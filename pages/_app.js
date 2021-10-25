import Layout from '../components/Layout';
import '../styles/globals.scss';
import { AppProvider } from '../context/AppProvider';
import appReducer, { initialState } from '../reducers/appReducer';
//progress bar
import '../styles/nprogress.scss';
import Router from 'next/router';
import nProgress from 'nprogress';
import { useState, useEffect } from 'react';
import SmallScreen from '../components/SmallScreen';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
  const [smallScreen, setSmallScreen] = useState(false);
  const [width, setWidth] = useState(null);

  //------->
  // render small screen component if the users screen size is too small

  useEffect(() => {
    if (window.innerWidth <= 1020) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [width]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
  });

  return (
    <AppProvider initialState={initialState} reducer={appReducer}>
      {smallScreen ? (
        <SmallScreen />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </AppProvider>
  );
}

export default MyApp;
