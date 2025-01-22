"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, Gift, Store } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-b from-green-50 to-white px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
              Give Your Clothes a Second Life
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Join our sustainable fashion movement. Donate clothes, earn
              rewards, and make a positive impact on the environment.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Recycle className="text-primary h-10 w-10" />}
              title="Easy Donation Process"
              description="Schedule pickups or find nearby donation points with just a few clicks."
            />
            <FeatureCard
              icon={<Gift className="text-primary h-10 w-10" />}
              title="Earn Rewards"
              description="Get points for every donation and redeem them for exclusive rewards."
            />
            <FeatureCard
              icon={<Store className="text-primary h-10 w-10" />}
              title="Partner Brands"
              description="Access special discounts and offers from sustainable fashion brands."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-12 text-center"
          >
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <ImpactStat number="10K+" label="Clothes Donated" />
              <ImpactStat number="5K+" label="Active Users" />
              <ImpactStat number="50+" label="Partner Organizations" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-green-600 px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center"
          >
            <h2 className="text-3xl font-bold text-white">
              Ready to Make a Difference?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-green-50">
              Join thousands of others in our mission to reduce textile waste
              and promote sustainable fashion.
            </p>
            <Button size="lg" variant="secondary">
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="space-y-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

function ImpactStat({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-primary text-4xl font-bold"
      >
        {number}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-600"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
