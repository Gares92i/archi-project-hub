
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone, MoreVertical, Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  projects: string[];
  avatar?: string;
  status: "active" | "offline" | "busy";
}

// Mock data
const membersData: TeamMember[] = [
  {
    id: "1",
    name: "Sophie Laurent",
    role: "Architecte principale",
    email: "sophie.laurent@exemple.fr",
    phone: "01 23 45 67 89",
    projects: ["Villa Moderna", "Résidence Eterna"],
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4",
    status: "active",
  },
  {
    id: "2",
    name: "Thomas Dubois",
    role: "Chef de projet",
    email: "thomas.dubois@exemple.fr",
    phone: "01 23 45 67 90",
    projects: ["Tour Horizon", "Centre Commercial Lumina"],
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    status: "active",
  },
  {
    id: "3",
    name: "Marie Lefevre",
    role: "Designer d'intérieur",
    email: "marie.lefevre@exemple.fr",
    phone: "01 23 45 67 91",
    projects: ["Villa Moderna", "Bureaux Panorama"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    status: "busy",
  },
  {
    id: "4",
    name: "Jean Moreau",
    role: "Ingénieur structure",
    email: "jean.moreau@exemple.fr",
    phone: "01 23 45 67 92",
    projects: ["Tour Horizon", "Complexe Sportif Olympia"],
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
    status: "offline",
  },
  {
    id: "5",
    name: "Camille Bernard",
    role: "Architecte paysagiste",
    email: "camille.bernard@exemple.fr",
    phone: "01 23 45 67 93",
    projects: ["Résidence Eterna", "École Futura"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    status: "active",
  },
  {
    id: "6",
    name: "Antoine Girard",
    role: "Concepteur BIM",
    email: "antoine.girard@exemple.fr",
    phone: "01 23 45 67 94",
    projects: ["Centre Commercial Lumina", "Hôtel Riviera"],
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c",
    status: "offline",
  },
  {
    id: "7",
    name: "Julie Martin",
    role: "Dessinatrice technique",
    email: "julie.martin@exemple.fr",
    phone: "01 23 45 67 95",
    projects: ["Villa Moderna", "Tour Horizon"],
    avatar: "https://images.unsplash.com/photo-1614644147724-2d4785d69962",
    status: "busy",
  },
  {
    id: "8",
    name: "Alexandre Petit",
    role: "Responsable chantier",
    email: "alexandre.petit@exemple.fr",
    phone: "01 23 45 67 96",
    projects: ["Résidence Eterna", "Complexe Sportif Olympia"],
    avatar: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00",
    status: "active",
  },
];

const TeamPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddMemberSheetOpen, setIsAddMemberSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateMember = () => {
    toast({
      title: "Membre ajouté",
      description: "Le nouveau membre a été ajouté à l'équipe avec succès"
    });
    setIsAddMemberSheetOpen(false);
  };

  // Filter members based on search and active tab
  const filteredMembers = membersData.filter((member) => {
    // Apply search filter
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "architects")
      return matchesSearch && member.role.toLowerCase().includes("architecte");
    if (activeTab === "engineers")
      return matchesSearch && member.role.toLowerCase().includes("ingénieur");
    if (activeTab === "designers")
      return matchesSearch && member.role.toLowerCase().includes("designer");

    return matchesSearch;
  });

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "offline":
        return "bg-gray-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Équipe</h1>
            <p className="text-muted-foreground">
              Gérez les membres de votre équipe et leurs rôles
            </p>
          </div>
          <Button onClick={() => setIsAddMemberSheetOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un membre
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un membre..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="architects">Architectes</TabsTrigger>
          <TabsTrigger value="engineers">Ingénieurs</TabsTrigger>
          <TabsTrigger value="designers">Designers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                            member.status
                          )}`}
                        ></span>
                      </div>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.phone}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-2">Projets</p>
                      <div className="flex flex-wrap gap-1">
                        {member.projects.map((project) => (
                          <Badge key={project} variant="outline" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredMembers.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mb-4 text-muted-foreground/50" />
                <p className="text-lg mb-2">Aucun membre trouvé</p>
                <p>Essayez d'ajuster vos filtres ou ajoutez un nouveau membre</p>
              </div>
            )}
          </div>
        </TabsContent>

        {["architects", "engineers", "designers"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Search className="h-12 w-12 mb-4 text-muted-foreground/50" />
                  <p className="text-lg mb-2">Aucun membre trouvé</p>
                  <p>Essayez d'ajuster vos filtres ou ajoutez un nouveau membre</p>
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <Card key={member.id}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                                member.status
                              )}`}
                            ></span>
                          </div>
                          <div>
                            <CardTitle className="text-base">{member.name}</CardTitle>
                            <CardDescription>{member.role}</CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                            <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{member.phone}</span>
                        </div>
                        <div className="pt-2">
                          <p className="text-sm font-medium mb-2">Projets</p>
                          <div className="flex flex-wrap gap-1">
                            {member.projects.map((project) => (
                              <Badge key={project} variant="outline" className="text-xs">
                                {project}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Panneau d'ajout de membre */}
      <Sheet open={isAddMemberSheetOpen} onOpenChange={setIsAddMemberSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Ajouter un membre</SheetTitle>
            <SheetDescription>
              Ajoutez un nouveau membre à votre équipe de projet.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="member-name">Nom complet</Label>
              <Input id="member-name" placeholder="Nom et prénom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-role">Rôle / Fonction</Label>
              <Select>
                <SelectTrigger id="member-role">
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="architecte">Architecte</SelectItem>
                  <SelectItem value="chef-projet">Chef de projet</SelectItem>
                  <SelectItem value="ingenieur">Ingénieur</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="dessinateur">Dessinateur</SelectItem>
                  <SelectItem value="responsable-chantier">Responsable chantier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-email">Email</Label>
              <Input id="member-email" type="email" placeholder="email@exemple.fr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-phone">Téléphone</Label>
              <Input id="member-phone" placeholder="01 23 45 67 89" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-projects">Projets assignés</Label>
              <Select>
                <SelectTrigger id="member-projects">
                  <SelectValue placeholder="Sélectionner des projets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa-moderna">Villa Moderna</SelectItem>
                  <SelectItem value="tour-horizon">Tour Horizon</SelectItem>
                  <SelectItem value="residence-eterna">Résidence Eterna</SelectItem>
                  <SelectItem value="centre-commercial">Centre Commercial Lumina</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Vous pourrez assigner plus de projets après la création du membre
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-avatar">Avatar (optionnel)</Label>
              <Input id="member-avatar" type="file" accept="image/*" />
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsAddMemberSheetOpen(false)}>Annuler</Button>
            <Button onClick={handleCreateMember}>Ajouter le membre</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
};

export default TeamPage;
