"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    prenom: "",
    age: "",
    sexe: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          name: formData.name,
          prenom: formData.prenom,
          age: Number(formData.age),
          sexe: formData.sexe,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Erreur lors de l'inscription");
      } else {
        router.push("/login");
      }
    } catch {
      setErrorMsg("Erreur inattendue, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center mt-16">
      <Card className="md:w-full md:max-w-sm ">
        <CardHeader>
          <CardTitle className="flex justify-center">BracketHost</CardTitle>
          <CardDescription className="flex justify-center">
            Les champs marqués d’une * sont obligatoire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Pseudo *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Votre Pseudo"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Votre Nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    type="text"
                    placeholder="Votre Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label htmlFor="age">Age </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="23"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="sexe">Sexe </Label>
                  <Input
                    id="sexe"
                    type="text"
                    value={formData.sexe}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 mt-2">{errorMsg}</p>
            )}

            <Button
              type="submit"
              variant="outline"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? "Création en cours..." : "Créer un compte"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link href="/login" className="underline text-center w-full">
            Déjà un compte ? Connectez-vous
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
