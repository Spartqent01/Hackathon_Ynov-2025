import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex justify-center mt-16">
      <Card className="md:w-full md:max-w-sm ">
        <CardHeader>
          <CardTitle className="flex justify-center">BracketHost</CardTitle>
          <CardDescription className="flex justify-center">
            Les champs marqués d’une * sont obligatoire
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="Pseudo">Pseudo *</Label>
                <Input
                  id="Pseudo"
                  type="text"
                  placeholder="Votre Pseudo"
                  required
                />
                <Button type="submit" variant="secondary" className="w-full">
                  Vérifier la disponibilité
                </Button>
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Votre Nom"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    type="text"
                    placeholder="Votre Prénom"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label htmlFor="age">Age </Label>
                  <Input id="age" type="number" placeholder="23" required />
                </div>
                <div>
                  <Label htmlFor="sexe">Sexe </Label>
                  <Input id="sexe" type="text" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe *</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" variant="outline" className="w-full">
            <Link href="/login">Créer un compte</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
