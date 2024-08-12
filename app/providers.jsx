// app/providers.jsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ session, children }) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
