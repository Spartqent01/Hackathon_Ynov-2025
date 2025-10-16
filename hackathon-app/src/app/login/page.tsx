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

export default function LoginPage() {
  return (
    <main className="flex justify-center mt-16">
      <Card className="md:w-full md:max-w-sm ">
        <CardHeader>
          <CardTitle className="flex justify-center">BracketHost</CardTitle>
          <CardDescription className="flex justify-center">
            Des tournois facilement accessibles
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="pseudo">Pseudo</Label>
                <Input
                  id="pseudo"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" variant="outline" className="w-full">
            <Link href="/">S'identifier</Link>
          </Button>
          <Button type="submit" variant="outline" className="w-full">
            <Link href="/register">Créer un compte</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
