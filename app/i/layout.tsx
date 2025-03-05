import DashboardDrawer from '@/components/shared/dashboard-drawer';
import { DashboardSidebar } from '@/components/shared/dashboard-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testatron | Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider >
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
