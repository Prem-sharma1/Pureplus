'use client';

// The admin panel component lives in app/admin/page.tsx
// We re-export it here so /admin/panel serves the panel
// while /admin handles auth redirect via route.ts + middleware
import AdminDashboard from '@/app/admin/page';

export default AdminDashboard;
