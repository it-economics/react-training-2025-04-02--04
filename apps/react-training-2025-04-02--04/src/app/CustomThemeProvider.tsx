import { createTheme, ThemeProvider } from '@mui/material';
import { FC, PropsWithChildren, useMemo } from 'react';

export const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#6E9C9F',
          },
          secondary: {
            main: '#91DD98',
          },
        },
        components: {
          MuiButton: {
            defaultProps: {
              variant: 'contained',
              size: 'large',
              color: 'primary',
            },
          },
        },
      }),
    []
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
