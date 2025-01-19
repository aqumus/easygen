import './global.css';
import { ReactNode } from 'react';

import { AppProvider } from './provider';

export const metadata = {
  title: 'Easy generator',
  description: 'Welcome to Easy generator',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>
            {children}
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

// We are not prerendering anything because the app is highly dynamic
// and the data depends on the user so we need to send cookies with each request
export const dynamic = 'force-dynamic';
