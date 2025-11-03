import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { AppStateProvider } from "@/lib/context/app-state-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <SidebarProvider>
          <AppSidebar />
          <div className="flex h-screen max-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
          <Toaster />
      </SidebarProvider>
    </AppStateProvider>
  );
}
