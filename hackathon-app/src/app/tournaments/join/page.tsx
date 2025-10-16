import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

const data = [
  { id: 1, name: "Le Choc des Services", description: "Tournoi en doublette. Le service gagnant aura les droits de vantardise pendant un mois.", currentPlayers: 6, maxPlayers: 16 },
  { id: 2, name: "Tournoi de la Pause Café", description: "Matchs rapides en 5 points. Parfait pour les débutants et pour se détendre.", currentPlayers: 11, maxPlayers: 20 },
  { id: 3, name: "La Revanche du Lundi", description: "Réglez les comptes du week-end. Tournoi solo, élimination directe.", currentPlayers: 5, maxPlayers: 8 },
  { id: 4, name: "King of the Table", description: "Le gagnant reste. Qui tiendra le plus longtemps sur la table ?", currentPlayers: 7, maxPlayers: 12 },
  { id: 5, name: "Le Tournoi des Stagiaires", description: "Tournoi réservé aux nouveaux talents pour montrer ce qu'ils valent.", currentPlayers: 4, maxPlayers: 8 },
];

export default function JoinTournamentPage() {
  return (
    <main className="container py-12 md:py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Tournois de Baby-Foot
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-xl mx-auto">
          Trouvez un tournoi, défiez vos collègues et devenez le roi de la table.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((tournament) => (
          <Card key={tournament.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{tournament.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{tournament.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
               <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{tournament.currentPlayers} / {tournament.maxPlayers} participants</span>
                </div>
              <Button className="w-full">Rejoindre le tournoi</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}