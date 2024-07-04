import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "styled-components";
import theme from "./shared/theme/theme.ts";
import GlobalStyles from "./shared/theme/globalStyles.ts";
import {RouterProvider} from "react-router-dom";
import router from "./app/router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>,
)
