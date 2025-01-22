import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DonationData {
  id: string;
  date: string;
  type: "Donation" | "Disposal";
  ngoName?: string;
  items: string;
  quantity: number;
  status:
    | "Pending"
    | "Scheduled"
    | "Picked Up"
    | "In Transit"
    | "Delivered"
    | "Completed";
  method: "Pickup" | "Drop-off";
  scheduledDate: string;
  rewardPoints: number;
  vouchers?: string;
}

const donationData: DonationData[] = [
  {
    id: "DON-2024-001",
    date: "2024-03-15",
    type: "Donation",
    ngoName: "GreenEarth Foundation",
    items: "Winter Clothing Bundle",
    quantity: 5,
    status: "Delivered",
    method: "Pickup",
    scheduledDate: "2024-03-14",
    rewardPoints: 500,
    vouchers: "20% off at H&M",
  },
  {
    id: "DIS-2024-001",
    date: "2024-03-12",
    type: "Disposal",
    items: "Damaged Textiles",
    quantity: 3,
    status: "Completed",
    method: "Pickup",
    scheduledDate: "2024-03-11",
    rewardPoints: 150,
  },
  {
    id: "DON-2024-002",
    date: "2024-03-10",
    type: "Donation",
    ngoName: "Care & Share",
    items: "Children's Clothes",
    quantity: 8,
    status: "In Transit",
    method: "Drop-off",
    scheduledDate: "2024-03-09",
    rewardPoints: 800,
    vouchers: "₹500 off at FirstCry",
  },
  {
    id: "DON-2024-003",
    date: "2024-03-05",
    type: "Donation",
    ngoName: "Hope Foundation",
    items: "Summer Collection",
    quantity: 12,
    status: "Delivered",
    method: "Pickup",
    scheduledDate: "2024-03-04",
    rewardPoints: 1200,
    vouchers: "15% off at Zara",
  },
  {
    id: "DIS-2024-002",
    date: "2024-03-02",
    type: "Disposal",
    items: "Old Shoes & Bags",
    quantity: 4,
    status: "Completed",
    method: "Drop-off",
    scheduledDate: "2024-03-01",
    rewardPoints: 200,
  },
  {
    id: "DON-2024-004",
    date: "2024-02-28",
    type: "Donation",
    ngoName: "Helping Hands",
    items: "Professional Attire",
    quantity: 6,
    status: "Delivered",
    method: "Pickup",
    scheduledDate: "2024-02-27",
    rewardPoints: 600,
    vouchers: "₹1000 off at Marks & Spencer",
  },
  {
    id: "DON-2024-005",
    date: "2024-02-25",
    type: "Donation",
    ngoName: "Second Chance",
    items: "Kids Accessories",
    quantity: 10,
    status: "Pending",
    method: "Drop-off",
    scheduledDate: "2024-03-20",
    rewardPoints: 300,
  },
  {
    id: "DIS-2024-003",
    date: "2024-02-20",
    type: "Disposal",
    items: "Worn Out Clothes",
    quantity: 7,
    status: "Scheduled",
    method: "Pickup",
    scheduledDate: "2024-03-22",
    rewardPoints: 175,
  },
];

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

const DonationHistory = () => {
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
                    <div className={`rounded-full p-3 bg-${stat.variant}-100`}>
                      <stat.icon
                        className={`h-5 w-5 text-${stat.variant}-600`}
                      />
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
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>NGO/Service</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Rewards</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donationData.map((data) => (
                        <TableRow key={data.id}>
                          <TableCell className="font-medium">
                            {data.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              {data.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Chip
                              variant={
                                data.type === "Donation" ? "blue" : "purple"
                              }
                            >
                              {data.type}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            {data.ngoName || "Eco-Disposal Service"}
                          </TableCell>
                          <TableCell>{data.items}</TableCell>
                          <TableCell>
                            <Chip
                              variant={
                                data.status === "Delivered"
                                  ? "green"
                                  : data.status === "Pending"
                                    ? "yellow"
                                    : "blue"
                              }
                            >
                              {data.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Chip
                              variant={
                                data.method === "Pickup" ? "teal" : "orange"
                              }
                            >
                              {data.method}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-emerald-600">
                              {data.rewardPoints}
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
                {donationData.map((data) => (
                  <Card key={data.id}>
                    <CardContent className="space-y-4 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Chip
                            variant={
                              data.type === "Donation" ? "blue" : "purple"
                            }
                          >
                            {data.type}
                          </Chip>
                          <span className="text-sm font-medium">
                            #{data.id}
                          </span>
                        </div>
                        <Chip
                          variant={
                            data.status === "Delivered"
                              ? "green"
                              : data.status === "Pending"
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
                            {data.date}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Method</span>
                          <div className="mt-1">
                            <Chip
                              variant={
                                data.method === "Pickup" ? "teal" : "orange"
                              }
                            >
                              {data.method}
                            </Chip>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Items</span>
                          <p className="mt-1 font-medium">{data.items}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Points</span>
                          <p className="mt-1 font-medium text-emerald-600">
                            {data.rewardPoints}
                          </p>
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