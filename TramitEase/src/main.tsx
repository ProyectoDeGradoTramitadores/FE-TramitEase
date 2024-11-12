import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from 'styled-components';
import theme from './shared/theme/theme';
import GlobalStyles from './shared/theme/globalStyles';
import './app/providers/AuthProvider.ts';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import AppRoutes from './app/routes/router.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <SuperTokensWrapper>
                    <AppRoutes/>
                </SuperTokensWrapper>
            </ThemeProvider>
    </React.StrictMode>
);
