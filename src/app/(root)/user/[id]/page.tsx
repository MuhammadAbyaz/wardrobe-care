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

const Dashboard = () => {
  type Data = {
    invoice: string;
    status: string;
    method: string;
    amount: string;
  };

  const tableData: Data[] = [
    { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$100.00" },
  ];

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => (
          <TableRow key={data.invoice}>
            <TableCell className="font-medium">{data.invoice}</TableCell>
            <TableCell>{data.status}</TableCell>
            <TableCell>{data.method}</TableCell>
            <TableCell className="text-right">{data.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Dashboard;
