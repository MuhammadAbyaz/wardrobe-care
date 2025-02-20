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
  MoreHorizontal,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/server/db";
import { donations, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/server/auth";
import { format } from "date-fns";
import { fetchStats, updateDonationStatus } from "@/server/ngo/actions";
import ActionDropdown from "@/components/ActionDropdown";
// import { format } from "date-fns";

// interface DonationData {
//   id: string;
//   userName: string;
//   item: string;
//   quantity: number;
//   pickupLocation: string;
//   itemCondition: "GOOD" | "NORMAL" | "BAD";
//   pickupDateTime: Date;
//   donationType: "DONATION" | "DISPOSAL";
//   status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
//   additionalNotes?: string;
// }

// const donationsData: DonationData[] = [
//   {
//     id: "DON-001",
//     userName: "John Doe",
//     item: "Winter Clothing",
//     quantity: 5,
//     pickupLocation: "123 Main St, City",
//     itemCondition: "BAD",
//     pickupDateTime: new Date("2024-03-20T10:00:00"),
//     donationType: "DONATION",
//     status: "ACCEPTED",
//     additionalNotes: "All items are cleaned and packed",
//   },
// ];

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

const NgoDonationRequest = async () => {
  const session = await auth();
  const donationsData = await db
    .select({
      id: donations.id,
      item: donations.item,
      quantity: donations.quantity,
      pickupLocation: donations.pickupLocation,
      itemCondition: donations.itemCondition,
      pickupDateTime: donations.pickupDateTime,
      donationType: donations.donationType,
      status: donations.status,
      additionalNotes: donations.additionalNotes,
      userName: users.name,
    })
    .from(donations)
    .innerJoin(users, eq(donations.userId, users.id))
    .where(eq(donations.ngoId, session?.user?.id));

  const stats = await fetchStats(session?.user?.id ?? "");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Donation Dashboard
            </h1>
            <p className="text-gray-500">
              Track and manage your clothing donations and disposals
            </p>
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
                          ? "bg-blue-100"
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
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Donations Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Pickup Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donationsData.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell>{donation.userName}</TableCell>
                          <TableCell>{donation.item}</TableCell>
                          <TableCell>{donation.quantity}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                donation.itemCondition === "GOOD"
                                  ? "completed"
                                  : donation.itemCondition === "NORMAL"
                                    ? "warning"
                                    : "rejected"
                              }
                            >
                              {donation.itemCondition}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(donation.pickupDateTime, "yyyy-MM-dd")}
                          </TableCell>
                          <TableCell>{donation.pickupLocation}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                donation.status === "DELIVERED"
                                  ? "completed"
                                  : donation.status === "ACCEPTED"
                                    ? "accepted"
                                    : "rejected"
                              }
                            >
                              {donation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <ActionDropdown donationId={donation.id} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add similar content for other tabs */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NgoDonationRequest;
