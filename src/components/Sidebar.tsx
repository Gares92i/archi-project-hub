
import { NavLink } from "react-router-dom";
import {
  Building,
  Calendar,
  ClipboardCheck,
  FileText,
  Home,
  Layers,
  Settings,
  Users
} from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { name: "Tableau de bord", icon: Home, path: "/" },
  { name: "Projets", icon: Building, path: "/projects" },
  { name: "Tâches", icon: ClipboardCheck, path: "/tasks" },
  { name: "Documents", icon: FileText, path: "/documents" },
  { name: "Calendrier", icon: Calendar, path: "/calendar" },
];

const secondaryNavItems = [
  { name: "Équipe", icon: Users, path: "/team" },
  { name: "Ressources", icon: Layers, path: "/resources" },
  { name: "Paramètres", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  return (
    <SidebarComponent>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2 font-display">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg font-semibold">A</span>
          </div>
          <span className="font-medium text-lg">Archi<span className="text-muted-foreground">Hub</span></span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "text-primary font-medium" : "text-muted-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Gestion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "text-primary font-medium" : "text-muted-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-muted-foreground border-t border-border">
        <div>ArchiHub v1.0</div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
