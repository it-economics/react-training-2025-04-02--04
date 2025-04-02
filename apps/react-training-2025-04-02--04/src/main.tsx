import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { CustomThemeProvider } from './app/CustomThemeProvider';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
