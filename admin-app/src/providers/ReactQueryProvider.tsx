"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error: any) => {
                console.log(error);
                return error?.errors[0]?.message !== "E_UNAUTHORIZED_ACCESS: Unauthorized access"
            },
            retryDelay: 1000,
        },
    },
});
function RQProviders({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default RQProviders;
