import store from './store';
import Router from './routes';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import { App as AntApp, ConfigProvider } from 'antd';

const App = () => {
  return (
    <HelmetProvider>
      <ConfigProvider
        theme={{
          hashed: false,
          token: {
            fontSize: 14,
            borderRadius: 5,
            controlHeight: 36,
            colorPrimary: '#a100b5',
            fontFamily: '"Public Sans", sans-serif',
          },
          components: {
            // Select: { controlHeight: 48 },
            // DatePicker: { controlHeight: 48 },
            Typography: { colorTextBase: '#1B1E22' },
            // Input: { fontSize: 16, controlHeight: 48 },
          },
        }}
      >
        <Provider store={store}>
          <AntApp>
            <AuthProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </AuthProvider>
          </AntApp>
        </Provider>
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default App;
