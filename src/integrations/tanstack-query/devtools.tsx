import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const TanStackQueryDevtools = {
  name: 'TanStack Query',
  render: (
    <div className="p-4">
      <h3 className="mb-2 text-sm font-bold">TanStack Query</h3>
      <p className="text-xs text-muted-foreground mb-4">React Query Devtools are integrated.</p>
      <ReactQueryDevtools />
    </div>
  ),
}

export default TanStackQueryDevtools
