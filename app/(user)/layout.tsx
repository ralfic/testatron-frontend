import { Container } from '@/components/shared/Container';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Container className="h-full"> {children}</Container>
      </main>
    </SidebarProvider>
  );
}
