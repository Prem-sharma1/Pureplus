import React from 'react';

// Auth protection is handled by middleware.ts
// This layout just wraps admin pages (dashboard, etc.)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
