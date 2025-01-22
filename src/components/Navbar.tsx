import { Button } from "@/components/ui/button";
import { type Session } from "next-auth";
import Link from "next/link";
import AvatarDropDown from "./Avatar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/about", label: "About Us" },
  { href: "/partners", label: "Our Partners" },
  { href: "/impact", label: "Our Impact" },
] as const;

export default async function Navbar({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-10">
      <div className="container px-4">
        <div className="flex h-14 items-center justify-between space-x-4 sm:h-16 sm:space-x-0">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="flex items-center gap-2 transition-colors"
            >
              <div className="h-6 w-6 rounded-md bg-primary sm:h-7 sm:w-7" />
              <span className="hidden font-semibold sm:inline-block">
                Wardrobe Care
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                      "relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:scale-x-0",
                      "after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {session ? (
              <AvatarDropDown session={session} />
            ) : (
              <div className="hidden space-x-3 md:flex">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="text-white">
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {!session && (
                    <div className="flex flex-col space-y-3 border-t pt-4">
                      <Button variant="ghost" asChild>
                        <Link href="/auth/sign-in">Sign In</Link>
                      </Button>
                      <Button asChild>
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
