import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, RecycleIcon } from "lucide-react";
import DonationForm from "@/components/DonationForm";
import { db } from "@/server/db";
import { ngo, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function DonatePage() {
  const ngos = await db.select().from(users).where(eq(users.role, "NGO"));
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Card className="bg-white/90 shadow-xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mb-2 flex justify-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <RecycleIcon className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Make a Difference
            </CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              Your clothes can help others and save the environment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <DonationForm availableNgos={ngos} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
