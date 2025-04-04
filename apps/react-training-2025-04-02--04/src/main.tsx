import { LinearProgress, Stack, Typography } from '@mui/material';
import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CustomThemeProvider } from './app/CustomThemeProvider';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { initI18n } from './i18n';

initI18n();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <ErrorBoundary>
      <CustomThemeProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <Stack spacing={2}>
                  <Typography>Please hold on a second</Typography>
                  <LinearProgress />
                </Stack>
              }
            >
              <RouterProvider router={router} />
            </Suspense>
          </QueryClientProvider>
        </Provider>
      </CustomThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
