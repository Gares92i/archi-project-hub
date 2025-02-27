
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, Image, Search, Video, FileArchive, MoreVertical, Plus, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Resource {
  id: string;
  name: string;
  type: "document" | "image" | "video" | "archive" | "other";
  category: "templates" | "standards" | "materials" | "tutorials" | "software";
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  downloads: number;
}

const resources: Resource[] = [
  {
    id: "1",
    name: "Template_projet_résidentiel.dwg",
    type: "document",
    category: "templates",
    size: "4.2 MB",
    uploadedBy: "Sophie Laurent",
    uploadedAt: "2023-03-15",
    downloads: 145,
  },
  {
    id: "2",
    name: "RT2020_normes_thermiques.pdf",
    type: "document",
    category: "standards",
    size: "2.8 MB",
    uploadedBy: "Jean Moreau",
    uploadedAt: "2023-01-22",
    downloads: 87,
  },
  {
    id: "3",
    name: "Catalogue_materiaux_2023.pdf",
    type: "document",
    category: "materials",
    size: "15.6 MB",
    uploadedBy: "Marie Lefevre",
    uploadedAt: "2023-02-10",
    downloads: 210,
  },
  {
    id: "4",
    name: "Tutoriel_Revit_débutant.mp4",
    type: "video",
    category: "tutorials",
    size: "328.5 MB",
    uploadedBy: "Antoine Girard",
    uploadedAt: "2022-11-05",
    downloads: 321,
  },
  {
    id: "5",
    name: "Plans_fondation_standard.dwg",
    type: "document",
    category: "templates",
    size: "3.9 MB",
    uploadedBy: "Thomas Dubois",
    uploadedAt: "2023-04-02",
    downloads: 65,
  },
  {
    id: "6",
    name: "Textures_marbre_HD.zip",
    type: "archive",
    category: "materials",
    size: "128.2 MB",
    uploadedBy: "Camille Bernard",
    uploadedAt: "2023-03-18",
    downloads: 142,
  },
  {
    id: "7",
    name: "Normes_PMR_2023.pdf",
    type: "document",
    category: "standards",
    size: "5.3 MB",
    uploadedBy: "Jean Moreau",
    uploadedAt: "2023-02-28",
    downloads: 98,
  },
  {
    id: "8",
    name: "Rendu_exemple_photoréaliste.jpg",
    type: "image",
    category: "tutorials",
    size: "8.7 MB",
    uploadedBy: "Sophie Laurent",
    uploadedAt: "2023-01-15",
    downloads: 187,
  },
  {
    id: "9",
    name: "Plugins_SketchUp_2023.zip",
    type: "archive",
    category: "software",
    size: "45.8 MB",
    uploadedBy: "Antoine Girard",
    uploadedAt: "2023-03-25",
    downloads: 234,
  },
  {
    id: "10",
    name: "Formation_BIM_avancé.mp4",
    type: "video",
    category: "tutorials",
    size: "512.3 MB",
    uploadedBy: "Antoine Girard",
    uploadedAt: "2023-02-12",
    downloads: 156,
  },
];

const categories = [
  { name: "Tous", value: "all" },
  { name: "Templates", value: "templates" },
  { name: "Normes", value: "standards" },
  { name: "Matériaux", value: "materials" },
  { name: "Tutoriels", value: "tutorials" },
  { name: "Logiciels", value: "software" },
];

const iconByType = {
  document: <FileText className="h-6 w-6" />,
  image: <Image className="h-6 w-6" />,
  video: <Video className="h-6 w-6" />,
  archive: <FileArchive className="h-6 w-6" />,
  other: <FileText className="h-6 w-6" />,
};

const colorByType = {
  document: "bg-blue-100 text-blue-700",
  image: "bg-purple-100 text-purple-700",
  video: "bg-red-100 text-red-700",
  archive: "bg-yellow-100 text-yellow-700",
  other: "bg-gray-100 text-gray-700",
};

const Resources = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Ressources</h1>
            <p className="text-muted-foreground">
              Consultez et téléchargez les ressources partagées
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une ressource
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une ressource..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value}>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium">Nom</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Type</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Taille</th>
                    <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Ajouté par</th>
                    <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Téléch.</th>
                    <th className="py-3 px-4 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {resources
                    .filter(
                      (resource) =>
                        category.value === "all" ||
                        resource.category === category.value
                    )
                    .map((resource) => (
                      <tr
                        key={resource.id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-md ${colorByType[resource.type]}`}>
                              {iconByType[resource.type]}
                            </div>
                            <span className="font-medium">{resource.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          {resource.type === "document"
                            ? "Document"
                            : resource.type === "image"
                            ? "Image"
                            : resource.type === "video"
                            ? "Vidéo"
                            : resource.type === "archive"
                            ? "Archive"
                            : "Autre"}
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">{resource.size}</td>
                        <td className="py-3 px-4 hidden lg:table-cell">{resource.uploadedBy}</td>
                        <td className="py-3 px-4 hidden lg:table-cell">{formatDate(resource.uploadedAt)}</td>
                        <td className="py-3 px-4">{resource.downloads}</td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger
                              </DropdownMenuItem>
                              <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                              <DropdownMenuItem>Partager</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </MainLayout>
  );
};

export default Resources;
