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
import { Swords, LogIn } from 'lucide-react';

export default function TournamentsPage() {
  return (
    <main className="container flex-grow flex items-center justify-center py-12 md:py-20">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Espace Tournois
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-xl mx-auto">
            Lancez votre propre compétition ou plongez dans l'action en rejoignant une partie existante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="flex flex-col">
            <CardHeader className="items-center text-center">
              <div className="bg-muted rounded-full p-4 w-fit mb-4">
                <Swords className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold">Créer un Tournoi</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <CardDescription className="text-base">
                Organisez votre compétition de A à Z, définissez les règles et devenez l'hôte de l'arène.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/tournaments/create">Commencer la création</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="items-center text-center">
              <div className="bg-muted rounded-full p-4 w-fit mb-4">
                <LogIn className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold">Rejoindre un Tournoi</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <CardDescription className="text-base">
                Parcourez la liste des tournois ouverts, trouvez votre jeu et lancez-vous dans la bataille.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/tournaments/join">Trouver un tournoi</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}