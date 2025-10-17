import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MoreHorizontal,
  PlusCircle,
  ArrowUpRight,
  Users,
  BarChart,
  CheckCircle,
  XCircle,
  Settings,
} from "lucide-react";

const data = {
  babyfoots: [
    {
      id: "BF-001",
      name: "Le Classique",
      location: "Salle de pause",
      status: "Disponible",
      gamesPlayed: 124,
    },
    {
      id: "BF-002",
      name: "Le Rapide",
      location: "Cafétéria",
      status: "En maintenance",
      gamesPlayed: 89,
    },
    {
      id: "BF-003",
      name: "Le Professionnel",
      location: "Salle de jeux",
      status: "Occupé",
      gamesPlayed: 231,
    },
    {
      id: "BF-004",
      name: "Le Vintage",
      location: "Entrée",
      status: "Disponible",
      gamesPlayed: 45,
    },
  ],
  users: [
    {
      id: "USR-001",
      name: "Alice Dupont",
      email: "alice.dupont@example.com",
      role: "Admin",
      lastLogin: "2024-10-17T10:00:00Z",
    },
    {
      id: "USR-002",
      name: "Bob Martin",
      email: "bob.martin@example.com",
      role: "Utilisateur",
      lastLogin: "2024-10-16T14:30:00Z",
    },
    {
      id: "USR-003",
      name: "Claire Durand",
      email: "claire.durand@example.com",
      role: "Utilisateur",
      lastLogin: "2024-10-17T09:15:00Z",
    },
  ],
};


//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////Page Fait par L'ia/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "disponible":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-200"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Disponible
        </Badge>
      );
    case "occupé":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 border-yellow-200"
        >
          <BarChart className="mr-2 h-4 w-4" />
          Occupé
        </Badge>
      );
    case "en maintenance":
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 border-red-200"
        >
          <XCircle className="mr-2 h-4 w-4" />
          En maintenance
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function AdminDashboardPage() {
  const totalGames = data.babyfoots.reduce(
    (acc, bf) => acc + bf.gamesPlayed,
    0
  );
  const availableBabyfoots = data.babyfoots.filter(
    (bf) => bf.status === "Disponible"
  ).length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total des Parties
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGames}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Babyfoots Disponibles
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {availableBabyfoots} / {data.babyfoots.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Actuellement en service
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs Actifs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.users.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 nouveaux ce mois-ci
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taux de Maintenance
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2%</div>
              <p className="text-xs text-muted-foreground">
                En baisse par rapport à la semaine dernière
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Gestion des Babyfoots</CardTitle>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <a href="#">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Ajouter
                  </a>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Emplacement</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Parties Jouées</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.babyfoots.map((babyfoot) => (
                      <TableRow key={babyfoot.id}>
                        <TableCell className="font-medium">
                          {babyfoot.name}
                        </TableCell>
                        <TableCell>{babyfoot.location}</TableCell>
                        <TableCell>
                          {getStatusBadge(babyfoot.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          {babyfoot.gamesPlayed}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Modifier</DropdownMenuItem>
                              <DropdownMenuItem>Supprimer</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "Admin" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                Changer le rôle
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}