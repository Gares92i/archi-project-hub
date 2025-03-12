
import { FileText, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/dateFormatters";
import { projectDocuments } from "@/data/projectDetailsData";

const ProjectDocumentsTab = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Tous les documents liés au projet</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/documents')}>
              <FileText className="h-4 w-4 mr-2" />
              Importer
            </Button>
            <Button onClick={() => navigate('/documents')}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau document
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4 font-medium">Nom</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Taille</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {projectDocuments.map(doc => (
                <tr key={doc.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${
                        doc.type === 'pdf' ? 'bg-red-100 text-red-700' :
                        doc.type === 'xls' ? 'bg-green-100 text-green-700' : 
                        doc.type === 'img' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {doc.type === 'pdf' ? 'PDF' : 
                     doc.type === 'xls' ? 'Excel' : 
                     doc.type === 'img' ? 'Image' : 
                     'Document'}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{doc.size}</td>
                  <td className="py-3 px-4 text-muted-foreground">{formatDate(doc.uploadDate)}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">Télécharger</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDocumentsTab;
