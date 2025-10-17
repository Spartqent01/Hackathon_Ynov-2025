import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Swords, Users, Trophy } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <video
          src="/Baby_Foot_Publicitaire_Cinématique_Hyperréaliste.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Créez, Participez, Dominez.
          </h1>
          <p className="max-w-xl mx-auto text-lg text-neutral-300 mb-8">
            Bienvenue sur <strong>Suuuper Tournoi</strong>, la plateforme où les joueurs se rassemblent pour
            participer à des tournois, suivre leurs performances et grimper dans les classements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/tournaments">Voir les tournois</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">S'inscrire gratuitement</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Votre Arène Compétitive
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Tout ce dont vous avez besoin pour une expérience de tournoi parfaite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Swords className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Créez des Tournois</CardTitle>
                <CardDescription>
                  Organisez vos propres compétitions en quelques clics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Rejoignez la Communauté</CardTitle>
                <CardDescription>
                  Trouvez des tournois pour vos jeux préférés.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Suivez votre Progression</CardTitle>
                <CardDescription>
                  Consultez votre historique de matchs.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}