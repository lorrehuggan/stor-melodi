import Layout from '../components/Layout';
import '../styles/globals.scss';
import { AppProvider } from '../context/AppProvider';
import appReducer, { initialState } from '../reducers/appReducer';

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
