import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-primary text-xl font-bold">
            Wardrobe Care
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              How It Works
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Partners
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Impact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <Link href={"/auth/sign-in"}>Log In</Link>
            </Button>
            <Button className="bg-green-600 text-white hover:bg-green-700">
              Sign Up
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
