import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from './theme.ts';
import { Router } from './router.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Router />
      <Toaster />
    </MantineProvider>
  </StrictMode>
)
