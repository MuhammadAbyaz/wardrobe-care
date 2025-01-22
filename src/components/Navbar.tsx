import { Button } from "@/components/ui/button";
import { type Session } from "next-auth";
import Link from "next/link";
import AvatarDropDown from "./Avatar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/about", label: "About Us" },
  { href: "/partners", label: "Our Partners" },
  { href: "/impact", label: "Our Impact" },
] as const;

export default async function Navbar({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-8 md:gap-10">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/90" />
              <span className="text-lg font-semibold tracking-tight">
                Wardrobe Care
              </span>
            </Link>

            <nav className="hidden gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-[2px] h-[2px] scale-x-0 transform bg-primary transition-transform group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <AvatarDropDown session={session} />
            ) : (
              <div className="hidden items-center gap-3 md:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="font-medium"
                >
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="font-medium">
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] pr-0">
                <nav className="mt-6 flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {!session && (
                    <div className="flex flex-col gap-3 border-t pt-4">
                      <Button
                        variant="ghost"
                        asChild
                        className="justify-start font-medium"
                      >
                        <Link href="/auth/sign-in">Sign In</Link>
                      </Button>
                      <Button asChild className="justify-start font-medium">
                        <Link href="/auth/sign-up">Get Started</Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
