
 "use client"
 import {  RequiredAuthProvider } from '@propelauth/react'

import {} from '@propelauth/react';
import LandingPage from '@/app/page';

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <RequiredAuthProvider displayIfLoggedOut={<LandingPage></LandingPage>} authUrl={process.env.NEXT_PUBLIC_AUTH_URL!}>
      {children}
    </RequiredAuthProvider>
  );
}