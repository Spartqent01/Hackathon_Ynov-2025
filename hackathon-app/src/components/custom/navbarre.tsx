import { Menu, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b p-4">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Gamepad2 className="h-6 w-6" />
          <span className="font-bold inline-block">TournaHub</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 ml-auto">
          <Button variant="ghost" asChild>
            <Link href="/tournaments">Tournaments</Link>
          </Button>
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        </nav>

        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>TournaHub</SheetTitle>
                <SheetDescription>
                  Rejoignez des tournois et grimpez dans le classement.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button variant="ghost" asChild>
                  <Link href="/tournaments">Tournaments</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signin">Profil</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}