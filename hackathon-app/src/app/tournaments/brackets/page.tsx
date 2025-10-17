import { Card, CardContent,CardHeader,CardTitle,CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

type Player = {
  name: string;
  score: number;
};

type Match = {
  id: number;
  player1: Player;
  player2: Player;
  winner: 'player1' | 'player2' | null;
};

type Round = {
  title: string;
  matches: Match[];
};

const data: Round[] = [
  {
    title: "Quarts de finale",
    matches: [
      { id: 1, player1: { name: "Le Pilonneur", score: 10 }, player2: { name: "Rocket Rick", score: 7 }, winner: 'player1' },
      { id: 2, player1: { name: "Jeanne la Flamme", score: 8 }, player2: { name: "Luc la Chance", score: 10 }, winner: 'player2' },
      { id: 3, player1: { name: "Dr. Smash", score: 10 }, player2: { name: "Le Mur", score: 3 }, winner: 'player1' },
      { id: 4, player1: { name: "La Comète", score: 9 }, player2: { name: "Tornado Tom", score: 10 }, winner: 'player2' },
    ],
  },
  {
    title: "Demi-finales",
    matches: [
      { id: 5, player1: { name: "Le Pilonneur", score: 10 }, player2: { name: "Luc la Chance", score: 9 }, winner: 'player1' },
      { id: 6, player1: { name: "Dr. Smash", score: 7 }, player2: { name: "Tornado Tom", score: 10 }, winner: 'player2' },
    ],
  },
  {
    title: "Finale",
    matches: [
      { id: 7, player1: { name: "Le Pilonneur", score: 6 }, player2: { name: "Tornado Tom", score: 10 }, winner: 'player2' },
    ],
  },
];

function MatchCard({ match }: { match: Match }) {
  const isPlayer1Winner = match.winner === 'player1';
  const isPlayer2Winner = match.winner === 'player2';

  return (
    <Card className="bg-muted/50">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <p className={cn("font-medium", isPlayer1Winner && "font-bold text-green-600", !isPlayer1Winner && match.winner && "text-muted-foreground")}>
            {match.player1.name}
          </p>
          <p className={cn("font-semibold", isPlayer1Winner && "text-green-600")}>
            {match.player1.score}
          </p>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className={cn("font-medium", isPlayer2Winner && "font-bold text-green-600", !isPlayer2Winner && match.winner && "text-muted-foreground")}>
            {match.player2.name}
          </p>
          <p className={cn("font-semibold", isPlayer2Winner && "text-green-600")}>
            {match.player2.score}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BracketsPage() {
  const finalWinner = data[2].matches[0];
  const winnerName = finalWinner.winner === 'player1' ? finalWinner.player1.name : finalWinner.player2.name;

  return (
    <main className="container py-12 md:py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Arbre du Tournoi
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-xl mx-auto">
          Suivez la progression des matchs jusqu'à la victoire finale.
        </p>
      </div>

      <Card className="max-w-md mx-auto mb-16 ">
        <CardHeader className="text-center">
            <Trophy className="mx-auto h-10 w-10 text-amber-500 mb-2"/>
          <CardTitle className="text-2xl text-amber-900">Vainqueur du tournoi</CardTitle>
          <CardDescription className="text-xl font-bold text-amber-700">{winnerName}</CardDescription>
        </CardHeader>
      </Card>

      <div className="lg:hidden">
        {data.map((round) => (
          <div key={round.title} className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">{round.title}</h2>
            <div className="space-y-4 max-w-sm mx-auto">
              {round.matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex justify-center items-center space-x-8 md:space-x-12">
        {data.map((round) => (
          <div key={round.title} className="flex flex-col items-center flex-1">
            <h2 className="text-2xl font-bold mb-8">{round.title}</h2>
            <div className="flex flex-col justify-around h-full w-full space-y-8">
              {round.matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}