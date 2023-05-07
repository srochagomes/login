import PrincipalLayout from '@/view/layout/PrincipalLayout'
import '@/view/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // mode: 'dark',
    // primary: {
    //   main: '#1976d2',
    // },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return <>
          <ThemeProvider theme={theme}>
            <PrincipalLayout>
              <Component {...pageProps} />
            </PrincipalLayout>          
          </ThemeProvider>
        </>
          
}
