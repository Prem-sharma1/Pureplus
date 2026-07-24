import React from 'react';

// Admin login has its own standalone page — no Navbar, Footer, or pt padding from root layout.
// We override root layout by providing a full html/body here.
export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
