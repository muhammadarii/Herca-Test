import { AppSidebar } from "@/components/parts/Sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Providers } from "./providers";

const AppWrapper = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <Providers>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex min-h-screen">
          {/* Sidebar tetap */}
          <AppSidebar />

          {/* Main content */}
          <main className="flex-1">
            <SidebarTrigger className="md:hidden" />
            <div className="p-4">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </Providers>
  );
};

export default AppWrapper;
