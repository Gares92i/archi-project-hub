
import { ReactNode } from "react";
import Navbar from "../Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "../Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col w-full">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-auto">
            <div className="mx-auto max-w-full animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
