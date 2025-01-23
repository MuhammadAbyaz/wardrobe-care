import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Chip } from "@/components/ui/chip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  Package,
  Recycle,
  Award,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/server/db";
import { donations, ngo, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/server/auth";
import { format } from "date-fns";
import { fetchStats } from "@/server/donation/actions";

const stats = [
  {
    title: "Total Donations",
    value: "5",
    change: "+2 from last month",
    icon: Package,
    variant: "blue",
  },
  {
    title: "Active Disposals",
    value: "3",
    change: "+1 from last month",
    icon: Recycle,
    variant: "purple",
  },
  {
    title: "Reward Points",
    value: "3,925",
    change: "+1,425 from last month",
    icon: Award,
    variant: "emerald",
  },
  {
    title: "Monthly Impact",
    value: "55 items",
    change: "Saved 165kg CO2",
    icon: TrendingUp,
    variant: "yellow",
  },
];

const DonationHistory = async () => {
  const session = await auth();
  const donationsData = await db
    .select({
      id: donations.id,
      createdAt: donations.createdAt,
      quantity: donations.quantity,
      donationType: donations.donationType,
      item: donations.item,
      status: donations.status,
      name: users.name,
    })
    .from(donations)
    .innerJoin(users, eq(donations.ngoId, users.id))
    .where(eq(donations.userId, session?.user?.id));

  const stats = await fetchStats(session?.user?.id ?? "");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex w-full items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Donation Dashboard
              </h1>
              <p className="text-gray-500">
                Track and manage your clothing donations and disposals
              </p>
            </div>
            <Link href="/user/new-donation">
              <Button className="text-white">
                <Plus className="mr-2 h-4 w-4" /> New Donation
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </span>
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-xs text-gray-500">
                        {stat.change}
                      </span>
                    </div>
                    <div
                      className={`rounded-full p-3 ${
                        stat.title === "Total Donations"
                          ? "bg-blue-50"
                          : stat.title === "Active Disposals"
                            ? "bg-purple-100"
                            : stat.title === "Reward Points"
                              ? "bg-emerald-100"
                              : "bg-yellow-100"
                      }`}
                    >
                      {stat.title === "Total Donations" && (
                        <Package className="h-5 w-5 text-blue-600" />
                      )}
                      {stat.title === "Active Disposals" && (
                        <Recycle className="h-5 w-5 text-purple-600" />
                      )}
                      {stat.title === "Reward Points" && (
                        <Award className="h-5 w-5 text-emerald-600" />
                      )}
                      {stat.title === "Monthly Impact" && (
                        <TrendingUp className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Activities</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="disposals">Disposals</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-4">
              {/* Desktop View */}
              <Card className="hidden md:block">
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>NGO/Service</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Rewards</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donationsData.map((data) => (
                        <TableRow key={data.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              {format(data.createdAt, "yyyy-MM-dd")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Chip
                              variant={
                                data.donationType === "DONATION"
                                  ? "blue"
                                  : "purple"
                              }
                            >
                              {data.donationType}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            {data.name || "Eco-Disposal Service"}
                          </TableCell>
                          <TableCell>{data.item}</TableCell>
                          <TableCell>
                            <Chip
                              variant={
                                data.status === "DELIVERED"
                                  ? "green"
                                  : data.status === "PENDING"
                                    ? "yellow"
                                    : "blue"
                              }
                            >
                              {data.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-emerald-600">
                              {data.quantity}
                            </span>
                          </TableCell>
                          <TableCell>
                            {data.vouchers ? (
                              <Chip variant="pink">{data.vouchers}</Chip>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Mobile View */}
              <div className="space-y-4 md:hidden">
                {donationsData.map((data) => (
                  <Card key={data.id}>
                    <CardContent className="space-y-4 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Chip
                            variant={
                              data.donationType === "DONATION"
                                ? "blue"
                                : "purple"
                            }
                          >
                            {data.donationType}
                          </Chip>
                          <span className="text-sm font-medium">
                            #{data.id}
                          </span>
                        </div>
                        <Chip
                          variant={
                            data.status === "DELIVERED"
                              ? "green"
                              : data.status === "PENDING"
                                ? "yellow"
                                : "blue"
                          }
                        >
                          {data.status}
                        </Chip>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Date</span>
                          <div className="mt-1 flex items-center gap-2 font-medium">
                            <CalendarDays className="h-4 w-4" />
                            {format(data.createdAt, "yyyy-MM-dd")}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Items</span>
                          <p className="mt-1 font-medium">{data.item}</p>
                        </div>
                      </div>

                      {data.vouchers && (
                        <div className="border-t pt-2">
                          <Chip variant="pink">{data.vouchers}</Chip>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Add similar content for other tabs */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
