import PrincipalLayout from '@/view/layout/PrincipalLayout'
import '@/view/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '@/store';

const theme = createTheme({
  
});

export default function App({ Component, pageProps }: AppProps) {
  return <>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <PrincipalLayout>
                <Component {...pageProps} />
              </PrincipalLayout>          
            </ThemeProvider>
          </Provider>
        </>
          
}
