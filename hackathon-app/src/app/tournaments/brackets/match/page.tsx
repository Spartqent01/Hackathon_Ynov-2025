'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";
import { Plus, RotateCcw, Car, Shield, Swords } from 'lucide-react';


const listeDesJoueurs = ["Alice", "Bob", "Eve", "Frank"];

const nomEquipeA = "Les Foudres";
const nomEquipeB = "Les Tornades";

const attaquantInitialEquipeA = listeDesJoueurs[0];
const defenseurInitialEquipeA = listeDesJoueurs[1];
const attaquantInitialEquipeB = listeDesJoueurs[2];
const defenseurInitialEquipeB = listeDesJoueurs[3];


export default function MatchPage() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [gagnant, setGagnant] = useState<string | null>(null);

  const [attaquantA, setAttaquantA] = useState(attaquantInitialEquipeA);
  const [defenseurA, setDefenseurA] = useState(defenseurInitialEquipeA);
  const [attaquantB, setAttaquantB] = useState(attaquantInitialEquipeB);
  const [defenseurB, setDefenseurB] = useState(defenseurInitialEquipeB);


  const handleScoreA = () => {
    if (gagnant) return;
    const nouveauScore = scoreA + 1;
    setScoreA(nouveauScore);
    if (nouveauScore === 10) {
      setGagnant(nomEquipeA);
    }
  };

  const handleScoreB = () => {
    if (gagnant) return;
    const nouveauScore = scoreB + 1;
    setScoreB(nouveauScore);
    if (nouveauScore === 10) {
      setGagnant(nomEquipeB);
    }
  };

  const resetGame = () => {
    setScoreA(0);
    setScoreB(0);
    setGagnant(null);
  };

  return (
    <main className="container flex-grow py-12 md:py-20 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          {nomEquipeA} vs {nomEquipeB}
        </h1>
        <div className="flex items-center justify-center mt-4 text-muted-foreground">
          <Car className="mr-2 h-5 w-5" />
          <p className="text-lg">Arbitre : <strong>M. Dubois</strong></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Card className="flex flex-col text-center">
          <CardHeader>
            <CardTitle className="text-3xl">{nomEquipeA}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-center">
            <p className="text-8xl font-bold tabular-nums">{scoreA}</p>
            <Button size="lg" className="mt-6 w-full max-w-xs" onClick={handleScoreA} disabled={!!gagnant}>
              <Plus className="mr-2 h-5 w-5"/>
              Ajouter 1 point
            </Button>
            <Separator className="my-8"/>
            <div className="space-y-4 text-left w-full max-w-sm mx-auto">
              <div className="flex items-center gap-4">
                <Shield className="h-5 w-5 text-muted-foreground"/>
                <span className="font-medium w-24">Défenseur</span>
                <Select value={defenseurA} onValueChange={setDefenseurA}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {listeDesJoueurs.map(player => <SelectItem key={player} value={player}>{player}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Swords className="h-5 w-5 text-muted-foreground"/>
                <span className="font-medium w-24">Attaquant</span>
                <Select value={attaquantA} onValueChange={setAttaquantA}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {listeDesJoueurs.map(player => <SelectItem key={player} value={player}>{player}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col text-center">
          <CardHeader>
            <CardTitle className="text-3xl">{nomEquipeB}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-center">
            <p className="text-8xl font-bold tabular-nums">{scoreB}</p>
            <Button size="lg" className="mt-6 w-full max-w-xs" onClick={handleScoreB} disabled={!!gagnant}>
              <Plus className="mr-2 h-5 w-5"/>
              Ajouter 1 point
            </Button>
            <Separator className="my-8"/>
             <div className="space-y-4 text-left w-full max-w-sm mx-auto">
              <div className="flex items-center gap-4">
                <Shield className="h-5 w-5 text-muted-foreground"/>
                <span className="font-medium w-24">Défenseur</span>
                <Select value={defenseurB} onValueChange={setDefenseurB}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {listeDesJoueurs.map(player => <SelectItem key={player} value={player}>{player}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Swords className="h-5 w-5 text-muted-foreground"/>
                <span className="font-medium w-24">Attaquant</span>
                <Select value={attaquantB} onValueChange={setAttaquantB}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {listeDesJoueurs.map(player => <SelectItem key={player} value={player}>{player}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" onClick={resetGame}>
          <RotateCcw className="mr-2 h-4 w-4"/>
          Réinitialiser la partie
        </Button>
      </div>

      <AlertDialog open={!!gagnant}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Partie terminée !</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              L'équipe "<strong>{gagnant}</strong>" a gagné la partie !
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetGame}>Nouvelle partie</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}