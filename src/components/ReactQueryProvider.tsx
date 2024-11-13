import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';


const queryClient = new QueryClient();
// @ts-ignore
const ReactQueryProvider = ({children}) => {

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider