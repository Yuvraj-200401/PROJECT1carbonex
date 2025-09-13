import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard-sidebar';
import DashboardHeader from '@/components/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar>
          <DashboardSidebar />
        </Sidebar>
        <SidebarInset>
          <div className="flex h-full flex-col">
            <DashboardHeader />
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
