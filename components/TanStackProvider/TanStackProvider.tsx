"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface TanStackProviderProps {
  children: React.ReactNode;
}

export default function TanStackProvider({ children }: TanStackProviderProps) {
  const [qClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={qClient}>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      {children}
    </QueryClientProvider>
  );
}
