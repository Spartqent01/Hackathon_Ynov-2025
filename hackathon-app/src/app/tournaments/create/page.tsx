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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateTournamentPage() {
  return (
    <main className="container flex-grow flex items-center justify-center py-12 md:py-20 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Créer un nouveau tournoi</CardTitle>
          <CardDescription>
            Remplissez les détails ci-dessous pour mettre en place votre compétition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Nom du tournoi</Label>
                <Input id="name" placeholder="Ex: Tournoi des Champions" />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="slots">Nombre de places</Label>
                <Input id="slots" type="number" placeholder="Ex: 16" />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Décrivez les règles, le format, les prix, etc." />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Créer le tournoi</Button>
        </CardFooter>
      </Card>
    </main>
  );
}