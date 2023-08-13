import PrincipalLayout from '@/view/layout/PrincipalLayout';
import '@/view/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '@/store';
import { appWithTranslation } from 'next-i18next';

const theme = createTheme({});

// Adicione um tipo para Component se ele não estiver sendo tipado
type CustomAppProps = AppProps & {
  Component: React.FC<AppProps>; // Você pode precisar ajustar isso com base no seu código
};

function App({ Component, pageProps }: CustomAppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PrincipalLayout>
          <Component {...pageProps} />
        </PrincipalLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
