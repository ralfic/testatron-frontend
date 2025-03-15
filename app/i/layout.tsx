import Container from '@/components/shared/Container';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testatron | Teacher',
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Container> {children}</Container>
      </main>
    </SidebarProvider>
  );
}
