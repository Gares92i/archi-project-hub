
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Upload, Building, Bell, Lock, UserCog, Globe, Palette, Database } from "lucide-react";

const Settings = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-1">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez les paramètres de votre compte et de l'application
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto">
          <TabsTrigger value="account" className="flex-col py-2 h-auto">
            <UserCog className="h-4 w-4 mb-1" />
            <span>Compte</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex-col py-2 h-auto">
            <Building className="h-4 w-4 mb-1" />
            <span>Entreprise</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-col py-2 h-auto">
            <Bell className="h-4 w-4 mb-1" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex-col py-2 h-auto">
            <Palette className="h-4 w-4 mb-1" />
            <span>Apparence</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-col py-2 h-auto">
            <Lock className="h-4 w-4 mb-1" />
            <span>Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex-col py-2 h-auto">
            <Globe className="h-4 w-4 mb-1" />
            <span>Langue</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex-col py-2 h-auto">
            <Database className="h-4 w-4 mb-1" />
            <span>Données</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles et de contact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=4"
                    alt="Jean Moreau"
                  />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-medium">Photo de profil</h3>
                  <p className="text-sm text-muted-foreground">
                    Cette photo sera visible par tous les membres de l'équipe
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button size="sm" variant="outline">
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      defaultValue="Jean"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      defaultValue="Moreau"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Votre adresse e-mail"
                    defaultValue="jean.moreau@archihub.fr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    placeholder="Votre numéro de téléphone"
                    defaultValue="+33 6 45 67 89 01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Fonction</Label>
                  <Input
                    id="title"
                    placeholder="Votre titre"
                    defaultValue="Chef de projet"
                  />
                </div>
              </div>

              <Button>Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>
                Mettez à jour les informations de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input
                    id="companyName"
                    placeholder="Nom de l'entreprise"
                    defaultValue="ArchiHub Studio"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    placeholder="Adresse"
                    defaultValue="45 rue de l'Architecture"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" placeholder="Ville" defaultValue="Paris" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Code postal</Label>
                    <Input
                      id="zipCode"
                      placeholder="Code postal"
                      defaultValue="75001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      placeholder="Pays"
                      defaultValue="France"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Numéro SIRET</Label>
                  <Input
                    id="taxId"
                    placeholder="Numéro SIRET"
                    defaultValue="123 456 789 00012"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    placeholder="Site web"
                    defaultValue="https://www.archihub.fr"
                  />
                </div>
              </div>

              <Button>Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par e-mail</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mises à jour des projets</p>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications pour les mises à jour des projets
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Échéances à venir</p>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des rappels pour les échéances à venir
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouveaux commentaires</p>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications pour les nouveaux commentaires
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouvelles tâches assignées</p>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications pour les nouvelles tâches assignées
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications dans l'application</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mises à jour des projets</p>
                      <p className="text-sm text-muted-foreground">
                        Afficher les notifications pour les mises à jour des projets
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Échéances à venir</p>
                      <p className="text-sm text-muted-foreground">
                        Afficher les notifications pour les échéances à venir
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouveaux messages</p>
                      <p className="text-sm text-muted-foreground">
                        Afficher les notifications pour les nouveaux messages
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button>Enregistrer les préférences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brief content for other tabs */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Paramètres d'apparence à implémenter
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez vos paramètres de sécurité et authentification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Paramètres de sécurité à implémenter
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Langue</CardTitle>
              <CardDescription>
                Changez la langue de l'interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Paramètres de langue à implémenter
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Données</CardTitle>
              <CardDescription>
                Gérez vos données et exportations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Paramètres de données à implémenter
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
