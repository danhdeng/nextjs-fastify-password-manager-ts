import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';

const queryClients =new QueryClient;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClients}>
      <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
  </QueryClientProvider>
  );
}

export default MyApp
