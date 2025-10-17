import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

const data = [
  { id: 1, name: "Le Choc des Services", description: "Tournoi en doublette. Le service gagnant aura les droits de vantardise pendant un mois.", currentPlayers: 6, maxPlayers: 16 },
  { id: 2, name: "Tournoi de la Pause Café", description: "Matchs rapides en 5 points. Parfait pour les débutants et pour se détendre.", currentPlayers: 11, maxPlayers: 20 },
  { id: 3, name: "Team", description: "test", currentPlayers: 0, maxPlayers: 16 },
];

export default function JoinTournamentPage() {
  return (
    <main className="container py-12 md:py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Rejoindre un Tournoi
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-xl mx-auto">
          Entrez un code d'invitation ou trouvez une compétition publique.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Rejoindre avec un code</CardTitle>
            <CardDescription>
              Si vous avez un code de tournoi, entrez-le ci-dessous.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Ex: A4B-F8K" />
              <Button asChild>
                <Link href="/tournaments/brackets">Rejoindre</Link>
              </Button>
              <Button asChild>
                <Link href="/tournaments/brackets/match">Match</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter">
          Ou parcourez les tournois publics
        </h2>
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
              <Button asChild className="w-full">
                <Link href="/tournaments/brackets">Consulter</Link>
              </Button>
              <Button asChild>
                <Link href="/tournaments/brackets/match">Match</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}