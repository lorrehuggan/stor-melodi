import Layout from '../components/Layout';
import '../styles/globals.scss';
import { AppProvider } from '../context/AppProvider';
import appReducer, { initialState } from '../reducers/appReducer';
//progress bar
import '../styles/nprogress.scss';
import Router from 'next/router';
import nProgress from 'nprogress';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider initialState={initialState} reducer={appReducer}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
