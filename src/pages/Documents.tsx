
import { useState } from "react";
import { FileText, Filter, Plus, Search, Upload } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import DocumentsList, { Document } from "@/components/DocumentsList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Mock documents data
const documentsData: Document[] = [
  {
    id: "1",
    name: "Villa_Moderna_Plans_Final.pdf",
    type: "pdf",
    projectName: "Villa Moderna",
    uploadDate: "2023-06-20",
    size: "4.2 MB",
  },
  {
    id: "2",
    name: "Tour_Horizon_CCTP.docx",
    type: "doc",
    projectName: "Tour Horizon",
    uploadDate: "2023-06-18",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Residence_Eterna_Presentation.pptx",
    type: "other",
    projectName: "Résidence Eterna",
    uploadDate: "2023-06-19",
    size: "12.5 MB",
  },
  {
    id: "4",
    name: "Rendu_3D_Facade_Principale.jpg",
    type: "img",
    projectName: "Villa Moderna",
    uploadDate: "2023-06-17",
    size: "8.7 MB",
  },
  {
    id: "5",
    name: "Budget_Previsionnel_2023.xlsx",
    type: "xls",
    projectName: "Tour Horizon",
    uploadDate: "2023-06-15",
    size: "0.9 MB",
  },
  {
    id: "6",
    name: "Plan_Situation_Cadastre.pdf",
    type: "pdf",
    projectName: "Résidence Eterna",
    uploadDate: "2023-06-10",
    size: "2.3 MB",
  },
  {
    id: "7",
    name: "Details_Construction_Phase1.pdf",
    type: "pdf",
    projectName: "Centre Commercial Lumina",
    uploadDate: "2023-06-05",
    size: "5.7 MB",
  },
  {
    id: "8",
    name: "Materiaux_Echantillons.jpg",
    type: "img",
    projectName: "Villa Moderna",
    uploadDate: "2023-06-03",
    size: "3.1 MB",
  },
];

// Grouping documents by project
const groupByProject = (documents: Document[]) => {
  const grouped: Record<string, Document[]> = {};
  
  documents.forEach(doc => {
    if (!grouped[doc.projectName]) {
      grouped[doc.projectName] = [];
    }
    grouped[doc.projectName].push(doc);
  });
  
  return Object.entries(grouped).map(([projectName, docs]) => ({
    projectName,
    documents: docs
  }));
};

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState(documentsData);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  const filterDocuments = (type: string) => {
    if (selectedTypes.includes(type)) {
      // Remove type if already selected
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      // Add type to selection
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSearchQuery("");
    setFilteredDocuments(documentsData);
  };
  
  const applyFilters = () => {
    let results = documentsData;
    
    // Apply search query filter
    if (searchQuery) {
      results = results.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filters
    if (selectedTypes.length > 0) {
      results = results.filter((doc) => selectedTypes.includes(doc.type));
    }
    
    setFilteredDocuments(results);
  };

  const groupedDocuments = groupByProject(filteredDocuments);

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Documents</h1>
            <p className="text-muted-foreground">
              Gérez et consultez tous vos documents de projet
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau document
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un document..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">Filtrer par type</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pdf" 
                      checked={selectedTypes.includes("pdf")}
                      onCheckedChange={() => filterDocuments("pdf")}
                    />
                    <Label htmlFor="pdf">PDF</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="doc" 
                      checked={selectedTypes.includes("doc")}
                      onCheckedChange={() => filterDocuments("doc")}
                    />
                    <Label htmlFor="doc">Word</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="xls" 
                      checked={selectedTypes.includes("xls")}
                      onCheckedChange={() => filterDocuments("xls")}
                    />
                    <Label htmlFor="xls">Excel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="img" 
                      checked={selectedTypes.includes("img")}
                      onCheckedChange={() => filterDocuments("img")}
                    />
                    <Label htmlFor="img">Images</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="other" 
                      checked={selectedTypes.includes("other")}
                      onCheckedChange={() => filterDocuments("other")}
                    />
                    <Label htmlFor="other">Autres</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2">
                  <Button variant="ghost" onClick={clearFilters} size="sm">
                    Réinitialiser
                  </Button>
                  <Button onClick={applyFilters} size="sm">
                    Appliquer
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="oldest">Plus anciens</SelectItem>
                <SelectItem value="name">Nom (A-Z)</SelectItem>
                <SelectItem value="size">Taille</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""} trouvé{filteredDocuments.length !== 1 ? "s" : ""}
          </p>
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="byProject">Par projet</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all">
          <DocumentsList documents={filteredDocuments} title="Tous les documents" />
        </TabsContent>
        
        <TabsContent value="byProject">
          <div className="grid grid-cols-1 gap-6">
            {groupedDocuments.length > 0 ? (
              groupedDocuments.map((group) => (
                <DocumentsList 
                  key={group.projectName} 
                  documents={group.documents} 
                  title={group.projectName} 
                />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mb-4 text-muted-foreground/50" />
                  <p className="text-lg mb-2">Aucun document trouvé</p>
                  <p>Essayez d'ajuster vos filtres ou importez de nouveaux documents</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Documents;
