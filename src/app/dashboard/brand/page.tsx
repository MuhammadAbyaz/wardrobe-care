"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BrandMgt = () => {
  const [brands] = useState([
    {
      id: 1,
      name: "Nike",
      partnerSince: "2024-01-01",
      status: "Active",
      totalProducts: 156,
      revenue: "$1.2M",
      lastOrder: "2024-03-15",
    },
    {
      id: 2,
      name: "Adidas",
      partnerSince: "2024-02-01",
      status: "Active",
      totalProducts: 143,
      revenue: "$980K",
      lastOrder: "2024-03-14",
    },
    {
      id: 3,
      name: "Puma",
      partnerSince: "2024-03-01",
      status: "Inactive",
      totalProducts: 89,
      revenue: "$450K",
      lastOrder: "2024-03-10",
    },
  ]);

  const [voucherTypes] = useState([
    {
      id: 1,
      name: "Discount 10%",
      rule: "Min. purchase $100",
      status: "Active",
      usageCount: 1234,
      redemptionRate: "68%",
      validUntil: "2024-12-31",
      brands: ["Nike", "Adidas"],
    },
    {
      id: 2,
      name: "Free Shipping",
      rule: "All items",
      status: "Active",
      usageCount: 2156,
      redemptionRate: "75%",
      validUntil: "2024-06-30",
      brands: ["All Brands"],
    },
    {
      id: 3,
      name: "Special Deal",
      rule: "Selected items only",
      status: "Inactive",
      usageCount: 432,
      redemptionRate: "45%",
      validUntil: "2024-04-30",
      brands: ["Puma"],
    },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      Active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    };
    return (
      <Badge
        className={`${variants[status as keyof typeof variants]} px-2 py-1`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="mx-auto space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Brand Management
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your brand partnerships and voucher programs
            </p>
          </div>
        </div>

        <Tabs defaultValue="brands" className="space-y-6">
          <TabsList className="rounded-lg bg-white p-1 dark:bg-gray-800">
            <TabsTrigger value="brands" className="px-6 py-2">
              Partner Brands
            </TabsTrigger>
            <TabsTrigger value="vouchers" className="px-6 py-2">
              Voucher Types
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brands">
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Partner Brands</CardTitle>
                    <CardDescription className="mt-2">
                      View and manage your clothing brand partnerships
                    </CardDescription>
                  </div>
                  <Button className="px-4 py-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Brand
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[200px] pl-6">
                        Brand Name
                      </TableHead>
                      <TableHead>Partner Since</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">
                        Total Products
                      </TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead className="pr-6 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brands.map((brand) => (
                      <TableRow
                        key={brand.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell className="pl-6 font-medium">
                          {brand.name}
                        </TableCell>
                        <TableCell>{brand.partnerSince}</TableCell>
                        <TableCell>{getStatusBadge(brand.status)}</TableCell>
                        <TableCell className="text-right">
                          {brand.totalProducts}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {brand.revenue}
                        </TableCell>
                        <TableCell>{brand.lastOrder}</TableCell>
                        <TableCell className="pr-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vouchers">
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Voucher Types</CardTitle>
                    <CardDescription className="mt-2">
                      Configure and manage your voucher programs
                    </CardDescription>
                  </div>
                  <Button className="px-4 py-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Voucher Type
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[200px] pl-6">
                        Voucher Name
                      </TableHead>
                      <TableHead>Claim Rules</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Usage Count</TableHead>
                      <TableHead className="text-right">
                        Redemption Rate
                      </TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead>Applicable Brands</TableHead>
                      <TableHead className="pr-6 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {voucherTypes.map((voucher) => (
                      <TableRow
                        key={voucher.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell className="pl-6 font-medium">
                          {voucher.name}
                        </TableCell>
                        <TableCell>{voucher.rule}</TableCell>
                        <TableCell>{getStatusBadge(voucher.status)}</TableCell>
                        <TableCell className="text-right">
                          {voucher.usageCount}
                        </TableCell>
                        <TableCell className="text-right">
                          {voucher.redemptionRate}
                        </TableCell>
                        <TableCell>{voucher.validUntil}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {voucher.brands.map((brand) => (
                              <Badge
                                key={brand}
                                variant="secondary"
                                className="px-2 py-0.5"
                              >
                                {brand}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BrandMgt;
