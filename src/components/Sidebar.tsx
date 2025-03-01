
import { FolderKanban, LayoutDashboard, FileText, Calendar, Users, Briefcase, Settings, LogOut, ChevronLeft, Menu, Paperclip, CheckSquare, Timeline } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "transparent",
        isCollapsed ? "justify-center" : ""
      )
    }
  >
    {icon}
    <span className={cn("whitespace-nowrap", isCollapsed ? "hidden" : "")}>
      {label}
    </span>
  </NavLink>
);

const Sidebar = () => {
  const sidebar = useSidebar();
  const isMobile = useIsMobile();
  const isCollapsed = sidebar.state === "collapsed";

  const handleSidebarOpenClose = () => {
    if (isMobile) {
      sidebar.setOpenMobile(!sidebar.openMobile);
    } else {
      sidebar.toggleSidebar();
    }
  };

  return (
    <>
      {isMobile && !sidebar.openMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 h-8 w-8"
          onClick={handleSidebarOpenClose}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      <div
        className={cn(
          "min-h-screen fixed lg:relative inset-y-0 z-40 flex flex-col border-r bg-background",
          sidebar.openMobile ? "left-0" : "-left-full md:left-0",
          isCollapsed ? "md:w-16" : "md:w-64",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div
            className={cn(
              "flex items-center gap-1.5",
              isCollapsed ? "justify-center md:hidden" : "justify-start"
            )}
          >
            <Briefcase className="h-6 w-6 text-primary" />
            <span className={isCollapsed ? "hidden" : "font-semibold"}>
              ArchiPlanner
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSidebarOpenClose}
            className="h-8 w-8"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed ? "rotate-180" : ""
              )}
            />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-2">
          <div className="px-3 py-2">
            <nav className="grid gap-1">
              <NavItem
                to="/"
                icon={<LayoutDashboard className="h-5 w-5" />}
                label="Tableau de bord"
                isCollapsed={isCollapsed}
              />
              <NavItem
                to="/projects"
                icon={<FolderKanban className="h-5 w-5" />}
                label="Projets"
                isCollapsed={isCollapsed}
              />
              <NavItem
                to="/tasks"
                icon={<CheckSquare className="h-5 w-5" />}
                label="Tâches"
                isCollapsed={isCollapsed}
              />
              <NavItem
                to="/gantt"
                icon={<Timeline className="h-5 w-5" />}
                label="Planning Gantt"
                isCollapsed={isCollapsed}
              />
              <NavItem
                to="/documents"
                icon={<FileText className="h-5 w-5" />}
                label="Documents"
                isCollapsed={isCollapsed}
              />
              <NavItem
                to="/calendar"
                icon={<Calendar className="h-5 w-5" />}
                label="Calendrier"
                isCollapsed={isCollapsed}
              />
              <NavItem
                to="/team"
                icon={<Users className="h-5 w-5" />}
                label="Équipe"
                isCollapsed={isCollapsed}
              />
              <NavItem
                to="/resources"
                icon={<Paperclip className="h-5 w-5" />}
                label="Ressources"
                isCollapsed={isCollapsed}
              />
              <NavItem
                to="/settings"
                icon={<Settings className="h-5 w-5" />}
                label="Paramètres"
                isCollapsed={isCollapsed}
              />
            </nav>
          </div>
        </div>

        <div className="p-4 mt-auto">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-2 justify-start",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <LogOut className="h-5 w-5" />
            <span className={isCollapsed ? "hidden" : ""}>Déconnexion</span>
          </Button>
        </div>
      </div>

      {isMobile && sidebar.openMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={handleSidebarOpenClose}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
