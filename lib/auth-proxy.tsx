
 "use client"
 import {  RequiredAuthProvider } from '@propelauth/react'

import {} from '@propelauth/react';


export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <RequiredAuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL!}>
      {children}
    </RequiredAuthProvider>
  );
}