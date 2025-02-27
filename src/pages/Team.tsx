
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Phone, ShieldCheck, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "vacation";
  projects: number;
  isAdmin: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sophie Laurent",
    role: "Architecte principal",
    department: "Design",
    avatar: "https://i.pravatar.cc/150?u=1",
    email: "sophie.laurent@archihub.fr",
    phone: "+33 6 12 34 56 78",
    status: "active",
    projects: 8,
    isAdmin: true,
  },
  {
    id: "2",
    name: "Thomas Dubois",
    role: "Ingénieur structure",
    department: "Ingénierie",
    avatar: "https://i.pravatar.cc/150?u=2",
    email: "thomas.dubois@archihub.fr",
    phone: "+33 6 23 45 67 89",
    status: "active",
    projects: 5,
    isAdmin: false,
  },
  {
    id: "3",
    name: "Marie Lefevre",
    role: "Designer d'intérieur",
    department: "Design",
    avatar: "https://i.pravatar.cc/150?u=3",
    email: "marie.lefevre@archihub.fr",
    phone: "+33 6 34 56 78 90",
    status: "vacation",
    projects: 6,
    isAdmin: false,
  },
  {
    id: "4",
    name: "Jean Moreau",
    role: "Chef de projet",
    department: "Gestion",
    avatar: "https://i.pravatar.cc/150?u=4",
    email: "jean.moreau@archihub.fr",
    phone: "+33 6 45 67 89 01",
    status: "active",
    projects: 12,
    isAdmin: true,
  },
  {
    id: "5",
    name: "Camille Bernard",
    role: "Architecte paysagiste",
    department: "Design",
    avatar: "https://i.pravatar.cc/150?u=5",
    email: "camille.bernard@archihub.fr",
    phone: "+33 6 56 78 90 12",
    status: "active",
    projects: 4,
    isAdmin: false,
  },
  {
    id: "6",
    name: "Lucas Petit",
    role: "Dessinateur technique",
    department: "Design",
    avatar: "https://i.pravatar.cc/150?u=6",
    email: "lucas.petit@archihub.fr",
    phone: "+33 6 67 89 01 23",
    status: "inactive",
    projects: 3,
    isAdmin: false,
  },
  {
    id: "7",
    name: "Emma Roux",
    role: "Chargée de clientèle",
    department: "Commercial",
    avatar: "https://i.pravatar.cc/150?u=7",
    email: "emma.roux@archihub.fr",
    phone: "+33 6 78 90 12 34",
    status: "active",
    projects: 9,
    isAdmin: false,
  },
  {
    id: "8",
    name: "Antoine Girard",
    role: "BIM Manager",
    department: "Technique",
    avatar: "https://i.pravatar.cc/150?u=8",
    email: "antoine.girard@archihub.fr",
    phone: "+33 6 89 01 23 45",
    status: "active",
    projects: 7,
    isAdmin: true,
  },
];

const departments = [
  { name: "Tous", value: "all" },
  { name: "Design", value: "Design" },
  { name: "Ingénierie", value: "Ingénierie" },
  { name: "Gestion", value: "Gestion" },
  { name: "Commercial", value: "Commercial" },
  { name: "Technique", value: "Technique" },
];

const statusColors = {
  active: "bg-green-500/10 text-green-700 border-green-500/30",
  inactive: "bg-gray-500/10 text-gray-700 border-gray-500/30",
  vacation: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
};

const statusLabels = {
  active: "Actif",
  inactive: "Inactif",
  vacation: "En congé",
};

const Team = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Équipe</h1>
            <p className="text-muted-foreground">
              Gérez votre équipe et les permissions
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un membre
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <TabsList>
            {departments.map((dept) => (
              <TabsTrigger key={dept.value} value={dept.value}>
                {dept.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Exporter
            </Button>
            <Button variant="outline" size="sm">
              Filtrer
            </Button>
          </div>
        </div>

        {departments.map((dept) => (
          <TabsContent key={dept.value} value={dept.value}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers
                .filter(
                  (member) =>
                    dept.value === "all" || member.department === dept.value
                )
                .map((member) => (
                  <Card key={member.id} className="hover-lift">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Voir profil</DropdownMenuItem>
                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                            <DropdownMenuItem>Attribuer un projet</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Désactiver
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <Badge variant="outline" className={statusColors[member.status]}>
                          {statusLabels[member.status]}
                        </Badge>
                        
                        <div className="flex gap-3">
                          <div className="text-sm">
                            <span className="font-medium">{member.projects}</span>{" "}
                            <span className="text-muted-foreground">projets</span>
                          </div>
                          
                          {member.isAdmin && (
                            <div className="flex items-center gap-1 text-sm text-blue-600">
                              <ShieldCheck className="h-4 w-4" />
                              <span>Admin</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </MainLayout>
  );
};

export default Team;
